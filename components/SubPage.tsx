import Link from 'next/link';
import { LogoGlyph } from './Logo';
import { site } from '../lib/site';

export function SubHeader() {
  return (
    <header className="sub-header">
      <Link href="/" className="brand" aria-label={`${site.name} home`}>
        <span className="brand-mark"><LogoGlyph /></span>
        <span>{site.short}<small>PHARMA</small></span>
      </Link>
      <nav aria-label="Primary">
        <Link href="/about">About</Link>
        <Link href="/manufacturing">Manufacturing</Link>
        <Link href="/quality">Quality</Link>
        <Link href="/research">R&amp;D</Link>
        <Link href="/contact" className="sub-cta">Contact</Link>
      </nav>
    </header>
  );
}

export function SubFooter() {
  return (
    <footer className="sub-footer">
      <span>© 2026 {site.name} — Concept project by {site.author}.</span>
      <span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/">Home</Link></span>
    </footer>
  );
}
