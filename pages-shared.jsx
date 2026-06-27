// KA Estudio — chrome + componentes compartidos de páginas interiores.
// Self-contained: replica nav/footer/átomos del home (mismas clases CSS de home.css)
// con rutas conscientes de la profundidad (window.__ASSET_BASE: '' en raíz, '../' en /Servicios).
// Se carga ANTES del .jsx de cada página.

const BASE = (typeof window !== 'undefined' && window.__ASSET_BASE) || '';
const A = (p) => BASE + p;

const ASSET = {
  'sparkle-negro':          A('assets/icons/sparkle-negro.png'),
  'sparkle-blanco':         A('assets/icons/sparkle-blanco.png'),
  'arrow-right-negro':      A('assets/icons/arrow-right-negro.png'),
  'arrow-right-blanco':     A('assets/icons/arrow-right-blanco.png'),
  'arrow-diag-negro':       A('assets/icons/arrow-diag-negro.png'),
  'arrow-diag-blanco':      A('assets/icons/arrow-diag-blanco.png'),
  'pinwheel-negro':         A('assets/icons/pinwheel-negro.png'),
  'logo-horizontal-negro':  A('assets/logos/logo-horizontal-negro.png'),
  'logo-horizontal-blanco': A('assets/logos/logo-horizontal-blanco.png'),
  'brandmark-negro':        A('assets/logos/brandmark-negro.png'),
  'brandmark-blanco':       A('assets/logos/brandmark-blanco.png'),
};

/* ---------- átomos (idénticos al home) ---------- */
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
const Btn = ({ children, variant = 'primary', size = 'md', icon = true, href = '#', onClick }) => (
  <a href={href} className={`btn btn-${variant} ${size === 'lg' ? 'btn-lg' : ''}`}
     onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}>
    <span>{children}</span>
    {icon && <ArrowRight size={14} color={variant === 'primary' ? 'blanco' : 'negro'} />}
  </a>
);

/* ---------- nav (mismo markup/clases que el home, multipágina) ---------- */
const NAV_LINKS = [
  ['home', A('index.html')],
  ['portafolio', A('index.html') + '#trabajos'],
  ['servicios', A('index.html') + '#servicios'],
];
const Nav = ({ active = '' }) => (
  <nav className="nav" data-screen-label="Nav">
    <div className="nav-pill">
      <a href={A('index.html')} className="nav-brand">
        <img src={ASSET['logo-horizontal-negro']} alt="KA Estudio" />
      </a>
      <div className="nav-links">
        <a href={A('index.html')} className="nav-link">home</a>
        <a href={A('index.html') + '#trabajos'} className="nav-link">portafolio</a>
        <span className={`nav-link nav-has-menu ${active === 'servicios' ? 'is-active' : ''}`}>
          <a href={A('index.html') + '#servicios'} className="nav-link-text">servicios</a>
          <div className="nav-menu">
            <a href={A('Servicios/PlanMensual.html')}>plan mensual</a>
            <a href={A('Servicios/Producciones.html')}>producciones</a>
            <a href={A('Servicios/Corporativo.html')}>corporativo</a>
          </div>
        </span>
      </div>
      <div className="nav-cta">
        <Btn variant="primary" href={A('Contacto.html')} icon={true}>hablemos</Btn>
      </div>
    </div>
  </nav>
);

/* ---------- footer (mismo markup/clases que el home) ---------- */
const Footer = () => (
  <footer className="footer" data-screen-label="Footer">
    <div className="footer-inner">
      <a href={A('index.html')} className="footer-logo" aria-label="KA Estudio">
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

/* ---------- piezas de página interior ---------- */
function Crumbs({ items }) {
  return (
    <nav className="pg-crumbs" aria-label="breadcrumb">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep">/</span>}
          {it.href ? <a href={it.href}>{it.label}</a> : <span className="here">{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

function PageHero({ eyebrow, title, lede, crumbs }) {
  return (
    <header className="pg-hero" data-screen-label="Hero">
      <div className="pg-hero-inner">
        {crumbs ? <Crumbs items={crumbs} /> : <Eyebrow>{eyebrow}</Eyebrow>}
        <h1>{title}</h1>
        {lede ? <p className="pg-lede">{lede}</p> : null}
      </div>
    </header>
  );
}

function SectionHead({ eyebrow, light = false, title, children }) {
  return (
    <div className="pg-head">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      {title ? <h2>{title}</h2> : null}
      {children}
    </div>
  );
}

const PlayGlyph = () => (<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>);

function Placeholder({ variant = 'vert', light = false, tag }) {
  const ratio = variant === 'vert' ? 'ph-vert' : 'ph-horz';
  const mark = light ? ASSET['brandmark-negro'] : ASSET['brandmark-blanco'];
  return (
    <div className={`ph ${ratio} ${light ? 'ph--light' : ''}`} role="img" aria-label="Placeholder de video — pendiente de asset">
      <img className="ph-mark" src={mark} alt="" />
      <div className="ph-play"><PlayGlyph /></div>
      {tag ? <span className="ph-tag">{tag}</span> : null}
    </div>
  );
}

function FeedGrid({ tags }) {
  const list = tags || ['reel', 'story', 'anuncio', 'reel', 'ugc', 'reel', 'story', 'anuncio', 'reel', 'reel'];
  return (
    <div className="pg-feed-grid">
      {list.map((t, i) => <Placeholder key={i} variant="vert" tag={t} />)}
    </div>
  );
}

function WorkGrid({ tags }) {
  const list = tags || ['lanzamiento', 'campaña', 'evento', 'producto', 'branding', 'reel'];
  return (
    <div className="pg-work-grid">
      {list.map((t, i) => <Placeholder key={i} variant="horz" light tag={t} />)}
    </div>
  );
}

function PageCta({ eyebrow = 'H A B L E M O S', title, lede, ctaLabel, ctaHref = A('Contacto.html') }) {
  return (
    <section className="pg-cta" data-screen-label="CTA">
      <img src={ASSET['pinwheel-negro']} className="pg-cta-pinwheel" alt="" />
      <img src={ASSET['sparkle-negro']} className="pg-cta-sparkle" alt="" />
      <div className="pg-cta-inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {lede ? <p>{lede}</p> : null}
        <Btn variant="primary" size="lg" href={ctaHref}>{ctaLabel}</Btn>
      </div>
    </section>
  );
}

Object.assign(window, {
  ASSET, Sparkle, ArrowRight, ArrowDiag, Eyebrow, Btn, Nav, Footer,
  Crumbs, PageHero, SectionHead, Placeholder, FeedGrid, WorkGrid, PageCta, PlayGlyph,
});
