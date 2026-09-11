// Rostros — casting UGC: postula para ser rostro de las marcas que grabamos.
// Formato inspirado en la referencia de Mauri (hero grande + strip de videos + formulario),
// con la estética KA (mismas clases de home.css / pages.css).
const { Nav, Footer, Eyebrow, ArrowRight, PageHero } = window;
const { useState } = React;

// Strip de videos verticales en loop continuo (UGC / lifestyle ya presentes en el sitio)
const ROSTROS_VIDEOS = [
  'videos/reels/TIO TOMATE - UGC 01.mp4',
  'videos/reels/BROTHER - SUBLIMADORA - UGC.mp4',
  'videos/reels/10. 3820 AZOTEA - MI LUGAR FAVORITO UGC.mp4',
  'videos/ads/TREINO - GUION 3 - MUJER (HOOK 3).mp4',
  'videos/reels/2. MAYAN - NIGHT OUT V2.mp4',
  'videos/reels/3.1 BARDOT - OUTFIT VIBES.mp4',
];

function VideoStrip() {
  return (
    <section className="rostros-strip" data-screen-label="Videos">
      <div className="rostros-strip-track">
        {[0, 1].map((g) => (
          <div className="rostros-strip-group" key={g} aria-hidden={g === 1}>
            {ROSTROS_VIDEOS.map((src, i) => (
              <figure className="tile rostros-tile" key={`${g}-${i}`}>
                <video className="tile-video" src={src} autoPlay muted loop playsInline preload="metadata"></video>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function RostrosForm() {
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState('idle');

  const encode = (data) => Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    const obj = { 'form-name': 'rostros' };
    fd.forEach((v, k) => { obj[k] = v; });
    setStatus('sending');
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(obj),
    })
      .then((res) => {
        if (res.ok) { setStatus('ok'); form.reset(); setCategoria(''); }
        else { setStatus('error'); }
      })
      .catch(() => setStatus('error'));
  };

  if (status === 'ok') {
    return (
      <div className="form-success" data-screen-label="Enviado">
        <h3>¡Gracias! Recibimos tu postulación.</h3>
        <p>Si tu perfil calza con alguna de nuestras marcas, te contactamos.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" name="rostros" method="POST"
          data-netlify="true" netlify-honeypot="bot-field"
          onSubmit={onSubmit} data-screen-label="Formulario">
      <input type="hidden" name="form-name" value="rostros" />
      <p className="hp-field" hidden>
        <label>No llenar si eres humano: <input name="bot-field" /></label>
      </p>
      <div className="form-row">
        <div className="field">
          <label htmlFor="nombre">Nombre <span className="req">*</span></label>
          <input id="nombre" name="nombre" type="text" required placeholder="Tu nombre completo" />
        </div>
        <div className="field">
          <label htmlFor="correo">Correo de contacto <span className="req">*</span></label>
          <input id="correo" name="correo" type="email" required placeholder="tu@correo.cl" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="edad">Edad</label>
          <input id="edad" name="edad" type="text" inputMode="numeric" placeholder="Ej: 24" />
        </div>
        <div className="field">
          <label htmlFor="ciudad">Ciudad</label>
          <input id="ciudad" name="ciudad" type="text" placeholder="Ej: Santiago" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="instagram">Instagram <span className="req">*</span></label>
          <input id="instagram" name="instagram" type="text" required placeholder="@tuusuario" />
        </div>
        <div className="field">
          <label htmlFor="tiktok">TikTok</label>
          <input id="tiktok" name="tiktok" type="text" placeholder="@tuusuario" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="categoria">¿Qué contenido te acomoda más?</label>
        <select
          id="categoria" name="categoria"
          className={categoria ? '' : 'is-placeholder'}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}>
          <option value="" disabled>Moda / Gastronomía / Belleza / Fitness / Otro</option>
          <option value="moda">Moda y lifestyle</option>
          <option value="gastronomia">Gastronomía</option>
          <option value="belleza">Belleza</option>
          <option value="fitness">Fitness y deporte</option>
          <option value="viajes">Viajes y eventos</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="material">Link a videos tuyos (opcional)</label>
        <input id="material" name="material" type="url" placeholder="Drive, TikTok o reel donde se te vea frente a cámara" />
      </div>
      <div className="field">
        <label htmlFor="mensaje">Cuéntanos de ti</label>
        <textarea id="mensaje" name="mensaje" placeholder="Qué te gusta grabar, con qué marcas te gustaría colaborar…"></textarea>
      </div>
      <label className="field-check">
        <input type="checkbox" name="acepto" value="si" required />
        <span>Acepto que KA Estudio use mis datos de contacto para considerarme en castings y campañas de sus marcas. <span className="req">*</span></span>
      </label>
      <button type="submit" className="btn btn-primary btn-submit" disabled={status === 'sending'}>
        <span>{status === 'sending' ? 'enviando…' : 'postular'}</span>
        <ArrowRight size={14} color="blanco" />
      </button>
      {status === 'error' && (
        <p className="form-error">Hubo un problema al enviar. Escríbenos directo a joaquin@k-studio.cl.</p>
      )}
    </form>
  );
}

function App() {
  return (
    <div className="page-wrap" data-screen-label="Rostros">
      <Nav active="rostros" />

      <PageHero
        eyebrow="R O S T R O S"
        title={<>conviértete en <em>rostro</em> de nuestros contenidos.</>}
        lede="Si te apasiona crear y conectar de manera auténtica con la audiencia, te estamos buscando. Colabora frente a cámara con marcas de gastronomía, retail, automotriz, lifestyle y más."
      />

      <section className="contact-grid contact-grid--single" data-screen-label="Postulación">
        <div className="contact-form-wrap">
          <Eyebrow>P O S T U L A</Eyebrow>
          <div style={{ height: 20 }}></div>
          <RostrosForm />
        </div>
      </section>

      <VideoStrip />

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
