/* ═══════════════════════════════════════════════════════════
   NAIL SALON LUDHIANA — booking page logic
   ═══════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ── Sidebar (drawer on mobile) ────────────────────────── */
  const sidebar = $("#sidebar");
  const topbar = $("#topbar");
  const backdrop = $("#backdrop");
  const burger = $("#burger");

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
  $$(".side-link, .side-book__row, .sidebar__brand").forEach((a) =>
    a.addEventListener("click", () => { if (window.innerWidth < 1200) setMenu(false); })
  );

  /* ── Live open / closed status (10 AM – 9 PM daily) ────── */
  const OPEN_MIN = 10 * 60;
  const CLOSE_MIN = 21 * 60;
  const fmt = (m) => {
    const h = Math.floor(m / 60), mm = m % 60;
    return `${h % 12 || 12}:${String(mm).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  };
  const stateEl = $("#openState");
  const detailEl = $("#openDetail");
  const dotEl = $("#openDot");
  const updateStatus = () => {
    const n = new Date();
    const mins = n.getHours() * 60 + n.getMinutes();
    const open = mins >= OPEN_MIN && mins < CLOSE_MIN;
    if (stateEl) stateEl.textContent = open ? "Open now" : "Closed now";
    if (detailEl) detailEl.textContent = `Daily · ${fmt(OPEN_MIN)} – ${fmt(CLOSE_MIN)}`;
    if (dotEl) dotEl.classList.toggle("closed", !open);
  };
  updateStatus();
  setInterval(updateStatus, 30000);

  /* ── Scroll progress ───────────────────────────────────── */
  const progress = $("#progress i");
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if (progress) progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Reveal animations ─────────────────────────────────── */
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

  /* ── Booking form ──────────────────────────────────────── */
  const form = $("#bookForm");
  if (!form) return;

  const dateInput = $("#fDate");
  const today = new Date();
  const iso = (d) => {
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  };
  dateInput.min = iso(today);

  // Preselect the service when arriving from a service page (?service=…)
  const svcParam = new URLSearchParams(location.search).get("service");
  if (svcParam) {
    const sel = $("#fService");
    const opt = [...sel.options].find((o) => o.text.trim().toLowerCase() === svcParam.trim().toLowerCase());
    if (opt) sel.value = opt.value;
  }

  const phoneDigits = (v) => v.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "").slice(-10);

  const mark = (field, bad) => field.closest(".field").classList.toggle("invalid", bad);

  const validate = () => {
    let ok = true;
    const branch = $("#fBranch");
    const service = $("#fService");
    const time = $("#fTime");
    const name = $("#fName");
    const phone = $("#fPhone");

    mark(branch, !branch.value); ok = ok && !!branch.value;
    mark(service, !service.value); ok = ok && !!service.value;

    const dateOk = dateInput.value && dateInput.value >= dateInput.min;
    mark(dateInput, !dateOk); ok = ok && dateOk;

    mark(time, !time.value); ok = ok && !!time.value;

    const nameOk = name.value.trim().length >= 2;
    mark(name, !nameOk); ok = ok && nameOk;

    const phoneOk = phoneDigits(phone.value).length === 10;
    mark(phone, !phoneOk); ok = ok && phoneOk;

    if (!ok) {
      const firstBad = $(".field.invalid input, .field.invalid select");
      firstBad?.focus();
      form.classList.add("shake");
      setTimeout(() => form.classList.remove("shake"), 500);
    }
    return ok;
  };

  const prettyDate = (v) => {
    const [y, m, d] = v.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  };

  const buildMessage = () => {
    const lines = [
      "Hi Nail Salon! I'd like to book an appointment:",
      `• Branch: ${$("#fBranch").value}`,
      `• Service: ${$("#fService").value}`,
      `• Date: ${prettyDate(dateInput.value)}`,
      `• Time: ${$("#fTime").value}`,
      `• Name: ${$("#fName").value.trim()}`,
      `• Phone: ${phoneDigits($("#fPhone").value)}`
    ];
    const notes = $("#fNotes").value.trim();
    if (notes) lines.push(`• Notes: ${notes}`);
    return lines.join("\n");
  };

  let lastWa = "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    const branch = $("#fBranch").value;
    const number = branch === "Ghumar Mandi" ? "919915691366" : "918557080366";
    const text = buildMessage();
    lastWa = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

    try { navigator.clipboard?.writeText(text); } catch (_) { }

    $("#successWa").href = lastWa;
    form.hidden = true;
    const card = $("#bookCard");
    const success = $("#bookSuccess");
    success.hidden = false;
    card.classList.add("done");
    window.open(lastWa, "_blank", "noopener");
  });

  // Clear error state as the user fixes fields
  $$("#bookForm input, #bookForm select, #bookForm textarea").forEach((el) =>
    el.addEventListener("input", () => el.closest(".field")?.classList.remove("invalid"))
  );

  $("#bookReset")?.addEventListener("click", () => {
    form.reset();
    $$(".field.invalid", form).forEach((f) => f.classList.remove("invalid"));
    $("#bookSuccess").hidden = true;
    form.hidden = false;
    $("#bookCard").classList.remove("done");
    $("#fBranch").focus();
  });

  // Tidy number as they type
  $("#fPhone").addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^\d+\s-]/g, "");
  });
})();
