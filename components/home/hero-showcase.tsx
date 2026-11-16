import { highlight } from '@/lib/mdx/highlight';

const HERO_CODE = `import { FlatList, Pressable, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/components/ui/loading';
import { getCourses } from '@/services/courses';

export default function CoursesScreen() {
  const { data, isPending } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  if (isPending) return <Loading />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerClassName="gap-3 p-4"
      renderItem={({ item }) => (
        <Pressable className="rounded-2xl bg-white p-4 active:opacity-80">
          <Text className="font-semibold">{item.title}</Text>
          <Text className="text-zinc-500">{item.lessons} lecciones</Text>
        </Pressable>
      )}
    />
  );
}`;

const COURSES = [
  { title: 'Fundamentos de React Native', lessons: 11, color: 'bg-sky-500' },
  { title: 'Expo Router', lessons: 8, color: 'bg-violet-500' },
  { title: 'NativeWind', lessons: 7, color: 'bg-teal-500' },
  { title: 'TanStack Query', lessons: 6, color: 'bg-rose-500' },
  { title: 'Publicación con EAS', lessons: 5, color: 'bg-amber-500' },
];

/** Código real del hero y una vista previa de lo que renderiza. */
export async function HeroShowcase() {
  const html = await highlight(HERO_CODE, 'tsx');
  return (
    <div className="relative flex flex-col items-center gap-6 lg:block">
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-code shadow-xl shadow-black/5 lg:mr-32 lg:w-auto">
        <div className="flex h-10 items-center gap-2 border-b border-border bg-code-header px-4">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
          </span>
          <span className="ml-2 font-mono text-xs text-muted-foreground">src/app/(tabs)/cursos.tsx</span>
        </div>
        <div
          className="code-body thin-scrollbar max-h-[25rem] overflow-auto text-[0.78rem]"
          data-line-numbers="true"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <div
        className="w-[15.5rem] shrink-0 rounded-[2.4rem] border-[6px] border-foreground/90 bg-zinc-100 shadow-2xl lg:absolute lg:top-12 lg:-right-4 lg:w-[14.5rem] dark:bg-zinc-900"
        role="img"
        aria-label="Vista previa en un teléfono de la lista de cursos que renderiza el código"
      >
        <div className="flex h-7 items-center justify-between px-5 text-[10px] font-semibold text-zinc-500">
          <span>9:41</span>
          <span className="h-4 w-16 rounded-full bg-foreground/90" />
          <span>5G</span>
        </div>
        <div className="px-4 pt-2 pb-1 text-lg font-bold text-zinc-900 dark:text-zinc-50">Cursos</div>
        <div className="flex flex-col gap-2.5 p-3.5 pt-1.5">
          {COURSES.map((c) => (
            <div key={c.title} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm dark:bg-zinc-800">
              <span className={`size-8 shrink-0 rounded-xl ${c.color}`} aria-hidden />
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-semibold text-zinc-900 dark:text-zinc-50">{c.title}</span>
                <span className="block text-[11px] text-zinc-500">{c.lessons} lecciones</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-1 mb-2 h-1 w-20 rounded-full bg-foreground/80" />
      </div>
    </div>
  );
}
