/* ═══════════════════════════════════════════════════════════
   EREN · AI EDGERUNNERS · app.js
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── UTILS ───────────────────────────────────────────────
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ── FILM GRAIN ──────────────────────────────────────────
  function initGrain() {
    const canvas = $('#grain');
    const ctx = canvas.getContext('2d');
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    function draw() {
      const w = canvas.width, h = canvas.height;
      const img = ctx.createImageData(w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255 | 0;
        d[i] = d[i+1] = d[i+2] = v; d[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);
    setInterval(draw, 125); // 8fps
    draw();
  }

  // ── CUSTOM CURSOR ───────────────────────────────────────
  function initCursor() {
    const cursor = $('#cursor');
    const ring = $('#cursor-ring');
    const label = $('#cursor-label');
    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function tick() {
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      label.style.left = mx + 'px';
      label.style.top  = my + 'px';
      requestAnimationFrame(tick);
    }
    tick();

    document.addEventListener('mouseover', e => {
      const el = e.target;
      const isClickable = el.closest('button,a,[tabindex],[data-url],.loop-y,.loop-n,.footer-eof,.copy-btn');
      const isVideo = el.closest('.video-card');
      const isPortfolio = el.closest('.portfolio-item');

      ring.classList.toggle('active', !!isClickable);

      if (isVideo) {
        label.textContent = '→ WATCH';
        label.classList.add('visible');
      } else if (isPortfolio) {
        label.textContent = '→ VIEW ON DOUYIN';
        label.classList.add('visible');
      } else {
        label.classList.remove('visible');
      }
    });
  }

  // ── LOADING SCREEN ──────────────────────────────────────
  function initLoading() {
    const screen = $('#loading-screen');
    const bar = $('#loading-bar');
    const pct = $('#loading-pct');
    const timer = $('#loading-timer');
    const BARS = 10;
    const FILLED = '▓', EMPTY = '░';
    let progress = 0;
    let done = false;
    const start = Date.now();

    function updateTimer() {
      const ms = Date.now() - start;
      const s = Math.floor(ms / 1000);
      const m = Math.floor(s / 60);
      const h = Math.floor(m / 60);
      const fms = String(ms % 1000).padStart(3, '0');
      const fs = String(s % 60).padStart(2, '0');
      const fm = String(m % 60).padStart(2, '0');
      const fh = String(h).padStart(2, '0');
      timer.textContent = `[${fh}:${fm}:${fs}.${fms}]`;
    }

    const timerInterval = setInterval(updateTimer, 33);

    function setProgress(p) {
      progress = Math.min(p, 100);
      const filled = Math.round(progress / 100 * BARS);
      bar.textContent = FILLED.repeat(filled) + EMPTY.repeat(BARS - filled);
      pct.textContent = Math.round(progress) + '%';
    }

    async function finish() {
      if (done) return;
      done = true;
      clearInterval(timerInterval);
      setProgress(100);
      await sleep(200);
      // glitch burst
      screen.style.filter = 'brightness(3) saturate(0)';
      await sleep(60);
      screen.style.filter = 'none';
      screen.style.opacity = '0';
      await sleep(300);
      screen.style.display = 'none';
      const site = $('#site');
      site.classList.add('ready');
      startSite();
    }

    // Animate progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 4 + 1;
      setProgress(prog);
      if (prog >= 100) { clearInterval(interval); finish(); }
    }, 80);

    // Skip
    const skipHandler = () => finish();
    document.addEventListener('keydown', skipHandler, { once: true });
    document.addEventListener('click', skipHandler, { once: true });
  }

  // ── INSOMNIA MODE ───────────────────────────────────────
  function initInsomniaMode() {
    const h = new Date().getHours();
    if (h >= 23 || h < 5) {
      document.body.classList.add('insomnia');
    }
  }

  // ── IDLE MODE ────────────────────────────────────────────
  function initIdleMode() {
    const overlay = $('#idle-overlay');
    const dtEl = $('#idle-datetime');
    let idleTimer = null;
    let idleDtInterval = null;

    function updateIdleDt() {
      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      const date = `${now.getFullYear()}.${pad(now.getMonth()+1)}.${pad(now.getDate())}`;
      const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      dtEl.textContent = `${date}  ${time}  CHANGHUA, TW`;
    }

    function activateIdle() {
      overlay.classList.add('visible');
      updateIdleDt();
      idleDtInterval = setInterval(updateIdleDt, 1000);
      // Increase grain opacity
      $('#grain').style.opacity = '0.10';
    }

    function deactivateIdle() {
      overlay.classList.remove('visible');
      clearInterval(idleDtInterval);
      $('#grain').style.opacity = '0.06';
      // 1 frame glitch
      document.body.classList.add('glitch-active');
      setTimeout(() => document.body.classList.remove('glitch-active'), 80);
    }

    function resetIdle() {
      if (overlay.classList.contains('visible')) deactivateIdle();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(activateIdle, 8000);
    }

    ['mousemove','keydown','scroll','click','touchstart'].forEach(ev =>
      document.addEventListener(ev, resetIdle, { passive: true })
    );
    resetIdle();
  }

  // ── VHS TRANSITION ──────────────────────────────────────
  async function vhsTransition(cb) {
    const overlay = $('#vhs-overlay');
    overlay.style.transform = 'scaleY(0)';
    overlay.style.transition = 'transform 180ms cubic-bezier(0.65,0,0.35,1)';
    overlay.style.pointerEvents = 'all';
    await sleep(20);
    overlay.style.transform = 'scaleY(1)';
    await sleep(200);
    if (cb) cb();
    await sleep(80);
    overlay.style.transition = 'transform 200ms cubic-bezier(0.65,0,0.35,1)';
    overlay.style.transform = 'scaleY(0)';
    await sleep(220);
    overlay.style.pointerEvents = 'none';
  }

  // ── HERO TYPEWRITER ──────────────────────────────────────
  async function heroTypewriter() {
    const lines = ['The world', 'AI represents', 'Everything!'];
    const els = ['#ht-line1', '#ht-line2', '#ht-line3'];

    for (let i = 0; i < lines.length; i++) {
      const el = $(els[i]);
      const line = lines[i];
      for (let c = 0; c < line.length; c++) {
        el.textContent += line[c];
        await sleep(40);
      }
      if (i < lines.length - 1) await sleep(80);
    }
    // Glitch on "!"
    await sleep(200);
    const title = $('#hero-title');
    title.style.filter = 'hue-rotate(90deg) brightness(2)';
    await sleep(60);
    title.style.filter = 'none';
  }

  // ── HERO SUBTITLE PARALLAX ───────────────────────────────
  function initHeroParallax() {
    const subtitle = $('#hero-subtitle');
    const hero = $('#hero');
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.width / 2, cy = rect.height / 2;
      const dx = (e.clientX - rect.left - cx) / cx;
      const dy = (e.clientY - rect.top  - cy) / cy;
      subtitle.style.transform = `translate(${dx * 12}px, ${dy * 6}px)`;
    });
    hero.addEventListener('mouseleave', () => {
      subtitle.style.transform = 'translate(0,0)';
    });
  }

  // ── HERO "Everything" glitch hover ───────────────────────
  function initHeroGlitch() {
    const el = $('#ht-line3');
    const CHARS = '!@#$%&*<>?/\\|[]{}ABCDEFabcdef0123456789';
    let glitching = false;
    el.addEventListener('mouseenter', async () => {
      if (glitching) return;
      glitching = true;
      const orig = el.textContent;
      for (let i = 0; i < 6; i++) {
        el.textContent = orig.split('').map(() =>
          CHARS[Math.random() * CHARS.length | 0]
        ).join('');
        await sleep(30);
      }
      el.textContent = orig;
      glitching = false;
    });
  }

  // ── MENU DROPDOWN ────────────────────────────────────────
  function initMenu() {
    const btn = $('#menu-btn');
    const dropdown = $('#menu-dropdown');

    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      if (!isOpen) {
        // CRT channel switch flash
        const flash = document.createElement('div');
        flash.style.cssText = 'position:fixed;inset:0;z-index:9400;background:rgba(255,255,255,0.06);pointer-events:none;';
        document.body.appendChild(flash);
        await sleep(80);
        flash.remove();
        dropdown.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });

    // Smooth scroll for menu links
    $$('#menu-dropdown a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        dropdown.classList.remove('open');
        const target = $(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // VISITOR LOG - VHS transition
    $('#visitor-log-btn').addEventListener('click', e => {
      e.preventDefault();
      vhsTransition(() => { window.location.href = 'visitor-log.html'; });
    });

    // Topbar back REW
    $('.topbar-left').addEventListener('click', () => {
      vhsTransition(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    });
  }

  // ── ABOUT ME TYPEWRITER ───────────────────────────────────
  async function aboutTypewriter() {
    const container = $('#about-body');
    const text = `Hello, this is Eren — former short-video director,\nnow diving deep into AI.\n\nLet's do some cool things :)`;
    container.innerHTML = '';

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '\n') {
        container.appendChild(document.createElement('br'));
      } else {
        const span = document.createElement('span');
        span.textContent = ch;
        container.appendChild(span);
      }
      await sleep(55);
    }

    // Post-process: wrap interactive words
    const html = container.innerHTML;
    container.innerHTML = html
      .replace('former', '<span class="word-former">former<span class="former-date">[2019 – 2024]</span></span>')
      .replace('AI', '<span class="word-ai">AI</span>')
      .replace(':)', '<span class="cursor-blink">|</span>');
  }

  // ── ABOUT VISIBILITY TRIGGER ─────────────────────────────
  function initAboutObserver() {
    let triggered = false;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !triggered) {
        triggered = true;
        aboutTypewriter();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe($('#about'));
  }

  // ── REC TIMER ────────────────────────────────────────────
  function initRecTimer() {
    const el = $('#rec-timer');
    const start = Date.now();
    setInterval(() => {
      const ms = Date.now() - start;
      const s = Math.floor(ms / 1000) % 60;
      const m = Math.floor(ms / 60000) % 60;
      const h = Math.floor(ms / 3600000);
      const pad = n => String(n).padStart(2, '0');
      el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    }, 1000);
  }

  // ── PHOTO MASK SCROLL ─────────────────────────────────────
  function initPhotoMask() {
    const section = $('#photo-mask');
    const photo2  = $('#photo2');
    const fill    = $('#photo-fill');
    const lbl     = $('#photo-label');
    let glitched  = false;

    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const pct = Math.round(progress * 100);

      // Wave clip-path
      const wave = Math.sin(progress * Math.PI) * 10;
      photo2.style.clipPath = `polygon(0 ${100 - pct + wave}%, 100% ${100 - pct - wave}%, 100% 100%, 0 100%)`;
      fill.style.height = pct + '%';
      lbl.style.opacity = progress > 0.05 && progress < 0.98 ? '1' : '0';
      lbl.textContent = `TRANSFORMING... ${pct}%`;

      // 50% glitch moment
      if (progress > 0.48 && progress < 0.52 && !glitched) {
        glitched = true;
        section.style.filter = 'hue-rotate(180deg) brightness(1.5)';
        setTimeout(() => { section.style.filter = 'none'; glitched = false; }, 60);
      }
    }, { passive: true });
  }

  // ── SKILLS OBSERVER ──────────────────────────────────────
  function initSkillsObserver() {
    const items    = $$('.skill-item');
    const taglines = $$('.th-line');

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = +(entry.target.dataset.index || 0) * 100;
          setTimeout(() => entry.target.classList.add('in-view'), delay);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(item => obs.observe(item));
    taglines.forEach(tag => obs.observe(tag));
  }

  function initSkillsTilt() { /* removed — old card tilt */ }

  // ── PORTFOLIO HOVER ───────────────────────────────────────
  function initPortfolio() {
    const list    = $('#portfolio-list');
    const preview = $('#portfolio-preview');
    const previewSeal = $('#preview-seal');
    const previewImg  = $('#preview-actual-img');
    const items   = $$('.portfolio-item');

    document.addEventListener('mousemove', e => {
      preview.style.left = e.clientX + 'px';
      preview.style.top  = e.clientY + 'px';
      preview.style.transform = 'translate(30px, -50%)';
    });

    items.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        list.classList.add('has-hover');
        item.classList.add('hovered');
        preview.classList.add('visible');
        const imgSrc = item.dataset.img || '';
        if (imgSrc) previewImg.src = imgSrc;
        previewSeal.textContent = item.dataset.index;
      });
      item.addEventListener('mouseleave', () => {
        list.classList.remove('has-hover');
        item.classList.remove('hovered');
        preview.classList.remove('visible');
      });
      item.addEventListener('click', () => {
        vhsTransition(() => window.open(item.dataset.url, '_blank'));
      });
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter') window.open(item.dataset.url, '_blank');
      });
    });
  }

  // ── VIDEOS ────────────────────────────────────────────────
  function initVideos() {
    const modal      = $('#video-modal');
    const modalVideo = $('#modal-video');
    const cells      = $$('.video-card');

    cells.forEach(cell => {
      const bgVideo = cell.querySelector('.video-bg');

      // hover: play preview + desaturate off
      cell.addEventListener('mouseenter', () => {
        if (bgVideo) {
          bgVideo.style.filter = 'saturate(1)';
          bgVideo.currentTime = 0;
          bgVideo.play().catch(() => {});
        }
      });
      cell.addEventListener('mouseleave', () => {
        if (bgVideo) {
          bgVideo.style.filter = 'saturate(0.3)';
          bgVideo.pause();
        }
      });

      // click: open modal
      cell.addEventListener('click', () => {
        const src = cell.dataset.src;
        modalVideo.src = src;
        modal.classList.add('open');
        modalVideo.play().catch(() => {});
      });
    });

    // Close modal
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.closest('.modal-letterbox')) closeModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
      modal.classList.remove('open');
      modalVideo.pause();
      modalVideo.src = '';
    }
  }

  // ── FOOTER ────────────────────────────────────────────────
  function initFooter() {
    // Copy buttons
    $$('.copy-btn[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.dataset.copy).catch(() => {});
        btn.textContent = '[ COPIED ✓ ]';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = '[ COPY ]';
          btn.classList.remove('copied');
        }, 2000);
      });
    });

    // QR Show
    const qrBtn = $('#qr-show-btn');
    const qrModal = $('#qr-modal');
    qrBtn.addEventListener('click', () => qrModal.classList.add('open'));
    qrModal.addEventListener('click', e => {
      if (e.target === qrModal) qrModal.classList.remove('open');
    });

    // Footer rows appear
    const rows = $$('.footer-row');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = +(entry.target.dataset.delay || 0) * 150;
          setTimeout(() => entry.target.classList.add('in-view'), delay);
        }
      });
    }, { threshold: 0.5 });
    rows.forEach(r => obs.observe(r));

    // LOOP Y/N
    const loopY = $('#loop-y');
    const loopN = $('#loop-n');
    const goodNight = $('#good-night-msg');

    loopY.addEventListener('click', () => {
      // Rewind animation — fast scroll to top
      const duration = 750;
      const start = window.scrollY;
      const startTime = performance.now();
      function step(now) {
        const t = Math.min((now - startTime) / duration, 1);
        const ease = t < 0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
        window.scrollTo(0, start * (1 - ease));
        // chromatic shift proportional
        document.body.style.filter = `hue-rotate(${(1-t)*30}deg)`;
        if (t < 1) requestAnimationFrame(step);
        else document.body.style.filter = 'none';
      }
      requestAnimationFrame(step);
    });

    loopN.addEventListener('click', () => {
      goodNight.style.display = 'block';
      setTimeout(() => { goodNight.style.display = 'none'; }, 3000);
    });

    // EOF easter egg (3x click)
    let eofClicks = 0;
    let eofTimer = null;
    $('#footer-eof').addEventListener('click', () => {
      eofClicks++;
      clearTimeout(eofTimer);
      eofTimer = setTimeout(() => { eofClicks = 0; }, 2000);
      if (eofClicks >= 3) {
        eofClicks = 0;
        triggerRewindEasterEgg();
      }
    });
  }

  async function triggerRewindEasterEgg() {
    const overlay = $('#vhs-overlay');
    $('#vhs-text').textContent = '> REWINDING TAPE...';
    overlay.style.transform = 'scaleY(1)';
    overlay.style.transition = 'none';
    await sleep(800);
    window.scrollTo({ top: 0 });
    await sleep(200);
    overlay.style.transition = 'transform 200ms ease';
    overlay.style.transform = 'scaleY(0)';
    $('#vhs-text').textContent = '> SWITCHING TAPE...';
  }

  // ── SECTION STRIP OBSERVERS ───────────────────────────────
  function initSectionStrips() {
    $$('.section-strip').forEach(strip => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            strip.style.transform = 'translateY(0)';
            strip.style.opacity = '1';
          }
        });
      }, { threshold: 0.5 });
      strip.style.transform = 'translateY(-100%)';
      strip.style.opacity = '0';
      strip.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
      obs.observe(strip);
    });
  }

  // ── KONAMI CODE EASTER EGG ────────────────────────────────
  function initKonami() {
    const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let pos = 0;
    document.addEventListener('keydown', async e => {
      if (e.key === code[pos]) {
        pos++;
        if (pos === code.length) {
          pos = 0;
          await triggerKonamiEgg();
        }
      } else {
        pos = 0;
      }
    });
  }

  async function triggerKonamiEgg() {
    document.body.style.transition = 'filter 0.05s';
    const glitchMsg = document.createElement('div');
    glitchMsg.style.cssText = `position:fixed;bottom:3rem;left:50%;transform:translateX(-50%);
      font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--cy-cyan);
      z-index:9999;text-shadow:0 0 8px var(--cy-cyan);pointer-events:none;text-align:center;`;
    glitchMsg.textContent = '> CHEAT_CODE_ACCEPTED // 你也是同道中人';

    for (let i = 0; i < 20; i++) {
      document.body.style.filter = `hue-rotate(${Math.random()*360}deg) saturate(3) brightness(${1+Math.random()})`;
      await sleep(80);
    }
    document.body.style.filter = 'none';
    document.body.appendChild(glitchMsg);
    setTimeout(() => glitchMsg.remove(), 4000);
  }

  // ── HERO 30s IDLE SUBTITLE ───────────────────────────────
  function initHeroIdleCaption() {
    let heroTimer = null;
    const hero = $('#hero');
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        heroTimer = setTimeout(() => {
          const cap = document.createElement('div');
          cap.style.cssText = `position:absolute;bottom:6rem;right:2.5rem;
            font-family:'LXGW WenKai',serif;font-size:14px;color:var(--text-mute);
            text-align:right;line-height:1.8;pointer-events:none;z-index:2;
            animation:fadeInUp 1s ease forwards;`;
          cap.innerHTML = '他在等什么？<br><span style="font-family:\'JetBrains Mono\',monospace;font-size:12px;">What\'s he waiting for?</span>';
          hero.appendChild(cap);
          setTimeout(() => cap.remove(), 6000);
        }, 30000);
      } else {
        clearTimeout(heroTimer);
      }
    }, { threshold: 0.8 });

    const style = document.createElement('style');
    style.textContent = `@keyframes fadeInUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`;
    document.head.appendChild(style);
    obs.observe(hero);
  }

  // ── SCROLL BLUR ───────────────────────────────────────────
  function initScrollBlur() {
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
      $('#site').style.filter = 'blur(0.4px)';
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        $('#site').style.filter = 'none';
      }, 120);
    }, { passive: true });
  }

  // ── START SITE ────────────────────────────────────────────
  function startSite() {
    heroTypewriter().then(() => {
      initHeroGlitch();
    });
    initHeroParallax();
    initAboutObserver();
    initRecTimer();
    initPhotoMask();
    initSkillsObserver();
    initSkillsTilt();
    initPortfolio();
    initVideos();
    initFooter();
    initSectionStrips();
    initIdleMode();
    initKonami();
    initHeroIdleCaption();
    initScrollBlur();
    initMenu();
  }

  // ── BOOT ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initGrain();
    initCursor();
    initInsomniaMode();
    initLoading();
  });

})();
