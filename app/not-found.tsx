import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Esta página no existe</h1>
      <p className="mt-3 text-muted-foreground">
        Puede que el enlace esté mal escrito o que el tema haya cambiado de lugar. Usa el buscador (⌘K) o vuelve al índice.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/docs" className="inline-flex h-10 items-center rounded-lg bg-foreground px-4 text-sm font-medium text-background">
          Ir a la documentación
        </Link>
        <Link href="/" className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium">
          Inicio
        </Link>
      </div>
    </main>
  );
}
