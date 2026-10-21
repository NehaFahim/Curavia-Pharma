import type { MetadataRoute } from 'next';
import { site } from '../lib/site';

const routes = ['', '/about', '/manufacturing', '/quality', '/research', '/gallery', '/careers', '/contact', '/privacy', '/terms'];
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r, i) => ({ url: `${site.url}${r}`, lastModified: new Date(), changeFrequency: 'monthly', priority: i === 0 ? 1 : 0.6 }));
}
