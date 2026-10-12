import { useEffect, useRef } from 'react';
import { BRAND, setupEnquiryMessage, whatsappLink } from '../data/site.js';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  PhoneIcon,
  WhatsAppIcon,
} from './Icons.jsx';

export default function Lightbox({ photo, position, onClose, onPrev, onNext }) {
  const closeRef = useRef(null);

  // Keyboard controls + scroll lock while the viewer is open.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('is-locked');
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.categoryLabel} decoration ${photo.code}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lightbox-bar">
        <span className="lightbox-count">
          {String(position.index + 1).padStart(2, '0')} / {String(position.total).padStart(2, '0')}
        </span>
        <span className="lightbox-tag">
          {photo.code} · {photo.categoryLabel}
        </span>
        <button
          type="button"
          className="icon-btn"
          ref={closeRef}
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          <CloseIcon size={22} />
        </button>
      </div>

      <button type="button" className="lightbox-nav is-prev" onClick={onPrev} aria-label="Previous photo">
        <ChevronLeftIcon size={26} />
      </button>

      <figure className="lightbox-stage">
        <img src={photo.src} alt={`${photo.categoryLabel} decoration by ${BRAND.name} — ${photo.code}`} />
        <figcaption>{photo.title}</figcaption>
      </figure>

      <button type="button" className="lightbox-nav is-next" onClick={onNext} aria-label="Next photo">
        <ChevronRightIcon size={26} />
      </button>

      <div className="lightbox-actions">
        <a
          className="btn btn-gold"
          href={whatsappLink(setupEnquiryMessage(photo))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={19} />
          Enquire about {photo.code}
        </a>
        <a className="btn btn-ghost" href={`tel:${BRAND.phoneTel}`}>
          <PhoneIcon size={18} />
          {BRAND.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
