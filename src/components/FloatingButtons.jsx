import { useEffect, useState } from 'react';
import { BRAND, whatsappLink } from '../data/site.js';
import { ArrowUpIcon, WhatsAppIcon } from './Icons.jsx';

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="floating">
      <button
        type="button"
        className={`float-btn float-top${showTop ? ' is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUpIcon size={20} />
      </button>

      <a
        className="float-btn float-wa"
        href={whatsappLink(
          `Hello ${BRAND.name}! I would like to plan a decoration. Please share the details.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${BRAND.name} on WhatsApp`}
      >
        <WhatsAppIcon size={26} />
        <span className="float-wa-label">Chat with us</span>
      </a>
    </div>
  );
}
