(function() {
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.getElementById('navMenu');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function closeMenu() {
    if (!navList) return;
    navList.classList.remove('is-open');
    navToggle?.classList.remove('is-active');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    if (!navList) return;
    navList.classList.add('is-open');
    navToggle?.classList.add('is-active');
    navToggle?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    navList.addEventListener('click', e => {
      if (e.target.matches('a')) closeMenu();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Marcar activo según URL si no hay hash o secciones observables
  const currentPath = window.location.pathname.replace(/\/+$/, '');
  const links = document.querySelectorAll('.nav__list a[data-link]');
  links.forEach(a => a.classList.remove('is-active'));

  function setActive(key) {
    const link = document.querySelector(`.nav__list a[data-link="${key}"]`);
    if (link) link.classList.add('is-active');
  }

  if (currentPath.endsWith('/nosotros.html')) {
    setActive('nosotros');
  } else if (currentPath.endsWith('/servicios.html')) {
    setActive('servicios');
  } else if (currentPath === '' || currentPath.endsWith('/') || currentPath.endsWith('/index.html')) {
    // Index
    setActive('home');
  }

  // Scroll spy solo en index y solo si hay secciones ancla
  const isIndex = (currentPath === '' || currentPath.endsWith('/') || currentPath.endsWith('/index.html'));
  if (isIndex) {
    const spyLinks = [...document.querySelectorAll('.nav__list a[href^="#"], .nav__list a[href*="index.html#"]')];
    const sectionTargets = spyLinks
      .map(a => {
        const href = a.getAttribute('href');
        const id = href.includes('#') ? href.split('#').pop() : null;
        return id ? document.getElementById(id) : null;
      })
      .filter(Boolean);

    if (sectionTargets.length) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            spyLinks.forEach(a => {
              const href = a.getAttribute('href');
              if (href.endsWith('#' + id)) {
                a.classList.add('is-active');
              } else if (!href.includes('#' + id) && !href.includes('nosotros') && !href.includes('servicios')) {
                a.classList.remove('is-active');
              }
            });
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

      sectionTargets.forEach(sec => observer.observe(sec));
    }
  }
})();