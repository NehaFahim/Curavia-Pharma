'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Curavia application error:', error);
  }, [error]);

  return (
    <main className="error-screen">
      <div className="error-card">
        <span className="eyebrow teal">CURAVIA / RECOVERY</span>
        <h1>Something interrupted this experience.</h1>
        <p>Please try again. If the problem continues, reload the page.</p>
        <button className="btn primary" onClick={() => reset()}>Try again</button>
      </div>
    </main>
  );
}
