import { useEffect, useState } from 'react';
import logoLockup from '../assets/brand/logo-lockup.png';
import { BRAND, NAV_LINKS, whatsappLink } from '../data/site.js';
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from './Icons.jsx';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stop the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.classList.toggle('is-locked', menuOpen);
    return () => document.body.classList.remove('is-locked');
  }, [menuOpen]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          <img className="brand-mark" src={logoLockup} alt="Harsha Events & Decor" width="48" height="44" />
          <span className="brand-text">
            <strong>{BRAND.shortName}</strong>
            <span>Events &amp; Decor</span>
          </span>
        </a>

        <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            className="btn btn-gold nav-cta"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <WhatsAppIcon size={18} />
            WhatsApp Us
          </a>
          <a className="nav-call" href={`tel:${BRAND.phoneTel}`} onClick={() => setMenuOpen(false)}>
            <PhoneIcon size={17} />
            {BRAND.phoneDisplay}
          </a>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
    </header>
  );
}
