import { Sidebar } from '@/components/docs/sidebar';
import { getNavigation } from '@/lib/content/docs';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const navigation = getNavigation();
  return (
    <div className="mx-auto flex max-w-[90rem] px-4 sm:px-6">
      <aside className="thin-scrollbar sticky top-[var(--header-height)] hidden h-[calc(100dvh-var(--header-height))] w-[var(--sidebar-width)] shrink-0 overflow-y-auto border-r border-border py-6 pr-4 lg:block">
        <Sidebar navigation={navigation} />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
