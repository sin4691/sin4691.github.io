// 연도 자동 표시
document.getElementById('year').textContent = new Date().getFullYear();

// 모바일 메뉴 토글
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  nav.classList.toggle('is-open');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('is-open'));
});

// 스크롤 등장 애니메이션
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// 좌측 사이드바 스크롤스파이 (현재 보고 있는 섹션 강조)
const sideLinks = document.querySelectorAll('.side-link[href^="#"]');
const sectionMap = new Map();
sideLinks.forEach(link => {
  const id = link.getAttribute('href').slice(1);
  const section = document.getElementById(id);
  if (section) sectionMap.set(section, link);
});

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = sectionMap.get(entry.target);
    if (!link) return;
    if (entry.isIntersecting) {
      sideLinks.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sectionMap.forEach((_, section) => spyObserver.observe(section));
