import Link from 'next/link';
import { cn } from '@/lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn('size-7', className)}>
      <rect x="1" y="1" width="30" height="30" rx="8" className="fill-foreground" />
      <rect x="10.5" y="6.5" width="11" height="19" rx="2.6" className="fill-none stroke-background" strokeWidth="1.8" />
      <ellipse cx="16" cy="16" rx="10.5" ry="3.6" className="fill-none stroke-brand" strokeWidth="1.5" transform="rotate(-30 16 16)" />
      <circle cx="16" cy="16" r="1.8" className="fill-brand" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2 font-semibold tracking-tight', className)} aria-label="Nativo, ir al inicio">
      <LogoMark />
      <span className="text-[0.95rem]">
        Nativo<span className="text-muted-foreground font-normal"> / RN</span>
      </span>
    </Link>
  );
}
