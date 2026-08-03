(() => {
  'use strict';

  // ---- Footer year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Header scroll state ----
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Back to top ----
  const backToTop = document.getElementById('back-to-top');
  const onScrollBackToTop = () => {
    if (window.scrollY > 480) backToTop.classList.add('is-visible');
    else backToTop.classList.remove('is-visible');
  };
  onScrollBackToTop();
  window.addEventListener('scroll', onScrollBackToTop, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Mobile menu ----
  const menuToggle = document.getElementById('menu-toggle');
  const menuIcon = document.getElementById('menu-icon');
  const mobileMenu = document.getElementById('mobile-menu');

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuIcon.classList.remove('ph-x');
    menuIcon.classList.add('ph-list');
  };

  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuIcon.classList.remove('ph-list');
    menuIcon.classList.add('ph-x');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeMenu();
  });

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  // ---- Contact form validation ----
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');
  const submitLabel = document.getElementById('submit-label');

  const validators = {
    name: (value) => value.trim().length > 0 || 'Merci d\'indiquer votre nom.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Merci d\'indiquer une adresse e-mail valide.',
    message: (value) => value.trim().length >= 10 || 'Votre message doit contenir au moins 10 caractères.',
  };

  const setFieldError = (field, message) => {
    const input = form.elements[field];
    const errorEl = form.querySelector(`[data-error-for="${field}"]`);
    if (message) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = message;
    } else {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      if (errorEl) errorEl.textContent = '';
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successMsg.classList.add('hidden');

    let isValid = true;
    Object.entries(validators).forEach(([field, validate]) => {
      const result = validate(form.elements[field].value);
      if (result !== true) {
        setFieldError(field, result);
        isValid = false;
      } else {
        setFieldError(field, null);
      }
    });

    if (!isValid) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitLabel.textContent = 'Envoi en cours…';

    // Simulated submission (no backend wired up yet).
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitLabel.textContent = 'Envoyer le message';
      successMsg.classList.remove('hidden');
      form.reset();
    }, 900);
  });

  ['name', 'email', 'message'].forEach((field) => {
    form.elements[field].addEventListener('blur', () => {
      const result = validators[field](form.elements[field].value);
      setFieldError(field, result === true ? null : result);
    });
  });
})();
