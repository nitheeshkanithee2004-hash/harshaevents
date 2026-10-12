import { BRAND, SERVICES, whatsappLink } from '../data/site.js';
import { CATEGORY_COUNTS } from '../data/gallery.js';
import { SERVICE_ICONS, WhatsAppIcon, CheckIcon } from './Icons.jsx';

const INCLUDED = [
  'Setup and removal done by our own team',
  'Balloons, flowers and drapes included',
  'Photos on WhatsApp before the event',
];

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">What we do</p>
          <h2>
            Five kinds of decoration, <span className="gold-text">one team</span>
          </h2>
          <p className="section-sub">
            Pick the occasion and message us on WhatsApp — we will suggest a design and share the
            price the same day.
          </p>
        </header>

        <div className="service-grid">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];
            const count = CATEGORY_COUNTS[service.id] || 0;
            return (
              <article className="service-card" key={service.id}>
                <span className="service-icon">
                  <Icon size={26} />
                </span>
                <h3>{service.title}</h3>
                <p className="service-kannada" lang="kn">
                  {service.kannada}
                </p>
                <p>{service.text}</p>
                <p className="service-count">
                  {count > 0 ? `${count} photo${count > 1 ? 's' : ''} in gallery` : 'Gallery coming soon'}
                </p>
                <a
                  className="service-link"
                  href={whatsappLink(
                    `Hello ${BRAND.name}! I need ${service.title.toLowerCase()}. Please share the price and available designs.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire
                  <WhatsAppIcon size={16} />
                </a>
              </article>
            );
          })}
        </div>

        <ul className="included-list">
          {INCLUDED.map((item) => (
            <li key={item}>
              <CheckIcon size={17} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
