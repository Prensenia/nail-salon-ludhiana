/* ═══════════════════════════════════════════════════════════
   NAIL SALON LUDHIANA — service detail page
   Service data + population + shared chrome (drawer, clock,
   progress, reveals). Data-driven via ?svc=<key>
   ═══════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const px = (id, w = 800) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

  /* ── Service database (no prices — quoted on call/WhatsApp) ── */
  const SERVICES = {
    extensions: {
      titleHtml: "Nail <em>Extensions.</em>",
      tag: "Bestseller · custom-built sets",
      tagline: "Length, shape and strength — sculpted on you, not stuck on.",
      meta: "Nail extensions in Ludhiana — acrylic and gel extensions in every shape, built light and strong at Nail Salon Ludhiana. Pakhowal Road & Ghumar Mandi.",
      intro:
        "Extensions are the answer when your natural nails are short, weak, or you simply want that long, elegant silhouette. We build each set on a carefully prepped base — tips or sculpted forms, acrylic or gel — shaped to flatter your hands and finished in the colour and art of your choice. Done right, they feel light, look natural and stay flawless for weeks.",
      facts: ["≈ 2–2.5 hrs · first set", "Refills every 3 weeks", "Both branches", "Quote on call"],
      heroImg: 3997391,
      heroAlt: "Nail technician building a set of extensions nail by nail",
      included: [
        "Shape & length consultation — square, almond, coffin, stiletto or round, matched to your hands and lifestyle",
        "Full natural-nail prep: gentle filing, buffing and cuticle tidying",
        "Tips or sculpted forms applied and sized nail-by-nail",
        "Acrylic or gel build for strength without the heavy feel",
        "Shaping and refining so every nail matches its neighbours",
        "Gel-polish colour of your choice, cured and sealed",
        "Finishing oil and a full aftercare walkthrough"
      ],
      tips: [
        { h: "Pick your shape by your days, not just your feed", p: "Almond and round suit typing, gym and everyday life; coffin and stiletto are the drama queens — stunning, but they need gentler handling." },
        { h: "Bring 2–3 inspo pics", p: "Screenshots from Instagram or Pinterest tell us the exact length, shape and finish you're imagining — far better than words." },
        { h: "Book refills before you see a gap", p: "At the 3-week mark the growth line shows. Refilling on time keeps the set strong; waiting leads to lifting and breakage." },
        { h: "Treat them like jewels, not tools", p: "Open cans with a spoon, not your nails. Gloves for dishes and cleaning — water and chemicals are what weaken the bond." },
        { h: "One pops? Call us, don't glue it", p: "Home fixes trap moisture and can damage the natural nail. A quick visit and we'll blend it back in properly." }
      ],
      note: "First full set takes the longest — book a late-afternoon slot, settle in, and let us work. Infills every 2–3 weeks keep the set looking day-one fresh.",
      examples: [
        { id: 34971940, cap: "Teal almond set · hand-painted" },
        { id: 34885844, cap: "Coral set · charm detail" },
        { id: 7683058, cap: "Classic red · medium almond" }
      ],
      bookingParam: "Nail extensions"
    },

    gel: {
      titleHtml: "Gel & Acrylic <em>Overlay.</em>",
      tag: "Chip-proof · 3+ week shine",
      tagline: "The shine of fresh polish that survives real life — dishes, gym, everything.",
      meta: "Gel manicures and acrylic overlays in Ludhiana — chip-resistant, 3+ week shine with proper removal. Book at Nail Salon Ludhiana.",
      intro:
        "Gel polish is cured under an LED lamp, so it dries instantly and resists chips for weeks — no smudges on the way out the door. An overlay adds a thin reinforcing layer over your natural nails, giving them strength and a perfectly smooth canvas. It's our most-loved option for everyday elegance that doesn't ask for attention every few days.",
      facts: ["≈ 1–1.5 hrs", "Lasts 3+ weeks", "Gel removal done right", "Both branches"],
      heroImg: 22668317,
      heroAlt: "Hands curing under a UV lamp during a gel manicure",
      included: [
        "Nail shaping and surface prep for a long-lasting bond",
        "Cuticle tidy-up around every nail",
        "Optional thin overlay for strength on natural nails",
        "Base coat, two colour coats and top coat — cured between layers",
        "Your shade from our wall, or a match to your inspo pic",
        "Sealed edges so the tips don't catch and lift",
        "Cuticle oil finish"
      ],
      tips: [
        { h: "Never peel gel off", p: "Peeling takes the top layers of your natural nail with it. Come in for removal — it takes fifteen minutes and keeps your nails healthy." },
        { h: "Nudes for work, bolds for weekends", p: "One set can't do both? A sheer pink base with one bold accent nail is the compromise our regulars swear by." },
        { h: "Honest nail check, every time", p: "Gel needs a healthy base. If your nails need a rest, we'll say so and suggest a strengthening treatment instead — no upselling." },
        { h: "Cuticle oil is the real secret", p: "Gel can't dry out, but the skin around it can. A drop of oil daily keeps the whole set looking freshly done." },
        { h: "Gym-goers: gel wins", p: "Dumbbells and regular polish don't mix. Cured gel shrugs off everything short of dropping a plate on your hand." }
      ],
      note: "Bringing gel in for removal? Book it together with your next set — we remove, prep and reapply in one sitting.",
      examples: [
        { id: 22668317, cap: "Under the lamp · gel curing" },
        { id: 3997384, cap: "Classic red · professional finish" },
        { id: 5871834, cap: "UV-reactive gel · statement art" }
      ],
      bookingParam: "Gel / acrylic overlay"
    },

    manicure: {
      titleHtml: "Signature <em>Manicure.</em>",
      tag: "The classic · full reset",
      tagline: "Shape, cuticles, massage and a flawless polish — the works.",
      meta: "Signature manicure in Ludhiana — shaping, cuticle care, massage and flawless polish at Nail Salon Ludhiana. Walk in or book ahead.",
      intro:
        "Our signature manicure is the full ritual: a warm soak to soften, precise shaping, careful cuticle work, a proper hand massage and polish applied like we mean it. It's the difference between nails that are merely painted and hands that look genuinely cared for — the quickest way to leave the salon feeling brand new.",
      facts: ["≈ 45–60 min", "Regular or gel finish", "Great lunchtime slot", "Both branches"],
      heroImg: 16041437,
      heroAlt: "Manicurist shaping and polishing a client's nails at the salon",
      included: [
        "Warm hand soak with a gentle cleanser",
        "Nails shaped to your preferred length and form",
        "Cuticle softening and careful tidy-up",
        "Light exfoliation for smoother hands",
        "Relaxing hand and wrist massage",
        "Base, colour and top coat — or a gel upgrade",
        "Cuticle oil and aftercare advice"
      ],
      tips: [
        { h: "Book gel if you're hard on your hands", p: "Regular polish is beautiful for an event; gel is the one that still looks new on day 14 of cooking, typing and life." },
        { h: "Skip the lotion on polish day", p: "Come with bare hands if you can — oil on the nail plate makes polish lift faster. We degrease anyway, but a head start helps." },
        { h: "Choose the shade before you sit", p: "Scroll our Instagram or bring a pic — deciding while the massage is on is the hardest moment of the visit." },
        { h: "Tell your artist your routine", p: "Gardening? Gym? Constant handwashing? We'll recommend the finish and aftercare that actually fits your week." },
        { h: "Midweek is the quiet slot", p: "Tuesday to Thursday afternoons mean zero waiting, full attention, and time to try that colour you were unsure about." }
      ],
      note: "Upgrading to gel in the same sitting? Just say it when you sit down — we'll switch the finish before polish goes on.",
      examples: [
        { id: 5238015, cap: "Finished set · gold heart ring" },
        { id: 4677845, cap: "Polish application · steady hands" },
        { id: 3997384, cap: "Classic red · clean gloss" }
      ],
      bookingParam: "Signature manicure"
    },

    pedicure: {
      titleHtml: "Luxe <em>Pedicure.</em>",
      tag: "Sunday-reset · feet-first",
      tagline: "Soak, scrub, smooth and polish — leave walking on air.",
      meta: "Luxe pedicure in Ludhiana — soak, scrub, callus care, massage and polish at Nail Salon Ludhiana. Book your reset.",
      intro:
        "A proper pedicure is self-care, not just a colour change. Warm soak, full exfoliation, callus care where it's needed, nail and cuticle work, then a foot and calf massage that erases the week. You'll leave with polished toes and genuinely lighter feet — open-footwear season or not.",
      facts: ["≈ 50–70 min", "Regular or gel on toes", "Massage included", "Both branches"],
      heroImg: 34930135,
      heroAlt: "Client relaxing while receiving a professional pedicure at the salon",
      included: [
        "Warm, relaxing foot soak",
        "Toenails shaped, cuticles tidied",
        "Heel scrub and callus smoothing",
        "Full exfoliation, front to back",
        "Foot and calf massage",
        "Polish of your choice — regular or long-wear gel",
        "Finishing oil and a quick-dry set-up"
      ],
      tips: [
        { h: "Wear open footwear", p: "Flip-flops or sandals mean your polish dries undisturbed on the way home — closed shoes are the classic smudge culprit." },
        { h: "Gel on toes is the quiet winner", p: "Toes see far less wear than hands, so gel pedicures can look perfect for 4+ weeks. One appointment, whole season sorted." },
        { h: "Every 3–4 weeks keeps troubles away", p: "Regular pedicures prevent ingrown nails and callus build-up — far easier than fixing them after months of neglect." },
        { h: "Speak up about sensitive spots", p: "Diabetic? Ticklish? Sensitive heels? Tell us at the start and we'll adjust pressure and products throughout." },
        { h: "Skip the shave on the same day", p: "Freshly shaved skin plus exfoliation can sting. Shave the day before your pedicure and it's all comfort." }
      ],
      note: "Book gel toes before wedding or trip season — one sitting covers weeks of mehndi functions, travel and open shoes.",
      examples: [
        { id: 34930123, cap: "Pedicure in progress · salon chair" },
        { id: 18441299, cap: "Pink polish · gloved precision" },
        { id: 31091766, cap: "Full service · start to finish" }
      ],
      bookingParam: "Luxe pedicure"
    },

    art: {
      titleHtml: "Custom <em>Nail Art.</em>",
      tag: "Trending · your inspo, recreated",
      tagline: "Chrome, cat-eye, hand-painted, charms — bring the pic, we'll build it.",
      meta: "Custom nail art in Ludhiana — hand-painted designs, chrome, cat-eye, charms and 3D decor recreated from your inspo pics. Nail Salon Ludhiana.",
      intro:
        "Nail art is where our artists get to show off. Hand-painted designs, chrome and mirror finishes, magnetic cat-eye, French remixes, ombré and marble, charms and 3D decor — if you've saved it, we can probably recreate it. Art is priced by the design, so we'll quote it at your consultation before a single brush moves.",
      facts: ["≈ 1–2.5 hrs · by design", "Quote on WhatsApp", "Bring inspo pics", "Both branches"],
      heroImg: 18730147,
      heroAlt: "Ornate black and gold hand-painted nail art with embellishments",
      included: [
        "Design consultation — we look at your inspo and plan the set",
        "Base colour application",
        "Your chosen techniques: hand-painting, chrome, cat-eye, ombré and more",
        "Accent nails placed where they'll photograph best",
        "Charms, foils or 3D decor, sealed properly",
        "High-shine protective top coat",
        "Aftercare so the art survives the fortnight"
      ],
      tips: [
        { h: "Two or three inspo pics beat one", p: "Different angles show different details. Your artist can combine the best of each into one set made for your hands." },
        { h: "Pair art with a gel base", p: "Fine art deserves a long life. A gel base means the chrome stays mirror-bright and the lines stay crisp for weeks." },
        { h: "Accent nails keep it chic — and kinder on budget", p: "Two statement nails on a clean set look editorial, and cost less than full-set art on every finger." },
        { h: "Big designs? Book ahead", p: "Intricate hand-painted work needs real time. Message us a few days early so we can reserve the right slot." },
        { h: "Cat-eye and chrome need gel", p: "These finishes simply don't exist in regular polish — we'll set expectations honestly at the consultation." }
      ],
      note: "Send us your inspo pic on WhatsApp before booking — we'll tell you exactly what's possible on your length and shape, and what it'll take.",
      examples: [
        { id: 7066298, cap: "Hand-painted dots · playful classic" },
        { id: 5871824, cap: "Vibrant art · editorial colour-block" },
        { id: 5871834, cap: "Neon UV art · after-dark set" }
      ],
      bookingParam: "Custom nail art"
    },

    bridal: {
      titleHtml: "Bridal & <em>Occasion.</em>",
      tag: "The big days · photo-ready",
      tagline: "Sets made for mehndi, lehengas and a camera that never sleeps.",
      meta: "Bridal nail art in Ludhiana — mehndi-friendly sets, outfit matching, trial sets and group bookings for every function. Nail Salon Ludhiana.",
      intro:
        "Wedding functions are marathon days for your hands — mehndi, rings, a thousand photos, everyone grabbing your henna-ed fingers. We plan bridal sets properly: a consultation to match your outfits, an optional trial set, and nail art designed to sit beautifully next to your mehndi rather than fight it. Full squads for sangeet and ladies' functions welcome — we'll schedule the whole party.",
      facts: ["Book 1–2 weeks ahead", "Trial sets available", "Group bookings welcome", "Both branches"],
      heroImg: 12600630,
      heroAlt: "Bride's hand with detailed mehndi and colourful bridal nail art",
      included: [
        "One-on-one consultation — outfits, dates and functions mapped out",
        "Shade and design matching to your lehenga and jewellery",
        "Optional trial set before the main day",
        "Full set application with a long-wear gel finish",
        "Mehndi-friendly designs — nails that complement the henna",
        "Priority scheduling for your dates",
        "Group slots for bridesmaids and family"
      ],
      tips: [
        { h: "Book 1–2 weeks out — 3 in season", p: "Wedding-season slots go first. Locking your date early means zero panic later." },
        { h: "Trial the shape, not just the colour", p: "A trial set a week before shows you how the length feels with mehndi, bangles and rings — time to adjust anything." },
        { h: "Bring a fabric swatch", p: "A square of your lehenga or dupatta fabric beats any photo for matching tones exactly." },
        { h: "Gel is non-negotiable for weddings", p: "Multi-day functions, constant photos, zero touch-up time — gel keeps the set perfect from mehndi to reception." },
        { h: "Book mehndi and nails in the right order", p: "Nails first, then mehndi — fresh mehndi stains uncured polish. Tell us your mehndi appointment and we'll plan around it." }
      ],
      note: "Bridal and group bookings get a dedicated WhatsApp thread — send outfit pics and dates, and we'll plan every function's set with you.",
      examples: [
        { id: 15491629, cap: "Classic red on gold · reception-ready" },
        { id: 18730147, cap: "Black & gold · sangeet statement" },
        { id: 5871824, cap: "Party art · bold colour" }
      ],
      bookingParam: "Bridal / occasion set"
    }
  };

  const ORDER = ["extensions", "gel", "manicure", "pedicure", "art", "bridal"];

  /* ── Resolve service ───────────────────────────────────── */
  const key = new URLSearchParams(location.search).get("svc");
  const svc = SERVICES[key] || SERVICES.extensions;
  if (!SERVICES[key]) history.replaceState(null, "", "service.html?svc=extensions");

  document.title = `${svc.titleHtml.replace(/<[^>]+>/g, "")} — Nail Salon Ludhiana`;
  const md = $("meta[name='description']");
  if (md) md.content = svc.meta;

  /* ── Populate hero ─────────────────────────────────────── */
  $("#svTag").textContent = svc.tag;
  $("#svTitle").innerHTML = svc.titleHtml;
  $("#svTagline").textContent = svc.tagline;
  $("#svIntro").textContent = svc.intro;

  const heroImg = $("#svHeroImg");
  heroImg.src = px(svc.heroImg, 1200);
  heroImg.alt = svc.heroAlt;

  $("#svFacts").innerHTML = svc.facts.map((f) => `<span class="svfact">${f}</span>`).join("");

  /* ── Included list ─────────────────────────────────────── */
  $("#svIncluded").innerHTML = svc.included
    .map((item) => `<li class="reveal"><span aria-hidden="true">✦</span>${item}</li>`)
    .join("");

  /* ── Expert tips ───────────────────────────────────────── */
  $("#svTips").innerHTML = svc.tips
    .map(
      (t, i) => `
      <div class="tip reveal" style="transition-delay:${(i % 5) * 70}ms">
        <span class="tip__n" aria-hidden="true">${i + 1}</span>
        <div><h3>${t.h}</h3><p>${t.p}</p></div>
      </div>`
    )
    .join("");

  /* ── Photo examples ────────────────────────────────────── */
  $("#svExamples").innerHTML = svc.examples
    .map(
      (ex, i) => `
      <figure class="reveal" style="transition-delay:${i * 90}ms">
        <img src="${px(ex.id, 700)}" alt="${ex.cap} — example of our ${svc.titleHtml.replace(/<[^>]+>/g, "").toLowerCase()} work" loading="lazy" />
        <figcaption>${ex.cap}</figcaption>
      </figure>`
    )
    .join("");

  /* ── Note callout ──────────────────────────────────────── */
  $("#svNoteText").textContent = svc.note;

  /* ── CTAs (no prices — quote on call / WhatsApp) ───────── */
  $("#svBook").href = `booking.html?service=${encodeURIComponent(svc.bookingParam)}`;
  $("#svWa").href =
    `https://wa.me/918557080366?text=${encodeURIComponent(
      `Hi Nail Salon! I just read about ${svc.titleHtml.replace(/<[^>]+>/g, "")} on your site — can you share details and a quote?`
    )}`;

  /* ── Other services chips ──────────────────────────────── */
  $("#svOthers").innerHTML = ORDER.filter((k) => k !== (SERVICES[key] ? key : "extensions"))
    .map((k) => {
      const s = SERVICES[k];
      return `
      <a href="service.html?svc=${k}" class="reveal">
        <img src="${px(s.heroImg, 200)}" alt="" loading="lazy" />
        <span><strong>${s.titleHtml.replace(/<[^>]+>/g, "").replace(/\.$/, "")}</strong><span>${s.tag.split("·")[0].trim()} →</span></span>
      </a>`;
    })
    .join("");

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
  $$(".side-link, .side-book__row, .sidebar__brand, .side-book__form").forEach((a) =>
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

  /* ── Footer year ───────────────────────────────────────── */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Reveals (after population so JS content animates) ─── */
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
})();
