/* =====================================================
   Duro Water Technologies - Main JavaScript
   ===================================================== */

(function () {
  'use strict';

  /* ---------- PAGE LOADER ---------- */
  window.addEventListener('load', function () {
    const loader = document.getElementById('page-loader');
    if (loader) {
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 800);
    }
  });

  /* ---------- AOS INIT ---------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: function () {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    });
  }

  /* ---------- STICKY HEADER ---------- */
  const navbar = document.querySelector('.navbar-duro');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-duro .nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
    // Hash links on homepage
    if (currentPage === 'index.html' || currentPage === '') {
      if (href && href.startsWith('index.html#')) {
        // leave as is
      }
    }
  });

  /* ---------- SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href*="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      let targetId = href;
      if (href.includes('#')) {
        const parts = href.split('#');
        const page = parts[0];
        const hash = parts[1];
        if (page && page !== '' && page !== currentPage && page !== 'index.html') return;
        targetId = '#' + hash;
      }

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
        window.scrollTo({ top: top, behavior: 'smooth' });

        // Close mobile menu
        const collapse = document.querySelector('.navbar-collapse.show');
        if (collapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(collapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  /* ---------- WATER BUBBLES ---------- */
  function createBubbles(container, count) {
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    for (let i = 0; i < count; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      const size = Math.random() * 40 + 10;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.animationDuration = (Math.random() * 8 + 6) + 's';
      bubble.style.animationDelay = (Math.random() * 5) + 's';
      container.appendChild(bubble);
    }
  }

  document.querySelectorAll('.bubbles').forEach(function (el) {
    createBubbles(el, 15);
  });

  /* ---------- RIPPLE EFFECT ---------- */
  document.querySelectorAll('.ripple').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(function () {
        ripple.remove();
      }, 600);
    });
  });

  /* ---------- ANIMATED COUNTERS ---------- */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const startVal = parseInt(el.textContent, 10) || 1;
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(startVal + (target - startVal) * eased);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        if (counters.length) {
          counters.forEach(animateCounter);
        } else if (entry.target.classList.contains('counter')) {
          animateCounter(entry.target);
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  document.querySelectorAll('.experience-badge .counter').forEach(function (el) {
    counterObserver.observe(el.closest('.experience-badge') || el);
  });

  /* ---------- BACK TO TOP ---------- */
  const backTop = document.querySelector('.float-btn.back-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backTop.classList.add('visible');
      } else {
        backTop.classList.remove('visible');
      }
    }, { passive: true });

    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- GALLERY FILTER ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          setTimeout(function () {
            item.style.transition = 'opacity 0.4s ease';
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---------- LIGHTBOX ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Gallery image';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- TESTIMONIALS SWIPER ---------- */
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-swiper')) {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }

  /* ---------- HERO IMAGE SLIDER ---------- */
  if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      slidesPerView: 1,
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 800,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.hero-swiper-pagination',
        clickable: true
      }
    });
  }

  /* ---------- CONTACT FORM ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      const email = document.getElementById('email');
      const service = document.getElementById('service');
      const message = document.getElementById('message');

      let valid = true;

      [name, phone, email, service, message].forEach(function (field) {
        if (!field) return;
        field.classList.remove('is-invalid');
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          valid = false;
        }
      });

      if (email && email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          email.classList.add('is-invalid');
          valid = false;
        }
      }

      if (phone && phone.value) {
        const phoneRegex = /^[\d\s+\-()]{7,15}$/;
        if (!phoneRegex.test(phone.value)) {
          phone.classList.add('is-invalid');
          valid = false;
        }
      }

      if (valid) {
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Message Sent!';
        btn.disabled = true;
        btn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

        setTimeout(function () {
          contactForm.reset();
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      }
    });
  }

  /* ---------- NEWSLETTER FORM ---------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        const btn = newsletterForm.querySelector('button');
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg"></i>';
        setTimeout(function () {
          input.value = '';
          btn.innerHTML = original;
        }, 2000);
      }
    });
  }

  /* ---------- LAZY LOADING IMAGES ---------- */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  } else {
    document.querySelectorAll('img[data-src]').forEach(function (img) {
      img.src = img.getAttribute('data-src');
    });
  }

  /* ---------- NAVBAR TOGGLE ARIA ---------- */
  const toggler = document.querySelector('.navbar-toggler');
  if (toggler) {
    toggler.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
    });
  }

})();
