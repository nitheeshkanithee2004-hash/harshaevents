import { useCallback, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Gallery from './components/Gallery.jsx';
import Lightbox from './components/Lightbox.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import DemoVideos from './components/DemoVideos.jsx';
import Footer from './components/Footer.jsx';
import FloatingButtons from './components/FloatingButtons.jsx';
import { PHOTOS } from './data/gallery.js';

export default function App() {
  // The lightbox opens on any photo; we keep the list that was visible so
  // "next / previous" walks through the filtered selection, not the whole site.
  const [lightbox, setLightbox] = useState(null);

  const openPhoto = useCallback((photo, list) => {
    const sequence = list && list.length ? list : PHOTOS;
    const index = Math.max(
      0,
      sequence.findIndex((item) => item.id === photo.id)
    );
    setLightbox({ sequence, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const step = useCallback(
    (delta) => {
      setLightbox((current) => {
        if (!current) return current;
        const total = current.sequence.length;
        return { ...current, index: (current.index + delta + total) % total };
      });
    },
    []
  );

  const activePhoto = useMemo(() => {
    if (!lightbox) return null;
    return lightbox.sequence[lightbox.index] || null;
  }, [lightbox]);

  return (
    <>
      <a className="skip-link" href="#gallery">
        Skip to gallery
      </a>
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery onOpenPhoto={openPhoto} />
        <DemoVideos />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      {activePhoto && (
        <Lightbox
          photo={activePhoto}
          position={{ index: lightbox.index, total: lightbox.sequence.length }}
          onClose={closeLightbox}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </>
  );
}
