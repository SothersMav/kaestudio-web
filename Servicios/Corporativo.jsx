// Corporativo — audiovisual profesional para empresas
const { Nav, Footer } = window;

const VID = (window.__ASSET_BASE || '') + 'videos/';
const EVENTO_FILES = [
  'eventos/1.OMODA - CINEMATIC DAY 1.mp4',
  'eventos/RABANNE - FINAL.mp4',
  'eventos/HABLA - JEAN PAUL GAULTIER.mp4',
  'eventos/LA FETE - VALLE NEVADO - VERTICAL.mp4',
];

const TIPOS = [
  { t: 'Videos institucionales', d: 'Presentación de la empresa, historia de marca y propósito. Piezas que definen cómo te presentas al mundo.' },
  { t: 'Comunicación interna', d: 'Capacitaciones, onboarding y mensajes de liderazgo en video. Más efectivos que un correo, más escalables que una reunión.' },
  { t: 'Registro de procesos y operaciones', d: 'Documentamos líneas de producción, operaciones en terreno y manuales de procedimiento.' },
  { t: 'Cobertura de eventos corporativos', d: 'Seminarios, conferencias, celebraciones y activaciones internas con nivel de producción profesional.' },
  { t: 'Fotografía corporativa', d: 'Sesiones para perfiles de equipo, espacios de trabajo, productos y material de prensa.' },
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
    <div className="page-wrap" data-screen-label="Corporativo">
      <Nav active="servicios" />

      <PageHero
        crumbs={[{ label: 'servicios', href: (window.__ASSET_BASE || '') + 'index.html#servicios' }, { label: 'corporativo' }]}
        title={<>la imagen de tu empresa, en <em>movimiento</em>.</>}
        lede="Cubrimos las necesidades audiovisuales de empresas. Videos institucionales, capacitaciones, registros de procesos, eventos internos — producimos el material que tu organización necesita comunicar con claridad y profesionalismo."
      />

      <VideoStrip files={EVENTO_FILES} />

      {/* QUÉ HACEMOS */}
      <section className="pg-section pg-block pg-block--tight" data-screen-label="Qué hacemos">
        <SectionHead
          eyebrow="Q U É · H A C E M O S"
          title="audiovisual para dentro y fuera de tu empresa.">
          <p>Gestionamos la pre producción, la realización y la post producción de cada proyecto. El contenido corporativo tiene objetivos distintos al de marketing — comunicar con precisión, generar confianza y dejar registro.</p>
        </SectionHead>
      </section>

      {/* TIPOS DE PROYECTO */}
      <section className="pg-section pg-block" data-screen-label="Tipos de proyecto">
        <SectionHead eyebrow="T I P O S · D E · P R O Y E C T O"
          title="todo lo que tu organización necesita comunicar." />
        <div className="pg-types">
          {TIPOS.map((p) => (
            <div className="pg-type" key={p.t}>
              <h3><span className="dot"></span>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO TRABAJAMOS (dark) */}
      <section className="pg-block pg-block--dark" data-screen-label="Cómo trabajamos">
        <div className="pg-section">
          <SectionHead
            eyebrow="C Ó M O · T R A B A J A M O S" light
            title="nos adaptamos a los tiempos de tu empresa.">
            <p>Trabajamos con briefing detallado, validación por etapas y entregas acordadas desde el inicio. Cada organización tiene sus propios procesos y plazos — nos adaptamos a ellos.</p>
          </SectionHead>
        </div>
      </section>

      <PageCta
        title={<>cuéntanos qué necesita comunicar tu <em>empresa</em>.</>}
        lede="Armamos una propuesta a medida según tus objetivos, plazos y presupuesto."
        ctaLabel="solicitar cotización"
      />

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
