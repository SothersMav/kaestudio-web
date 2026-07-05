// prerender.mjs — Fase 2 SEO: renderiza cada pagina con Chrome headless y
// escribe el HTML con contenido (no <div id="root"> vacio) en dist/.
// No modifica las paginas fuente: espera a que #root tenga hijos.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const PORT = 8723;

// Rutas a pre-renderizar (path servido -> archivo de salida en dist)
const ROUTES = [
  { url: '/index.html', out: 'index.html' },
  { url: '/Contacto.html', out: 'Contacto.html' },
  { url: '/Servicios/PlanMensual.html', out: 'Servicios/PlanMensual.html' },
  { url: '/Servicios/Producciones.html', out: 'Servicios/Producciones.html' },
  { url: '/Servicios/Corporativo.html', out: 'Servicios/Corporativo.html' },
];

// No copiar a dist (archivos de build/control)
const EXCLUDE = new Set(['dist', 'node_modules', '.git', '.netlify', 'package.json', 'package-lock.json', 'prerender.mjs', 'README.md', '.gitignore', '.DS_Store']);

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.jsx': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.otf': 'font/otf', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

function copyRepoToDist() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });
  for (const entry of fs.readdirSync(ROOT)) {
    if (EXCLUDE.has(entry)) continue;
    fs.cpSync(path.join(ROOT, entry), path.join(DIST, entry), { recursive: true });
  }
}

function startServer() {
  const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';
    const filePath = path.join(ROOT, urlPath);
    // seguridad: no salir del root
    if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404); return res.end('404'); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
      res.end(data);
    });
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function run() {
  console.log('[prerender] copiando repo a dist/...');
  copyRepoToDist();

  console.log('[prerender] levantando server local en :' + PORT);
  const server = await startServer();

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  let ok = 0;
  for (const route of ROUTES) {
    const page = await browser.newPage();
    // no descargar videos: ahorra tiempo y evita que bloqueen
    await page.setRequestInterception(true);
    page.on('request', (r) => {
      if (r.resourceType() === 'media') return r.abort();
      r.continue();
    });
    const target = `http://localhost:${PORT}${route.url}`;
    try {
      await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 30000 });
      // esperar a que React/Babel pueble #root
      await page.waitForFunction(
        () => { const r = document.getElementById('root'); return r && r.children.length > 0; },
        { timeout: 30000 }
      );
      // breve settle para asincronos
      await new Promise((r) => setTimeout(r, 600));

      // React setea `muted` como PROPIEDAD del DOM, no como atributo HTML, asi
      // que al serializar los <video> salen sin `muted` y suenan al cargar hasta
      // que React re-monta. Forzamos el atributo `muted` en todos los videos
      // antes de serializar para que el HTML pre-renderizado ya nazca muteado.
      await page.$$eval('#root video', (vids) => {
        for (const v of vids) v.setAttribute('muted', '');
      });

      // Tomar SOLO el contenido renderizado de #root (no toda la pagina,
      // para no arrastrar los <script> compilados que inyecta Babel-standalone).
      const rootHtml = await page.$eval('#root', (el) => el.innerHTML);

      // Inyectar ese contenido en el HTML ORIGINAL intacto (scripts y orden
      // sin tocar). El navegador re-monta React encima; los bots ya ven todo.
      const srcPath = path.join(ROOT, route.out);
      const original = fs.readFileSync(srcPath, 'utf-8');
      const marker = '<div id="root"></div>';
      if (!original.includes(marker)) {
        throw new Error(`no se encontro '${marker}' en ${route.out}`);
      }
      const html = original.replace(marker, `<div id="root">${rootHtml}</div>`);

      const outPath = path.join(DIST, route.out);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html, 'utf-8');
      const kb = (html.length / 1024).toFixed(0);
      console.log(`[prerender] OK ${route.url} -> ${route.out} (${kb} KB)`);
      ok++;
    } catch (e) {
      console.error(`[prerender] FALLO ${route.url}: ${e.message}`);
      throw e; // que el build falle si una pagina no renderiza
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log(`[prerender] listo: ${ok}/${ROUTES.length} paginas pre-renderizadas en dist/`);
}

run().catch((e) => { console.error(e); process.exit(1); });
