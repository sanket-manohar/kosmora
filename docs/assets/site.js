// Kosmora website: theme toggle, screenshot tabs and guide navigation highlight.
(function () {
  'use strict';
  const root = document.documentElement;
  const KEY = 'kosmora-theme';
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) root.dataset.theme = saved;
  } catch (e) {}

  const btn = document.querySelector('.theme-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      root.dataset.theme = dark ? 'light' : 'dark';
      try {
        localStorage.setItem(KEY, root.dataset.theme);
      } catch (e) {}
    });
  }

  document.querySelectorAll('[data-gallery]').forEach((g) => {
    const img = g.querySelector('.frame img');
    const cap = g.querySelector('.caption');
    g.querySelectorAll('.tab').forEach((t) => {
      t.addEventListener('click', () => {
        g.querySelectorAll('.tab').forEach((x) => x.setAttribute('aria-selected', String(x === t)));
        img.src = t.dataset.src;
        img.alt = t.textContent;
        cap.textContent = t.dataset.caption;
      });
    });
  });

  const links = [...document.querySelectorAll('.toc a')];
  if (links.length && 'IntersectionObserver' in window) {
    const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((a) => a.classList.remove('on'));
            const a = byId.get(e.target.id);
            if (a) a.classList.add('on');
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );
    byId.forEach((_a, id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }
})();
