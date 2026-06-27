// KA Estudio — Home page sections

const { useState, useEffect, useRef } = React;

// Asset map — uses window.__resources blob URLs when running as standalone bundle,
// falls back to relative paths when running in dev with the assets folder present.
const __R = (typeof window !== 'undefined' && window.__resources) || {};
const ASSET = {
  'sparkle-negro':         __R.sparkleNegro         || 'assets/icons/sparkle-negro.png',
  'sparkle-blanco':        __R.sparkleBlanco        || 'assets/icons/sparkle-blanco.png',
  'arrow-right-negro':     __R.arrowRightNegro      || 'assets/icons/arrow-right-negro.png',
  'arrow-right-blanco':    __R.arrowRightBlanco     || 'assets/icons/arrow-right-blanco.png',
  'arrow-diag-negro':      __R.arrowDiagNegro       || 'assets/icons/arrow-diag-negro.png',
  'arrow-diag-blanco':     __R.arrowDiagBlanco      || 'assets/icons/arrow-diag-blanco.png',
  'pinwheel-negro':        __R.pinwheelNegro        || 'assets/icons/pinwheel-negro.png',
  'logo-horizontal-negro': __R.logoHorizontalNegro  || 'assets/logos/logo-horizontal-negro.png',
  'logo-horizontal-blanco':__R.logoHorizontalBlanco || 'assets/logos/logo-horizontal-blanco.png',
  'icon-circle':           __R.iconCircle           || 'assets/logos/icon-circle.png',
  'brandmark-blanco':      __R.brandmarkBlanco      || 'assets/logos/brandmark-blanco.png',
};

// ------- atoms -------
const Sparkle = ({ size = 14, color = 'negro', className = '', style = {} }) => (
  <img src={ASSET[`sparkle-${color}`]} alt="" className={className}
    style={{ width: size, height: size, flexShrink: 0, ...style }} />
);
const ArrowRight = ({ size = 14, color = 'negro', style = {} }) => (
  <img src={ASSET[`arrow-right-${color}`]} alt=""
    style={{ width: size, height: size * (20 / 32), flexShrink: 0, ...style }} />
);
const ArrowDiag = ({ size = 14, color = 'negro', style = {} }) => (
  <img src={ASSET[`arrow-diag-${color}`]} alt=""
    style={{ width: size, height: size, flexShrink: 0, ...style }} />
);
const Eyebrow = ({ children, light = false }) => (
  <span className={`eyebrow ${light ? 'is-light' : ''}`}>
    <Sparkle size={10} color={light ? 'blanco' : 'negro'} />
    <span>{children}</span>
  </span>
);
const LANDING = typeof window !== 'undefined' && window.KA_LANDING;
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
};

const Btn = ({ children, variant = 'primary', size = 'md', icon = true, href = '#', onClick }) => (
  <a href={href} className={`btn btn-${variant} ${size === 'lg' ? 'btn-lg' : ''}`}
     onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}>
    <span>{children}</span>
    {icon && <ArrowRight size={14} color={variant === 'primary' ? 'blanco' : 'negro'} />}
  </a>
);

// ------- nav -------
const NAV_LINKS = [
  ['home', 'index.html'],
  ['portafolio', 'index.html#trabajos'],
  ['servicios', 'index.html#servicios'],
];
const LANDING_NAV = [
  ['home', 'top', null],
  ['portafolio', 'trabajos', null],
  ['servicios', null, 'index.html#servicios'],
];
const Nav = ({ active = 'inicio' }) => (
  <nav className="nav" data-screen-label="Nav">
    <div className="nav-pill">
      <a href={LANDING ? '#' : 'Home.html'} className="nav-brand"
         onClick={LANDING ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } : undefined}>
        <img src={ASSET['logo-horizontal-negro']} alt="KA Estudio" />
      </a>
      <div className="nav-links">
        <a href="#" className="nav-link"
           onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>home</a>
        <a href="#trabajos" className="nav-link"
           onClick={(e) => { e.preventDefault(); scrollToId('trabajos'); }}>portafolio</a>
        <span className="nav-link nav-has-menu">
          <a href="#servicios" className="nav-link-text"
             onClick={(e) => { e.preventDefault(); scrollToId('servicios'); }}>servicios</a>
          <div className="nav-menu">
            <a href="Servicios/PlanMensual.html">plan mensual</a>
            <a href="Servicios/Producciones.html">producciones</a>
            <a href="Servicios/Corporativo.html">corporativo</a>
          </div>
        </span>
      </div>
      <div className="nav-cta">
        <Btn variant="primary" href="Contacto.html" icon={true}>hablemos</Btn>
      </div>
    </div>
  </nav>
);

// ------- hero with story player -------
// Hero: mini-stories con videos reales (sin texto sobre el video)
const STORIES = [
  { src: 'videos/reels/RAFAGA TREINO (1).mp4',                   time: '2h' },
  { src: 'videos/reels/KEEP 2 (1).mp4',                          time: '5h' },
  { src: 'videos/reels/OMODA JAECOO - VERTICAL RECAP DAY 2.mp4', time: '1d' },
  { src: 'videos/reels/8. 3820 AZOTEA - DRON EDIT.mp4',          time: '3d' },
];

const StoryPlayer = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());
  const vids = useRef([]);
  const DURATION = 6000;

  useEffect(() => {
    startRef.current = Date.now();
    setProgress(0);
    // reproduce solo el slide activo
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        try { v.currentTime = 0; const p = v.play(); if (p && p.catch) p.catch(() => {}); } catch (e) {}
      } else { v.pause(); }
    });
    const id = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      setProgress(Math.min(100, (elapsed / DURATION) * 100));
      if (elapsed >= DURATION) setActive((a) => (a + 1) % STORIES.length);
    }, 60);
    return () => clearInterval(id);
  }, [active]);

  const next = () => setActive((a) => (a + 1) % STORIES.length);

  return (
    <div className="story-stage">
      <div className="story-phone">
        {STORIES.map((s, i) => (
          <video key={i} ref={(el) => { vids.current[i] = el; }}
                 className={`story-slide ${i === active ? 'is-active' : ''}`}
                 src={s.src} muted loop playsInline preload="auto"></video>
        ))}
        <div className="story-veil"></div>

        <div className="story-progress">
          {STORIES.map((_, i) => (
            <div key={i} className={`story-progress-bar ${i < active ? 'is-done' : ''}`}>
              <span style={{ width: i === active ? `${progress}%` : (i < active ? '100%' : '0%') }} />
            </div>
          ))}
        </div>

        <div className="story-head">
          <div className="avatar">
            <img src="favicon.png" alt="" />
          </div>
          <span className="handle">kaestudio.cl</span>
          <span className="time">{STORIES[active].time}</span>
          <span className="more">⋯</span>
        </div>

        <div className="story-reply">enviar mensaje…</div>
        <div className="story-reply-icons">
          <button onClick={() => next()} aria-label="siguiente">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div className="story-badge">
        <img src={ASSET['brandmark-blanco']} alt="KA" />
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="hero" data-screen-label="Hero">
    <div className="hero-left">
      <h1 className="hero-title">
        contenido que mueve<br/>
        <em>marcas</em>, no solo el feed.
      </h1>
      <p className="hero-lede">
        Producimos contenido para marcas que buscan posicionarse en redes
        sociales a través de la estrategia, performance y pauta.
      </p>
      <div className="hero-actions">
        <Btn variant="primary" size="lg" href={LANDING ? undefined : 'index.html#trabajos'} icon={false}
             onClick={LANDING ? () => scrollToId('trabajos') : undefined}>ver trabajos</Btn>
      </div>
    </div>
    <div className="hero-right">
      <img src={ASSET['sparkle-negro']} className="hero-floating-sparkle" alt="" />
      <StoryPlayer />
    </div>
  </section>
);

// ------- brands -------
// h = altura óptica por logo (los cuadrados/compactos necesitan más alto para igualar peso visual)
const BRANDS = [
  { src: 'assets/logos/clientes/salfa.svg',       name: 'Salfa',          h: 96 },
  { src: 'assets/logos/clientes/mcdonalds.svg',    name: "McDonald's",     h: 46 },
  { src: 'assets/logos/clientes/krispy-kreme.svg', name: 'Krispy Kreme',   h: 44 },
  { src: 'assets/logos/clientes/paris-beauty.svg', name: 'Paris',          h: 30 },
  { src: 'assets/logos/clientes/bardot.svg',       name: 'Bardot',         h: 42 },
  { src: 'assets/logos/clientes/vidacel.svg',      name: 'Vidacel',        h: 40 },
  { src: 'assets/logos/clientes/meki.svg',         name: 'Meki',           h: 48 },
  { src: 'assets/logos/clientes/treino.svg',       name: 'Treino',         h: 84 },
  { src: 'assets/logos/clientes/tio-tomate.svg',   name: 'Tío Tomate',     h: 82 },
  { src: 'assets/logos/clientes/fat-kid-cafe.svg', name: 'Fat Kid Café',   h: 54 },
  { src: 'assets/logos/clientes/lcp.svg',          name: 'Little Caesars', h: 44 },
  { src: 'assets/logos/clientes/azotea-3820.svg',  name: '3820 Azotea',    h: 34 },
  { src: 'assets/logos/clientes/blanco.svg',       name: 'Convive',        h: 54 },
  // 'sabado.svg' removido: el archivo exportado viene sin la imagen incrustada (queda un espacio vacío).
];
const Brands = () => (
  <section className="brands" data-screen-label="Brands">
    <div className="brands-label">
      <Sparkle size={12} color="blanco" className="ka-spin-slow" />
      <span className="brands-label-text">han confiado en nosotros</span>
    </div>
    <div className="brands-track">
      {[0, 1].map((g) => (
        <div className="brands-group" key={g} aria-hidden={g === 1}>
          {BRANDS.map((b, i) => (
            <img key={`${g}-${i}`} className="brand-logo" src={b.src} alt={b.name} title={b.name} loading="lazy" style={{ height: (b.h || 42) + 'px' }} />
          ))}
        </div>
      ))}
    </div>
  </section>
);

// ------- stats -------
const STATS = [
  { pre: '+', target: 55,   fmt: (n) => String(n),                 suf: '',      label: 'marcas con las que hemos trabajado' },
  { pre: '+', target: 1200, fmt: (n) => n.toLocaleString('es-CL'), suf: '',      label: 'videos producidos para redes sociales' },
  { pre: '+', target: 5,    fmt: (n) => String(n),                 suf: 'años', label: 'creando contenido en Chile' },
  { pre: '+', target: 30,   fmt: (n) => String(n),                 suf: 'M',     label: 'reproducciones generadas en clientes' },
];

const useCountUp = (target, run, dur = 2200) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) { raf = requestAnimationFrame(tick); }
      else { setVal(target); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return val;
};

const Stat = ({ s, run }) => {
  const val = useCountUp(s.target, run);
  return (
    <div className="stat">
      <div className="stat-value">
        <span className="pre">{s.pre}</span>
        <span>{s.fmt(val)}</span>
        {s.suf ? <span className="suf">{s.suf}</span> : null}
      </div>
      <div className="stat-label">{s.label}</div>
    </div>
  );
};

const Stats = () => {
  const [run, setRun] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setRun(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setRun(true); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="stats" data-screen-label="Stats">
      <div className="stats-media">
        <video className="stats-reel" src="videos/ads/reel-ka-studio.mp4"
               autoPlay muted loop playsInline preload="metadata"></video>
      </div>
      <div className="stats-content">
        <div className="stats-intro">
          <Eyebrow>C I F R A S</Eyebrow>
          <h2>números que nos respaldan.</h2>
        </div>
        <div className="stats-grid" ref={ref}>
          {STATS.map((s, i) => (
            <Stat key={i} s={s} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ------- services -------
const SERVICES = [
  {
    n: '01', tag: 'recomendado', name: 'plan mensual',
    pitch: 'Operación 360 de contenido y pauta para crecer en redes. Rodajes mensuales y gestión de tus campañas pagadas.',
    includes: [
      'Contenido vertical mensual',
      'Gestión de anuncios (Meta, TikTok)',
      'Community management completo',
      'Reportes mensuales de performance',
    ],
    price: 'plan integral · mensual',
    featured: true,
    link: 'Servicios/PlanMensual.html',
  },
  {
    n: '02', tag: '', name: 'producciones',
    pitch: 'Proyectos puntuales de videos promocionales para tu marca. Lanzamientos, branding, productos. Te acompañamos desde la idea hasta el resultado final.',
    includes: [
      'Contenidos publicitarios',
      'Cobertura de eventos y lanzamientos',
      'Dirección creativa, producción y realización',
    ],
    price: 'cotización · por proyecto',
    featured: false,
    link: 'Servicios/Producciones.html',
  },
  {
    n: '03', tag: '', name: 'corporativo',
    pitch: 'Cubrimos las necesidades audiovisuales de empresas. Llevamos la imagen corporativa a los formatos digitales.',
    includes: [
      'Videos institucionales y de marca',
      'Comunicación interna y capacitaciones',
      'Registro de procesos y operaciones',
      'Fotografías y material corporativo',
    ],
    price: 'a medida · por empresa',
    featured: false,
    link: 'Servicios/Corporativo.html',
  },
];
const Services = () => (
  <section className="services" id="servicios" data-screen-label="Services">
    <div className="services-head">
      <div>
        <Eyebrow>S E R V I C I O S</Eyebrow>
        <h2 style={{ marginTop: 14 }}>cómo trabajamos contigo.</h2>
      </div>
    </div>
    <div className="services-grid">
      {SERVICES.map((s) => (
        <article key={s.n} className={`service-card ${s.featured ? 'is-featured' : ''}`}>
          <div className="service-head">
            <span className="service-num">{s.n}</span>
            {s.tag ? <span className="service-tag">{s.tag}</span> : null}
          </div>
          <h3>{s.name}</h3>
          <p className="service-pitch">{s.pitch}</p>
          <div className="service-divider"></div>
          <ul className="service-includes">
            {s.includes.map((i) => (
              <li key={i}><span className="check">✓</span><span>{i}</span></li>
            ))}
          </ul>
          <div className="service-foot">
            <span className="service-price">{s.price}</span>
            <a className="service-arrow" href={s.link} aria-label="ver más">
              <ArrowDiag size={16} color="negro" />
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

// ------- showcase / biblioteca de videos -------
// Cada video apunta a videos/<carpeta>/<archivo>.mp4.
// Sube los .mp4 a esas carpetas (ver videos/_LEEME.txt) y se reproducen solos.
// `featured: true` = aparece en "trabajos destacados" del home (al principio).
const VID = 'videos/';
const POSTER = {
  car:     'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=540&q=80',
  car2:    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=540&q=80',
  food:    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=540&q=80',
  plates:  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=540&q=80',
  fashion: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=540&q=80',
  fashion2:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=540&q=80',
  night:   'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=540&q=80',
  music:   'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=540&q=80',
  donuts:  'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=540&q=80',
  pizza:   'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=540&q=80',
  love:    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=540&q=80',
  bbq:     'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=540&q=80',
  gym:     'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=540&q=80',
  house:   'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=540&q=80',
  beauty:  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=540&q=80',
  product: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=540&q=80',
  bts:     'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=540&q=80',
  tech:    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=540&q=80',
};

// ----- REELS (16) -----
const REELS = [
  { file: VID + 'reels/5.6 SALFA ARICA - KIA SPORTAGE.mp4',          cat: 'reel · automotriz',  client: 'kia sportage',       dur: '0:22', poster: POSTER.car,      featured: true },
  { file: VID + 'reels/8. 3820 AZOTEA - DRON EDIT.mp4',              cat: 'reel · gastronomía', client: 'dron edit',          dur: '0:18', poster: POSTER.food,     featured: true },
  { file: VID + 'reels/OMODA JAECOO - VERTICAL RECAP DAY 2.mp4',     cat: 'reel · automotriz',  client: 'recap omoda',        dur: '0:30', poster: POSTER.car2 },
  { file: VID + 'reels/3.1 BARDOT - OUTFIT VIBES.mp4',               cat: 'reel · lifestyle',   client: 'outfit vibes',       dur: '0:24', poster: POSTER.fashion,  featured: true },
  { file: VID + 'reels/TIO TOMATE - UGC 01.mp4',                     cat: 'reel · food',        client: 'tío tomate ugc',     dur: '0:28', poster: POSTER.plates },
  { file: VID + 'reels/5. TREINO - VISUAL 01.mp4',                   cat: 'reel · fitness',     client: 'visual 01',          dur: '0:18', poster: POSTER.gym },
  { file: VID + 'reels/3. 3820 AZOTEA - NUEVOS PLATOS.mp4',          cat: 'reel · gastronomía', client: 'nuevos platos',      dur: '0:22', poster: POSTER.plates },
  { file: VID + 'reels/2. MAYAN - NIGHT OUT V2.mp4',                 cat: 'reel · lifestyle',   client: 'night out',          dur: '0:20', poster: POSTER.night,    featured: true },
  { file: VID + 'reels/KEEP 2 (1).mp4',                              cat: 'reel · marca',       client: 'keep',               dur: '0:20', poster: POSTER.product },
  { file: VID + 'reels/2. BARDOT - LIFESTYLE MUSIC SESSIONS.mp4',    cat: 'reel · lifestyle',   client: 'music sessions',     dur: '0:24', poster: POSTER.music },
  { file: VID + 'reels/RAFAGA TREINO (1).mp4',                       cat: 'reel · fitness',     client: 'ráfaga treino',      dur: '0:18', poster: POSTER.gym },
  { file: VID + 'reels/10. 3820 AZOTEA - MI LUGAR FAVORITO UGC.mp4', cat: 'reel · gastronomía', client: 'mi lugar favorito',  dur: '0:26', poster: POSTER.food },
  { file: VID + 'reels/2. BARDOT - LIFESTYLE NEW YEAR 2.mp4',        cat: 'reel · lifestyle',   client: 'new year',           dur: '0:20', poster: POSTER.fashion2 },
  { file: VID + 'reels/BROTHER - SUBLIMADORA - UGC.mp4',             cat: 'reel · ugc',         client: 'sublimadora',        dur: '0:24', poster: POSTER.tech },
  { file: VID + 'reels/4. BARDOT - ZOOM OUT.mp4',                    cat: 'reel · lifestyle',   client: 'zoom out',           dur: '0:15', poster: POSTER.fashion },
  { file: VID + 'reels/PRADERAS LA DEHESA - TOUR CASA.mp4',          cat: 'reel · inmobiliaria',client: 'tour casa',          dur: '0:35', poster: POSTER.house },
].map((v) => ({ ...v, group: 'reels' }));

// ----- CAMPAÑAS (8) -----
const CAMPANAS = [
  { file: VID + 'campanas/KRISPY KREME - DONUTS.mp4',         cat: 'campaña · food',   client: 'donuts',          dur: '0:30', poster: POSTER.donuts, featured: true },
  { file: VID + 'campanas/LITTLE CAESAR - TEASER.mp4',        cat: 'campaña · food',   client: 'teaser',          dur: '0:20', poster: POSTER.pizza,  featured: true },
  { file: VID + 'campanas/LA FETE - SAN VALENTIN V1.mp4',     cat: 'campaña · retail', client: 'san valentín',    dur: '0:25', poster: POSTER.love },
  { file: VID + 'campanas/1. LA FETE - CAJA ESPECIAL.mp4',       cat: 'campaña · retail', client: 'caja especial',   dur: '0:18', poster: POSTER.product },
  { file: VID + 'campanas/1._ _KK VALENTINES - BTS - FINAL.mp4', cat: 'campaña · food', client: 'valentines bts', dur: '0:24', poster: POSTER.bts },
  { file: VID + 'campanas/Master_Brisket_V_Media.mp4',        cat: 'campaña · food',   client: 'brisket',         dur: '0:40', poster: POSTER.bbq },
  { file: VID + 'campanas/REEL 1 - CONSUMO V4.mp4',           cat: 'campaña · marca',  client: 'consumo',         dur: '0:22', poster: POSTER.food },
  { file: VID + 'campanas/MC_TEASER_TEXTO V5.mp4',            cat: 'campaña · food',   client: 'mc teaser',       dur: '0:15', poster: POSTER.bts },
].map((v) => ({ ...v, group: 'campañas' }));

// ----- EVENTOS (4) -----
const EVENTOS = [
  { file: VID + 'eventos/1.OMODA - CINEMATIC DAY 1.mp4',       cat: 'evento · automotriz', client: 'cinematic day',    dur: '0:45', poster: POSTER.car,    featured: true },
  { file: VID + 'eventos/RABANNE - FINAL.mp4',                 cat: 'evento · beauty',     client: 'lanzamiento',      dur: '0:35', poster: POSTER.beauty, featured: true },
  { file: VID + 'eventos/HABLA - JEAN PAUL GAULTIER.mp4',      cat: 'evento · beauty',     client: 'jean paul gaultier', dur: '0:30', poster: POSTER.beauty },
  { file: VID + 'eventos/LA FETE - VALLE NEVADO - VERTICAL.mp4', cat: 'evento · marca', client: 'valle nevado', dur: '0:30', poster: POSTER.bts },
].map((v) => ({ ...v, group: 'eventos' }));

const VIDEOS = [...REELS, ...CAMPANAS, ...EVENTOS];
const SHOWCASE = VIDEOS; // alias retro-compat
// Orden de pestañas: arranca en reels para no cargar las 32 de una.
const VIDEO_TABS = ['reels', 'campañas', 'eventos', 'todos'];
const filterVideos = (tab, onlyFeatured) => {
  let list = tab === 'todos' ? VIDEOS : VIDEOS.filter((v) => v.group === tab);
  if (onlyFeatured && tab === 'todos') list = VIDEOS.filter((v) => v.featured);
  return list;
};

// Iconos de sonido para el control de mute
const SoundIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none"/>
    <path d="M16 8.5a4 4 0 0 1 0 7"/>
    <path d="M18.5 6a7 7 0 0 1 0 12"/>
  </svg>
);
const MutedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none"/>
    <line x1="16" y1="9" x2="21" y2="15"/>
    <line x1="21" y1="9" x2="16" y2="15"/>
  </svg>
);

const VideoTile = ({ v }) => {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);

  // Autoplay silencioso sólo cuando el tile está a la vista (rendimiento)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const play = () => { const p = el.play(); if (p && p.catch) p.catch(() => {}); };
    if (!('IntersectionObserver' in window)) { play(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { e.isIntersecting ? play() : el.pause(); });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    const el = ref.current;
    const m = !muted;
    setMuted(m);
    if (el) {
      el.muted = m;
      // al activar sonido en un tile, silencia los demás
      if (!m) document.querySelectorAll('video.tile-video').forEach((o) => { if (o !== el) o.muted = true; });
    }
  };

  return (
    <figure className="tile">
      <video ref={ref} className="tile-video" src={v.file}
             autoPlay muted loop playsInline preload="metadata"></video>
      <button className="tile-mutebtn" onClick={toggleMute}
              aria-label={muted ? 'activar sonido' : 'silenciar'}>
        {muted ? <MutedIcon /> : <SoundIcon />}
      </button>
    </figure>
  );
};

const SHOWCASE_PREVIEW_COUNT = 6;
const Showcase = () => {
  const items = VIDEOS;
  // dos filas, alternando para que ambas queden parejas
  const rowA = items.filter((_, i) => i % 2 === 0);
  const rowB = items.filter((_, i) => i % 2 === 1);
  return (
    <section className="showcase" id="trabajos" data-screen-label="Showcase">
      <div className="showcase-head">
        <div>
          <Eyebrow light>T R A B A J O S · D E S T A C A D O S</Eyebrow>
          <h2 style={{ marginTop: 14 }}>el formato es vertical, los resultados no.</h2>
        </div>
      </div>
      <div className="showcase-rows">
        <div className="showcase-row">
          {rowA.map((v, i) => <VideoTile key={`a-${i}`} v={v} />)}
        </div>
        <div className="showcase-row">
          {rowB.map((v, i) => <VideoTile key={`b-${i}`} v={v} />)}
        </div>
      </div>
    </section>
  );
};

// ------- resultados -------
const RES_PILLS = [
  { label: 'aumento de conversión', pos: 'p1' },
  { label: 'reducción de costos', pos: 'p2' },
  { label: 'análisis de resultados', pos: 'p3' },
];
const Resultados = () => (
  <section className="resultados" data-screen-label="Resultados">
    <div className="resultados-inner">
      <div className="res-left">
        <Eyebrow>R E S U L T A D O S</Eyebrow>
        <h2 className="res-title">
          creamos contenido que <em>convierte</em>, no solo que se ve bien.
        </h2>
        <p className="res-lede">
          Desde la estrategia hasta la pauta, construimos sistemas de contenido
          que escalan tu inversión publicitaria de forma rentable.
        </p>
        <div className="res-actions">
          <a href="#" className="btn btn-accent btn-lg" onClick={(e) => { e.preventDefault(); scrollToId('contacto'); }}>
            <span>trabajemos juntos</span>
            <ArrowRight size={14} color="blanco" />
          </a>
        </div>
        <div className="res-partners">
          <span className="res-partners-label">pauta optimizada en</span>
          <div className="res-partners-list">
            <span>Meta</span><span className="sep">·</span>
            <span>TikTok</span><span className="sep">·</span>
            <span>Google</span>
          </div>
        </div>
      </div>

      <div className="res-stage">
        <div className="res-card c1">
          <video className="res-card-video" src={'videos/ads/4.3 MEKI - COMPRADOR HABITUAL.mp4'} autoPlay muted loop playsInline preload="metadata"></video>
          <div className="res-card-grad"></div>
          <span className="res-card-tag">reel</span>
        </div>
        <div className="res-card c2">
          <video className="res-card-video" src={'videos/ads/3. CONVIVE - LEY MISCELANEA.mp4'} autoPlay muted loop playsInline preload="metadata"></video>
          <div className="res-card-grad"></div>
          <span className="res-card-tag">campaña</span>
        </div>


        <div className="res-phone">
          <video className="res-phone-bg" src={'videos/ads/TREINO - GUION 3 - MUJER (HOOK 3).mp4'} autoPlay muted loop playsInline preload="metadata"></video>
          <div className="res-phone-grad"></div>
          <div className="res-phone-cap">
            <span className="res-phone-eyebrow">reel · treino</span>
            <span className="res-phone-metric">+1.2M reproducciones</span>
          </div>
        </div>

        {RES_PILLS.map((s) => (
          <div key={s.pos} className={`res-pill ${s.pos}`}>
            <span className="res-pill-label">{s.label}</span>
          </div>
        ))}

        <div className="res-badge b1">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div className="res-badge b2">
          <img src={ASSET['pinwheel-negro']} alt="" />
        </div>
      </div>
    </div>
  </section>
);

// ------- CTA -------
const Cta = () => (
  <section className="cta" id="contacto" data-screen-label="CTA">
    <img src={ASSET['pinwheel-negro']} className="cta-pinwheel" alt="" />
    <img src={ASSET['sparkle-negro']} className="cta-sparkle" alt="" />
    <div className="cta-inner">
      <Eyebrow>H A B L E M O S</Eyebrow>
      <h2 className="cta-title">
        cuéntanos<br/>
        de tu <em>próximo</em> proyecto.
      </h2>
      <div className="cta-actions">
        <Btn variant="primary" size="lg" href="Contacto.html">escríbenos</Btn>
      </div>
    </div>
  </section>
);

// ------- faq -------
const FAQ_ITEMS = [
  { q: '¿Qué hace KA Estudio?', a: 'KA Estudio es una agencia chilena de contenido audiovisual para redes sociales y gestión de paid media. Producimos video vertical —reels, stories y anuncios— y gestionamos campañas en Meta, TikTok y Google Ads con foco en performance.' },
  { q: '¿Dónde está KA Estudio?', a: 'Estamos en Santiago, Chile, y trabajamos con marcas de todo el país.' },
  { q: '¿Qué incluye el Plan Mensual?', a: 'Producción de contenido vertical mensual, gestión de campañas en Meta, TikTok y Google Ads, community management, calendario de contenido y un análisis mensual con métricas y plan de mejora.' },
  { q: '¿Con qué tipo de marcas trabajan?', a: 'Hemos trabajado con marcas de gastronomía, retail, automotriz, inmobiliaria y belleza, entre otras. Adaptamos el contenido y la estrategia a cada industria.' },
  { q: '¿Hacen producciones puntuales o solo planes mensuales?', a: 'Ambos. Además del Plan Mensual, hacemos producciones puntuales para campañas, lanzamientos y eventos, y contenido audiovisual corporativo para empresas.' },
  { q: '¿Cómo puedo cotizar?', a: 'Escríbenos por el formulario de contacto o por Instagram. Te respondemos en menos de 24 horas con una propuesta a tu medida.' },
];
const Faq = () => (
  <section className="faq" id="faq" data-screen-label="FAQ">
    <div className="faq-head">
      <Eyebrow>P R E G U N T A S · F R E C U E N T E S</Eyebrow>
      <h2>lo que más nos preguntan.</h2>
    </div>
    <div className="faq-list">
      {FAQ_ITEMS.map((it, i) => (
        <div className="faq-item" key={i}>
          <h3 className="faq-q">{it.q}</h3>
          <p className="faq-a">{it.a}</p>
        </div>
      ))}
    </div>
  </section>
);

// ------- footer -------
const Footer = () => (
  <footer className="footer" data-screen-label="Footer">
    <div className="footer-inner">
      <a href={LANDING ? '#' : 'Home.html'} className="footer-logo" aria-label="KA Estudio"
         onClick={LANDING ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } : undefined}>
        <img src={ASSET['logo-horizontal-blanco']} alt="KA Estudio" />
      </a>
      <a className="footer-ig" href="https://www.instagram.com/kaestudio.cl/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/>
        </svg>
      </a>
    </div>
  </footer>
);

Object.assign(window, {
  Sparkle, ArrowRight, ArrowDiag, Eyebrow, Btn,
  Nav, Hero, Brands, Stats, Services, Showcase, Resultados, Faq, Cta, Footer,
  ASSET, SERVICES, SHOWCASE, VIDEOS, VIDEO_TABS, filterVideos, VideoTile, BRANDS, STATS,
});
