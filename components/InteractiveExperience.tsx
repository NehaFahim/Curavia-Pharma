'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import labAnimation from '../lib/lottie/lab.json';
import researchAnimation from '../lib/lottie/research.json';
import qualityAnimation from '../lib/lottie/quality.json';
import type { Group } from 'three';

const GlobeCanvas = dynamic(() => import('./PharmaGlobe').then(m => m.PharmaGlobe), { ssr: false, loading: () => <div className="three-fallback" aria-label="Interactive globe loading" /> });

export function MotionReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: .75, ease: [0.22, 1, .36, 1] }}>{children}</motion.div>;
}

export function LottieSuccess() { return <div className="lottie-success"><Lottie animationData={qualityAnimation} loop /></div>; }

export function LottieScienceIcons() { return <div className="lottie-science-icons"><Lottie animationData={labAnimation} loop/><Lottie animationData={researchAnimation} loop/><Lottie animationData={qualityAnimation} loop/></div>; }

export function HeroOrbit() {
  const group = useRef<Group>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => { if (group.current) group.current.rotation.y += .0025; raf = requestAnimationFrame(tick); };
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="hero-ai-orbit" aria-hidden="true">
      <div className="ai-orbit-glow" />
      <div className="ai-orbit-ring ring-1" /><div className="ai-orbit-ring ring-2" /><div className="ai-orbit-ring ring-3" />
      <div className="ai-core"><span>CP</span><small>SCIENCE ENGINE</small></div>
      {Array.from({ length: 12 }).map((_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}
      <span className="ai-tag tag-1">QUALITY</span><span className="ai-tag tag-2">R&D</span><span className="ai-tag tag-3">SUPPLY</span>
    </div>
  );
}

export function GlobalGlobe() { return <GlobeCanvas />; }
