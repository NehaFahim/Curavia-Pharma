'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { HeroOrbit, MotionReveal, LottieScienceIcons, LottieSuccess } from '../components/InteractiveExperience';
import { LogoGlyph } from '../components/Logo';
import { IMG, productList, gallery } from '../lib/data';
import { site } from '../lib/site';
import {
  Activity, ArrowDownRight, ArrowRight, Award, Beaker, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  CircleDot, ClipboardCheck, Factory, Facebook, FileCheck2, FlaskConical, Globe2, Instagram, Linkedin, Mail,
  MapPin, Menu, MessageCircle, Microscope, MoveUpRight, PackageCheck, Phone, Play, Search, Send, ShieldCheck,
  Sparkles, Upload, X, Youtube, Eye, ExternalLink, RotateCcw
} from 'lucide-react';

const heroSlides = [
  { image: IMG.heroLine, kicker: 'PRECISION • QUALITY • INNOVATION', title: 'Advancing healthcare', accent: 'through precision.', copy: 'A future-facing pharmaceutical experience built around disciplined manufacturing, research-led development and dependable quality systems.' },
  { image: IMG.heroLab, kicker: 'RESEARCH • DEVELOPMENT • DISCOVERY', title: 'Science that moves', accent: 'ideas forward.', copy: 'A premium presentation of formulation thinking, controlled experimentation and continuous improvement.' },
  { image: IMG.heroPack, kicker: 'MANUFACTURING • CONTROL • DELIVERY', title: 'Built for every', accent: 'critical detail.', copy: 'From development intent to controlled delivery, every interaction is designed to communicate confidence and operational discipline.' },
];

const products = productList.map(p => [p.name, p.blurb, p.category, p.image, p.tag] as const);

const features = [
  ['Advanced Manufacturing','Modern production workflows designed around consistency, traceability and process discipline.',Factory,'01'],
  ['Quality Assurance','Quality systems integrated from incoming materials through finished-product release.',ShieldCheck,'02'],
  ['Global Standards','A structured approach to documentation, compliance readiness and international expectations.',Globe2,'03'],
  ['Research & Development','Research-led formulation thinking with laboratory testing and continuous improvement.',FlaskConical,'04'],
  ['Reliable Supply','Production planning and operational visibility designed to support dependable supply.',PackageCheck,'05'],
  ['Regulatory Excellence','Documentation-first processes that keep quality and regulatory considerations connected.',FileCheck2,'06'],
] as const;

const processSteps = [
  ['01','Discover','Understand the product objective, target requirements and manufacturing context before defining the path forward.',IMG.discover],
  ['02','Develop','Translate requirements into a practical formulation and development pathway supported by structured experimentation.',IMG.develop],
  ['03','Validate','Test, document and review the process with a focus on repeatability, quality and readiness.',IMG.validate],
  ['04','Deliver','Move toward controlled production, packaging and supply with clear documentation and operational discipline.',IMG.deliver],
];


const markets = ['North America','Europe','Middle East','South Asia','Africa','Central Asia'];
const slugify = (value: unknown) => String(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) { items.forEach(x => x.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    items.forEach(x => observer.observe(x));
    return () => observer.disconnect();
  }, []);
}

function useTilt() {
  // Intentionally CSS-only. Third-party tilt libraries mutate inline styles after SSR
  // and can trigger hydration mismatches on interactive cards.
  useEffect(() => {
    document.documentElement.classList.add('motion-cards-ready');
    return () => document.documentElement.classList.remove('motion-cards-ready');
  }, []);
}

function usePremiumMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: .9, smoothWheel: true, syncTouch: false });
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf); gsap.ticker.lagSmoothing(1000, 16);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-gsap-reveal]').forEach(el => gsap.fromTo(el,{y:38,opacity:0,filter:'blur(8px)'},{y:0,opacity:1,filter:'blur(0px)',duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}));
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach(el => {
        const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT); const nodes:Text[]=[]; let node:Node|null;
        while((node=walker.nextNode())) nodes.push(node as Text);
        nodes.forEach(textNode=>{ const words=textNode.textContent?.split(/(\s+)/)||[]; const frag=document.createDocumentFragment(); words.forEach(part=>{ if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(part));return;} if(!part)return; const mask=document.createElement('span'); mask.className='split-mask'; const word=document.createElement('span'); word.className='split-word'; word.textContent=part; mask.appendChild(word); frag.appendChild(mask); }); textNode.parentNode?.replaceChild(frag,textNode); });
        gsap.fromTo(el.querySelectorAll('.split-word'),{yPercent:110,opacity:0},{yPercent:0,opacity:1,stagger:.045,duration:.7,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
      });
    });
    return () => { ctx.revert(); lenis.destroy(); gsap.ticker.remove(raf); };
  }, []);
}

function useMagnetic() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
    const cleanups: (() => void)[] = [];
    els.forEach(el => {
      const move = (e: MouseEvent) => { const r = el.getBoundingClientRect(); const x = (e.clientX - (r.left + r.width/2)) * .12; const y = (e.clientY - (r.top + r.height/2)) * .12; el.style.transform = `translate3d(${x}px,${y}px,0)`; };
      const leave = () => { el.style.transform = ''; };
      el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave); cleanups.push(() => { el.removeEventListener('mousemove',move); el.removeEventListener('mouseleave',leave); });
    });
    return () => cleanups.forEach(fn => fn());
  }, []);
}

function PharmaNetworkVisual() {
  return <div className="pharma-network-visual" aria-label="Animated pharmaceutical global supply network">
    <div className="pharma-aura" />
    <motion.div className="route-orbit route-orbit-a" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
    <motion.div className="route-orbit route-orbit-b" animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }} />
    <motion.div className="first-aid-kit" animate={{ y: [0,-8,0], rotate: [0,1.2,0,-1.2,0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
      <div className="kit-handle"><span /></div><div className="kit-lid"><div className="kit-cross" /></div><div className="kit-body"><div className="kit-label"><small>CURAVIA</small><b>PHARMA</b><span>QUALITY / CARE</span></div><div className="kit-lock" /></div>
    </motion.div>
    <motion.div className="medicine-capsule capsule-a" animate={{ x:[0,16,0], y:[0,-8,0], rotate:[-8,4,-8] }} transition={{ duration: 4.8, repeat: Infinity, ease:'easeInOut' }}><i/><b/></motion.div>
    <motion.div className="medicine-capsule capsule-b" animate={{ x:[0,-13,0], y:[0,9,0], rotate:[18,-4,18] }} transition={{ duration: 5.5, repeat: Infinity, ease:'easeInOut' }}><i/><b/></motion.div>
    <motion.div className="blister-pack" animate={{ y:[0,7,0], rotate:[4,2,4] }} transition={{ duration: 6, repeat: Infinity, ease:'easeInOut' }}><span/><span/><span/><span/><span/><span/></motion.div>
    <div className="network-node node-1"><i/><span>R&D</span></div><div className="network-node node-2"><i/><span>QUALITY</span></div><div className="network-node node-3"><i/><span>SUPPLY</span></div>
    <svg className="pharma-routes" viewBox="0 0 620 520" preserveAspectRatio="none" aria-hidden="true"><path d="M55 365 C145 285 145 150 275 205 S450 320 560 135"/><path d="M75 130 C185 225 210 385 355 345 S470 260 560 365"/></svg>
    <div className="network-status"><span><i/> NETWORK ACTIVE</span><b>CONTROLLED SUPPLY</b><small>Pharma operations • global-ready architecture</small></div>
  </div>;
}

export default function Home() {
  useReveal(); useMagnetic(); usePremiumMotion(); useTilt();
  const [loaded,setLoaded] = useState(false), [loadProgress,setLoadProgress] = useState(0), [menu,setMenu] = useState(false), [mega,setMega] = useState(false), [searchOpen,setSearchOpen] = useState(false), [query,setQuery] = useState('');
  const [slide,setSlide] = useState(0), [step,setStep] = useState(0), [modal,setModal] = useState<number|null>(null), [lightbox,setLightbox] = useState<number|null>(null), [toast,setToast] = useState('');
  const [chat,setChat] = useState(false), [newsletter,setNewsletter] = useState(''), [newsState,setNewsState] = useState('idle');
  const cursorRef = useRef<HTMLDivElement|null>(null);
  const cursorFrame = useRef<number|null>(null);
  const cursorTarget = useRef({x:0,y:0});
  const [scrolled,setScrolled] = useState(false), [expandedFeature,setExpandedFeature] = useState<number|null>(null), [testimonialIndex,setTestimonialIndex] = useState(0), [voiceListening,setVoiceListening] = useState(false), [lightZoom,setLightZoom] = useState(1), [certModal,setCertModal] = useState<string|null>(null);
  const processRef = useRef<HTMLElement|null>(null);
  const [searchQuery,setSearchQuery] = useState(''), [debouncedSearch,setDebouncedSearch] = useState('');
  const heroTimer = useRef<number | null>(null);

  useEffect(() => { const t = window.setTimeout(() => setDebouncedSearch(searchQuery), 300); return () => window.clearTimeout(t); }, [searchQuery]);
  const filtered = useMemo(() => products.filter(p => `${p[0]} ${p[1]} ${p[2]}`.toLowerCase().includes(debouncedSearch.toLowerCase())).slice(0,6), [debouncedSearch]);
  const notify = (message:string) => { setToast(message); window.setTimeout(() => setToast(''), 3200); };

  useEffect(() => {
    const started=performance.now(); const loader=window.setInterval(()=>{const p=Math.min(100,Math.round(((performance.now()-started)/1650)*100));setLoadProgress(p);if(p>=100)window.clearInterval(loader)},25); const t = window.setTimeout(() => setLoaded(true), 1950);
    heroTimer.current = window.setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 3000);
    const key = (e:KeyboardEvent) => {
      if(e.key === 'Escape'){ setSearchOpen(false); setModal(null); setLightbox(null); setMega(false); setChat(false); }
      if(lightbox !== null && e.key === 'ArrowRight') setLightbox(i => i === null ? 0 : (i+1)%gallery.length);
      if(lightbox !== null && e.key === 'ArrowLeft') setLightbox(i => i === null ? 0 : (i-1+gallery.length)%gallery.length);
    };
    window.addEventListener('keydown', key);
    const depthSent=new Set<number>();
    const scroll = () => { const pct=Math.min(100, window.scrollY / Math.max(1, document.documentElement.scrollHeight-window.innerHeight)*100); document.documentElement.style.setProperty('--scroll', `${pct}%`); [25,50,75,100].forEach(mark=>{if(pct>=mark&&!depthSent.has(mark)){depthSent.add(mark);fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event:`scroll_depth_${mark}`})}).catch(()=>{});}}); };
    window.addEventListener('scroll',scroll,{passive:true}); scroll();
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const pointer = (e:MouseEvent) => {
      if(isCoarse) return;
      cursorTarget.current = {x:e.clientX,y:e.clientY};
      const el = cursorRef.current;
      if(el){
        el.classList.add('visible');
        if(cursorFrame.current === null){
          cursorFrame.current = requestAnimationFrame(() => {
            cursorFrame.current = null;
            const t = cursorTarget.current;
            el.style.transform = `translate3d(${t.x}px,${t.y}px,0) translate3d(-50%,-50%,0)`;
          });
        }
      }
    };
    const over = (e:MouseEvent) => {
      if(isCoarse) return;
      const target=e.target as HTMLElement;
      cursorRef.current?.classList.toggle('hover', !!target.closest('a,button,input,textarea,[role=button]'));
    };
    const scrollState = () => setScrolled(window.scrollY > 30);
    window.addEventListener('mousemove',pointer,{passive:true}); window.addEventListener('mouseover',over,{passive:true}); window.addEventListener('scroll',scrollState,{passive:true}); scrollState();
    if('serviceWorker' in navigator && process.env.NODE_ENV==='production') navigator.serviceWorker.register('/sw.js').catch(()=>{});
    const processScroll = () => { const el=processRef.current; if(!el || window.innerWidth < 900) return; const r=el.getBoundingClientRect(); const progress=Math.min(.999,Math.max(0,(window.innerHeight-r.top)/(r.height+window.innerHeight*.25))); setStep(Math.min(3,Math.floor(progress*4))); };
    window.addEventListener('scroll',processScroll,{passive:true}); processScroll();
    return () => { window.clearTimeout(t); window.clearInterval(loader); if(heroTimer.current) window.clearInterval(heroTimer.current); window.removeEventListener('keydown',key); window.removeEventListener('scroll',scroll); window.removeEventListener('mousemove',pointer); window.removeEventListener('mouseover',over); if(cursorFrame.current!==null) cancelAnimationFrame(cursorFrame.current); window.removeEventListener('scroll',scrollState); window.removeEventListener('scroll',processScroll); };
  }, [lightbox]);

  useEffect(() => { const t=window.setInterval(()=>setTestimonialIndex(i=>(i+1)%3),4200); return ()=>window.clearInterval(t); }, []);
  useEffect(() => { if(searchQuery) window.history.replaceState({},'',`/?search=${encodeURIComponent(searchQuery)}#products`); }, [searchQuery]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-count]');
    if(!nodes.length) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target as HTMLElement; const target = Number(el.dataset.count || 0); const suffix = el.dataset.suffix || ''; let n = 0;
      const start = performance.now(); const tick = (now:number) => { const p=Math.min(1,(now-start)/1100); const eased=1-Math.pow(1-p,3); el.textContent=`${suffix==='%' ? (target*eased).toFixed(1) : Math.round(target*eased)}${suffix}`; if(p<1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); observer.unobserve(el);
    }),{threshold:.6}); nodes.forEach(n=>observer.observe(n)); return()=>observer.disconnect();
  }, [loaded]);

  const submitNewsletter = async (e:React.FormEvent) => {
    e.preventDefault(); if(!newsletter.includes('@')) { notify('Please enter a valid email address.'); return; }
    setNewsState('loading');
    try { const r=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:newsletter})}); const d=await r.json(); if(!r.ok) throw new Error(d.message); setNewsState('success'); setNewsletter(''); notify(d.message); }
    catch { setNewsState('idle'); notify('Something went wrong. Please try again in a moment.'); }
  };
  const submitContact = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const form=e.currentTarget; const file=(form.elements.namedItem('file') as HTMLInputElement)?.files?.[0];
    const allowed=['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/jpeg','image/png'];
    if(file && !allowed.includes(file.type)){notify('Unsupported file type. Use PDF, DOC, DOCX, JPG or PNG.');return;}
    if(file && file.size>5*1024*1024){notify('Attachment must be under 5MB.');return;}
    try { const r=await fetch('/api/contact',{method:'POST',body:new FormData(form)}); const d=await r.json(); if(!r.ok) throw new Error(d.message); notify(d.message); form.reset(); }
    catch { notify('Something went wrong. Please try again in a moment.'); }
  };
  const startVoiceSearch = () => {
    const W=window as typeof window & { webkitSpeechRecognition?: any; SpeechRecognition?: any }; const Recognition=W.SpeechRecognition || W.webkitSpeechRecognition;
    if(!Recognition){ notify('Voice search needs browser Speech Recognition support.'); return; }
    const recognition=new Recognition(); recognition.lang='en-US'; recognition.onstart=()=>setVoiceListening(true); recognition.onend=()=>setVoiceListening(false); recognition.onerror=()=>{setVoiceListening(false);notify('Voice search could not access the microphone.');}; recognition.onresult=(event:any)=>setSearchQuery(event.results[0][0].transcript); recognition.start();
  };
  const track = (event:string) => { fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event})}).catch(()=>{}); };

  return <>
    {!loaded && <div className="preloader"><div className="preloader-orbit"><span/><span/><span/><span/><b><LogoGlyph/></b></div><div className="loader-word">CURAVIA <small>PHARMA</small></div><div className="loader-progress"><i/></div><div className="loader-meta"><span>Preparing the science</span><b>{loadProgress}%</b></div></div>}
    <div className="progress" />
    <div ref={cursorRef} className="cursor" aria-hidden="true" />

    <header className={`header ${scrolled?'scrolled':''}`} onMouseLeave={()=>setMega(false)}>
      <a href="#home" className="brand" aria-label="Curavia Pharma home"><span className="brand-mark"><LogoGlyph/></span><span>CURAVIA<small>PHARMA</small></span></a>
      <nav className={menu?'open':''}>
        <a href="#home" onClick={()=>setMenu(false)}>Home</a>
        <a href="#about" onClick={()=>setMenu(false)}>About</a>
        <button className="nav-drop" onClick={()=>setMega(!mega)}>Capabilities <ChevronDown size={13}/></button>
        <a href="#products" onClick={()=>setMenu(false)}>Products</a><a href="#quality" onClick={()=>setMenu(false)}>Quality</a><a href="#research" onClick={()=>setMenu(false)}>R&D</a><a href="#global" onClick={()=>setMenu(false)}>Global</a><a href="#contact" onClick={()=>setMenu(false)}>Contact</a>
      </nav>
      <div className="header-actions"><button className="icon-btn" onClick={()=>setSearchOpen(true)} aria-label="Open search"><Search size={18}/></button><a href="#contact" className="header-cta" data-magnetic>Partner With Us <ArrowRight size={16}/></a><button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Menu">{menu?<X/>:<Menu/>}</button></div>
      {mega && <div className="mega"><div className="mega-copy"><span className="eyebrow teal">EXPLORE CURAVIA</span><h3>Capabilities designed around <span>control.</span></h3><p>See how Curavia connects science, manufacturing and quality into one controlled system.</p><a href="#capabilities" onClick={()=>setMega(false)}>View all capabilities <ArrowRight/></a></div><div className="mega-links"><a href="#capabilities"><Factory/><span><b>Manufacturing</b><small>Process & production</small></span></a><a href="#quality"><ShieldCheck/><span><b>Quality systems</b><small>Standards & assurance</small></span></a><a href="#research"><FlaskConical/><span><b>R&D</b><small>Research & formulation</small></span></a><a href="#global"><Globe2/><span><b>Global presence</b><small>Markets & operations</small></span></a></div><div className="mega-image" style={{backgroundImage:`url(${IMG.mega})`}}><span>01 / 04</span></div></div>}
    </header>

    {searchOpen && <div className="search-overlay" onClick={()=>setSearchOpen(false)}><div className="search-panel" onClick={e=>e.stopPropagation()}><div className="search-top"><Search/><input autoFocus value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search products, capabilities or R&D…"/><button onClick={()=>setSearchOpen(false)}><X/></button><button className={`voice-btn ${voiceListening?'listening':''}`} onClick={startVoiceSearch} aria-label="Voice search"><Microscope/></button></div><div className="search-suggest"><span>Suggested</span><button onClick={()=>setSearchQuery('tablets')}>Tablets</button><button onClick={()=>setSearchQuery('manufacturing')}>Manufacturing</button><button onClick={()=>setSearchQuery('research')}>Research</button></div>{searchQuery ? <div className="search-results">{filtered.length ? filtered.map((p,i)=><a key={String(p[0])} href="#products" onClick={()=>setSearchOpen(false)}><img src={String(p[3])} loading="lazy" decoding="async" alt=""/><span><b>{p[0]}</b><small>{p[1]}</small></span><em>0{i+1}</em><ArrowRight/></a>) : <div className="empty-search"><Search/><b>No result found</b><span>Try another product or capability.</span></div>}</div> : <div className="search-hint"><Sparkles/><span>Search runs on local concept data.</span></div>}</div></div>}

    <main>
      <section id="home" className="hero">
        <div className="hero-slides">{heroSlides.map((s,i)=><div key={s.title} className={`hero-slide ${slide===i?'active':''}`} style={{backgroundImage:`url(${s.image})`}} />)}</div>
        <div className="hero-parallax layer-back"/><div className="hero-parallax layer-mid"/><div className="hero-parallax layer-front"/><div className="hero-vignette"/><div className="hero-grid"/><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
        <div className="hero-molecule"><i/><i/><i/><i/><i/><span/></div><MotionReveal><HeroOrbit/></MotionReveal>
        <div className="container hero-content" data-reveal>
          <div className="eyebrow"><span/> {heroSlides[slide].kicker}</div>
          <div className="hero-counter"><span>0{slide+1}</span><i/><span>0{heroSlides.length}</span></div>
          <h1 key={slide} className="hero-type">{heroSlides[slide].title}<br/><em>{heroSlides[slide].accent}</em></h1>
          <p>{heroSlides[slide].copy}</p>
          <div className="hero-actions"><a className="btn primary" href="#products" data-magnetic onClick={()=>track('hero_portfolio_cta')}>Explore Our Portfolio <ArrowRight/></a><a className="btn glass" href="#capabilities" data-magnetic onClick={()=>track('hero_capabilities_cta')}>Discover Capabilities <MoveUpRight/></a></div>
          <div className="hero-trust"><div><ShieldCheck/><span><b>Quality-first</b><small>Systems-led approach</small></span></div><div><Globe2/><span><b>Global mindset</b><small>International-ready</small></span></div><div><FlaskConical/><span><b>Research-led</b><small>Development focus</small></span></div></div>
        </div>
        <div className="hero-bottom"><div className="hero-dots">{heroSlides.map((_,i)=><button key={i} onClick={()=>setSlide(i)} className={slide===i?'active':''} aria-label={`Slide ${i+1}`}/>)}</div><a className="scroll-cue" href="#about"><span>Scroll to explore</span><ChevronDown/></a><div className="hero-status"><span className="pulse-dot"/> SYSTEMS • SCIENCE • SUPPLY</div></div>
      </section>

      <div className="marquee"><div><span>QUALITY BY DESIGN</span><i>✦</i><span>CONTROLLED MANUFACTURING</span><i>✦</i><span>RESEARCH-LED DEVELOPMENT</span><i>✦</i><span>GLOBAL-READY OPERATIONS</span><i>✦</i><span>QUALITY BY DESIGN</span><i>✦</i></div></div>

      <section id="about" className="section about"><div className="container about-grid"><div className="about-media" data-reveal><div className="image-frame"><img src={IMG.about} loading="lazy" decoding="async" alt="Scientist conducting research in a modern laboratory"/><div className="image-sheen"/></div><div className="media-card"><span>01</span><b>Science in every decision.</b><small>From development to delivery.</small></div><div className="floating-chip"><Activity/> <span>Process visibility</span></div></div><div className="about-copy" data-reveal><div className="eyebrow">ABOUT CURAVIA</div><h2 data-split>Built for the moments where <span>quality matters.</span></h2><p>Curavia Pharma is a concept pharmaceutical brand: a modern manufacturer built around controlled processes, formulation thinking and research-informed innovation.</p><p className="muted">Curavia is a fictional company created for a portfolio project, so the history, figures and standards shown here are illustrative.</p><a className="text-link" href="#capabilities">Explore our capabilities <ArrowRight/></a><div className="stats"><div><strong data-count="25" data-suffix="+">0+</strong><small>Years of excellence*</small></div><div><strong data-count="500" data-suffix="+">0+</strong><small>Products*</small></div><div><strong data-count="50" data-suffix="+">0+</strong><small>Countries*</small></div><div><strong data-count="99.9" data-suffix="%">0%</strong><small>Quality commitment*</small></div></div><small className="demo-note">*Illustrative figures for a concept brand.</small></div></div></section>

      <section id="manufacturing" className="section manufacturing"><div className="container manufacturing-grid"><div className="manufacturing-visual" data-reveal><div className="facility-main"><img src={IMG.facility} loading="lazy" decoding="async" alt="Stainless-steel pharmaceutical processing equipment"/><div className="facility-scan"/></div><div className="facility-mini"><img src={IMG.facilityMini} loading="lazy" decoding="async" alt="Technician in protective clothing in a sterile corridor"/><span><b>CONTROLLED ENVIRONMENT</b><small>Stock photography • concept project</small></span></div><div className="facility-orbit"><span>GMP-READY</span><span>TRACEABLE</span><span>DOCUMENTED</span></div></div><div className="manufacturing-copy" data-reveal><div className="eyebrow teal">MANUFACTURING & CAPABILITIES</div><h2 data-split>Built around <span>repeatability.</span></h2><p>Present the manufacturing story as a sequence of controlled decisions — from material handling and formulation through packaging, documentation and supply.</p><div className="manufacturing-metrics"><div><b>01</b><span>Material control</span></div><div><b>02</b><span>Process discipline</span></div><div><b>03</b><span>Quality checkpoints</span></div><div><b>04</b><span>Release readiness</span></div></div><a className="text-link" href="/capabilities">Explore manufacturing <ArrowRight/></a></div></div></section>

      <section id="capabilities" className="section dark capabilities"><div className="capability-noise"/><div className="container"><div className="capability-intro" data-reveal><div><div className="eyebrow teal">WHAT WE STAND FOR / 06 SYSTEMS</div><h2 data-split>One standard.<br/><span>Every process.</span></h2></div><div className="capability-statement"><span>01—06</span><p>Six connected disciplines. One quality mindset. Explore each system and watch the visual language respond.</p><div className="signal-line"><i/></div></div></div><div className="feature-grid">{features.map(([title,desc,Icon,num],i)=><article className={`feature ${expandedFeature===i?'expanded':''}`} data-reveal key={String(title)}><div className="feature-orbit"><i/><i/><i/></div><div className="feature-top"><div className="feature-icon"><Icon/></div><span>{num}</span></div><div className="feature-index">SYSTEM / {num}</div><h3>{title}</h3><p>{desc}</p>{expandedFeature===i && <div className="feature-more">Capability specifications, facility information and documentation scope would be detailed here.</div>}<div className="feature-glow"/></article>)}</div><div className="capability-footer" data-reveal><span><i/> SYSTEMS CONNECTED</span><b>QUALITY → SCIENCE → MANUFACTURING → SUPPLY</b><small>Concept architecture</small></div></div></section>

      <section id="technology" className="section technology"><div className="tech-pulse"/><div className="container technology-grid"><div className="technology-copy" data-reveal><div className="eyebrow teal">QUALITY TECHNOLOGY / ANALYTICS</div><h2 data-split>Data, documentation, <span>discipline.</span></h2><p>A visual quality-control interface inspired by real analytical dashboards — built to make traceability, checkpoints and process signals feel tangible rather than decorative.</p><div className="tech-list"><div><span>01</span><b>Batch traceability</b><small>Structured records and controlled workflows.</small></div><div><span>02</span><b>Analytical review</b><small>Testing signals, trend review and controlled decisions.</small></div><div><span>03</span><b>Digital readiness</b><small>Integration points prepared for future enterprise APIs.</small></div></div></div><div className="quality-console" data-reveal><div className="console-top"><span><i className="live-dot"/> QUALITY CONTROL / ANALYTICS LAB</span><i>CONCEPT UI</i></div><div className="console-chart"><div className="chart-grid"/><div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><svg viewBox="0 0 600 240" preserveAspectRatio="none"><path className="chart-area" d="M0 184 C55 164 62 176 112 140 S180 112 228 126 S292 94 344 105 S398 74 445 88 S512 48 600 62 L600 240 L0 240Z"/><path className="chart-line" d="M0 184 C55 164 62 176 112 140 S180 112 228 126 S292 94 344 105 S398 74 445 88 S512 48 600 62"/></svg><div className="chart-node n1"/><div className="chart-node n2"/><div className="chart-node n3"/><div className="chart-node n4"/><span className="chart-pill">SYSTEM STATUS <b>READY</b></span><span className="chart-readout">TREND / STABLE <b>+2.8%</b></span></div><div className="console-row"><div><small>PROCESS SIGNAL</small><b>98.7%</b><i className="mini-bar"><span style={{width:'98.7%'}}/></i></div><div><small>CHECKPOINTS</small><b>24</b><i className="mini-bar"><span style={{width:'78%'}}/></i></div><div><small>TRACEABILITY</small><b>100%</b><i className="mini-bar"><span style={{width:'100%'}}/></i></div></div><div className="console-footer"><span>▣ DATA STREAM</span><span>↗ ANALYTICS</span><span>◌ AUDIT TRAIL</span></div></div></div></section>

      <section ref={processRef} className="section process"><div className="container"><div className="section-head" data-reveal><div><div className="eyebrow teal">OUR APPROACH / CONTROLLED FLOW</div><h2 data-split>From first question<br/><span>to controlled delivery.</span></h2></div><p>A sticky storytelling experience for the future manufacturing and development workflow.</p></div><div className="process-desktop"><div className="steps">{processSteps.map((p,i)=><button className={`step ${step===i?'active':''}`} key={p[0]} onClick={()=>setStep(i)}><span>{p[0]}</span><div><b>{p[1]}</b><p>{p[2]}</p></div><ArrowRight/></button>)}</div><div className="process-visual" data-reveal><div className="process-image-stack">{processSteps.map((p,i)=><img key={p[0]} className={step===i?'active':''} src={p[3]} loading="lazy" decoding="async" alt={p[1]}/>)}</div><div className="process-progress"><i style={{width:`${((step+1)/processSteps.length)*100}%`}}/></div><div className="process-label"><span>Current phase</span><b>{processSteps[step][1]}</b><small>{processSteps[step][0]} / 04</small></div></div></div><div className="process-mobile">{processSteps.map(p=><article key={p[0]} data-reveal><div className="mobile-process-image"><img src={p[3]} loading="lazy" decoding="async" alt={p[1]}/><span>{p[0]}</span></div><h3>{p[1]}</h3><p>{p[2]}</p></article>)}</div></div></section>

      <section id="products" className="section soft products"><div className="container"><div className="section-head" data-reveal><div><div className="eyebrow">FORMULATIONS & PRODUCTS</div><h2 data-split>Explore the <span>portfolio.</span></h2></div><a className="text-link" href="#contact">Discuss a formulation <ArrowRight/></a></div><div className="product-grid">{products.map((p,i)=><article className="product" data-reveal key={String(p[0])} onClick={()=>setModal(i)}><div className="product-img"><img src={String(p[3])} loading="lazy" decoding="async" alt={String(p[0])}/><span>{p[4]}</span><button aria-label="Quick view" onClick={e=>{e.stopPropagation();setModal(i)}}><Eye/></button><div className="product-glare"/></div><div className="product-body"><small>{p[1]}</small><h3>{p[0]}</h3><div className="product-links"><button onClick={e=>{e.stopPropagation();setModal(i)}}>Quick view <ArrowRight/></button><a href={`/products/${slugify(p[0])}`} onClick={e=>e.stopPropagation()}>Details <ExternalLink/></a></div></div></article>)}</div></div></section>

      <section id="global" className="section global global-pharma"><div className="global-pharma-grid container"><div className="global-copy" data-reveal><div className="eyebrow teal">GLOBAL PRESENCE / NETWORK</div><h2 data-split>Designed to think <span>beyond borders.</span></h2><p>A pharmaceutical network visual built around the things that move healthcare forward: research, quality, medicine and controlled supply.</p><div className="market-list">{markets.map((m,i)=><div key={m}><span>0{i+1}</span><b>{m}</b><i>→</i></div>)}</div><div className="global-metric"><span><b>50+</b><small>markets*</small></span><i/><span><b>06</b><small>regions</small></span><i/><span><b>24/7</b><small>network mindset</small></span></div></div><div className="global-pharma-stage" data-reveal><PharmaNetworkVisual/></div></div></section>

      <section className="section gallery"><div className="container"><div className="section-head" data-reveal><div><div className="eyebrow">FACILITIES & RESEARCH</div><h2 data-split>A closer look at <span>the work.</span></h2></div><p>A visual walk through laboratories, packaging lines and quality checks. All images are licensed stock photography used for this concept.</p></div><div className="masonry">{gallery.map(([src,label],i)=><button key={i} className={`gallery-item g${i}`} data-reveal onClick={()=>{setLightZoom(1);setLightbox(i)}}><img src={src} loading="lazy" decoding="async" alt={label}/><span><Eye/> <b>{label}</b><small>View image</small></span></button>)}</div></div></section>

      <section id="research" className="section research"><div className="research-bg" style={{backgroundImage:`url(${IMG.research})`}}/><div className="research-shade"/><div className="science-particles">{Array.from({length:22}).map((_,i)=><i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div><div className="container research-grid"><div className="research-copy" data-reveal><div className="eyebrow teal">RESEARCH & DEVELOPMENT</div><h2 data-split>Better questions lead to <span>better formulations.</span></h2><p>Research is where disciplined curiosity meets controlled experimentation. This concept positions Curavia around formulation thinking, analytical testing and continuous improvement.</p><div className="research-points"><span><Check/> Formulation thinking</span><span><Check/> Analytical discipline</span><span><Check/> Continuous improvement</span></div><a className="btn white" href="#contact" data-magnetic>Start a conversation <ArrowRight/></a></div><div className="molecule" data-reveal><LottieScienceIcons/><div className="molecule-core"><Beaker/><b>R&D</b><small>SCIENCE</small></div>{Array.from({length:10}).map((_,i)=><i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div></div></section>

      <section id="quality" className="section quality"><div className="container"><div className="section-head" data-reveal><div><div className="eyebrow">QUALITY & STANDARDS</div><h2 data-split>Trust is built into <span>the system.</span></h2></div><p>Illustrative badges for a concept brand — not claims of real certification.</p></div><div className="cert-grid">{['GMP','ISO','WHO','FDA'].map((x,i)=><div className="cert" data-reveal key={x}><div className="cert-inner"><div className="cert-front"><Award/><strong>{x}</strong><span>Concept badge</span><small>Hover to inspect</small></div><div className="cert-back"><CheckCircle2/><b>Certificate viewer concept</b><small>A PDF viewer for verified certificates would open here.</small><button onClick={()=>setCertModal(x)}>View certificate viewer <ExternalLink/></button></div></div></div>)}</div></div></section>

      <section className="section standards"><div className="container"><div className="section-head compact" data-reveal><div><div className="eyebrow teal">STANDARDS & PARTNERSHIPS</div><h2 data-split>Designed to feel <span>globally ready.</span></h2></div><p>Certification and partner marks are visual placeholders for this concept.</p></div><div className="standards-marquee" data-reveal><div><span>GMP FRAMEWORK</span><i>✦</i><span>ISO QUALITY SYSTEMS</span><i>✦</i><span>WHO GUIDANCE</span><i>✦</i><span>REGULATORY READINESS</span><i>✦</i><span>GLOBAL SUPPLY</span><i>✦</i><span>GMP FRAMEWORK</span><i>✦</i><span>ISO QUALITY SYSTEMS</span><i>✦</i></div></div></div></section>

      <section className="section testimonial"><div className="container testimonial-card coverflow" data-reveal><div className="quote-icon">“</div><div><div className="eyebrow">TESTIMONIAL / 0{testimonialIndex+1}</div><blockquote>{['A future-ready pharmaceutical partner should make quality visible in every interaction — from formulation thinking to manufacturing discipline.','The strongest manufacturing story connects science, process and dependable execution.','Premium digital presentation should make complex pharmaceutical operations easier to understand.'][testimonialIndex]}</blockquote><div className="stars">{Array.from({length:5}).map((_,i)=><span key={i}>★</span>)}</div><div className="quote-person"><div>“</div><span><b>{['Procurement lead','Quality reviewer','Operations partner'][testimonialIndex]}</b><small>Illustrative quote</small></span></div></div><div className="testimonial-controls"><button onClick={()=>setTestimonialIndex(i=>(i+2)%3)}><ChevronLeft/></button><button onClick={()=>setTestimonialIndex(i=>(i+1)%3)}><ChevronRight/></button><button onClick={()=>notify('Testimonials are served from /api/testimonials.')}><RotateCcw/> JSON API</button></div></div></section>

      <section id="contact" className="section contact"><div className="container contact-grid"><div className="contact-copy" data-reveal><div className="eyebrow teal">LET'S CONNECT</div><h2 data-split>Have a product in mind? <span>Let's talk.</span></h2><p>Tell us about your requirement. This is a concept site, so enquiries are validated but never stored or sent.</p><div className="contact-details"><div><Mail/><span><small>Email</small><b>{site.email}</b></span></div><div><Phone/><span><small>Phone</small><b>{site.phone}</b></span></div><div><MapPin/><span><small>Location</small><b>Illustrative address — concept brand</b></span></div></div><div className="map-card"><div className="map-grid"/><span className="map-pin p1"/><span className="map-pin p2"/><span className="map-pin p3"/><div><Globe2/><b>Map placeholder</b><small>An interactive location map would appear here for a real facility.</small></div></div></div><form className="contact-form" data-reveal onSubmit={submitContact}><div className="form-top"><span>ENQUIRY / 01</span><small>Concept workflow</small></div><div className="form-row"><label>Name<input required name="name" placeholder="Your name"/></label><label>Email<input required name="email" type="email" placeholder="you@company.com"/></label></div><div className="form-row"><label>Company<input name="company" placeholder="Company name"/></label><label>Phone<input name="phone" placeholder="+00" pattern="[0-9+()\-\s]{7,}"/></label></div><label>Subject<input required name="subject" placeholder="How can we help?"/></label><label>Message<textarea required name="message" rows={5} placeholder="Tell us about your requirement…"/></label><label className="file"><Upload/><span><b>Attach a file</b><small>PDF, DOC, DOCX, JPG or PNG • max 5MB</small></span><input name="file" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"/></label><button className="btn primary full" data-magnetic>Send Enquiry <Send/></button><small className="form-note"><ShieldCheck/> Concept site — messages are validated but not stored.</small></form></div></section>

      <section className="newsletter"><div className="container newsletter-inner"><div><div className="eyebrow teal">STAY INFORMED</div><h2>Ideas, science & industry <span>in your inbox.</span></h2></div><form onSubmit={submitNewsletter}><input aria-label="Newsletter email" value={newsletter} onChange={e=>setNewsletter(e.target.value)} placeholder="Work email address" type="email" required/><button data-magnetic disabled={newsState==='loading'}>{newsState==='loading'?'Sending…':newsState==='success'?<><LottieSuccess/> Subscribed ✓</>:'Subscribe'} <ArrowRight/></button></form></div></section>
    </main>

    <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark"><LogoGlyph/></span><span>CURAVIA<small>PHARMA</small></span></a><p>Precision, quality and care — a concept pharmaceutical brand and interactive web experience.</p><div className="socials"><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook/></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube/></a></div></div><div><h4>Company</h4><a href="#about">About Us</a><a href="#capabilities">Capabilities</a><a href="#research">Research & Development</a><a href="/careers">Careers</a><a href="/manufacturing">Manufacturing</a></div><div><h4>Solutions</h4><a href="#products">Products</a><a href="#quality">Quality</a><a href="#global">Global Presence</a><a href="#contact">Partner With Us</a></div><div><h4>Resources</h4><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="#quality">Quality documents</a><a href="#contact">Contact</a></div></div><div className="container footer-bottom"><span>© 2026 {site.name} — Concept project by {site.author}.</span><span>Built with Next.js • React • TypeScript • GSAP • Three.js</span></div></footer>

    <button className={`chat-fab ${chat?'open':''}`} onClick={()=>setChat(!chat)} aria-label="Open live chat"><MessageCircle/>{!chat&&<i/>}</button>
    {chat && <div className="chat-panel"><div><span className="online"/><b>Live chat</b><button onClick={()=>setChat(false)}><X/></button></div><p>Live chat is a concept placeholder. Send an enquiry through the contact form instead.</p><button className="chat-action" onClick={()=>{setChat(false);document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}}>Go to contact form <ArrowRight/></button></div>}
    {toast && <div className="toast"><CheckCircle2/>{toast}</div>}

    {modal!==null && <div className="modal-backdrop" onClick={()=>setModal(null)}><div className="product-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setModal(null)}><X/></button><img src={String(products[modal][3])} alt={String(products[modal][0])}/><div><div className="eyebrow teal">PRODUCT / {String(products[modal][2]).toUpperCase()}</div><h2>{products[modal][0]}</h2><p>{productList[modal].about}</p><ul className="modal-points">{productList[modal].points.map(x=><li key={x}><Check/> {x}</li>)}</ul><div className="modal-meta"><span>Category <b>{products[modal][2]}</b></span><span>Status <b>{products[modal][4]}</b></span></div><a className="btn primary" href="#contact" onClick={()=>setModal(null)}>Discuss this category <ArrowRight/></a></div></div></div>}

    {certModal && <div className="modal-backdrop" onClick={()=>setCertModal(null)}><div className="pdf-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setCertModal(null)}><X/></button><div className="pdf-page"><span className="pdf-watermark">CURAVIA CONCEPT • NOT A REAL CERTIFICATE</span><Award/><b>{certModal} / CONCEPT BADGE</b><p>This viewer shows how a verified certificate PDF would be presented. Curavia is a fictional brand, so no real certificate exists.</p></div><div className="pdf-actions"><button onClick={()=>notify('Printing is disabled for this concept certificate.')}>Print disabled</button><button onClick={()=>notify('Downloads are disabled for this concept certificate.')}>Download</button></div></div></div>}

    {lightbox!==null && <div className="lightbox" onClick={()=>setLightbox(null)}><button className="light-close" onClick={()=>setLightbox(null)}><X/></button><button className="light-prev" onClick={e=>{e.stopPropagation();setLightbox((lightbox-1+gallery.length)%gallery.length)}}><ChevronLeft/></button><div className="light-content" onClick={e=>e.stopPropagation()}><img style={{transform:`scale(${lightZoom})`}} src={gallery[lightbox][2]} alt={gallery[lightbox][1]}/><div><b>{gallery[lightbox][1]}</b><span>{lightbox+1} / {gallery.length}</span></div><div className="light-tools"><button onClick={()=>setLightZoom(z=>Math.min(2,z+.2))}>＋</button><button onClick={()=>setLightZoom(z=>Math.max(1,z-.2))}>−</button><button onClick={()=>{const img=document.querySelector('.light-content img') as HTMLImageElement|null; img?.requestFullscreen?.()}}>Fullscreen</button><button onClick={()=>{const a=document.createElement('a');a.href=gallery[lightbox][2];a.download='curavia-gallery.jpg';a.target='_blank';a.click()}}>Download</button><button onClick={()=>navigator.share?.({title:'Curavia Pharma',text:gallery[lightbox][1],url:location.href})}>Share</button></div></div><button className="light-next" onClick={e=>{e.stopPropagation();setLightbox((lightbox+1)%gallery.length)}}><ChevronRight/></button></div>}
  </>;
}
