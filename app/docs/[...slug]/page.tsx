import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CompleteButton, VisitRecorder } from '@/components/docs/doc-actions';
import { DifficultyBadge, DocHeader, Pager, ProjectSummary, RelatedResources, TimeBadge } from '@/components/docs/doc-parts';
import { ReadingProgress } from '@/components/docs/reading-progress';
import { SectionIconView } from '@/components/docs/section-icon';
import { SectionProgress } from '@/components/learning/section-progress';
import { TableOfContents } from '@/components/docs/toc';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { getAllMeta, getDoc, getNavigation, getPrevNext, resolveMetas } from '@/lib/content/docs';
import { compileMdx } from '@/lib/mdx/compile';
import { formatMinutes } from '@/lib/utils';

export const dynamicParams = false;

export function generateStaticParams() {
  const docs = getAllMeta().map((m) => ({ slug: [m.section, m.slug] }));
  const sections = getNavigation().map((s) => ({ slug: [s.slug] }));
  return [...sections, ...docs];
}

type Params = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (slug.length === 1) {
    const section = getNavigation().find((s) => s.slug === slug[0]);
    return section ? { title: section.title, description: section.description } : {};
  }
  const doc = getDoc(slug.join('/'));
  if (!doc) return {};
  return { title: doc.meta.title, description: doc.meta.description };
}

export default async function DocPage({ params }: Params) {
  const { slug } = await params;
  if (slug.length === 1) return <SectionOverview sectionSlug={slug[0]} />;

  const doc = getDoc(slug.join('/'));
  if (!doc) notFound();
  const { meta } = doc;

  const { Content, toc } = await compileMdx(doc.body);
  const { prev, next } = getPrevNext(meta.id);
  const prerequisites = resolveMetas(meta.prerequisites);
  const related = resolveMetas(meta.related);
  const tocWithResources =
    meta.resources?.length || related.length
      ? [...toc, { id: 'recursos-relacionados', text: 'Recursos relacionados', depth: 2 as const }]
      : toc;

  return (
    <>
      <ReadingProgress />
      <VisitRecorder id={meta.id} />
      <div className="flex gap-10 xl:gap-14">
        <article className="mx-auto w-full max-w-3xl min-w-0 py-8 lg:py-10 lg:pl-10 xl:mx-0">
          <DocHeader meta={meta} prerequisites={prerequisites} />
          {meta.kind === 'project' && <ProjectSummary meta={meta} />}
          <div className="doc-content mt-8">
            <Content components={mdxComponents} />
          </div>
          <RelatedResources meta={meta} related={related} />
          <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-border bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">¿Terminaste este tema?</p>
              <p className="text-sm text-muted-foreground">
                Márcalo como completado para seguir tu progreso. Se guarda solo en este navegador.
              </p>
            </div>
            <CompleteButton id={meta.id} size="lg" />
          </div>
          <Pager prev={prev} next={next} />
        </article>
        <aside className="thin-scrollbar sticky top-[var(--header-height)] hidden h-[calc(100dvh-var(--header-height))] w-56 shrink-0 overflow-y-auto py-10 xl:block">
          <TableOfContents toc={tocWithResources} />
        </aside>
      </div>
    </>
  );
}

function SectionOverview({ sectionSlug }: { sectionSlug: string }) {
  const section = getNavigation().find((s) => s.slug === sectionSlug);
  if (!section) notFound();
  const items = section.groups.flatMap((g) => g.items);
  const totalTime = items.reduce((acc, i) => acc + i.time, 0);
  const metas = resolveMetas(items.map((i) => i.id));

  return (
    <div className="mx-auto max-w-3xl py-8 lg:py-10 lg:pl-10 xl:mx-0">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-card">
          <SectionIconView icon={section.icon} className="size-5 text-brand" />
        </span>
        {section.badge && (
          <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand">{section.badge}</span>
        )}
      </div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{section.title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{section.description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>{items.length} temas</span>
        <span aria-hidden>·</span>
        <span>{formatMinutes(totalTime)} en total</span>
        <SectionProgress ids={items.map((i) => i.id)} />
      </div>

      {section.groups.map((group, gi) => (
        <section key={group.title ?? gi} className="mt-10">
          {group.title && <h2 className="mb-3 text-lg font-semibold">{group.title}</h2>}
          <ol className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
            {group.items.map((item) => {
              const meta = metas.find((m) => m.id === item.id);
              const index = items.findIndex((i) => i.id === item.id) + 1;
              return (
                <li key={item.id}>
                  <Link href={item.url} className="group flex gap-4 p-4 transition-colors hover:bg-muted/40 sm:p-5">
                    <span className="mt-0.5 font-mono text-xs text-muted-foreground tabular-nums">
                      {String(index).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-medium">
                        {meta?.title ?? item.title}
                        <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </span>
                      {meta && <span className="mt-1 block text-sm text-muted-foreground">{meta.description}</span>}
                      <span className="mt-2.5 flex flex-wrap gap-2">
                        <DifficultyBadge difficulty={item.difficulty} />
                        <TimeBadge minutes={item.time} />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
