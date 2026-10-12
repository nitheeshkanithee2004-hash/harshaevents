import { BRAND, SERVICES, whatsappLink } from '../data/site.js';
import { ClockIcon, PhoneIcon, PinIcon, SparkleIcon, WhatsAppIcon } from './Icons.jsx';

const QUICK_MESSAGES = [
  {
    label: 'Birthday decoration price',
    message: `Hello ${BRAND.name}! Please share the price for birthday decoration. My event date is:`,
  },
  {
    label: 'Haldi / floral decoration',
    message: `Hello ${BRAND.name}! Please share the price for haldi and floral decoration. My event date is:`,
  },
  {
    label: 'Wedding stage decoration',
    message: `Hello ${BRAND.name}! Please share the price for wedding stage decoration. My event date is:`,
  },
];

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Get in touch</p>
          <h2>
            Message us on <span className="gold-text">WhatsApp</span>
          </h2>
          <p className="section-sub">
            Send your date and venue and we will reply with designs and the price.{' '}
            {BRAND.responseTime}
          </p>

          <div className="contact-actions">
            <a
              className="btn btn-gold btn-lg"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} />
              Chat on WhatsApp
            </a>
            <a className="btn btn-ghost btn-lg" href={`tel:${BRAND.phoneTel}`}>
              <PhoneIcon size={19} />
              {BRAND.phoneDisplay}
            </a>
          </div>

          <ul className="contact-facts">
            <li>
              <WhatsAppIcon size={19} />
              <span>
                WhatsApp <strong>{BRAND.phoneDisplay}</strong>
              </span>
            </li>
            <li>
              <PhoneIcon size={19} />
              <span>
                Call <strong>{BRAND.phoneLocal}</strong>
              </span>
            </li>
            <li>
              <ClockIcon size={19} />
              <span>            {BRAND.hours}</span>
          </li>
          <li>
            <PinIcon size={19} />
            <span>{BRAND.serviceArea}</span>
          </li>
          <li>
            <span style={{ color: 'var(--muted-2)' }}>Website by</span>
          </li>
          <li>
            <a href={`mailto:${BRAND.developerEmail}`}>
              <span style={{ color: 'var(--gold-light)' }}>{BRAND.developerName}</span>
            </a>
          </li>
        </ul>


          <div className="services-covered">
            <h3>Services we cover</h3>
            <ul>
              {SERVICES.map((service) => (
                <li key={service.id}>{service.title}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="contact-card">
          <span className="contact-card-icon">
            <SparkleIcon size={26} />
          </span>
          <h3>Start with one tap</h3>
          <p>Tap a topic below and WhatsApp opens with the message already written for you.</p>
          <ul className="quick-messages">
            {QUICK_MESSAGES.map((item) => (
              <li key={item.label}>
                <a href={whatsappLink(item.message)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={18} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="contact-card-note">
            Nothing is booked or paid on this website — everything is confirmed with you personally
            on WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
