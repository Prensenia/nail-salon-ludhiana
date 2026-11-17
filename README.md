# Nail Salon Ludhiana — Launch Website

A polished, single-page launch site for **Nail Salon Ludhiana** (Pakhowal Road & Ghumar Mandi branches).

## What's inside

```
nail-salon-ludhiana/
├── index.html      # Home: services, gallery, reviews, FAQ, branches + SEO structured data
├── booking.html    # Booking form → sends pre-filled request to the salon's WhatsApp
├── css/style.css   # Dark-luxe theme, sidebar layout, animations, fully responsive
├── js/main.js      # Sidebar, reveals, counters, parallax, tilt, lightbox, slider
├── js/booking.js   # Booking form validation + WhatsApp compose
└── serve.ps1       # Optional zero-dependency local preview server (PowerShell)
```

No build tools needed — it's plain HTML/CSS/JS. Open `index.html` in any browser, or serve the folder.

Tip: `serve.ps1` is an optional zero-dependency local preview server (PowerShell). Run it and visit http://127.0.0.1:4173/

## Facts baked in (from the salon's public Google/Instagram presence)

- ⭐ 4.6 rating · 176 Google reviews
- 📍 Pakhowal Rd, Sant Ishar Singh Nagar, Pink Flats, Ludhiana 141001 (main)
- 📍 Ghumar Mandi branch — open 7 days
- 📞 Pakhowal: 85570 80366 / 0161-4603366
- 📞 Ghumar Mandi: 99156 91366 / 0161-4050366
- 📷 Instagram: @nailsalonludhiana (28.2K followers)
- 🕷 Open daily 10 AM – 9 PM

## Before going live (5-minute checklist)

1. **Reviews** — the 5 testimonials are clearly-marked samples. Replace them with real Google reviews (names + text) in `index.html`, then delete the "sample quotes" fineprint line.
2. **Photos** — placeholders are free Pexels stock. Swap in real salon photos for maximum trust (keep the `data-cap` labels, update alt text).
3. **Services & pricing** — add your real menu/price list to the service cards if you want prices public.
4. **Hours** — confirm both branches' exact timings and update the text + JSON-LD `openingHours`.
5. **WhatsApp number** — currently `wa.me/918557080366` (Pakhowal). Change if you prefer the other line.

## Free deployment options

- **Netlify Drop** — drag the folder onto https://app.netlify.com/drop → live URL in seconds
- **Vercel** — `npx vercel` inside this folder
- **GitHub Pages** — push to a repo, enable Pages
- **Cloudflare Pages** — connect any Git repo

## Domain idea

`nailsalonludhiana.in` or `nailsalonludhiana.com` — matches the Instagram handle, good for local SEO.
