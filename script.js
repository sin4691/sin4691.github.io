// 연도
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

/* =====================================================================
   config.js 의 값으로 링크·영상·이미지를 채웁니다.
   - 링크·영상은 값이 없으면 숨겨진 채로 남습니다.
   - 이미지 자리는 assets/ 에 파일이 없으면 점선 "자리" 상자로 보입니다.
   ===================================================================== */
(function () {
  const CFG = window.CONFIG || {};
  const links  = CFG.links  || {};
  const videos = CFG.videos || {};
  const text   = CFG.text   || {};

  document.querySelectorAll('a[data-link]').forEach(a => {
    const url = links[a.dataset.link];
    if (url) { a.href = url; a.hidden = false; }
  });

  document.querySelectorAll('[data-cfg]').forEach(el => {
    const v = text[el.dataset.cfg];
    if (!v) return;
    const target = el.querySelector('span') || el;
    target.textContent = v;
    el.hidden = false;
  });

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

  // 이미지: assets/<이름>.(webp|png|jpg|jpeg|gif) 이 있으면 자리를 채움
  const EXTS = ['webp', 'png', 'jpg', 'jpeg', 'gif'];
  document.querySelectorAll('[data-img]').forEach(box => {
    let i = 0;
    (function next() {
      if (i >= EXTS.length) return;
      const img = new Image();
      img.onload = () => {
        img.alt = box.dataset.alt || (box.querySelector('.slot-label')?.textContent || '') + ' 스크린샷';
        img.loading = 'lazy';
        box.appendChild(img);
        box.classList.add('filled');
      };
      img.onerror = next;
      img.src = 'assets/' + box.dataset.img + '.' + EXTS[i++];
    })();
  });
})();
