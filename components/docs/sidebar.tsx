'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, CircleCheck } from 'lucide-react';
import type { NavSection } from '@/lib/content/types';
import { useHydrated, useLearningStore } from '@/lib/store/learning-store';
import { cn } from '@/lib/utils';
import { SectionIconView } from './section-icon';

export function Sidebar({ navigation, onNavigate }: { navigation: NavSection[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const completed = useLearningStore((s) => s.completed);
  const activeSection = navigation.find((s) => pathname.startsWith(`/docs/${s.slug}`))?.slug;

  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    activeSection ? { [activeSection]: true } : { [navigation[0]?.slug ?? '']: true },
  );

  // Al navegar a otra sección, la abrimos sin cerrar las que el usuario abrió.
  useEffect(() => {
    if (activeSection) setOpen((o) => (o[activeSection] ? o : { ...o, [activeSection]: true }));
  }, [activeSection]);

  return (
    <nav aria-label="Documentación" className="flex flex-col gap-1 text-sm">
      {navigation.map((section) => {
        const isOpen = Boolean(open[section.slug]);
        const items = section.groups.flatMap((g) => g.items);
        const done = hydrated ? items.filter((i) => completed.includes(i.id)).length : 0;
        return (
          <div key={section.slug}>
            <button
              type="button"
              onClick={() => setOpen((o) => ({ ...o, [section.slug]: !isOpen }))}
              aria-expanded={isOpen}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left font-medium transition-colors hover:bg-muted',
                activeSection === section.slug ? 'text-foreground' : 'text-foreground/85',
              )}
            >
              <SectionIconView icon={section.icon} className="size-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 leading-snug">{section.title}</span>
              {section.badge && (
                <span className="rounded-full bg-brand-soft px-1.5 py-px text-[10px] font-semibold text-brand">
                  {section.badge}
                </span>
              )}
              {done > 0 && (
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {done}/{items.length}
                </span>
              )}
              <ChevronRight
                className={cn('size-3.5 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-90')}
              />
            </button>
            {isOpen && (
              <div className="mt-0.5 mb-2 ml-[1.05rem] border-l border-border pl-2.5">
                <Link
                  href={`/docs/${section.slug}`}
                  onClick={onNavigate}
                  className={cn(
                    'block rounded-md px-2 py-1 text-[0.82rem] transition-colors',
                    pathname === `/docs/${section.slug}`
                      ? 'bg-brand-soft font-medium text-brand'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  Visión general
                </Link>
                {section.groups.map((group, gi) => (
                  <div key={group.title ?? gi}>
                    {group.title && (
                      <div className="mt-2 mb-0.5 px-2 text-[10.5px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                        {group.title}
                      </div>
                    )}
                    {group.items.map((item) => {
                      const active = pathname === item.url;
                      const isDone = hydrated && completed.includes(item.id);
                      return (
                        <Link
                          key={item.id}
                          href={item.url}
                          onClick={onNavigate}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'flex items-center gap-2 rounded-md px-2 py-1 text-[0.85rem] leading-snug transition-colors',
                            active
                              ? 'bg-brand-soft font-medium text-brand'
                              : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                          )}
                        >
                          <span className="flex-1">{item.title}</span>
                          {isDone && <CircleCheck className="size-3.5 shrink-0 text-success" aria-label="Completado" />}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
