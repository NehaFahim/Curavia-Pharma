import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SubHeader, SubFooter } from '../../../components/SubPage';
import { productList } from '../../../lib/data';
import { Check } from 'lucide-react';

const aliases: Record<string, string> = { tablets: 'pharmaceutical-tablets', capsules: 'hard-gel-capsules', injectables: 'injectable-range', supplements: 'healthcare-supplements', specialty: 'specialty-formulations', pediatric: 'pediatric-solutions' };
const find = (slug: string) => productList.find(p => p.slug === (aliases[slug] || slug));

export function generateStaticParams() { return [...productList.map(p => ({ slug: p.slug })), ...Object.keys(aliases).map(slug => ({ slug }))]; }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = find(slug);
  return p ? { title: p.name, description: p.about, alternates: { canonical: `/products/${p.slug}` } } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = find(slug);
  if (!p) notFound();
  return (
    <>
      <SubHeader />
      <main className="sub-main">
        <section className="product-detail">
          <div className="product-detail-img"><img src={p.image.replace('w=900', 'w=1400')} alt={p.name} /></div>
          <div className="product-detail-copy">
            <small className="sub-eyebrow">PRODUCT / {p.category.toUpperCase()}</small>
            <h1>{p.name}</h1>
            <p>{p.about}</p>
            <ul>{p.points.map(x => <li key={x}><Check size={18} /> {x}</li>)}</ul>
            <p className="sub-note">Concept range — specifications are illustrative.</p>
            <div className="sub-actions">
              <Link href="/#products" className="btn dark">Back to portfolio</Link>
              <Link href="/#contact" className="btn primary">Discuss this category</Link>
            </div>
          </div>
        </section>
      </main>
      <SubFooter />
    </>
  );
}
