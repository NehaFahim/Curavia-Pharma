import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SubHeader, SubFooter } from '../../components/SubPage';
import { IMG, px } from '../../lib/data';
import { site } from '../../lib/site';

type Page = { eyebrow: string; title: string; copy: string; image?: string; cards?: [string, string][]; legal?: [string, string][] };

const capability: Page = {
  eyebrow: 'MANUFACTURING & CAPABILITIES', title: 'Capability with control at every step.',
  copy: 'From material handling and formulation to packaging, documentation and supply, every stage is designed around repeatable, traceable decisions.',
  image: IMG.facility,
  cards: [['Material control', 'Incoming checks, segregation and traceable material records.'], ['Process discipline', 'Defined parameters, in-process controls and operator-friendly SOPs.'], ['Packaging & release', 'Packaging verification, batch review and release readiness.']],
};

const pages: Record<string, Page> = {
  about: { eyebrow: 'ABOUT US', title: 'A brand story built around quality.', image: IMG.about,
    copy: 'Curavia is a concept pharmaceutical company. This page shows how a corporate story — mission, leadership, facilities and milestones — would be presented.',
    cards: [['Mission', 'Make quality visible in every interaction, from formulation to delivery.'], ['Approach', 'Science-led development with documentation-first operations.'], ['Outlook', 'Global-ready processes built to scale responsibly.']] },
  manufacturing: capability,
  capabilities: capability,
  quality: { eyebrow: 'QUALITY ASSURANCE', title: 'Quality systems made visible.', image: IMG.validate,
    copy: 'Quality is presented as a connected system — incoming materials, in-process checks, analytical review and release. Standards shown on the site are illustrative badges, not real certifications.',
    cards: [['Incoming materials', 'Specification checks and supplier documentation.'], ['In-process control', 'Checkpoints, deviations and corrective actions.'], ['Release review', 'Batch record review and final approval.']] },
  research: { eyebrow: 'RESEARCH & DEVELOPMENT', title: 'From questions to better formulations.', image: IMG.research,
    copy: 'A dedicated R&D page would cover formulation development, analytical workflows, laboratory capabilities and research updates.',
    cards: [['Formulation', 'Dosage-form selection, excipient screening and prototype batches.'], ['Analytical', 'Method development, validation and stability programmes.'], ['Scale-up', 'Pilot batches and technology transfer planning.']] },
  gallery: { eyebrow: 'GALLERY / FACILITY TOUR', title: 'See the environment behind the work.', image: px(15831822, 1600),
    copy: 'Laboratories, packaging lines and quality checks. The full interactive gallery lives on the home page.' },
  testimonials: { eyebrow: 'TESTIMONIALS', title: 'Experiences, presented with context.', copy: 'Partner stories, ratings and video testimonials would be presented here, always attributed and approved.' },
  careers: { eyebrow: 'CAREERS', title: 'Build what comes next.', image: px(8442110, 1600),
    copy: 'A careers page for open roles, team culture and application forms. Curavia is a concept brand, so there are no live vacancies.',
    cards: [['Science', 'Formulation, analytical and process-development roles.'], ['Operations', 'Production, packaging and supply-chain teams.'], ['Quality', 'QA, QC and regulatory affairs specialists.']] },
  contact: { eyebrow: 'CONTACT US', title: 'Start a conversation.', image: IMG.facilityMini,
    copy: `The enquiry form, map and document upload live on the home page. Email: ${site.email} · Phone: ${site.phone} (illustrative details).` },
  privacy: { eyebrow: 'LEGAL', title: 'Privacy policy.', copy: 'Curavia is a portfolio concept website. This summary explains what the site does with your data.',
    legal: [
      ['What we collect', 'Nothing is stored. Enquiry and newsletter forms are validated by the server and then discarded.'],
      ['Analytics', 'Anonymous interaction events (such as scroll depth) are sent to a concept endpoint that does not store or share them.'],
      ['Cookies & caching', 'The site sets no tracking cookies. A service worker may cache pages so the site works offline.'],
      ['Third parties', 'Fonts load from Google Fonts and photographs from the Pexels CDN, which may receive your IP address as part of a normal request.'],
      ['Contact', `Questions about this project: ${site.author}.`]] },
  terms: { eyebrow: 'LEGAL', title: 'Terms of use.', copy: 'Please read these short terms before using this concept website.',
    legal: [
      ['Concept project', 'Curavia Pharma is a fictional brand created for portfolio purposes. It does not manufacture, sell or advertise real medicines.'],
      ['No medical advice', 'Nothing on this site is medical, clinical or regulatory advice.'],
      ['Illustrative claims', 'Figures, certifications, testimonials and addresses are placeholders and must not be relied upon.'],
      ['Images', 'Photographs are free-to-use stock images from Pexels and remain the property of their creators. See ASSET_SOURCES.md.'],
      ['Code & design', `Site design and code © 2026 ${site.author}.`]] },
};

export function generateStaticParams() { return Object.keys(pages).map(slug => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const page = pages[slug];
  if (!page) return {};
  return { title: page.title.replace(/\.$/, ''), description: page.copy, alternates: { canonical: `/${slug}` } };
}

export default async function SubRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const page = pages[slug];
  if (!page) notFound();
  return (
    <>
      <SubHeader />
      <main className="sub-main">
        <section className="sub-hero">
          {page.image && <div className="sub-hero-img" style={{ backgroundImage: `url(${page.image})` }} />}
          <div className="sub-hero-shade" />
          <div className="sub-hero-inner">
            <small className="sub-eyebrow">{page.eyebrow}</small>
            <h1>{page.title}</h1>
            <p>{page.copy}</p>
            <div className="sub-actions">
              <Link href="/" className="btn primary">Back to home</Link>
              <Link href="/#contact" className="btn glass">Contact / Partner</Link>
            </div>
          </div>
        </section>
        {page.cards && <section className="sub-cards">{page.cards.map(([t, d], i) => <article key={t}><span>0{i + 1}</span><h2>{t}</h2><p>{d}</p></article>)}</section>}
        {page.legal && <section className="sub-legal">{page.legal.map(([t, d]) => <article key={t}><h2>{t}</h2><p>{d}</p></article>)}</section>}
      </main>
      <SubFooter />
    </>
  );
}
