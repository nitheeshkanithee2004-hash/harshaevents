import photoMeta from './photo-meta.json';

/**
 * Every decoration photo is stored in src/assets/photos/<category>/.
 * Vite collects them at build time, so adding or removing a photo in
 * tools/prepare-assets.mjs (then running `npm run prepare-assets`) is all it
 * takes to change the gallery - no manual list to keep in sync.
 */
const fullImages = import.meta.glob('../assets/photos/*/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
});
const thumbImages = import.meta.glob('../assets/photos/*/thumbs/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** '../assets/photos/birthday/birthday-01.jpg' -> { category, file } */
function parseKey(key, extraFolder = false) {
  const parts = key.split('/');
  const file = parts[parts.length - 1];
  const category = extraFolder ? parts[parts.length - 3] : parts[parts.length - 2];
  return { category, file };
}

const urlByCategoryFile = new Map();
for (const [key, url] of Object.entries(fullImages)) {
  const { category, file } = parseKey(key);
  urlByCategoryFile.set(`${category}/${file}`, url);
}

const thumbUrlByCategoryFile = new Map();
for (const [key, url] of Object.entries(thumbImages)) {
  const { category, file } = parseKey(key, true);
  thumbUrlByCategoryFile.set(`${category}/${file}`, url);
}

/** Filter chips. Order here is the order shown on the site. */
export const CATEGORIES = [
  {
    id: 'all',
    label: 'All Work',
    kannada: 'ಎಲ್ಲಾ',
    description: 'Every setup we have photographed.',
  },
  {
    id: 'birthday',
    label: 'Birthday',
    kannada: 'ಹುಟ್ಟುಹಬ್ಬ',
    description: 'Balloon arches, name backdrops, cake tables and themed first birthdays.',
    prefix: 'BDAY',
  },
  {
    id: 'haldi',
    label: 'Haldi & Floral',
    kannada: 'ಹೂವಿನ ಅಲಂಕಾರ',
    description: 'Marigold, jasmine and leaf decor for haldi and traditional ceremonies.',
    prefix: 'HALDI',
  },
  {
    id: 'anniversary',
    label: 'Anniversary',
    kannada: 'ವರ್ಷಿ ಕೋತ್ಸವ',
    description: 'Romantic ring and heart setups for anniversaries and special dates.',
    prefix: 'ANNI',
  },
  {
    id: 'wedding',
    label: 'Wedding',
    kannada: 'ಮದುವೆಗಳು',
    description: 'Full wedding stage, mandap and entrance decoration.',
    prefix: 'WED',
    emptyNote:
      'We decorate weddings too — our wedding gallery is still being photographed. Send us a WhatsApp message and we will share recent wedding work directly.',
  },
];

const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

/** The photos that actually exist on disk, in the order prepare-assets wrote them. */
export const PHOTOS = photoMeta
  .map(({ category, file, width, height, thumbWidth, thumbHeight }) => {
    const categoryInfo = CATEGORY_BY_ID[category];
    if (!categoryInfo) return null;
    const key = `${category}/${file}`;
    const src = urlByCategoryFile.get(key);
    const thumb = thumbUrlByCategoryFile.get(key);
    if (!src || !thumb) return null;
    const number = Number(file.replace(/\D+/g, '')) || 0;
    return {
      id: key,
      file,
      src,
      thumb,
      width,
      height,
      thumbWidth,
      thumbHeight,
      number,
      category,
      categoryLabel: categoryInfo.label,
      code: `${categoryInfo.prefix}-${String(number).padStart(2, '0')}`,
      title: `${categoryInfo.label} setup ${number}`,
    };
  })
  .filter(Boolean);

/** How many photos each category really has - used for honest counts in the UI. */
export const CATEGORY_COUNTS = PHOTOS.reduce((acc, photo) => {
  acc[photo.category] = (acc[photo.category] || 0) + 1;
  return acc;
}, {});

export const TOTAL_PHOTOS = PHOTOS.length;

export function photosFor(categoryId) {
  if (categoryId === 'all') return PHOTOS;
  return PHOTOS.filter((photo) => photo.category === categoryId);
}

export function countFor(categoryId) {
  return photosFor(categoryId).length;
}

const BY_ID = Object.fromEntries(PHOTOS.map((photo) => [photo.id, photo]));

/** Hand-picked photos for the hero collage, referenced by id so the numbering
 * in prepare-assets.mjs can change without breaking the layout. */
export const HERO_PHOTOS = [
  'birthday/birthday-01.jpg',
  'birthday/birthday-03.jpg',
  'haldi/haldi-09.jpg',
]
  .map((id) => BY_ID[id])
  .filter(Boolean);

/** Banner / about section uses a different, quieter set. */
export const ABOUT_PHOTOS = ['haldi/haldi-02.jpg', 'anniversary/anniversary-01.jpg']
  .map((id) => BY_ID[id])
  .filter(Boolean);
