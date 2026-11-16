import { Blocks, Braces, Compass, Component, Database, Hammer, Layers, Palette, Rocket, Shield } from 'lucide-react';
import type { SectionIcon } from '@/lib/content/types';

const ICONS = {
  compass: Compass,
  blocks: Blocks,
  braces: Braces,
  rocket: Rocket,
  palette: Palette,
  layers: Layers,
  component: Component,
  database: Database,
  shield: Shield,
  hammer: Hammer,
} satisfies Record<SectionIcon, unknown>;

export function SectionIconView({ icon, className }: { icon: SectionIcon; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden />;
}
