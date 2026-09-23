/* ==========================================================
   VLM MUSIC ACADEMY — script.js
   All data is stored in localStorage (offline, on-device).
   ========================================================== */
(function () {
  'use strict';

  const STORAGE_KEY = 'vlm_academy_data_v1';
  const SESSION_KEY = 'vlm_academy_session';
  const DEFAULT_PASS = 'vlm2024';

  /* ---------- Default logo (inline SVG data URI) ---------- */
  const LOGO_URI =
    "data:image/svg+xml;utf8," +
    "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
    "<stop offset='0' stop-color='%237C3AED'/>" +
    "<stop offset='0.55' stop-color='%23EC4899'/>" +
    "<stop offset='1' stop-color='%23FBBF24'/>" +
    "</linearGradient></defs>" +
    "<rect width='120' height='120' rx='30' fill='url(%23g)'/>" +
    "<path d='M48 84V42l30-7v42' stroke='white' stroke-width='7' fill='none' stroke-linecap='round' stroke-linejoin='round'/>" +
    "<circle cx='42' cy='84' r='9' fill='white'/>" +
    "<circle cx='72' cy='77' r='9' fill='white'/>" +
    "</svg>";

  /* ==========================================================
     DEFAULT DATA
     ========================================================== */
  const DEFAULT_DATA = {
    password: DEFAULT_PASS,
    business: {
      name: 'VLM Music Academy',
      tagline: 'Khayelitsha • Cape Town',
      phone: '+27828637824',
      whatsapp: '+27828637824',
      email: 'hello@vlmmusicacademy.co.za',
      hours: 'Mon – Sat: 08:00 – 19:00',
      address: 'Khayelitsha, Cape Town, South Africa',
      heroBadge: 'Khayelitsha • Cape Town • South Africa',
      heroTitle: 'Where Khayelitsha Finds Its Sound',
      heroSub:
        'Professional music lessons, studio recording, beat production and full artist ' +
        'development — taught by real industry professionals in the heart of Khayelitsha.',
      aboutTitle: 'More Than A Music School — A Movement',
      aboutText:
        'VLM Music Academy was born in Khayelitsha with one goal: to give young, hungry ' +
        'talent a real professional platform. From your very first lesson to your first ' +
        'recorded single, we walk the whole journey with you.'
    },
    images: {
      logo: LOGO_URI,
      heroImage:
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1800&q=80',
      aboutImage:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1100&q=80'
    },
    services: [
      {
        id: 's1',
        title: 'One-on-One Music Lessons',
        desc:
          'Private tuition in piano, guitar, bass or vocals. Personalised lesson plans, ' +
          'flexible times and steady progress at your own pace.',
        price: 'R450 / lesson',
        image:
          'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 's2',
        title: 'Group Classes & Workshops',
        desc:
          'Learn together and stay motivated. Small groups of 4–8 students, weekly ' +
          'sessions and a fun, supportive community vibe.',
        price: 'R250 / person',
        image:
          'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 's3',
        title: 'Professional Studio Recording',
        desc:
          'Record your track in a fully treated room with a professional engineer, ' +
          'top mics and full mixing included.',
        price: 'R600 / hour',
        image:
          'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 's4',
        title: 'Beat Production & Instrumentals',
        desc:
          'Custom beats built around your sound — Amapiano, Hip Hop, Afro-pop, Gospel ' +
          'and more. Stems included.',
        price: 'R1 200 / beat',
        image:
          'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 's5',
        title: 'Artist Development Programme',
        desc:
          'Monthly mentorship covering songwriting, performance, image, social media ' +
          'and release strategy for serious upcoming artists.',
        price: 'R2 500 / month',
        image:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 's6',
        title: 'Live Performance Coaching',
        desc:
          'Stage presence, microphone technique, breathing and crowd control — get ' +
          'performance-ready for your next show.',
        price: 'R800 / session',
        image:
          'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80'
      }
    ],
    gallery: [
      {
        id: 'g1',
        src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
        caption: 'Live recording session'
      },
      {
        id: 'g2',
        src: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=900&q=80',
        caption: 'Drum practical class'
      },
      {
        id: 'g3',
        src: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=900&q=80',
        caption: 'Vocal booth time'
      },
      {
        id: 'g4',
        src: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=900&q=80',
        caption: 'The mixing desk'
      },
      {
        id: 'g5',
        src: 'https://images.unsplash.com/photo-1571266028243-d220c9c3b2d2?auto=format&fit=crop&w=900&q=80',
        caption: 'DJ & production lab'
      },
      {
        id: 'g6',
        src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
        caption: 'Studio microphone setup'
      }
    ]
  };

  /* ==========================================================
     HELPERS
     ========================================================== */
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));

  function deepClone(o) {
    return JSON.parse(JSON.stringify(o));
  }

  function uid(prefix) {
    return (prefix || 'id') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function waLink(number, message) {
    const n = String(number || '').replace(/\D/g, '');
    return 'https://wa.me/' + n + '?text=' + encodeURIComponent(message || '');
  }

  function telLink(number) {
    return 'tel:' + String(number || '').replace(/[^\d+]/g, '');
  }

  let toastTimer;
  function toast(msg, type) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'toast show ' + (type || '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.className = 'toast ' + (type || '');
    }, 3000);
  }

  /* ==========================================================
     STORAGE
     ========================================================== */
  function loadData() {
    let stored = null;
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      stored = null;
    }
    const base = deepClone(DEFAULT_DATA);
    if (!stored || typeof stored !== 'object') return base;

    return {
      password: stored.password || base.password,
      business: Object.assign({}, base.business, stored.business || {}),
      images: Object.assign({}, base.images, stored.images || {}),
      services: Array.isArray(stored.services) ? stored.services : base.services,
      gallery: Array.isArray(stored.gallery) ? stored.gallery : base.gallery
    };
  }

  let DATA = loadData();

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA));
      return true;
    } catch (e) {
      toast('Storage is full — try uploading smaller images.', 'error');
      return false;
    }
  }

  function saveAndRender() {
    if (saveData()) renderAll();
  }

  /* ==========================================================
     IMAGE COMPRESSION (keeps localStorage small)
     ========================================================== */
  function compressImage(file, maxW, quality) {
    maxW = maxW || 1400;
    quality = quality || 0.82;
    return new Promise(function (resolve, reject) {
      if (!file || !/^image\//.test(file.type)) {
        reject(new Error('Not an image file'));
        return;
      }
      const reader = new FileReader();
      reader.onload = function (ev) {
        const img = new Image();
        img.onload = function () {
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;
          if (!w || !h) {
            resolve(ev.target.result);
            return;
          }
          if (w > maxW) {
            h = Math.round((h * maxW) / w);
            w = maxW;
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#0B0614';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          try {
            resolve(canvas.toDataURL('image/jpeg', quality));
          } catch (err) {
            resolve(ev.target.result);
          }
        };
        img.onerror = function () {
          resolve(ev.target.result);
        };
        img.src = ev.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function readFiles(fileList, maxW, cb) {
    const files = Array.prototype.slice.call(fileList || []).filter(function (f) {
      return /^image\//.test(f.type);
    });
    if (!files.length) return;
    let done = 0;
    files.forEach(function (file) {
      compressImage(file, maxW)
        .then(function (dataUrl) {
          cb(dataUrl, file);
        })
        .catch(function () {
          toast('Could not read ' + file.name, 'error');
        })
        .then(function () {
          done++;
        });
    });
  }

  /* ==========================================================
     PUBLIC RENDERING
     ========================================================== */
  function setImg(el, src, fallbackText) {
    if (!el) return;
    el.onerror = function () {
      el.onerror = null;
      el.src =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(
          "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>" +
            "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
            "<stop offset='0' stop-color='#7C3AED'/><stop offset='1' stop-color='#EC4899'/>" +
            "</linearGradient></defs>" +
            "<rect width='800' height='600' fill='url(#g)'/>" +
            "<text x='400' y='310' font-family='Arial' font-size='34' fill='white' " +
            "text-anchor='middle'>" + (fallbackText || 'VLM Music Academy') + "</text></svg>"
        );
    };
    el.src = src || '';
  }

  function renderBusiness() {
    const b = DATA.business;

    // Brand
    $('#brandName').textContent = b.name;
    $('#brandTag').textContent = b.tagline;
    $('#adminBrandName').textContent = b.name;
    $('#footName').textContent = b.name;
    $('#footName2').textContent = b.name;
    $('#footTag').textContent = b.heroTitle;

    // Hero
    $('#heroBadge').textContent = b.heroBadge;
    $('#heroTitle').textContent = b.heroTitle;
    $('#heroSub').textContent = b.heroSub;

    // About
    $('#aboutTitle').textContent = b.aboutTitle;
    $('#aboutText').textContent = b.aboutText;

    // Contact cards
    $('#cPhoneText').textContent = b.phone;
    $('#cWaText').textContent = b.whatsapp;
    $('#cAddress').textContent = b.address;
    $('#cHours').textContent = b.hours;
    $('#cEmail').textContent = b.email;
    $('#footAddress').textContent = b.address;
    $('#footHours').textContent = b.hours;

    // Links
    const waMsg = 'Hi ' + b.name + '! I found you online and I would like to know more about your music services.';
    $('#heroWa').href = waLink(b.whatsapp, waMsg);
    $('#aboutWa').href = waLink(b.whatsapp, waMsg);
    $('#navWa').href = waLink(b.whatsapp, waMsg);
    $('#floatWa').href = waLink(b.whatsapp, waMsg);
    $('#cWa').href = waLink(b.whatsapp, waMsg);
    $('#footWa').href = waLink(b.whatsapp, waMsg);

    $('#heroCall').href = telLink(b.phone);
    $('#cPhone').href = telLink(b.phone);
    $('#footPhone').href = telLink(b.phone);
    $('#footPhone').textContent = b.phone;

    $('#cMail').href = 'mailto:' + b.email;
    $('#footMail').href = 'mailto:' + b.email;
    $('#footMail').textContent = b.email;

    $('#year').textContent = new Date().getFullYear();

    // Service dropdown in contact form
    const sel = $('#fService');
    const current = sel.value;
    sel.innerHTML = DATA.services
      .map(function (s) {
        return '<option value="' + esc(s.title) + '">' + esc(s.title) + '</option>';
      })
      .join('') + '<option value="General enquiry">General enquiry</option>';
    if (current) sel.value = current;
  }

  function renderImages() {
    const im = DATA.images;
    const logo = im.logo || LOGO_URI;

    ['#brandLogo', '#footLogo', '#adminLogo', '#loginLogo'].forEach(function (id) {
      const el = $(id);
      if (el) el.src = logo;
    });

    const heroBg = $('#heroBg');
    if (heroBg) heroBg.style.backgroundImage = 'url("' + (im.heroImage || '') + '")';

    setImg($('#aboutImage'), im.aboutImage, 'VLM Music Academy');
  }

  function renderServices() {
    const grid = $('#servicesGrid');
    if (!grid) return;

    if (!DATA.services.length) {
      grid.innerHTML =
        '<p style="grid-column:1/-1;text-align:center;color:#6B6480">' +
        'No services added yet. Add some from the Admin panel.</p>';
      return;
    }

    grid.innerHTML = DATA.services
      .map(function (s) {
        const msg =
          'Hi ' + DATA.business.name + '! 👋\n\n' +
          'I would like to enquire about: *' + s.title + '*\n' +
          'Price listed: ' + s.price + '\n\n' +
          'Please send me more information about booking. Thank you!';

        return (
          '<article class="service-card reveal">' +
            '<div class="sc-media">' +
              '<img src="' + esc(s.image || '') + '" alt="' + esc(s.title) + '" ' +
                'onerror="this.onerror=null;this.src=\'' + LOGO_URI + '\';this.style.opacity=.25">' +
              '<span class="sc-price">' + esc(s.price) + '</span>' +
            '</div>' +
            '<div class="sc-body">' +
              '<h3>' + esc(s.title) + '</h3>' +
              '<p>' + esc(s.desc) + '</p>' +
              '<a class="btn btn-wa sc-btn" target="_blank" rel="noopener" href="' +
                waLink(DATA.business.whatsapp, msg) + '">' +
                '<svg class="ic"><use href="#i-wa"/></svg> Enquire on WhatsApp' +
              '</a>' +
            '</div>' +
          '</article>'
        );
      })
      .join('');
  }

  function renderGallery() {
    const grid = $('#galleryGrid');
    if (!grid) return;

    if (!DATA.gallery.length) {
      grid.innerHTML =
        '<p style="grid-column:1/-1;text-align:center;color:#6B6480">' +
        'No photos yet. Upload some from the Admin panel.</p>';
      return;
    }

    grid.innerHTML = DATA.gallery
      .map(function (g, i) {
        return (
          '<figure class="gal-item reveal" data-index="' + i + '">' +
            '<img src="' + esc(g.src) + '" alt="' + esc(g.caption || 'Gallery photo') + '" loading="lazy" ' +
              'onerror="this.onerror=null;this.src=\'' + LOGO_URI + '\';this.style.opacity=.3">' +
            (g.caption ? '<figcaption class="gal-cap">' + esc(g.caption) + '</figcaption>' : '') +
          '</figure>'
        );
      })
      .join('');
  }

  function renderAll() {
    renderBusiness();
    renderImages();
    renderServices();
    renderGallery();
    observeReveals();
  }

  /* ==========================================================
     NAVIGATION
     ========================================================== */
  function initNav() {
    const header = $('#siteHeader');
    const hamburger = $('#hamburger');
    const navLinks = $('#navLinks');

    function onScroll() {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');

      // active link
      const sections = ['home', 'about', 'services', 'gallery', 'contact'];
      let current = 'home';
      sections.forEach(function (id) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = id;
      });
      $$('.nav-link[href^="#"]').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    hamburger.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });

    $$('.nav-links a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================
     REVEAL ON SCROLL
     ========================================================== */
  let revealObserver = null;
  function observeReveals() {
    const items = $$('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('in');
      });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
    }
    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
      revealObserver.observe(el);
    });
  }

  /* ==========================================================
     LIGHTBOX
     ========================================================== */
  let lbIndex = 0;
  function openLightbox(i) {
    lbIndex = i;
    const lb = $('#lightbox');
    const item = DATA.gallery[lbIndex];
    if (!item) return;
    $('#lbImg').src = item.src;
    $('#lbCap').textContent = item.caption || '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    const lb = $('#lightbox');
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function moveLightbox(dir) {
    if (!DATA.gallery.length) return;
    lbIndex = (lbIndex + dir + DATA.gallery.length) % DATA.gallery.length;
    const item = DATA.gallery[lbIndex];
    const img = $('#lbImg');
    img.style.opacity = '0';
    setTimeout(function () {
      img.src = item.src;
      $('#lbCap').textContent = item.caption || '';
      img.style.opacity = '1';
    }, 130);
  }
  function initLightbox() {
    $('#lbImg').style.transition = 'opacity .13s ease';

    document.addEventListener('click', function (e) {
      const item = e.target.closest('.gal-item');
      if (item) openLightbox(parseInt(item.dataset.index, 10) || 0);
    });

    $('#lbClose').addEventListener('click', closeLightbox);
    $('#lbPrev').addEventListener('click', function (e) {
      e.stopPropagation();
      moveLightbox(-1);
    });
    $('#lbNext').addEventListener('click', function (e) {
      e.stopPropagation();
      moveLightbox(1);
    });
    $('#lightbox').addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!$('#lightbox').classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') moveLightbox(-1);
      if (e.key === 'ArrowRight') moveLightbox(1);
    });
  }

  /* ==========================================================
     CONTACT FORM
     ========================================================== */
  function initContactForm() {
    $('#contactForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const name = $('#fName').value.trim();
      const phone = $('#fPhone').value.trim();
      const service = $('#fService').value;
      const msg = $('#fMsg').value.trim();

      if (!name) {
        toast('Please enter your name.', 'error');
        return;
      }

      let text = 'Hi ' + DATA.business.name + '! 👋\n\n';
      text += '*Name:* ' + name + '\n';
      if (phone) text += '*Phone:* ' + phone + '\n';
      text += '*Service:* ' + service + '\n';
      if (msg) text += '\n*Message:*\n' + msg;

      window.open(waLink(DATA.business.whatsapp, text), '_blank');
      toast('Opening WhatsApp…', 'success');
    });
  }

  /* ==========================================================
     LOGIN
     ========================================================== */
  function openLogin() {
    const ov = $('#loginOverlay');
    ov.classList.add('open');
    ov.setAttribute('aria-hidden', 'false');
    $('#loginError').classList.remove('show');
    $('#loginPass').value = '';
    setTimeout(function () {
      $('#loginPass').focus();
    }, 120);
  }
  function closeLogin() {
    const ov = $('#loginOverlay');
    ov.classList.remove('open');
    ov.setAttribute('aria-hidden', 'true');
  }

  function initLogin() {
    $('#loginHint').innerHTML =
      'Default password: <strong>' + DEFAULT_PASS + '</strong> — change it in Settings.';

    $('#navAdmin').addEventListener('click', openLogin);
    $('#footAdmin').addEventListener('click', openLogin);
    $('#loginClose').addEventListener('click', closeLogin);
    $('#loginOverlay').addEventListener('click', function (e) {
      if (e.target === this) closeLogin();
    });

    $('#loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const pass = $('#loginPass').value;
      if (pass === DATA.password) {
        closeLogin();
        openAdmin();
        toast('Welcome back, Admin.', 'success');
      } else {
        $('#loginError').classList.add('show');
        $('#loginPass').value = '';
        $('#loginPass').focus();
      }
    });

    // restore session
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') openAdmin();
    } catch (e) {}
  }

  /* ==========================================================
     ADMIN — OPEN / CLOSE / TABS
     ========================================================== */
  function openAdmin() {
    const shell = $('#adminShell');
    shell.classList.add('open');
    shell.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch (e) {}
    renderAdmin();
  }
  function closeAdmin() {
    const shell = $('#adminShell');
    shell.classList.remove('open');
    shell.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initAdmin() {
    $('#adminClose').addEventListener('click', closeAdmin);
    $('#adminViewSite').addEventListener('click', closeAdmin);
    $('#adminLogout').addEventListener('click', function () {
      try {
        sessionStorage.removeItem(SESSION_KEY);
      } catch (e) {}
      closeAdmin();
      toast('Logged out.');
    });

    $$('.admin-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        $$('.admin-tab').forEach(function (t) {
          t.classList.remove('active');
        });
        $$('.admin-panel').forEach(function (p) {
          p.classList.remove('active');
        });
        tab.classList.add('active');
        const panel = $('.admin-panel[data-panel="' + tab.dataset.tab + '"]');
        if (panel) panel.classList.add('active');
      });
    });

    initAdminServices();
    initAdminGallery();
    initBranding();
    initBusinessForm();
    initSettings();
  }

  function renderAdmin() {
    renderAdminServices();
    renderAdminGallery();
    renderBrandPreviews();
    fillBusinessForm();
  }

  /* ==========================================================
     ADMIN — SERVICES CRUD
     ========================================================== */
  function renderAdminServices() {
    const wrap = $('#adminServices');
    if (!wrap) return;

    if (!DATA.services.length) {
      wrap.innerHTML =
        '<p class="muted" style="text-align:center;padding:2rem">' +
        'No services yet. Click “Add Service” to create your first one.</p>';
      return;
    }

    wrap.innerHTML = DATA.services
      .map(function (s, i) {
        return (
          '<div class="adm-card" data-id="' + s.id + '">' +
            '<div class="adm-card-img" data-role="svc-image" title="Click to change image">' +
              '<img src="' + esc(s.image || '') + '" alt="" ' +
                'onerror="this.onerror=null;this.src=\'' + LOGO_URI + '\';this.style.opacity=.3">' +
              '<span class="dz-hint"><svg class="ic"><use href="#i-upload"/></svg>Change image</span>' +
            '</div>' +
            '<div class="adm-fields">' +
              '<div class="adm-field">' +
                '<label>Service Title</label>' +
                '<input type="text" data-field="title" value="' + esc(s.title) + '" placeholder="Service name">' +
              '</div>' +
              '<div class="adm-field">' +
                '<label>Description</label>' +
                '<textarea data-field="desc" rows="3" placeholder="What is included...">' + esc(s.desc) + '</textarea>' +
              '</div>' +
              '<div class="adm-row">' +
                '<div class="adm-field">' +
                  '<label>Price</label>' +
                  '<input type="text" data-field="price" value="' + esc(s.price) + '" placeholder="R450 / lesson">' +
                '</div>' +
                '<div class="adm-field">' +
                  '<label>Position</label>' +
                  '<input type="text" value="#" readonly style="background:#F5F2FC;color:#6B6480">' +
                '</div>' +
              '</div>' +
              '<div class="adm-card-foot">' +
                '<span class="pill">Service ' + (i + 1) + '</span>' +
                '<button class="btn-sm ghost" data-act="up" style="background:#F1ECFA;color:#7C3AED">↑ Move Up</button>' +
                '<button class="btn-sm ghost" data-act="del" style="background:#FEECEC;color:#DC2626">' +
                  'Delete</button>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      })
      .join('');

    // Bind events
    $$('#adminServices .adm-card').forEach(function (card) {
      const id = card.dataset.id;

      // live text editing
      $$('[data-field]', card).forEach(function (input) {
        input.addEventListener('input', function () {
          const svc = DATA.services.find(function (x) {
            return x.id === id;
          });
          if (!svc) return;
          svc[input.dataset.field] = input.value;
          saveData();
        });
        input.addEventListener('blur', function () {
          renderServices();
          observeReveals();
          const sel = $('#fService');
          if (sel) {
            const cur = sel.value;
            renderBusiness();
            sel.value = cur;
          }
        });
      });

      // image dropzone
      const imgBox = $('[data-role="svc-image"]', card);
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.hidden = true;
      imgBox.appendChild(fileInput);

      imgBox.addEventListener('click', function () {
        fileInput.click();
      });
      fileInput.addEventListener('change', function () {
        readFiles(fileInput.files, 900, function (dataUrl) {
          const svc = DATA.services.find(function (x) {
            return x.id === id;
          });
          if (!svc) return;
          svc.image = dataUrl;
          saveAndRender();
          renderAdminServices();
          toast('Service image updated.', 'success');
        });
        fileInput.value = '';
      });

      ['dragenter', 'dragover'].forEach(function (ev) {
        imgBox.addEventListener(ev, function (e) {
          e.preventDefault();
          imgBox.style.outline = '3px solid #EC4899';
        });
      });
      ['dragleave', 'drop'].forEach(function (ev) {
        imgBox.addEventListener(ev, function (e) {
          e.preventDefault();
          imgBox.style.outline = '';
        });
      });
      imgBox.addEventListener('drop', function (e) {
        e.preventDefault();
        readFiles(e.dataTransfer.files, 900, function (dataUrl) {
          const svc = DATA.services.find(function (x) {
            return x.id === id;
          });
          if (!svc) return;
          svc.image = dataUrl;
          saveAndRender();
          renderAdminServices();
          toast('Service image updated.', 'success');
        });
      });

      // actions
      $$('[data-act]', card).forEach(function (btn) {
        btn.addEventListener('click', function () {
          const idx = DATA.services.findIndex(function (x) {
            return x.id === id;
          });
          if (idx < 0) return;

          if (btn.dataset.act === 'del') {
            if (!confirm('Delete this service?')) return;
            DATA.services.splice(idx, 1);
            saveAndRender();
            renderAdminServices();
            toast('Service deleted.');
          }

          if (btn.dataset.act === 'up') {
            if (idx === 0) return;
            const tmp = DATA.services[idx - 1];
            DATA.services[idx - 1] = DATA.services[idx];
            DATA.services[idx] = tmp;
            saveAndRender();
            renderAdminServices();
          }
        });
      });
    });
  }

  function initAdminServices() {
    $('#addServiceBtn').addEventListener('click', function () {
      DATA.services.push({
        id: uid('svc'),
        title: 'New Service',
        desc: 'Describe what this service includes...',
        price: 'R0',
        image: LOGO_URI
      });
      saveAndRender();
      renderAdminServices();
      toast('Service added. Edit the details below.', 'success');
      const wrap = $('#adminServices');
      if (wrap.lastElementChild) {
        wrap.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ==========================================================
     ADMIN — GALLERY
     ========================================================== */
  function renderAdminGallery() {
    const wrap = $('#adminGallery');
    if (!wrap) return;

    if (!DATA.gallery.length) {
      wrap.innerHTML =
        '<p class="muted" style="grid-column:1/-1;text-align:center;padding:1.5rem">' +
        'No gallery photos yet. Drop some images above.</p>';
      return;
    }

    wrap.innerHTML = DATA.gallery
      .map(function (g) {
        return (
          '<div class="adm-gal-item" data-id="' + g.id + '">' +
            '<img src="' + esc(g.src) + '" alt="" ' +
              'onerror="this.onerror=null;this.src=\'' + LOGO_URI + '\';this.style.opacity=.3">' +
            '<div class="adm-gal-body">' +
              '<input type="text" data-cap value="' + esc(g.caption || '') + '" placeholder="Caption">' +
              '<button class="btn-sm" data-del>Delete</button>' +
            '</div>' +
          '</div>'
        );
      })
      .join('');

    $$('#adminGallery .adm-gal-item').forEach(function (item) {
      const id = item.dataset.id;

      $('[data-cap]', item).addEventListener('input', function () {
        const g = DATA.gallery.find(function (x) {
          return x.id === id;
        });
        if (!g) return;
        g.caption = this.value;
        saveData();
        renderGallery();
        observeReveals();
      });

      $('[data-del]', item).addEventListener('click', function () {
        if (!confirm('Remove this photo from the gallery?')) return;
        DATA.gallery = DATA.gallery.filter(function (x) {
          return x.id !== id;
        });
        saveAndRender();
        renderAdminGallery();
        toast('Photo removed.');
      });
    });
  }

  function setupDropzone(zoneEl, inputEl, onFiles) {
    zoneEl.addEventListener('click', function () {
      inputEl.click();
    });

    inputEl.addEventListener('change', function () {
      onFiles(inputEl.files);
      inputEl.value = '';
    });

    ['dragenter', 'dragover'].forEach(function (ev) {
      zoneEl.addEventListener(ev, function (e) {
        e.preventDefault();
        e.stopPropagation();
        zoneEl.classList.add('drag');
      });
    });

    ['dragleave', 'drop'].forEach(function (ev) {
      zoneEl.addEventListener(ev, function (e) {
        e.preventDefault();
        e.stopPropagation();
        zoneEl.classList.remove('drag');
      });
    });

    zoneEl.addEventListener('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
      onFiles(e.dataTransfer.files);
    });
  }

  function initAdminGallery() {
    setupDropzone($('#galleryDrop'), $('#galleryInput'), function (files) {
      readFiles(files, 1200, function (dataUrl) {
        DATA.gallery.push({ id: uid('gal'), src: dataUrl, caption: '' });
        saveAndRender();
        renderAdminGallery();
        toast('Photo added to gallery.', 'success');
      });
    });
  }

  /* ==========================================================
     ADMIN — BRANDING (logo / hero / about)
     ========================================================== */
  function renderBrandPreviews() {
    setImg($('#logoPreview'), DATA.images.logo, 'Logo');
    setImg($('#heroPreview'), DATA.images.heroImage, 'Hero');
    setImg($('#aboutPreview'), DATA.images.aboutImage, 'About');
  }

  function initBranding() {
    setupDropzone($('#logoDrop'), $('#logoInput'), function (files) {
      readFiles(files, 400, function (dataUrl) {
        DATA.images.logo = dataUrl;
        saveAndRender();
        renderBrandPreviews();
        toast('Logo updated.', 'success');
      });
    });

    setupDropzone($('#heroDrop'), $('#heroInput'), function (files) {
      readFiles(files, 1800, function (dataUrl) {
        DATA.images.heroImage = dataUrl;
        saveAndRender();
        renderBrandPreviews();
        toast('Hero background updated.', 'success');
      });
    });

    setupDropzone($('#aboutDrop'), $('#aboutInput'), function (files) {
      readFiles(files, 1400, function (dataUrl) {
        DATA.images.aboutImage = dataUrl;
        saveAndRender();
        renderBrandPreviews();
        toast('About image updated.', 'success');
      });
    });

    $$('[data-reset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.dataset.reset;
        if (!confirm('Reset this image to the default?')) return;
        DATA.images[key] = DEFAULT_DATA.images[key];
        saveAndRender();
        renderBrandPreviews();
        toast('Image reset to default.');
      });
    });
  }

  /* ==========================================================
     ADMIN — BUSINESS INFO
     ========================================================== */
  function fillBusinessForm() {
    $$('#businessForm [data-biz]').forEach(function (input) {
      const key = input.dataset.biz;
      input.value = DATA.business[key] != null ? DATA.business[key] : '';
    });
  }

  function initBusinessForm() {
    $$('#businessForm [data-biz]').forEach(function (input) {
      input.addEventListener('input', function () {
        DATA.business[input.dataset.biz] = input.value;
        saveData();
        renderBusiness();
        const sel = $('#fService');
        if (sel) {
          const cur = sel.value;
          renderBusiness();
          sel.value = cur;
        }
      });
    });
  }

  /* ==========================================================
     ADMIN — SETTINGS
     ========================================================== */
  function initSettings() {
    // Change password
    $('#savePassBtn').addEventListener('click', function () {
      const p1 = $('#newPass').value;
      const p2 = $('#newPass2').value;
      if (!p1 || p1.length < 4) {
        toast('Password must be at least 4 characters.', 'error');
        return;
      }
      if (p1 !== p2) {
        toast('Passwords do not match.', 'error');
        return;
      }
      DATA.password = p1;
      saveData();
      $('#newPass').value = '';
      $('#newPass2').value = '';
      $('#loginHint').innerHTML =
        'Password changed. Keep it safe — it is stored on this device only.';
      toast('Admin password updated.', 'success');
    });

    // Export
    $('#exportBtn').addEventListener('click', function () {
      const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vlm-music-academy-backup-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 1000);
      toast('Backup downloaded.', 'success');
    });

    // Import
    $('#importBtn').addEventListener('click', function () {
      $('#importInput').click();
    });
    $('#importInput').addEventListener('change', function () {
      const file = this.files && this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const parsed = JSON.parse(e.target.result);
          if (!parsed || typeof parsed !== 'object') throw new Error('bad');
          DATA = {
            password: parsed.password || DATA.password,
            business: Object.assign({}, DEFAULT_DATA.business, parsed.business || {}),
            images: Object.assign({}, DEFAULT_DATA.images, parsed.images || {}),
            services: Array.isArray(parsed.services) ? parsed.services : [],
            gallery: Array.isArray(parsed.gallery) ? parsed.gallery : []
          };
          saveData();
          renderAll();
          renderAdmin();
          toast('Backup restored successfully.', 'success');
        } catch (err) {
          toast('That file could not be read.', 'error');
        }
      };
      reader.readAsText(file);
      this.value = '';
    });

    // Reset everything
    $('#resetAllBtn').addEventListener('click', function () {
      if (!confirm('This will delete ALL your changes and restore the original content. Continue?')) return;
      if (!confirm('Are you absolutely sure? This cannot be undone.')) return;
      DATA = deepClone(DEFAULT_DATA);
      saveData();
      renderAll();
      renderAdmin();
      toast('Everything has been reset.', 'success');
    });
  }

  /* ==========================================================
     BOOT
     ========================================================== */
  function init() {
    renderAll();
    initNav();
    initLightbox();
    initContactForm();
    initLogin();
    initAdmin();

    // Esc closes overlays
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if ($('#loginOverlay').classList.contains('open')) closeLogin();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();