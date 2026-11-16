# Nativo — Aprende React Native construyendo aplicaciones reales

Documentación interactiva para aprender React Native y Expo (SDK 58 · React Native 0.88), desde los fundamentos hasta arquitecturas profesionales, con 15 proyectos prácticos.

## Requisitos y comandos

Node.js 20.9 o superior.

```bash
npm install
npm run dev            # servidor de desarrollo en http://localhost:3000
npm run build          # exportación estática en out/
npm start              # sirve out/ localmente
npm run lint           # comprobación de tipos (tsc --noEmit)
npm run check:content  # valida frontmatter, enlaces internos, términos y rutas
```

El sitio se exporta como HTML estático (`output: 'export'`), así que se puede publicar en cualquier hosting estático.

## Estructura

```
app/                    # rutas (Next.js App Router)
components/
  docs/                 # sidebar, TOC, cabecera del tema, paginación
  mdx/                  # componentes disponibles en MDX (CodeBlock, CodeTabs, FileTree, Flow…)
  search/               # buscador (⌘K o /) con MiniSearch
  learning/             # progreso, favoritos, historial, rutas
content/
  navigation.ts         # secciones y orden de los temas
  docs/<sección>/*.mdx  # contenido
  glossary.ts           # glosario técnico
  learning-paths.ts     # rutas de aprendizaje
lib/
  content/              # carga de MDX, metadatos e índice de búsqueda
  mdx/                  # resaltado (Shiki) y plugins remark
  store/                # estado persistido en localStorage (Zustand)
scripts/check-content.mts
```

## Añadir un tema

1. Crea `content/docs/<sección>/<slug>.mdx` con su frontmatter:

   ```yaml
   ---
   title: Título del tema
   description: "Una frase. Si contiene «: » va entre comillas."
   difficulty: principiante   # principiante | intermedio | avanzado
   time: 15                   # minutos
   prerequisites: [fundamentos/view-y-text]
   related: [estilos/nativewind]
   resources:
     - title: Documentación oficial
       url: https://docs.expo.dev/
   keywords: ["palabra", "otra"]
   ---
   ```

2. Añade el slug en `content/navigation.ts`, en la sección y posición que corresponda.
3. Ejecuta `npm run check:content`.

Los bloques de código admiten `title="ruta/archivo.tsx"`, `collapse`, `noLineNumbers`, resaltado de líneas `{1,4-6}` y notaciones de Shiki (`// [!code ++]`, `// [!code focus]`). Un bloque ```` ```tree ```` se dibuja como árbol de carpetas, y varios bloques dentro de `<CodeTabs>` se muestran como pestañas.
