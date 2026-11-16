import type { Metadata } from 'next';
import { MyLearning, type ManifestEntry, type ManifestSection } from '@/components/learning/my-learning';
import { getAllMeta, getNavigation } from '@/lib/content/docs';

export const metadata: Metadata = {
  title: 'Mi aprendizaje',
  description: 'Tus favoritos, historial de temas consultados y progreso por sección.',
};

export default function MyLearningPage() {
  const docs: ManifestEntry[] = getAllMeta().map((m) => ({
    id: m.id,
    title: m.title,
    url: m.url,
    sectionTitle: m.sectionTitle,
    difficulty: m.difficulty,
  }));
  const sections: ManifestSection[] = getNavigation().map((s) => ({
    slug: s.slug,
    title: s.title,
    ids: s.groups.flatMap((g) => g.items.map((i) => i.id)),
  }));
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-brand">Mi aprendizaje</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Tu progreso</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        Favoritos, historial de temas consultados y avance por sección, guardados localmente en tu dispositivo.
      </p>
      <div className="mt-10">
        <MyLearning docs={docs} sections={sections} />
      </div>
    </main>
  );
}
