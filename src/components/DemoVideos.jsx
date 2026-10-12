import { BRAND } from '../data/site.js';

const VIDEOS = [
  {
    key: 'birthday-1',
    src: '/videos/WhatsApp Video 2026-10-11 at 3.39.51 PM.mp4',
    title: 'Decorative setup — video 1',
  },
  {
    key: 'birthday-2',
    src: '/videos/WhatsApp Video 2026-10-11 at 3.39.35 PM.mp4',
    title: 'Decorative setup — video 2',
  },
];

export default function DemoVideos() {
  return (
    <section className="section demo-videos" id="demo-videos">
      <div className="container">
        <div className="demo-videos-head">
          <p className="eyebrow">See it in motion</p>
          <h2>Demo videos</h2>
          <p className="section-sub">
            A few seconds from real setups we have done. Tap play to watch.
          </p>
        </div>

        <div className="demo-videos-grid">
          {VIDEOS.map((video) => (
            <figure className="video-card" key={video.key}>
              <video
                className="video-media"
                src={video.src}
                controls
                preload="metadata"
                playsInline
                aria-label={video.title}
              >
                <p>
                  Your browser does not support the video tag. You can still{' '}
                  <a href={video.src}>download {video.title}</a>.
                </p>
              </video>
              <figcaption className="video-caption">{video.title}</figcaption>
            </figure>
          ))}
        </div>

        <div className="demo-videos-note">
          <p>
            These are sample clips from larger setups. For the full design and price,
            message us on WhatsApp.
          </p>
          <a className="btn btn-gold" href={`https://wa.me/${BRAND.phoneWhatsApp}`} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
