# KA Estudio — sitio web

Sitio de KA Estudio. Publicado en Netlify con deploy automático desde GitHub.

## Cómo se publica (importante)

Ya **no** se publica arrastrando la carpeta a Netlify.
Ahora: subes los cambios a GitHub y Netlify deploya solo.

### Pasos para dejarlo conectado (una sola vez)

1. **Crear el repositorio en GitHub**
   - Entra a https://github.com y crea una cuenta si no tienes.
   - Botón "New repository". Nombre: `kaestudio-web`. Déjalo en **Private**. Crear.

2. **Subir estos archivos al repositorio**
   - La forma más simple sin instalar nada: en la página del repo recién creado,
     clic en "uploading an existing file" (o Add file → Upload files).
   - Arrastra **todo el contenido de esta carpeta** (no la carpeta, su contenido:
     `index.html`, `home.css`, la carpeta `Servicios/`, `assets/`, `videos/`, etc.).
   - Abajo, "Commit changes".
   - Nota: si algún video pesa mucho, súbelo en tandas.

3. **Conectar Netlify al repositorio**
   - En Netlify: "Add new site" → "Import an existing project" → "GitHub".
   - Autoriza y elige el repo `kaestudio-web`.
   - Build command: **(déjalo vacío en esta fase)**.
   - Publish directory: `.`
   - "Deploy site".

4. **Apuntar tu dominio**
   - En el nuevo sitio de Netlify, configura el dominio `kaestudio.cl`
     (Domain settings). Es el mismo dominio que ya usas.

Desde ahí, cada vez que subas un cambio a GitHub, Netlify lo publica solo.

## Estructura

- `index.html` — home (con FAQ + datos estructurados)
- `Servicios/` — plan mensual, producciones, corporativo
- `Contacto.html` — formulario (Netlify Forms)
- `assets/`, `videos/`, `fonts/` — recursos
- `robots.txt`, `sitemap.xml` — SEO
- `_redirects` — redirección de /kapp/* a app.kaestudio.cl
- `netlify.toml` — configuración de deploy

## Pendiente (Fase 2)

Pre-render del contenido para SEO y para aparecer en respuestas de IA.
Se agregará un paso de build en `netlify.toml` sin cambiar el diseño.
