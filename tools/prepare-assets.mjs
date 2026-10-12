/**
 * Harsha Events & Decor - asset preparation script
 * -------------------------------------------------
 * Turns the raw decoration photographs in `tools/source/` into the optimised
 * assets used by the website:
 *
 *   src/assets/photos/<category>/<category>-NN.jpg         full size (max 1100px wide)
 *   src/assets/photos/<category>/thumbs/<category>-NN.jpg  gallery grid thumbs (max 520px wide)
 *   src/assets/brand/logo-badge.png                        square "HE" crown badge (header / footer)
   src/assets/brand/logo-mark.png                         wide "HE" crown emblem
 *   src/assets/brand/logo-lockup.png                       emblem + "HARSHA EVENTS / EVENTS & DECOR"
 *   src/assets/brand/banner-card.jpg                        the full brand banner (About section)
 *   src/assets/brand/owner.jpg                              the owner portrait crop
 *   public/favicon.png, public/apple-touch-icon.png         browser icons
 *
 * Run it with:  npm run prepare-assets
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'tools', 'source');
const PHOTOS = path.join(ROOT, 'src', 'assets', 'photos');
const BRAND = path.join(ROOT, 'src', 'assets', 'brand');
const PUBLIC = path.join(ROOT, 'public');

/** Which raw photo (tools/source/photo-NNN.jpg) belongs to which gallery category. */
const SOURCE_INDEXES = {
  birthday: [
    1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 58,
  ],
  haldi: [49, 50, 51, 52, 53, 54, 55, 56, 57],
  anniversary: [9],
  wedding: [60, 61, 62],
};


/**
 * Deliberately NOT published in the gallery:
 *   29 - carries an unrelated "50% OFF" shop badge burnt into the photo
 *   59 - is the Harsha Events branding card, not a decoration photo
 *
 * Wedding category source photos:
 *   60 - coconut-leaf mandap canopy with marigold/white/purple garlands at a house entrance
 *   61 - anniversary rose wreath on wooden plank wall ("HAPPY Anniversary" gold text)
 *   62 - anniversary red tinsel backdrop + gold/red balloon arch ("HAPPY ANNIVERSARY" banners)
 */
const EXCLUDED = [29, 59];

// Newly added wedding photos (chapra/mandap daytime setup + 2 anniversary backdrops):
//   60 - daytime mandap canopy with coconut-leaf pillars, marigold/white/purple garlands, banana stalks
//   61 - anniversary rose wreath on wooden plank wall with "HAPPY Anniversary" gold text
//   62 - anniversary red tinsel + gold/red balloon arch with "HAPPY ANNIVERSARY" pennants

const DISPLAY_WIDTH = 1100;
const THUMB_WIDTH = 520;
const DISPLAY_QUALITY = 82;
const THUMB_QUALITY = 74;

const pad = (n) => String(n).padStart(2, '0');

function emptyDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

/** Copy + resize every gallery photo into its category folder. */
async function buildGallery() {
  const written = [];
  for (const [category, indexes] of Object.entries(SOURCE_INDEXES)) {
    const dir = path.join(PHOTOS, category);
    const thumbDir = path.join(dir, 'thumbs');
    emptyDir(dir);
    fs.mkdirSync(thumbDir, { recursive: true });

    for (let i = 0; i < indexes.length; i++) {
      const sourceIndex = indexes[i];
      const src = path.join(SRC, `photo-${String(sourceIndex).padStart(3, '0')}.jpg`);
      if (!fs.existsSync(src)) throw new Error(`missing source photo: ${src}`);

      const name = `${category}-${pad(i + 1)}.jpg`;
      const meta = await sharp(src).metadata();
      const base = sharp(src).rotate();

      await base
        .clone()
        .resize({ width: DISPLAY_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: DISPLAY_QUALITY, progressive: true, mozjpeg: true })
        .toFile(path.join(dir, name));

      await base
        .clone()
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: THUMB_QUALITY, progressive: true, mozjpeg: true })
        .toFile(path.join(thumbDir, name));

      // the grid needs to know the aspect ratio before an image lazy-loads,
      // and the lightbox needs the real pixel size for <img width/height>
      const displayScale = Math.min(1, DISPLAY_WIDTH / meta.width);
      const thumbScale = Math.min(1, THUMB_WIDTH / meta.width);
      written.push({
        category,
        file: name,
        source: path.basename(src),
        width: Math.round(meta.width * displayScale),
        height: Math.round(meta.height * displayScale),
        thumbWidth: Math.round(meta.width * thumbScale),
        thumbHeight: Math.round(meta.height * thumbScale),
      });
    }
  }
  return written;
}

/** Crop the brand assets out of the Harsha Events banner artwork. */
async function buildBrand() {
  fs.mkdirSync(BRAND, { recursive: true });
  fs.mkdirSync(PUBLIC, { recursive: true });
  const banner = path.join(SRC, 'brand-banner.jpeg');
  if (!fs.existsSync(banner)) throw new Error(`missing brand banner: ${banner}`);
  const { width, height } = await sharp(banner).metadata();

  // All crop boxes are expressed as fractions so they survive a re-export of the artwork.
  const box = (l, t, w, h) => ({
    left: Math.round(l * width),
    top: Math.round(t * height),
    width: Math.round(w * width),
    height: Math.round(h * height),
  });

  // 1. "HE" crown emblem with the two floral sprays, no wording.
  await sharp(banner)
    .extract(box(0.325, 0.014, 0.375, 0.22))
    .resize({ width: 520 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(BRAND, 'logo-mark.png'));

  // 2. Emblem + "HARSHA EVENTS / EVENTS & DECOR" lockup.
  await sharp(banner)
    .extract(box(0.3, 0.012, 0.44, 0.382))
    .resize({ width: 760 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(BRAND, 'logo-lockup.png'));

  // 3. The whole English brand banner (its bottom edge sits right under the tagline).
  await sharp(banner)
    .extract(box(0, 0, 1, 0.5))
    .resize({ width: 1500 })
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(path.join(BRAND, 'banner-card.jpg'));

  // 4. Owner portrait from the left of the banner. The banner is the largest
  //    copy of this photo we have, so never enlarge it (that would only blur it).
  await sharp(banner)
    .extract(box(0.005, 0.01, 0.245, 0.49))
    .resize({ width: 480, withoutEnlargement: true })
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(path.join(BRAND, 'owner.jpg'));

  // 5. Square badge (header / footer) and favicon - both are a tight square
  //    around the crown + "HE" monogram, so they stay readable at 32-48px.
  const badge = await sharp(banner)
    .extract(box(0.415, 0.016, 0.182, 0.242))
    .resize(320, 320, { fit: 'cover', background: '#0a0a0a' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(BRAND, 'logo-badge.png'), badge);

  const icon = await sharp(badge)
    .resize(256, 256, { fit: 'cover', background: '#0a0a0a' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC, 'favicon.png'), icon);
  await sharp(icon)
    .resize(180, 180, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
}

const photos = await buildGallery();
await buildBrand();

// The gallery grid reads this so every tile already knows its aspect ratio
// (no layout shift while the thumbnails lazily load).
fs.writeFileSync(
  path.join(ROOT, 'src', 'data', 'photo-meta.json'),
  JSON.stringify(
    photos.map(({ category, file, width, height, thumbWidth, thumbHeight }) => ({
      category,
      file,
      width,
      height,
      thumbWidth,
      thumbHeight,
    })),
    null,
    1
  )
);

const counts = Object.fromEntries(
  Object.entries(SOURCE_INDEXES).map(([k, v]) => [k, v.length])
);
console.log('prepared gallery photos:', counts);
console.log('excluded source indexes:', EXCLUDED.join(', '));
console.log('brand assets + favicons written');
