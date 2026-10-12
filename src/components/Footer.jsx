import logoBadge from '../assets/brand/logo-badge.png';
import { BRAND, NAV_LINKS, SERVICES, whatsappLink } from '../data/site.js';
import { CATEGORIES } from '../data/gallery.js';
import { PhoneIcon, WhatsAppIcon } from './Icons.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  const galleryCategories = CATEGORIES.filter((category) => category.id !== 'all');

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img className="footer-mark" src={logoBadge} alt="" width="88" height="88" />
          <p className="footer-name">{BRAND.name}</p>
          <p className="footer-tagline">{BRAND.tagline}</p>
          <p className="footer-kannada" lang="kn">
            {BRAND.nameKannada} — {BRAND.taglineKannada}
          </p>
          <a
            className="btn btn-gold"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} />
            WhatsApp {BRAND.phoneDisplay}
          </a>
        </div>          <nav className="footer-col" aria-label="Footer navigation">
          <h3>Pages</h3>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Gallery categories">
          <h3>Gallery</h3>
          <ul>
            {galleryCategories.map((category) => (
              <li key={category.id}>
                <a href="#gallery">{category.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            {SERVICES.map((service) => (
              <li key={service.id}>{service.title}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href={`tel:${BRAND.phoneTel}`}>
                <PhoneIcon size={16} />
                {BRAND.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
            </li>
            <li>{BRAND.hours}</li>
            <li>{BRAND.serviceArea}</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Website by</h3>
          <ul>
            <li>
              <a href={`mailto:${BRAND.developerEmail}`}>
                {BRAND.developerName}
              </a>
            </li>
            <li>{BRAND.developerEmail}</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {year} {BRAND.name}. All decoration photos on this site are our own work.
        </p>
        <a href="#home">Back to top</a>
      </div>
    </footer>
  );
}
