'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const ORDER = ['light', 'dark', 'system'] as const;
const LABELS = { light: 'Tema claro', dark: 'Tema oscuro', system: 'Tema del sistema' };

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = (mounted ? theme : 'system') as (typeof ORDER)[number];
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = current === 'light' ? Sun : current === 'dark' ? Moon : Monitor;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`${LABELS[current] ?? 'Tema'}. Cambiar a ${LABELS[next].toLowerCase()}`}
      title={LABELS[current]}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        className,
      )}
    >
      <Icon className="size-[1.1rem]" />
    </button>
  );
}
