// Contacto — formulario (solo diseño; el envío lo conecta el cliente)
const { Nav, Footer, Eyebrow, ArrowRight } = window;
const { useState } = React;

function ContactForm() {
  const [origen, setOrigen] = useState('');
  const [status, setStatus] = useState('idle');

  const encode = (data) => Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    const obj = { 'form-name': 'contacto' };
    fd.forEach((v, k) => { obj[k] = v; });
    setStatus('sending');
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(obj),
    })
      .then((res) => {
        if (res.ok) { setStatus('ok'); form.reset(); setOrigen(''); }
        else { setStatus('error'); }
      })
      .catch(() => setStatus('error'));
  };

  if (status === 'ok') {
    return (
      <div className="form-success" data-screen-label="Enviado">
        <h3>¡Gracias! Recibimos tu mensaje.</h3>
        <p>Te respondemos en menos de 24 horas.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" name="contacto" method="POST"
          data-netlify="true" netlify-honeypot="bot-field"
          onSubmit={onSubmit} data-screen-label="Formulario">
      <input type="hidden" name="form-name" value="contacto" />
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

      <div className="field">
        <label htmlFor="redes">Link de redes sociales</label>
        <input id="redes" name="redes" type="url" placeholder="https://instagram.com/tumarca" />
      </div>

      <div className="field">
        <label htmlFor="origen">¿Cómo supiste de KA Estudio?</label>
        <select
          id="origen" name="origen"
          className={origen ? '' : 'is-placeholder'}
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}>
          <option value="" disabled>Instagram / Recomendación / Google / Otro</option>
          <option value="instagram">Instagram</option>
          <option value="recomendacion">Recomendación</option>
          <option value="google">Google</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="mensaje">¿Qué estás buscando?</label>
        <textarea id="mensaje" name="mensaje" placeholder="Cuéntanos de tu proyecto o necesidad…"></textarea>
      </div>

      <button type="submit" className="btn btn-primary btn-submit" disabled={status === 'sending'}>
        <span>{status === 'sending' ? 'enviando…' : 'enviar mensaje'}</span>
        <ArrowRight size={14} color="blanco" />
      </button>
      {status === 'error' && (
        <p className="form-error">Hubo un problema al enviar. Escríbenos directo a joaquin@k-studio.cl.</p>
      )}
    </form>
  );
}

const IgGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
const MailGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

function App() {
  return (
    <div className="page-wrap" data-screen-label="Contacto">
      <Nav active="contacto" />

      <PageHero
        eyebrow="C O N T A C T O"
        title={<>cuéntanos de tu <em>marca</em>.</>}
        lede="Completa el formulario y te respondemos en menos de 24 horas."
      />

      <section className="contact-grid contact-grid--single" data-screen-label="Formulario">
        <div className="contact-form-wrap">
          <Eyebrow>F O R M U L A R I O</Eyebrow>
          <div style={{ height: 20 }}></div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
