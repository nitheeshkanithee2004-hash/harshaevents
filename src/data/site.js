/**
 * Single source of truth for every business detail shown on the site.
 * Change the phone number here once and it updates in the header, hero,
 * contact section, footer, every gallery tile and the floating button.
 */
export const BRAND = {
  name: 'Harsha Events & Decor',
  shortName: 'Harsha Events',
  nameKannada: 'ಹರ್ಷ ಇವೆಂಟ್ಸ್',
  tagline: 'We Decorate Your Dreams',
  taglineKannada: 'ನಿಮ್ಮ ಕನಸುಗಳಿಗೆ ಅಲಂಕಾರ ನೀಡುತ್ತೇವೆ',

  // Number printed on the Harsha Events banner card: 7975578275
  phoneDisplay: '+91 79755 78275',
  phoneLocal: '7975578275',
  // Country code + number, digits only - this is what wa.me needs.
  phoneWhatsApp: '917975578275',
  phoneTel: '+917975578275',

  hours: 'Every day · 8:00 AM – 10:00 PM',
  serviceArea: 'Bengaluru & across Karnataka',
  responseTime: 'We usually reply on WhatsApp within a few minutes.',

  // Website developer credit shown in the footer.
  developerName: 'Nitheesh K A',
  developerEmail: 'nitheeshkanithee2004@gmail.com',
};

/** Opens WhatsApp with a pre-filled, per-setup enquiry message. */
export function whatsappLink(message) {
  const text = message || `Hello ${BRAND.name}! I would like to know more about your decoration services.`;
  return `https://wa.me/${BRAND.phoneWhatsApp}?text=${encodeURIComponent(text)}`;
}

/** Message used by the small WhatsApp button on a single gallery photo. */
export function setupEnquiryMessage(photo) {
  return [
    `Hello ${BRAND.name}! 👋`,
    '',
    `I liked this setup from your gallery: ${photo.categoryLabel} (code ${photo.code}).`,
    'Please share the price and availability.',
  ].join('\n');
}

/** The five services advertised on the Harsha Events branding card. */
export const SERVICES = [
  {
    id: 'wedding',
    title: 'Wedding Decoration',
    kannada: 'ಮದುವೆಗಳು',
    icon: 'rings',
    text: 'Stage, mandap, entrance and full-venue decoration for the wedding day.',
  },
  {
    id: 'birthday',
    title: 'Birthday Decoration',
    kannada: 'ಹುಟ್ಟುಹಬ್ಬ',
    icon: 'cake',
    text: 'Balloon arches, name backdrops, cake tables and first-birthday themes.',
  },
  {
    id: 'anniversary',
    title: 'Anniversary Decoration',
    kannada: 'ವರ್ಷಿ ಕೋತ್ಸವ',
    icon: 'heart',
    text: 'Romantic room and hall setups for anniversaries and special dates.',
  },
  {
    id: 'floral',
    title: 'Haldi & Floral Decor',
    kannada: 'ಹೂವಿನ ಅಲಂಕಾರ',
    icon: 'flower',
    text: 'Marigold, jasmine and leaf decor for haldi, mehendi and pooja functions.',
  },
  {
    id: 'events',
    title: 'Event Decoration',
    kannada: 'ಕಾರ್ಯಕ್ರಮಗಳು',
    icon: 'stage',
    text: 'Baby showers, naming ceremonies, engagements, house-warmings and more.',
  },
];

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#demo-videos', label: 'Videos' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];
