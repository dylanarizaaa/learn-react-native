import type { Metadata, Viewport } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { SearchDialog } from '@/components/search/search-dialog';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Nativo — Aprende React Native construyendo aplicaciones reales',
    template: '%s · Nativo',
  },
  description:
    'Guía práctica en español para dominar React Native, Expo y el desarrollo móvil moderno, desde los fundamentos hasta arquitecturas profesionales.',
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0f12' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh font-sans">
        <ThemeProvider>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
          >
            Saltar al contenido
          </a>
          <SiteHeader />
          <div id="contenido">{children}</div>
          <SiteFooter />
          <SearchDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}
