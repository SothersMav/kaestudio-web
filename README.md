# KA Estudio — sitio web

Sitio de KA Estudio. Estático (HTML + React vía Babel-standalone, sin sistema de build tradicional).
Publicado en **Netlify** con **deploy automático desde GitHub** + **pre-render para SEO/IA**.

---

## Cómo publicar un cambio (día a día)

1. Edita los archivos en esta carpeta (`index.html`, `home.jsx`, `home.css`, `Servicios/`, etc.).
2. En terminal, dentro de la carpeta:
   ```bash
   git add -A
   git commit -m "descripción del cambio"
   git push
   ```
3. Netlify detecta el push, corre el build (pre-render) y publica solo en ~1-2 min.

Ya **no** se arrastra la carpeta a Netlify.

- **Repo:** https://github.com/SothersMav/kaestudio-web (público)
- **Sitio:** kaestudio.cl (Netlify `dainty-kulfi-3c2b18`)
- **DNS:** gestionado en Cloudflare.

---

## Qué hace el build (pre-render — Fase 2a)

El problema: el contenido se arma con JavaScript en el navegador. Un humano lo ve bien,
pero buscadores y bots de IA veían `<div id="root">` vacío.

La solución: en cada deploy, `prerender.mjs` abre las 5 páginas en un Chrome headless
(Puppeteer), espera que React las renderice, y **guarda el HTML ya con el contenido**
dentro de `dist/`. Eso es lo que Netlify publica. El diseño y el JavaScript del sitio
**no se tocan** — el navegador vuelve a montar React encima igual que antes.

- `command = "npm run build"` → corre `prerender.mjs`
- `publish = "dist"` (carpeta generada, NO se commitea, está en `.gitignore`)
- Config en `netlify.toml`.

Para probar el pre-render en local:
```bash
npm install       # una vez (baja Puppeteer/Chromium)
npm run build     # genera dist/ con las páginas pre-renderizadas
```

---

## Estructura

- `index.html` — home (con FAQ + datos estructurados JSON-LD)
- `Servicios/` — plan mensual, producciones, corporativo
- `Contacto.html` — formulario (**Netlify Forms**, no tocar los atributos del `<form>`)
- `home.jsx`, `pages-shared.jsx`, `*.jsx` — código React de cada página
- `assets/`, `videos/`, `fonts/` — recursos
- `robots.txt`, `sitemap.xml` — SEO
- `_redirects` — redirección de `/kapp/*` a app.kaestudio.cl
- `netlify.toml` — configuración de deploy (build + publish)
- `prerender.mjs` — script de pre-render
- `package.json` — dependencias del build (Puppeteer)

---

## Reglas importantes

- **No** cambiar el diseño para publicar: solo editar contenido/estilos y hacer `git push`.
- **No** tocar los atributos del `<form>` de Contacto (Netlify Forms los usa).
- Si agregas una página nueva, súmala a la lista `ROUTES` en `prerender.mjs` y a `sitemap.xml`.
- El pre-render espera a que `#root` tenga contenido. Si una página no renderiza, el build falla
  a propósito (para no publicar una página vacía).

---

## Pendiente — Fase 2b (opcional, mejora de velocidad)

Quitar Babel-standalone, precompilar el JSX y usar `react.production.min.js` + hidratación
para que el sitio cargue más rápido (mejora Core Web Vitals). No es urgente.
Detalle en `docs/PLAN-FASE2-SEO.md` (en la carpeta del proyecto, fuera de este repo).
