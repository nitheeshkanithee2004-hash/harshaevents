import logoLockup from '../assets/brand/logo-lockup.png';
import { BRAND, whatsappLink } from '../data/site.js';
import { CATEGORY_COUNTS, HERO_PHOTOS, TOTAL_PHOTOS } from '../data/gallery.js';
import { WhatsAppIcon, PhoneIcon, SparkleIcon } from './Icons.jsx';

export default function Hero() {
  const highlight = HERO_PHOTOS[2] || HERO_PHOTOS[0];

  return (
    <section className="hero" id="home">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <SparkleIcon size={16} />
            {BRAND.serviceArea}
          </p>

          <img
            className="hero-lockup"
            src={logoLockup}
            alt={`${BRAND.name} — Events & Decor`}
            width="760"
            height="440"
          />

          <h1>
            We decorate <span className="gold-text">your dreams</span>.
          </h1>
          <p className="hero-sub">
            Birthday, wedding, anniversary, haldi and floral decoration — set up neatly, on time, and
            exactly the way you pictured it.
          </p>
          <p className="hero-kannada" lang="kn">
            {BRAND.nameKannada} — {BRAND.taglineKannada}
          </p>

          <div className="hero-actions">
            <a
              className="btn btn-gold btn-lg"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} />
              Book on WhatsApp
            </a>
            <a className="btn btn-ghost btn-lg" href="#gallery">
              See {TOTAL_PHOTOS} real setups
            </a>
          </div>

          <a className="hero-phone" href={`tel:${BRAND.phoneTel}`}>
            <PhoneIcon size={18} />
            <span>
              Call directly <strong>{BRAND.phoneDisplay}</strong>
            </span>
          </a>

          <dl className="hero-stats">
            <div>
              <dt>{TOTAL_PHOTOS}</dt>
              <dd>Setups in our gallery</dd>
            </div>
            <div>
              <dt>{CATEGORY_COUNTS.birthday || 0}</dt>
              <dd>Birthday themes</dd>
            </div>
            <div>
              <dt>{(CATEGORY_COUNTS.haldi || 0) + (CATEGORY_COUNTS.anniversary || 0)}</dt>
              <dd>Haldi &amp; floral stages</dd>
            </div>
          </dl>
        </div>

        <div className="hero-collage">
          {highlight && (
            <figure className="collage-main">
              <img
                src={highlight.src}
                alt={`${highlight.categoryLabel} decoration by ${BRAND.name}`}
                width={highlight.width}
                height={highlight.height}
                fetchPriority="high"
              />
              <figcaption>{highlight.categoryLabel}</figcaption>
            </figure>
          )}
          <div className="collage-side">
            {HERO_PHOTOS.slice(0, 2).map((photo) => (
              <figure key={photo.id}>
                <img
                  src={photo.src}
                  alt={`${photo.categoryLabel} decoration by ${BRAND.name}`}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
          <p className="collage-note">
            Real setups from real functions — nothing here is a stock photo.
          </p>
        </div>
      </div>
    </section>
  );
}
