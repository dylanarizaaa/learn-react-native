import Link from 'next/link';
import { BookMarked } from 'lucide-react';
import { getNavigation } from '@/lib/content/docs';
import { SearchTrigger } from '@/components/search/search-dialog';
import { Logo } from './logo';
import { MainNav } from './main-nav';
import { MobileMenu } from './mobile-menu';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  const navigation = getNavigation();
  return (
    <header className="sticky top-0 z-40 h-[var(--header-height)] border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-full max-w-[90rem] items-center gap-4 px-4 sm:px-6">
        <MobileMenu navigation={navigation} />
        <Logo />
        <MainNav className="ml-4 hidden md:flex" />
        <div className="ml-auto flex items-center gap-1">
          <SearchTrigger className="mr-1 hidden w-60 lg:flex" />
          <SearchTrigger variant="icon" className="lg:hidden" />
          <Link
            href="/mi-aprendizaje"
            aria-label="Mi aprendizaje: favoritos, historial y progreso"
            title="Mi aprendizaje"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <BookMarked className="size-[1.1rem]" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
