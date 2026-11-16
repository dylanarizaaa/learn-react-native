'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const MAIN_LINKS = [
  { href: '/docs', label: 'Documentación', match: (p: string) => p.startsWith('/docs') && !p.startsWith('/docs/proyectos') },
  { href: '/proyectos', label: 'Proyectos', match: (p: string) => p.startsWith('/proyectos') || p.startsWith('/docs/proyectos') },
  { href: '/rutas', label: 'Rutas', match: (p: string) => p.startsWith('/rutas') },
  { href: '/glosario', label: 'Glosario', match: (p: string) => p.startsWith('/glosario') },
];

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Principal" className={cn('items-center gap-1', className)}>
      {MAIN_LINKS.map((link) => {
        const active = link.match(pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-md px-2.5 py-1.5 text-sm transition-colors',
              active ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
