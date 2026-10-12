# Harsha Events & Decor

A static portfolio site for the event decoration business, built with React + Vite and
ready to deploy as a plain HTML/CSS/JS bundle to any static host (Netlify, Vercel, GitHub
Pages, S3, etc.).

- Phone / WhatsApp: **79755 78275** (printed on the Harsha Events banner card)
- Website by: **Nitheesh K A** — `nitheeshkanithee2004@gmail.com`
- Everything on the site is driven from two files: `tools/prepare-assets.mjs` (image
  pipeline) and `src/data/site.js` (brand & services). Change them, re-run the asset
  script, and rebuild.

## Quick start

```bash
npm install
npm run build
npm run preview        # serves dist/ locally
```

There is no backend, no database and no env var to set. The phone number is hardcoded in
`src/data/site.js` so the whole site can be deployed as-is.

### Dev server

```bash
npm run dev
```

### Build

```bash
npm run build
```

Output: `dist/` (everything you need to deploy).

## Netlify deploy

This project ships with a `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22.12.0"
```

On Netlify, connect the repo (or drag-and-drop the `dist/` folder) and use the settings above.
No SPA redirect is needed — the site only uses in-page `#` anchors (`#home`, `#gallery`, …).

### Deploy checklist

1. Run `npm run prepare-assets`
2. Run `npm run build`
3. Open `dist/index.html` locally and confirm it loads
4. Upload `dist/` to Netlify (or another static host)
5. After deploy, replace the placeholder `og:image` URL in `index.html` with your live
   domain + `/apple-touch-icon.png` (currently it is intentionally absent until there is a
   real hostname)

## Updating the photos

All gallery images live in `tools/source/` (raw WhatsApp downloads). Editing the site means
editing that source, not the built assets.

### Adding or removing a photo

1. Drop the new JPEG into `tools/source/` with the next free number, e.g. `photo-060.jpg`
2. Open `tools/prepare-assets.mjs` and add or remove the source index from the right
   `SOURCE_INDEXES` category list
3. Run `npm run prepare-assets` — this writes the resized gallery photos, thumbnails,
   brand cards and favicons, plus `src/data/photo-meta.json`
4. Run `npm run build`

The gallery itself is driven automatically from `src/data/photo-meta.json` via
`src/data/gallery.js`, so you do not edit any component to add a photo.

### Re-categorising a photo

Move the photo index between the `SOURCE_INDEXES` arrays in
`tools/prepare-assets.mjs` and re-run `npm run prepare-assets`.

Currently:
- **birthday**: 47 photos (`photo-NNN.jpg`, numbers from the birthday WhatsApp batch)
- **haldi**: 9 photos (haldi/floral WhatsApp batch)
- **anniversary**: 1 photo (the "LOVE" setup from the birthday batch)
- **wedding**: intentionally empty — the site shows an honest empty state with a WhatsApp
  enquiry CTA instead

Two source photos are deliberately excluded from the gallery:
- `photo-029.jpg` — carries a "50% OFF" shop badge burnt into the picture
- `photo-059.jpg` — is the Harsha Events branding card, not a decoration photo

### Regenerate the brand assets

`tools/prepare-assets.mjs` crops the logo, favicon, owner portrait, brand banner and lockup
directly from `tools/source/brand-banner.jpeg`. If that artwork is ever updated, re-run
`npm run prepare-assets` and rebuild.

## Changing the phone number / WhatsApp link

Edit `BRAND.phoneWhatsApp` (digits only, no spaces or dashes) in
`src/data/site.js`. That single value is used by:
- the header "WhatsApp Us" button
- the hero "Book on WhatsApp" button
- the contact section
- the footer
- every gallery tile and lightbox "Enquire about BDAY-XX" button
- the floating chat button
- the services cards

The display formats `phoneDisplay`, `phoneLocal` and `phoneTel` are independent, so you can
also fix the way it is printed on the site there.

## What is inside

```
index.html                  static HTML shell (SEO + meta tags)
netlify.toml                Netlify build config
package.json                deps + scripts
src/
  main.jsx                  React entry point
  App.jsx                   assembles header/hero/services/gallery/about/contact/footer
  styles/global.css         dark + gold theme (plain CSS, no framework, no icon lib)
  components/
    Header.jsx              sticky header, mobile menu, branded logo badge
    Hero.jsx               hero lockup + photo collage + stats
    Services.jsx           five decorated services
    Gallery.jsx            filterable gallery, per-photo WhatsApp buttons, empty state
    Lightbox.jsx           full-screen viewer with keyboard nav
    About.jsx              owner, brand banner, how-it-works steps
    Contact.jsx            WhatsApp + phone + quick-message links
    Footer.jsx             brand, pages, services, contact
    FloatingButtons.jsx    floating WhatsApp + back-to-top
    Icons.jsx             inline SVGs (no icon library)
  data/
    site.js               brand constants, WhatsApp helpers, services, nav
    gallery.js            auto-built photo list from src/assets via Vite glob
    photo-meta.json       generated by tools/prepare-assets.mjs
  assets/
    brand/               processed brand images (logo-badge, logo-lockup, banner, owner)
    photos/
      birthday/          resized gallery photos + thumbs/
      haldi/
      anniversary/
public/
  favicon.png
  apple-touch-icon.png
tools/
  source/              raw input: decoration photos + brand banner
  prepare-assets.mjs   image pipeline
  photo-map.json       (internal, generated)
```

## Accessibility and performance notes

- Images have correct `width`/`height` so the layout is stable while they load
- Photos use `loading="lazy"` except the hero collage which is above the fold
- The lightbox locks the body and closes on `Escape`, tap on the backdrop, and the close
  button
- The mobile menu locks the body while open
- A "Skip to gallery" link is present at the top of the page
- Reduced motion is respected for animations only

## Known limitations

- No live chat, no cart, no booking system — the whole site is a portfolio with WhatsApp
  lead capture. Upgrading to bookings, payments or a CMS would require a backend.  - Wedding gallery is empty on purpose; the empty state directs people to WhatsApp.
- The site's developer credit (name + email) is rendered in the footer and contact section.

- `og:image` is a placeholder until a live domain is available.
