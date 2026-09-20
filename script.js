// 연도
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

/* =====================================================================
   config.js 의 값으로 링크·영상·이미지를 채웁니다.
   값이 없으면 해당 요소는 숨겨진 채로 남아, 빈 자리나 죽은 링크가 보이지 않습니다.
   ===================================================================== */
(function () {
  const CFG = window.CONFIG || {};
  const links  = CFG.links  || {};
  const videos = CFG.videos || {};
  const text   = CFG.text   || {};

  // 1) 링크: <a data-link="키" hidden>
  document.querySelectorAll('a[data-link]').forEach(a => {
    const url = links[a.dataset.link];
    if (url) { a.href = url; a.hidden = false; }
  });
  // 링크만 담은 줄(.row-links)은 보이는 링크가 하나라도 있을 때만 표시
  document.querySelectorAll('[data-row-links]').forEach(row => {
    row.hidden = !row.querySelector('a:not([hidden])');
    const label = row.previousElementSibling;
    if (label && label.tagName === 'DT') label.hidden = row.hidden;
  });

  // 2) 텍스트: <li data-cfg="키" hidden><b>라벨</b><span></span></li>
  document.querySelectorAll('[data-cfg]').forEach(el => {
    const v = text[el.dataset.cfg];
    if (!v) return;
    const target = el.querySelector('span') || el;
    target.textContent = v;
    el.hidden = false;
  });

  // 3) 유튜브: <div class="video" data-video="키" hidden>
  document.querySelectorAll('.video[data-video]').forEach(box => {
    const id = videos[box.dataset.video];
    if (!id) return;
    const f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id);
    f.title = box.dataset.video + ' 플레이 영상';
    f.loading = 'lazy';
    f.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    box.appendChild(f);
    box.hidden = false;
  });

  // 4) 이미지: assets/<이름>.(webp|png|jpg|jpeg|gif) 이 있으면 자동 사용
  const EXTS = ['webp', 'png', 'jpg', 'jpeg', 'gif'];
  function probe(name, onFound) {
    let i = 0;
    (function next() {
      if (i >= EXTS.length) return;
      const src = 'assets/' + name + '.' + EXTS[i++];
      const img = new Image();
      img.onload = () => onFound(src, img);
      img.onerror = next;
      img.src = src;
    })();
  }

  // 대표 이미지: <figure class="cover" data-cover="factory" hidden> → assets/factory.jpg 등
  document.querySelectorAll('.cover[data-cover]').forEach(fig => {
    probe(fig.dataset.cover, (src, img) => {
      img.alt = (fig.dataset.alt || fig.dataset.cover) + ' 대표 화면';
      fig.appendChild(img);
      fig.hidden = false;
    });
  });

  // 스크린샷: <div class="shots" data-shots="B1,B2,B3">, 있는 것만 순서대로 표시
  document.querySelectorAll('.shots[data-shots]').forEach(box => {
    const order = box.dataset.shots.split(',').map(s => s.trim()).filter(Boolean);
    order.forEach(id => {
      probe(id, (src, img) => {
        const fig = document.createElement('figure');
        fig.className = 'shot';
        fig.dataset.id = id;
        img.alt = id + ' 스크린샷';
        img.loading = 'lazy';
        fig.appendChild(img);
        const later = [...box.children].find(c => order.indexOf(c.dataset.id) > order.indexOf(id));
        box.insertBefore(fig, later || null);
        box.classList.add('has-media');
      });
    });
  });
})();

// 왼쪽 목차: 지금 보고 있는 구간 강조
(function () {
  const links = [...document.querySelectorAll('.side-nav a[href^="#"]')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const map = new Map();
  links.forEach(a => {
    const el = document.getElementById(a.getAttribute('href').slice(1));
    if (el) map.set(el, a);
  });
  const visible = new Set();
  const order = [...map.keys()];
  function paint() {
    const cur = order.find(el => visible.has(el)) || null;
    links.forEach(a => a.classList.toggle('is-active', cur && map.get(cur) === a));
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
    paint();
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
  map.forEach((_, el) => io.observe(el));
})();
