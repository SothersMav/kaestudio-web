// Producciones — proyectos puntuales de principio a fin
const { Nav, Footer } = window;

const VID = (window.__ASSET_BASE || '') + 'videos/';
const CAMPANA_FILES = [
  'campanas/KRISPY KREME - DONUTS.mp4',
  'campanas/LITTLE CAESAR - TEASER.mp4',
  'campanas/LA FETE - SAN VALENTIN V1.mp4',
  'campanas/Master_Brisket_V_Media.mp4',
  'campanas/REEL 1 - CONSUMO V4.mp4',
  'campanas/MC_TEASER_TEXTO V5.mp4',
  'campanas/1. LA FETE - CAJA ESPECIAL.mp4',
];

const ETAPAS = [
  { n: '01', t: 'Pre producción', d: 'Briefing, concepto creativo, guion, plan de rodaje y coordinación completa antes del set.' },
  { n: '02', t: 'Realización', d: 'Rodaje con equipo propio. Dirección, fotografía, iluminación y sonido a cargo del equipo KA.' },
  { n: '03', t: 'Post producción', d: 'Edición, colorización, motion y adaptación a todos los formatos. Entrega lista para publicar.' },
];

const TIPOS = [
  { t: 'Reels y contenido para redes', d: 'Piezas verticales de alto impacto para Instagram y TikTok. Diseñadas para retener, conectar y convertir.' },
  { t: 'Campañas publicitarias', d: 'Videos para pautar en digital. Desde el concepto creativo hasta las versiones adaptadas para cada formato.' },
  { t: 'Cobertura de eventos y lanzamientos', d: 'Registro profesional de activaciones y lanzamientos de marca. Entrega rápida para publicar mientras el momento está vigente.' },
  { t: 'UGC y contenido de creator', d: 'Contenido con estética de usuario real: natural, auténtico y diseñado para rendir en pauta.' },
];

const VideoStrip = ({ files }) => {
  const items = [...files, ...files, ...files];
  return (
    <div className="reel-strip" data-screen-label="Reel">
      <div className="reel-track">
        {items.map((f, i) => (
          <div className="reel-card" key={i}>
            <video src={VID + f} autoPlay muted loop playsInline preload="metadata"></video>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="page-wrap" data-screen-label="Producciones">
      <Nav active="servicios" />

      <PageHero
        crumbs={[{ label: 'servicios', href: (window.__ASSET_BASE || '') + 'index.html#servicios' }, { label: 'producciones' }]}
        title={<>hacemos realidad tu idea <em>audiovisual</em>.</>}
        lede="Nos hacemos cargo de todo el proceso: desde la idea y el guion hasta la entrega final. Producimos el contenido que tu marca necesita para momentos específicos — lanzamientos, campañas, eventos, productos."
      />

      <VideoStrip files={CAMPANA_FILES} />

      {/* LAS TRES ETAPAS */}
      <section className="pg-section pg-block pg-block--tight" data-screen-label="Las tres etapas">
        <SectionHead eyebrow="L A S · T R E S · E T A P A S"
          title="de la idea a la entrega final." />
        <div className="pg-steps cols-3">
          {ETAPAS.map((s) => (
            <div className="pg-step" key={s.n}>
              <span className="pg-step-n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIPOS DE PROYECTO */}
      <section className="pg-section pg-block" data-screen-label="Tipos de proyecto">
        <SectionHead eyebrow="T I P O S · D E · P R O Y E C T O"
          title="para cada momento de tu marca." />
        <div className="pg-types">
          {TIPOS.map((p) => (
            <div className="pg-type" key={p.t}>
              <h3><span className="dot"></span>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <PageCta
        title={<>cuéntanos de tu <em>proyecto</em>.</>}
        lede="Cada producción es distinta. Escríbenos con tu idea o necesidad y armamos una propuesta a tu medida."
        ctaLabel="cotizar producción"
      />

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
