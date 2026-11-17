/* ═══════════════════════════════════════════════════════════
   NAIL SALON LUDHIANA — interactions
   ═══════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Preloader ─────────────────────────────────────────── */
  const preloader = $("#preloader");
  const hidePreloader = () => {
    if (!preloader) return;
    preloader.classList.add("done");
    setTimeout(() => preloader.remove(), 700);
  };
  window.addEventListener("load", () => setTimeout(hidePreloader, reducedMotion ? 0 : 650));
  setTimeout(hidePreloader, 2600); // safety net

  /* ── Sidebar + topbar ──────────────────────────────────── */
  const sidebar = $("#sidebar");
  const topbar = $("#topbar");
  const burger = $("#burger");
  const backdrop = $("#backdrop");

  const setMenu = (open) => {
    if (!sidebar) return;
    sidebar.classList.toggle("open", open);
    topbar?.classList.toggle("open", open);
    burger?.setAttribute("aria-expanded", String(open));
    if (backdrop) backdrop.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  };

  burger?.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));
  backdrop?.addEventListener("click", () => setMenu(false));
  $$(".side-link, .side-book__row, .side-book__wa, .sidebar__brand").forEach((a) =>
    a.addEventListener("click", () => { if (window.innerWidth < 1200) setMenu(false); })
  );
  window.matchMedia("(min-width: 1200px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  /* ── Scroll progress ───────────────────────────────────── */
  const progress = $("#progress i");
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if (progress) progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Active section in sidebar ─────────────────────────── */
  const sideLinks = $$(".side-link");
  const watched = sideLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const linkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sideLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );
  watched.forEach((s) => linkObserver.observe(s));

  /* ── Live open / closed status (10 AM – 9 PM daily) ────── */
  const OPEN_MIN = 10 * 60;   // 10:00
  const CLOSE_MIN = 21 * 60;  // 21:00
  const fmt = (m) => {
    const h = Math.floor(m / 60), mm = m % 60;
    return `${h % 12 || 12}:${String(mm).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  };
  const stateEl = $("#openState");
  const detailEl = $("#openDetail");
  const dotEl = $("#openDot");
  const heroEl = $("#heroStatus");

  const updateStatus = () => {
    const n = new Date();
    const mins = n.getHours() * 60 + n.getMinutes();
    const open = mins >= OPEN_MIN && mins < CLOSE_MIN;
    if (stateEl) stateEl.textContent = open ? "Open now" : "Closed now";
    if (detailEl) detailEl.textContent = `Daily · ${fmt(OPEN_MIN)} – ${fmt(CLOSE_MIN)}`;
    if (dotEl) dotEl.classList.toggle("closed", !open);
    if (heroEl) heroEl.textContent = open ? `Open now · till ${fmt(CLOSE_MIN)}` : `Closed · opens ${fmt(OPEN_MIN)}`;
  };
  updateStatus();
  setInterval(updateStatus, 30000);

  /* ── Reveal on scroll ──────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  /* ── Animated counters ─────────────────────────────────── */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const dur = reducedMotion ? 0 : 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = dur ? Math.min((now - start) / dur, 1) : 1;
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  $$("[data-count]").forEach((el) => countObserver.observe(el));

  /* ── Hero collage: gentle pointer parallax ─────────────── */
  const visual = $("#heroVisual");
  if (visual && !reducedMotion && matchMedia("(pointer: fine)").matches) {
    const layers = $$(".arch", visual);
    const factors = [14, 8, 22];
    let raf = null;
    visual.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = visual.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach((el, i) => {
          const f = factors[i] ?? 10;
          el.style.translate = `${-x * f}px ${-y * f}px`;
        });
        raf = null;
      });
    });
    visual.addEventListener("pointerleave", () => {
      layers.forEach((el) => (el.style.translate = "0px 0px"));
    });
  }

  /* ── 3D tilt on service / step cards ──────────────────── */
  if (!reducedMotion && matchMedia("(pointer: fine)").matches) {
    $$(".card, .step").forEach((el) => {
      const lift = el.classList.contains("card") ? -8 : -6;
      el.addEventListener("pointermove", (e) => {
        if (el._tRaf) return;
        el._tRaf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform =
            `perspective(750px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(${lift}px)`;
          el._tRaf = null;
        });
      });
      el.addEventListener("pointerleave", () => {
        if (el._tRaf) { cancelAnimationFrame(el._tRaf); el._tRaf = null; }
        el.style.transform = "";
      });
    });
  }

  /* ── Reviews slider + autoplay ─────────────────────────── */
  const track = $("#sliderTrack");
  if (track) {
    const step = () => {
      const card = track.querySelector(".quote");
      return card ? card.getBoundingClientRect().width + 20 : 420;
    };
    const maxScroll = () => track.scrollWidth - track.clientWidth - 4;

    let timer = null;
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const play = () => {
      if (reducedMotion) return;
      stop();
      timer = setInterval(() => {
        if (track.scrollLeft >= maxScroll()) track.scrollTo({ left: 0, behavior: "smooth" });
        else track.scrollBy({ left: step(), behavior: "smooth" });
      }, 5000);
    };
    $("#sliderNext")?.addEventListener("click", () => { track.scrollBy({ left: step(), behavior: "smooth" }); });
    $("#sliderPrev")?.addEventListener("click", () => { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    track.addEventListener("pointerenter", stop);
    track.addEventListener("pointerleave", play);
    play();
  }

  /* ── FAQ accordion ─────────────────────────────────────── */
  $$(".faq__q").forEach((q) =>
    q.addEventListener("click", () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains("open");
      $$(".faq__item.open").forEach((i) => {
        i.classList.remove("open");
        $(".faq__a", i).style.maxHeight = "0px";
        $(".faq__q", i).setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        const a = $(".faq__a", item);
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    })
  );

  /* ── Gallery lightbox ──────────────────────────────────── */
  const lightbox = $("#lightbox");
  if (lightbox) {
    const img = $("#lightboxImg");
    const cap = $("#lightboxCap");
    const shots = $$(".shot");
    let index = 0;

    const show = (i) => {
      index = (i + shots.length) % shots.length;
      const shot = shots[index];
      const source = $("img", shot);
      img.src = source.currentSrc || source.src;
      img.alt = source.alt || "";
      cap.textContent = shot.dataset.cap || "";
    };
    const open = (i) => {
      show(i);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      $("#lightboxClose").focus();
    };
    const close = () => {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    };

    shots.forEach((shot, i) => shot.addEventListener("click", () => open(i)));
    $("#lightboxClose").addEventListener("click", close);
    $("#lightboxNext").addEventListener("click", () => show(index + 1));
    $("#lightboxPrev").addEventListener("click", () => show(index - 1));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (!lightbox.hidden) close();
        else if (sidebar?.classList.contains("open")) setMenu(false);
      }
      if (lightbox.hidden) return;
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "ArrowLeft") show(index - 1);
    });
  }

  /* ── Footer year ───────────────────────────────────────── */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
