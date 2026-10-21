import { NextResponse } from 'next/server';
import { productList } from '../../../lib/data';

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get('q')?.trim().toLowerCase() || '';
  const results = productList
    .filter(p => `${p.name} ${p.category} ${p.blurb}`.toLowerCase().includes(q))
    .map(p => ({ name: p.name, category: p.category, slug: p.slug }));
  return NextResponse.json({ query: q, results, concept: true });
}
