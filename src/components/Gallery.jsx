import { useMemo, useState } from 'react';
import { BRAND, setupEnquiryMessage, whatsappLink } from '../data/site.js';
import { CATEGORIES, countFor, photosFor } from '../data/gallery.js';
import { WhatsAppIcon, GridIcon } from './Icons.jsx';

export default function Gallery({ onOpenPhoto }) {
  const [active, setActive] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const photos = useMemo(() => photosFor(active), [active]);
  const activeCategory = CATEGORIES.find((category) => category.id === active) || CATEGORIES[0];

  // "All work" can be long: show a first batch and let people load the rest.
  const BATCH = 18;
  const visible = showAll ? photos : photos.slice(0, BATCH);
  const hiddenCount = photos.length - visible.length;

  const choose = (id) => {
    setActive(id);
    setShowAll(false);
  };

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Our work</p>
          <h2>
            Decoration <span className="gold-text">gallery</span>
          </h2>
          <p className="section-sub">
            Tap any photo to see it full size. Every photo has its own WhatsApp button, so we know
            exactly which setup you liked.
          </p>
        </header>

        <div className="filter-bar" role="tablist" aria-label="Filter gallery by occasion">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={active === category.id}
              className={`filter-chip${active === category.id ? ' is-active' : ''}`}
              onClick={() => choose(category.id)}
            >
              {category.label}
              <span className="chip-count">{countFor(category.id)}</span>
            </button>
          ))}
        </div>

        <p className="filter-note">{activeCategory.description}</p>

        {photos.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">
              <GridIcon size={30} />
            </span>
            <h3>Our wedding gallery is on the way</h3>
            <p>{activeCategory.emptyNote}</p>
            <a
              className="btn btn-gold"
              href={whatsappLink(
                `Hello ${BRAND.name}! Please share photos of your recent wedding / mandap decoration work and the price list.`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={19} />
              Ask for wedding work
            </a>
          </div>
        ) : (
          <>
            <ul className="photo-grid">
              {visible.map((photo) => (
                <li key={photo.id}>
                  <figure
                    className="photo-card"
                    style={{ '--ratio': `${photo.thumbWidth} / ${photo.thumbHeight}` }}
                  >
                    <button
                      type="button"
                      className="photo-open"
                      onClick={() => onOpenPhoto(photo, photos)}
                      aria-label={`Open ${photo.title} full size`}
                    >
                      <img
                        src={photo.thumb}
                        alt={`${photo.categoryLabel} decoration by ${BRAND.name} — ${photo.code}`}
                        width={photo.thumbWidth}
                        height={photo.thumbHeight}
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                    <figcaption className="photo-meta">
                      <span className="photo-code">{photo.code}</span>
                      <span className="photo-category">{photo.categoryLabel}</span>
                      <a
                        className="photo-wa"
                        href={whatsappLink(setupEnquiryMessage(photo))}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Enquire about ${photo.title} on WhatsApp`}
                        title="Ask about this setup on WhatsApp"
                      >
                        <WhatsAppIcon size={18} />
                      </a>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>

            {hiddenCount > 0 && (
              <div className="gallery-more">
                <button type="button" className="btn btn-ghost" onClick={() => setShowAll(true)}>
                  Show all {photos.length} photos
                </button>
              </div>
            )}
            {showAll && photos.length > BATCH && (
              <div className="gallery-more">
                <button type="button" className="btn btn-ghost" onClick={() => setShowAll(false)}>
                  Show fewer
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
