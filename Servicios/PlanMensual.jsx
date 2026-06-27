// Plan mensual — sistema de contenido + pauta orientado a performance
const { Nav, Footer } = window;

const VID = (window.__ASSET_BASE || '') + 'videos/';
const GRID = (window.__ASSET_BASE || '') + 'assets/grids/';

// Reels de la carpeta /videos/reels para la tira del hero
const REEL_FILES = [
  'reels/8. 3820 AZOTEA - DRON EDIT.mp4',
  'reels/OMODA JAECOO - VERTICAL RECAP DAY 2.mp4',
  'reels/RAFAGA TREINO (1).mp4',
  'reels/KEEP 2 (1).mp4',
  'reels/2. MAYAN - NIGHT OUT V2.mp4',
  'reels/5. TREINO - VISUAL 01.mp4',
  'reels/3.1 BARDOT - OUTFIT VIBES.mp4',
];

const SISTEMA = [
  { n: '01', t: 'Contenido', d: 'Producimos video pensado para rendir: con gancho, ritmo y formato nativo de cada plataforma.' },
  { n: '02', t: 'Pauta', d: 'Lo ponemos frente a la audiencia correcta con campañas medibles — y cada campaña genera data.' },
  { n: '03', t: 'Análisis', d: 'Leemos esa data y definimos qué mejorar: el aprendizaje vuelve al contenido del mes siguiente.' },
];

const PLATFORMS = [
  { name: 'Meta Ads', body: 'Facebook e Instagram como canal principal, con pauta segmentada para conversiones, seguidores y leads.' },
  { name: 'TikTok Ads', body: 'Contenido nativo pautado para alcanzar audiencias donde el video manda.' },
  { name: 'Google Ads', body: 'Presencia en el momento exacto en que tu cliente te está buscando.' },
];

const CICLO = [
  { n: '01', t: 'Diagnóstico', d: 'Revisamos el estado de la cuenta y definimos los objetivos del mes.' },
  { n: '02', t: 'Configuración', d: 'Armamos o ajustamos campañas, audiencias y creatividades.' },
  { n: '03', t: 'Gestión activa', d: 'Monitoreamos y optimizamos semana a semana.' },
  { n: '04', t: 'Análisis y plan', d: 'Analizamos los resultados y definimos el plan del mes siguiente.' },
];

const INCLUYE = [
  'Contenido vertical mensual (reels, stories, anuncios)',
  'Gestión de campañas en Meta Ads, TikTok Ads y Google Ads',
  'Configuración de cuenta, píxeles y audiencias',
  'Community management completo',
  'Calendario de contenido y pauta mensual',
  'Asesoría en contenido para maximizar rendimiento',
  'Análisis mensual con métricas y plan de mejora',
];

// Tira de reels en movimiento (loop infinito): 3 copias del set para que nunca se vacíe
const ReelStrip = () => {
  const items = [...REEL_FILES, ...REEL_FILES, ...REEL_FILES];
  return (
    <div className="reel-strip" data-screen-label="Reels">
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

// Banda de métricas (números primero) con conteo animado
const useCountInView = (target, dur) => {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf, started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (!('IntersectionObserver' in window)) { setVal(target); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting && !started) { started = true; run(); io.disconnect(); } });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [target, dur]);
  return [val, ref];
};

const MetricsBand = () => {
  const [n, ref] = useCountInView(30, 1400);
  return (
    <section className="metrics-band" data-screen-label="Métricas" ref={ref}>
      <div className="metrics-inner">
        <div className="metric-hero">
          <span className="metric-num"><span className="metric-plus">+</span>{n}<small>M</small></span>
          <span className="metric-label">reproducciones generadas para nuestros clientes.</span>
        </div>
        <div className="metric-notes">
          <p>A medida que el sistema corre, los números se mueven en la dirección correcta: el <strong>costo por resultado baja</strong> mientras la data afina cada campaña, y las <strong>reproducciones crecen</strong> de forma sostenida, mes a mes.</p>
        </div>
      </div>
    </section>
  );
};

// Diagrama del sistema en loop
const SystemLoop = () => (
  <div className="system-loop">
    {SISTEMA.map((s, i) => (
      <React.Fragment key={s.n}>
        <div className="loop-node">
          <span className="loop-n">{s.n}</span>
          <h3>{s.t}</h3>
          <p>{s.d}</p>
        </div>
        {i < SISTEMA.length - 1 && <div className="loop-arrow">→</div>}
      </React.Fragment>
    ))}
    <div className="loop-return">↺ cada mes el ciclo vuelve a empezar, mejor afinado.</div>
  </div>
);

function App() {
  return (
    <div className="page-wrap" data-screen-label="Plan Mensual">
      <Nav active="servicios" />

      <PageHero
        crumbs={[{ label: 'servicios', href: (window.__ASSET_BASE || '') + 'index.html#servicios' }, { label: 'plan mensual' }]}
        title={<>tu marca creciendo, mes a mes — <em>con la data de respaldo</em>.</>}
        lede="Un sistema completo: producimos contenido con potencial de viralidad, lo ponemos a rendir con pauta, y usamos la data de cada campaña para mejorar el contenido del mes siguiente. Tú te enfocas en tu negocio; nosotros en hacer crecer tus números."
      />

      <ReelStrip />

      <MetricsBand />

      {/* EL SISTEMA — cajas en horizontal */}
      <section className="pg-section pg-block" data-screen-label="El sistema">
        <SectionHead
          eyebrow="E L · S I S T E M A"
          title="no son servicios sueltos. es un sistema.">
          <p>Contenido, pauta y análisis no trabajan por separado. Producimos, pautamos, medimos — y cada aprendizaje vuelve a alimentar el contenido. Ese loop es lo que hace que tus números mejoren mes a mes, en vez de quedarse iguales.</p>
        </SectionHead>
        <SystemLoop />
      </section>

      {/* CONTENIDO — texto izquierda, gif derecha */}
      <section className="pg-section pg-block pg-block--tight" data-screen-label="Contenido">
        <div className="pg-twocol">
          <div className="pg-twocol-text">
            <SectionHead
              eyebrow="C O N T E N I D O"
              title="video pensado para rendir, no solo para verse bien.">
              <p>Guionizamos y producimos un alto volumen de contenido diseñado para capturar la atención y encender la conversación alrededor de tu marca. Reels, stories y anuncios adaptados a cada plataforma, cada audiencia y cada objetivo.</p>
            </SectionHead>
          </div>
          <div className="pg-twocol-media">
            <img src={GRID + 'plan-contenidos.gif'} alt="Plan de contenidos KA Estudio" loading="lazy" />
          </div>
        </div>
      </section>

      {/* PAUTA & PERFORMANCE (dark) */}
      <section className="pg-block pg-block--dark" data-screen-label="Pauta y performance">
        <div className="pg-section">
          <SectionHead
            eyebrow="P A U T A · &amp; · P E R F O R M A N C E" light
            title="aquí tu contenido se convierte en resultados.">
            <p>Gestionamos tus campañas en Meta Ads, TikTok Ads y Google Ads con foco en resultados medibles. Configuramos la cuenta, definimos las audiencias y armamos las campañas necesarias según tus objetivos — sin fórmulas fijas. El presupuesto lo defines tú; nosotros lo hacemos rendir. Y cada campaña genera la data que usamos para mejorar lo que viene.</p>
          </SectionHead>
          <div className="pg-platforms">
            {PLATFORMS.map((p) => (
              <div className="pg-plat" key={p.name}>
                <span className="pg-plat-name"><span className="sq"></span>{p.name}</span>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANÁLISIS ACTIVO — gif izquierda, texto derecha */}
      <section className="pg-section pg-block" data-screen-label="Análisis activo">
        <div className="pg-twocol pg-twocol--rev">
          <div className="pg-twocol-text">
            <SectionHead
              eyebrow="A N Á L I S I S · A C T I V O"
              title="no te entregamos un reporte. analizamos y mejoramos.">
              <p>Cada mes leemos qué funcionó y qué no, y ese análisis define el plan del siguiente: qué contenido reforzar, qué audiencias priorizar, dónde mover el presupuesto. No es un PDF que llega y se archiva — es lo que mantiene tu marca mejorando de forma sostenida.</p>
            </SectionHead>
          </div>
          <div className="pg-twocol-media">
            <img src={GRID + 'reporte-mensual.gif'} alt="Análisis mensual KA Estudio" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA — ciclo */}
      <section className="pg-section pg-block pg-block--tight" data-screen-label="Cómo funciona">
        <SectionHead
          eyebrow="C Ó M O · F U N C I O N A"
          title="un ciclo mensual claro.">
          <p>Cada mes arranca con un diagnóstico y cierra con un análisis que alimenta el plan del siguiente.</p>
        </SectionHead>
        <div className="pg-steps cols-4">
          {CICLO.map((s) => (
            <div className="pg-step" key={s.n}>
              <span className="pg-step-n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUÉ INCLUYE + PARA QUIÉN */}
      <section className="pg-section pg-block pg-block--tight" data-screen-label="Qué incluye">
        <div className="pg-split">
          <SectionHead
            eyebrow="Q U É · I N C L U Y E"
            title="todo en un solo plan.">
            <ul className="pg-includes" style={{ gridTemplateColumns: '1fr', marginTop: 28 }}>
              {INCLUYE.map((i) => (
                <li key={i}><span className="check">✓</span><span>{i}</span></li>
              ))}
            </ul>
          </SectionHead>
          <SectionHead
            eyebrow="P A R A · Q U I É N · E S"
            title="ideal si quieres crecer de forma sostenida.">
            <p>Para marcas que quieren estar activas en redes sin destinar un equipo interno a eso. Para quienes ya pautan pero no ven los resultados que esperan. Y para negocios que entienden que el contenido y la pauta funcionan mejor juntos.</p>
          </SectionHead>
        </div>
      </section>

      <PageCta
        title={<>nos ajustamos a lo que tu <em>marca</em> necesita.</>}
        lede="Cada plan es distinto. Cuéntanos de tu negocio y armamos una propuesta a tu medida."
        ctaLabel="cotizar plan"
      />

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
