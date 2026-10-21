// Single source of truth for brand + SEO values. Edit here and the whole site updates.
export const site = {
  name: 'Curavia Pharma',
  short: 'CURAVIA',
  tagline: 'Precision. Quality. Care.',
  title: 'Curavia Pharma | Precision. Quality. Care.',
  description:
    'Curavia Pharma is a concept pharmaceutical brand website — manufacturing, quality systems, research & development and global supply, presented with a premium interactive experience.',
  // Set NEXT_PUBLIC_SITE_URL in your host (e.g. https://curavia.vercel.app) for correct OG/sitemap URLs.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  author: 'Neha Fahim',
  email: 'hello@curavia.example',
  phone: '+1 (555) 010-0148',
};
