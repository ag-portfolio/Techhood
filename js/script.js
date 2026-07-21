'use strict';

/* ==========================================================================
   TECHHOOD — script.js
   Vanilla ES6, OOP. Each concern is its own class so the page can grow
   without functions leaking into global scope. All classes are instantiated
   once, from App, after DOMContentLoaded.
   ========================================================================== */

/* ---------- Content data (kept separate from render logic) ---------- */

const DATA = {
  services: [
    { icon: 'code', title: 'Web Development', text: 'Fast, accessible, SEO-ready sites and web apps built on modern frameworks.' },
    { icon: 'layers', title: 'UI/UX Design', text: 'Research-backed interfaces that convert — wireframe to hi-fi prototype.' },
    { icon: 'smartphone', title: 'Mobile App Dev', text: 'Native-feel iOS and Android apps from a single, maintainable codebase.' },
    { icon: 'cloud', title: 'Cloud Solutions', text: 'Scalable infrastructure on AWS/GCP with CI/CD baked in from day one.' },
    { icon: 'shield', title: 'Cybersecurity', text: 'Audits, hardening and monitoring so launches don\u2019t become incidents.' },
    { icon: 'compass', title: 'IT Consulting', text: 'Roadmaps and architecture reviews that keep tech decisions boring and safe.' },
  ],
  why: [
    { icon: 'users', title: 'Expert Team', text: 'Senior engineers only — no hand-offs to juniors mid-project.' },
    { icon: 'clock', title: 'On-Time Delivery', text: 'Fixed sprints with visible progress, every two weeks, no surprises.' },
    { icon: 'headphones', title: '24/7 Support', text: 'A real person on call for production issues, day or night.' },
    { icon: 'tag', title: 'Affordable Pricing', text: 'Transparent scopes and fixed quotes — no hourly-rate surprises.' },
  ],
  stats: [
    { value: '50+', label: 'Projects Delivered' },
    { value: '5+', label: 'Years Experience' },
    { value: '30+', label: 'Happy Clients' },
    { value: '12', label: 'Countries Served' },
  ],
  portfolio: [
    { img: 'images/portfolio-1.svg', tag: 'Web Platform', title: 'Ledger — Finance Dashboard' },
    { img: 'images/portfolio-2.svg', tag: 'Mobile App', title: 'Orbit — Team Scheduling' },
    { img: 'images/portfolio-3.svg', tag: 'E-Commerce', title: 'Kiln — Handmade Goods Store' },
    { img: 'images/portfolio-4.svg', tag: 'Cloud / DevOps', title: 'Nimbus — CI/CD Console' },
    { img: 'images/portfolio-5.svg', tag: 'Branding + Web', title: 'Fieldnote — Travel Journal' },
    { img: 'images/portfolio-6.svg', tag: 'SaaS', title: 'Pulsegrid — Analytics Suite' },
  ],
  testimonials: [
    { name: 'Amara Osei', role: 'Founder, Kiln Goods', quote: 'TECHHOOD rebuilt our storefront in six weeks and conversion jumped 34% in the first month.' },
    { name: 'Daniel Reyes', role: 'CTO, Pulsegrid', quote: 'The most senior, most communicative agency team we\u2019ve worked with — bar none.' },
    { name: 'Priya Nair', role: 'Ops Lead, Orbit', quote: 'They caught scaling issues before they became outages. That alone paid for the engagement.' },
  ],
};

/* Minimal inline icon set (Feather-style, single stroke) so we don't ship emoji or a library */
const ICONS = {
  code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
  layers: '<path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  cloud: '<path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>',
  shield: '<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>',
  users: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  headphones: '<path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>',
  tag: '<path d="M20.59 13.41 11 3.83A2 2 0 009.58 3H4a1 1 0 00-1 1v5.58a2 2 0 00.59 1.42l9.58 9.58a2 2 0 002.83 0l4.59-4.59a2 2 0 000-2.83z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  arrow: '<path d="M7 17L17 7M7 7h10v10"/>',
};

const icon = (name, size = 22) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;

/* ---------- Navigation: sticky blur + mobile hamburger ---------- */
class Navigation {
  constructor() {
    this.header = document.getElementById('siteHeader');
    this.toggle = document.getElementById('navToggle');
    this.links = document.getElementById('navLinks');
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.toggle.addEventListener('click', () => this.toggleMenu());
    this.links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') this.closeMenu();
    });
  }

  onScroll() {
    this.header.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  toggleMenu() {
    const isOpen = this.links.classList.toggle('is-open');
    this.toggle.setAttribute('aria-expanded', String(isOpen));
  }

  closeMenu() {
    this.links.classList.remove('is-open');
    this.toggle.setAttribute('aria-expanded', 'false');
  }
}

/* ---------- Renders data-driven sections into the DOM ---------- */
class ContentRenderer {
  static services() {
    document.getElementById('servicesGrid').innerHTML = DATA.services.map(s => `
      <article class="service-card reveal">
        <div class="service-card__icon">${icon(s.icon, 24)}</div>
        <h3>${s.title}</h3>
        <p>${s.text}</p>
      </article>`).join('');
  }

  static why() {
    document.getElementById('whyGrid').innerHTML = DATA.why.map(w => `
      <article class="why-card reveal">
        <div class="why-card__icon">${icon(w.icon, 24)}</div>
        <h3>${w.title}</h3>
        <p>${w.text}</p>
      </article>`).join('');
  }

  static stats() {
    document.getElementById('statRow').innerHTML = DATA.stats.map(s => `
      <div class="stat-card"><strong>${s.value}</strong><span>${s.label}</span></div>`).join('');
  }

  static portfolio() {
    document.getElementById('portfolioGrid').innerHTML = DATA.portfolio.map(p => `
      <article class="portfolio-card reveal">
        <img src="${p.img}" alt="${p.title} project thumbnail" width="400" height="300" loading="lazy">
        <div class="portfolio-card__overlay">
          <span class="portfolio-card__tag">${p.tag}</span>
          <h3>${p.title}</h3>
          <a href="#" class="portfolio-card__link">View project ${icon('arrow', 14)}</a>
        </div>
      </article>`).join('');
  }

  static renderAll() {
    this.services();
    this.why();
    this.stats();
    this.portfolio();
  }
}

/* ---------- Scroll-triggered fade-in-up (bonus feature) ---------- */
class ScrollReveal {
  constructor(selector = '.reveal') {
    this.items = document.querySelectorAll(selector);
    this.observer = new IntersectionObserver((entries) => this.onIntersect(entries), {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    });
    this.items.forEach(el => this.observer.observe(el));
  }

  onIntersect(entries) {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // slight stagger for elements revealed together
        setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
        this.observer.unobserve(entry.target);
      }
    });
  }
}

/* ---------- Testimonial carousel (vanilla, no library) ---------- */
class TestimonialSlider {
  constructor() {
    this.track = document.getElementById('testimonialTrack');
    this.dotsWrap = document.getElementById('tsDots');
    this.prevBtn = document.getElementById('tsPrev');
    this.nextBtn = document.getElementById('tsNext');
    this.index = 0;
    this.autoplayMs = 6000;
    this.render();
    this.bindEvents();
    this.startAutoplay();
  }

  render() {
    const cards = DATA.testimonials.map(t => `
      <div class="t-card">
        <p class="t-card__quote">\u201c${t.quote}\u201d</p>
        <div class="t-card__avatar">${t.name.split(' ').map(n => n[0]).join('')}</div>
        <p class="t-card__name">${t.name}</p>
        <p class="t-card__role">${t.role}</p>
      </div>`).join('');
    this.track.innerHTML = `<div class="testimonial-track__inner" id="tsInner">${cards}</div>`;
    this.inner = document.getElementById('tsInner');

    this.dotsWrap.innerHTML = DATA.testimonials.map((_, i) =>
      `<button class="ts-dot${i === 0 ? ' is-active' : ''}" aria-label="Go to testimonial ${i + 1}"></button>`).join('');
    this.dots = [...this.dotsWrap.children];
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.go(this.index - 1));
    this.nextBtn.addEventListener('click', () => this.go(this.index + 1));
    this.dots.forEach((dot, i) => dot.addEventListener('click', () => this.go(i)));
    this.track.addEventListener('mouseenter', () => this.stopAutoplay());
    this.track.addEventListener('mouseleave', () => this.startAutoplay());
  }

  go(newIndex) {
    const total = DATA.testimonials.length;
    this.index = (newIndex + total) % total;
    this.inner.style.transform = `translateX(-${this.index * 100}%)`;
    this.dots.forEach((d, i) => d.classList.toggle('is-active', i === this.index));
  }

  startAutoplay() {
    this.stopAutoplay();
    this.timer = setInterval(() => this.go(this.index + 1), this.autoplayMs);
  }

  stopAutoplay() {
    clearInterval(this.timer);
  }
}

/* ---------- Toast helper ---------- */
class Toast {
  constructor() {
    this.el = document.getElementById('toast');
  }

  show(message, duration = 3200) {
    this.el.textContent = message;
    this.el.classList.add('is-visible');
    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => this.el.classList.remove('is-visible'), duration);
  }
}

/* ---------- Contact form validation (no libraries) ---------- */
class FormValidator {
  constructor(formEl, toast) {
    this.form = formEl;
    this.toast = toast;
    this.rules = {
      fullName: {
        test: (v) => v.trim().length >= 2,
        message: 'Please enter at least 2 characters.',
      },
      email: {
        test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
        message: 'Enter a valid email address.',
      },
      phone: {
        test: (v) => /^\d{10,11}$/.test(v.replace(/[\s()-]/g, '')),
        message: 'Enter a 10\u201311 digit phone number.',
      },
      message: {
        test: (v) => v.trim().length >= 10,
        message: 'Message should be at least 10 characters.',
      },
    };
    this.bindEvents();
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.onSubmit(e));
    Object.keys(this.rules).forEach((name) => {
      const field = this.form.elements[name];
      field.addEventListener('blur', () => this.validateField(name));
      field.addEventListener('input', () => {
        // clear the error as soon as the user fixes it
        if (this.rules[name].test(field.value)) this.setError(name, '');
      });
    });
  }

  validateField(name) {
    const field = this.form.elements[name];
    const rule = this.rules[name];
    const isValid = rule.test(field.value);
    this.setError(name, isValid ? '' : rule.message);
    return isValid;
  }

  setError(name, message) {
    const field = this.form.elements[name];
    const errorEl = document.getElementById(`${name}Error`);
    errorEl.textContent = message;
    field.closest('.field').classList.toggle('has-error', Boolean(message));
  }

  onSubmit(e) {
    e.preventDefault();
    const results = Object.keys(this.rules).map((name) => this.validateField(name));
    const allValid = results.every(Boolean);

    if (!allValid) {
      this.toast.show('Please fix the highlighted fields.');
      return;
    }

    // No backend wired up — simulate a network round-trip.
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending\u2026';
    submitBtn.disabled = true;

    setTimeout(() => {
      this.toast.show('Message sent \u2014 we\u2019ll be in touch within a day.');
      this.form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 900);
  }
}

/* ---------- App bootstrap ---------- */
class App {
  static init() {
    ContentRenderer.renderAll();
    new Navigation();
    new ScrollReveal();
    new TestimonialSlider();
    const toast = new Toast();
    new FormValidator(document.getElementById('contactForm'), toast);
    document.getElementById('year').textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', () => App.init());