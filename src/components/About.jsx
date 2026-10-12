import bannerCard from '../assets/brand/banner-card.jpg';
import ownerPhoto from '../assets/brand/owner.jpg';
import { BRAND, whatsappLink } from '../data/site.js';
import { ABOUT_PHOTOS, TOTAL_PHOTOS } from '../data/gallery.js';
import { WhatsAppIcon, CheckIcon } from './Icons.jsx';

const STEPS = [
  {
    title: 'Tell us the occasion',
    text: 'Send the date, the venue and the occasion on WhatsApp. A photo of the hall helps a lot.',
  },
  {
    title: 'We suggest a design',
    text: 'You get a few matching design options with a clear price, before anything is booked.',
  },
  {
    title: 'We set up and clear',
    text: 'Our team arrives early, finishes the decoration and removes everything after the function.',
  },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <div className="about-media">
          <figure className="about-owner">
            <img
              src={ownerPhoto}
              alt={`Harsha, founder of ${BRAND.name}`}
              width="376"
              height="502"
              loading="lazy"
            />
          </figure>
          <div className="about-thumbs">
            {ABOUT_PHOTOS.map((photo) => (
              <img
                key={photo.id}
                src={photo.thumb}
                alt={`${photo.categoryLabel} decoration`}
                width={photo.thumbWidth}
                height={photo.thumbHeight}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="about-copy">
          <p className="eyebrow">Who we are</p>
          <h2>
            A local team that <span className="gold-text">decorates for you</span>
          </h2>
          <p>
            {BRAND.name} is a Karnataka based decoration team. We handle birthdays, weddings,
            anniversaries, haldi and floral functions — from a small cake table at home to a full
            hall stage.
          </p>
          <p className="about-kannada" lang="kn">
            {BRAND.nameKannada} — {BRAND.taglineKannada}
          </p>
          <ul className="about-points">
            <li>
              <CheckIcon size={17} />
              {TOTAL_PHOTOS} real setups in our gallery — the decoration you see is what we build.
            </li>
            <li>
              <CheckIcon size={17} />
              Balloons, flowers, drapes and lights arranged by our own team.
            </li>
            <li>
              <CheckIcon size={17} />
              {BRAND.hours} · {BRAND.serviceArea}
            </li>
          </ul>

          <div className="about-actions">
            <a
              className="btn btn-gold"
              href={whatsappLink(
                `Hello ${BRAND.name}! I would like to plan a decoration. Here are my event details:`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={19} />
              Plan my decoration
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <figure className="about-banner">
          <img
            src={bannerCard}
            alt={`${BRAND.name} — ${BRAND.tagline}. Services: weddings, birthday, anniversary, floral decor and events. Contact ${BRAND.phoneDisplay}.`}
            width="1500"
            height="500"
            loading="lazy"
          />
        </figure>

        <ol className="steps">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
