# Curavia Pharma — concept website (portfolio project)

A premium, fully responsive pharmaceutical brand website built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, GSAP, Framer Motion, Lenis and Lottie.
Curavia is a **fictional brand**: figures, certifications, testimonials and contact details are illustrative.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Deploy (Vercel)
Import the repo, then set `NEXT_PUBLIC_SITE_URL` to your live URL (e.g. `https://curavia.vercel.app`) so OG image, sitemap and canonical URLs are correct.

## Customise
- Brand name, tagline, author, email, phone: `lib/site.ts`
- Products and all images: `lib/data.ts`
- Logo: `components/Logo.tsx` (+ `app/icon.svg`)
- Favicon / OG: `app/icon.svg`, `public/favicon.ico`, `app/apple-icon.png`, `app/opengraph-image.png`, `app/twitter-image.png`, `public/icons/*`
- Photo credits: `ASSET_SOURCES.md`
