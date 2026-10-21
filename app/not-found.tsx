import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="error-screen">
      <div className="error-card">
        <span className="eyebrow teal">CURAVIA / 404</span>
        <h1>Page not found.</h1>
        <p>The page you are looking for does not exist or has moved.</p>
        <Link className="btn primary" href="/">Return home</Link>
      </div>
    </main>
  );
}
