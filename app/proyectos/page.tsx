import type { Metadata } from 'next';
import { ProjectsGrid, type ProjectCardData } from '@/components/learning/projects-grid';
import { getSectionDocs } from '@/lib/content/docs';

export const metadata: Metadata = {
  title: 'Proyectos prácticos',
  description: 'Aplicaciones completas y progresivas, de principiante a avanzado, construidas paso a paso con Expo.',
};

export default function ProjectsPage() {
  const projects: ProjectCardData[] = getSectionDocs('proyectos').map((m) => ({
    id: m.id,
    title: m.title,
    description: m.description,
    url: m.url,
    difficulty: m.difficulty,
    time: m.time,
    technologies: m.technologies ?? [],
  }));
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-brand">Proyectos prácticos</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Aprende construyendo apps reales</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        {projects.length} proyectos progresivos. Cada uno incluye objetivos, arquitectura, estructura de carpetas, bocetos de
        pantallas, implementación paso a paso y propuestas de mejora.
      </p>
      <div className="mt-10">
        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
