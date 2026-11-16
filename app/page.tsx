import Link from 'next/link';
import {
  ArrowRight,
  BookA,
  BookMarked,
  Code2,
  FileCode2,
  Layers,
  Route,
  Search,
  ShieldCheck,
  Smartphone,
  Workflow,
} from 'lucide-react';
import { learningPaths } from '@/content/learning-paths';
import { glossary } from '@/content/glossary';
import { technologies } from '@/content/technologies';
import { SectionIconView } from '@/components/docs/section-icon';
import { HeroShowcase } from '@/components/home/hero-showcase';
import { ProjectCard } from '@/components/learning/projects-grid';
import { SearchTrigger } from '@/components/search/search-dialog';
import { getAllMeta, getNavigation, getSectionDocs } from '@/lib/content/docs';
import { DIFFICULTY_LABEL, formatMinutes } from '@/lib/utils';

const FEATURED_PROJECTS = [
  'proyectos/lista-de-tareas',
  'proyectos/inventario',
  'proyectos/autenticacion-con-api',
  'proyectos/lector-qr',
  'proyectos/ecommerce',
  'proyectos/offline-first',
];

const BENEFITS = [
  {
    icon: FileCode2,
    title: 'Código funcional y actual',
    text: 'Ejemplos completos escritos para Expo SDK 58 y React Native 0.88, contrastados con la documentación oficial y sin APIs obsoletas.',
  },
  {
    icon: Workflow,
    title: 'Diagramas y explicaciones',
    text: 'Cada tema explica qué es, por qué importa y cuándo usarlo, con esquemas y flujos visuales.',
  },
  {
    icon: Layers,
    title: 'Arquitectura profesional',
    text: 'Aprende a separar responsabilidades y a crear tu propia biblioteca de componentes.',
  },
  {
    icon: Search,
    title: 'Buscador instantáneo',
    text: 'Encuentra temas, secciones, APIs y términos del glosario con ⌘K o /. El índice se genera al compilar y la búsqueda se ejecuta en tu navegador.',
  },
  {
    icon: BookMarked,
    title: 'Progreso, favoritos e historial',
    text: 'Marca temas como completados y guarda favoritos. Todo se guarda localmente en tu navegador.',
  },
  {
    icon: ShieldCheck,
    title: 'Buenas prácticas reales',
    text: 'Errores comunes, alternativas y criterios para decidir qué herramienta usar en cada caso.',
  },
];

export default function HomePage() {
  const navigation = getNavigation();
  const all = getAllMeta();
  const docsCount = all.filter((m) => m.kind === 'doc').length;
  const projects = getSectionDocs('proyectos');
  const featured = FEATURED_PROJECTS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)] bg-[size:44px_44px] opacity-60"
        />
        <div className="relative mx-auto grid grid-cols-1 max-w-7xl gap-12 px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10 lg:pb-24">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-success" aria-hidden />
              Actualizado para Expo SDK 58 · React Native 0.88
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              Aprende React Native construyendo aplicaciones reales.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
              Una guía práctica para dominar React Native, Expo y el desarrollo móvil moderno, desde los fundamentos hasta
              arquitecturas profesionales.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs/introduccion/que-es-react-native"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Comenzar a aprender <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/proyectos"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Explorar proyectos
              </Link>
            </div>
            <SearchTrigger className="mt-6 h-11 w-full max-w-md rounded-xl" />
          </div>
          <HeroShowcase />
        </div>
      </section>

      {/* Cifras reales del contenido */}
      <section className="border-b border-border">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4">
          {[
            { value: docsCount, label: 'temas documentados' },
            { value: projects.length, label: 'proyectos prácticos' },
            { value: learningPaths.length, label: 'rutas de aprendizaje' },
            { value: glossary.length, label: 'términos en el glosario' },
          ].map((stat, i) => (
            <div key={stat.label} className={`py-7 ${i > 0 ? 'md:border-l md:border-border md:pl-8' : ''} ${i % 2 === 1 ? 'border-l border-border pl-6 md:pl-8' : ''}`}>
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Rutas de aprendizaje */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle
          eyebrow="Rutas de aprendizaje"
          title="Un camino claro, de cero a producción"
          text="Secuencias de temas y proyectos pensadas para avanzar sin lagunas. Elige tu punto de partida."
          href="/rutas"
          cta="Ver todas las rutas"
        />
        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {learningPaths.slice(0, 8).map((path, i) => (
            <li key={path.slug}>
              <Link
                href={`/rutas#${path.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <span>{DIFFICULTY_LABEL[path.level]}</span>
                </div>
                <h3 className="mt-3 font-semibold">{path.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{path.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Route className="size-3.5" aria-hidden /> {path.steps.length} pasos
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Categorías */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTitle
            eyebrow="Categorías"
            title="Todo el ecosistema, organizado"
            text="Documentación estructurada como una referencia técnica: cada categoría avanza de lo esencial a lo avanzado."
            href="/docs"
            cta="Ver índice completo"
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {navigation.map((section) => {
              const items = section.groups.flatMap((g) => g.items);
              return (
                <Link
                  key={section.slug}
                  href={`/docs/${section.slug}`}
                  className="group flex gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-brand/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
                    <SectionIconView icon={section.icon} className="size-5 text-brand" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-semibold">
                      {section.title}
                      {section.badge && (
                        <span className="rounded-full bg-brand-soft px-1.5 py-px text-[10px] font-semibold text-brand">
                          {section.badge}
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{section.description}</span>
                    <span className="mt-2 block text-xs text-muted-foreground">
                      {items.length} {section.kind === 'project' ? 'proyectos' : 'temas'} ·{' '}
                      {formatMinutes(items.reduce((a, i) => a + i.time, 0))}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sección especial */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-1 gap-10 overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">Sección especial</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">Expo + NativeWind: tu propio kit de componentes</h2>
            <p className="mt-3 text-muted-foreground">
              Inicializa un proyecto con TypeScript, configura NativeWind y construye paso a paso botones, inputs, cards,
              modales, selectores y formularios con variantes tipadas. Termina con una biblioteca interna que puedes compartir
              entre proyectos.
            </p>
            <Link
              href="/docs/sistema-de-componentes/vision-general"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
            >
              Construir el kit <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Componentes que construirás">
            {[
              ['Button', 'Variantes, tamaños, estado de carga'],
              ['Input', 'Etiqueta, error, iconos, accesible'],
              ['Card', 'Composición con subcomponentes'],
              ['Modal', 'Bottom sheet con animación'],
              ['Select', 'Opciones tipadas con genéricos'],
              ['Form', 'React Hook Form + Zod'],
            ].map(([name, desc]) => (
              <div key={name} className="rounded-xl border border-border bg-background p-4">
                <div className="flex items-center gap-2 font-mono text-sm font-semibold">
                  <Code2 className="size-4 text-brand" aria-hidden /> {`<${name} />`}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos destacados */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionTitle
          eyebrow="Proyectos destacados"
          title="De una lista de tareas a un e-commerce offline"
          text="Proyectos completos con arquitectura, estructura de carpetas, bocetos de pantallas e implementación paso a paso."
          href="/proyectos"
          cta={`Ver los ${projects.length} proyectos`}
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard
              key={p.id}
              project={{
                id: p.id,
                title: p.title,
                description: p.description,
                url: p.url,
                difficulty: p.difficulty,
                time: p.time,
                technologies: p.technologies ?? [],
              }}
            />
          ))}
        </div>
      </section>

      {/* Tecnologías */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTitle
            eyebrow="Tecnologías"
            title="Qué aprenderás y cuándo usar cada herramienta"
            text="No solo cómo funciona cada librería: también qué problema resuelve y en qué momento conviene incorporarla."
            href="/docs/introduccion/mapa-del-ecosistema"
            cta="Ver el mapa del ecosistema"
          />
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech) => (
              <Link
                key={tech.name}
                href={tech.href}
                className="rounded-2xl border border-border bg-background p-5 transition-colors hover:border-brand/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{tech.name}</span>
                  {tech.version && (
                    <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {tech.version}
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-xs font-medium text-brand">{tech.role}</div>
                <p className="mt-2 text-sm text-muted-foreground">{tech.when}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle
          eyebrow="Por qué Nativo"
          title="Documentación pensada para aprender, no solo para consultar"
          text="Una experiencia inspirada en las mejores documentaciones técnicas, en español y centrada en la práctica."
        />
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-card">
                <Icon className="size-5 text-brand" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="flex flex-col items-start gap-6 rounded-3xl bg-foreground p-8 text-background sm:p-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
              <Smartphone className="size-7" aria-hidden /> Tu primera app está a un tema de distancia
            </h2>
            <p className="mt-2 max-w-xl text-background/70">
              Empieza por la introducción o salta directamente a la ruta que mejor encaje con tu experiencia.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/introduccion/que-es-react-native"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-background px-5 text-sm font-medium text-foreground hover:opacity-90"
            >
              Comenzar ahora <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/glosario"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-background/25 px-5 text-sm font-medium hover:bg-background/10"
            >
              <BookA className="size-4" /> Glosario
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  text: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-brand">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance">{title}</h2>
        <p className="mt-3 text-muted-foreground">{text}</p>
      </div>
      {href && cta && (
        <Link href={href} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium hover:text-brand">
          {cta} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
