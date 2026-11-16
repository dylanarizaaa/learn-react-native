export type Difficulty = 'principiante' | 'intermedio' | 'avanzado';

export type SectionIcon =
  | 'compass'
  | 'blocks'
  | 'braces'
  | 'rocket'
  | 'palette'
  | 'layers'
  | 'component'
  | 'database'
  | 'shield'
  | 'hammer';

export interface Resource {
  title: string;
  url: string;
}

/** Datos que cada archivo MDX declara en su frontmatter. */
export interface DocFrontmatter {
  title: string;
  /** Título corto opcional para el sidebar. */
  sidebarTitle?: string;
  description: string;
  difficulty: Difficulty;
  /** Tiempo estimado de lectura y práctica, en minutos. */
  time: number;
  /** IDs de temas (`seccion/slug`) que conviene leer antes. */
  prerequisites?: string[];
  /** IDs de temas relacionados dentro de la plataforma. */
  related?: string[];
  /** Enlaces a documentación oficial. */
  resources?: Resource[];
  /** Términos extra para el buscador. */
  keywords?: string[];
  /** Solo proyectos: objetivo de aprendizaje. */
  goal?: string;
  /** Solo proyectos: tecnologías utilizadas. */
  technologies?: string[];
  /** Solo proyectos: funcionalidades principales. */
  features?: string[];
}

export interface DocMeta extends DocFrontmatter {
  /** Identificador único: `seccion/slug`. */
  id: string;
  section: string;
  slug: string;
  url: string;
  sectionTitle: string;
  kind: 'doc' | 'project';
  /** Grupo dentro de la sección (por ejemplo, nivel del proyecto). */
  group?: string;
}

export interface Doc {
  meta: DocMeta;
  /** Cuerpo MDX sin frontmatter. */
  body: string;
}

export interface SectionGroupConfig {
  title: string;
  pages: string[];
}

export interface SectionConfig {
  slug: string;
  title: string;
  description: string;
  icon: SectionIcon;
  /** Etiqueta destacada en el sidebar (por ejemplo, "Especial"). */
  badge?: string;
  kind?: 'doc' | 'project';
  /** Páginas en orden. Si hay grupos, se usan los grupos. */
  pages?: string[];
  groups?: SectionGroupConfig[];
}

/** Versión ligera de un documento para componentes cliente. */
export interface NavItem {
  id: string;
  title: string;
  url: string;
  difficulty: Difficulty;
  time: number;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export interface NavSection {
  slug: string;
  title: string;
  description: string;
  icon: SectionIcon;
  badge?: string;
  kind: 'doc' | 'project';
  groups: NavGroup[];
}

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface GlossaryEntry {
  slug: string;
  term: string;
  definition: string;
  /** IDs de temas donde se profundiza el término. */
  docs?: string[];
}

export interface LearningPath {
  slug: string;
  title: string;
  description: string;
  level: Difficulty;
  /** Resultado concreto al terminar la ruta. */
  outcome: string;
  steps: string[];
}
