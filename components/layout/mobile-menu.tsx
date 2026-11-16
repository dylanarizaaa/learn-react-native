'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import type { NavSection } from '@/lib/content/types';
import { Sidebar } from '@/components/docs/sidebar';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { MAIN_LINKS } from './main-nav';

export function MobileMenu({ navigation }: { navigation: NavSection[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="-ml-1.5 inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
        aria-label="Abrir menú de navegación"
      >
        <Menu className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-overlay-in fixed inset-0 z-50 bg-black/40 lg:hidden" />
        <Dialog.Content
          className="animate-drawer-in fixed inset-y-0 left-0 z-50 flex w-[min(20rem,88vw)] flex-col border-r border-border bg-background shadow-xl lg:hidden"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Navegación</Dialog.Title>
          <div className="flex h-[var(--header-height)] shrink-0 items-center justify-between border-b border-border px-4">
            <Logo />
            <Dialog.Close
              className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Cerrar menú"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <div className="thin-scrollbar flex-1 overflow-y-auto px-3 py-4">
            <nav aria-label="Principal" className="mb-4 grid grid-cols-2 gap-1.5">
              {[...MAIN_LINKS, { href: '/mi-aprendizaje', label: 'Mi aprendizaje', match: (p: string) => p.startsWith('/mi-aprendizaje') }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'rounded-lg border border-border px-3 py-2 text-sm',
                      link.match(pathname) ? 'border-brand/40 bg-brand-soft font-medium text-brand' : 'text-foreground/80',
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
            <Sidebar navigation={navigation} onNavigate={() => setOpen(false)} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
