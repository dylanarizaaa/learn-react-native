/** Tecnologías que enseña la plataforma, con su papel y cuándo usarlas. */
export interface Technology {
  name: string;
  role: string;
  when: string;
  href: string;
  version?: string;
}

export const technologies: Technology[] = [
  {
    name: 'React Native',
    role: 'Base de la app',
    when: 'Siempre: renderiza componentes nativos de Android e iOS desde React.',
    href: '/docs/introduccion/que-es-react-native',
    version: '0.88',
  },
  {
    name: 'Expo',
    role: 'Framework y herramientas',
    when: 'Siempre: plantilla, SDK de módulos nativos, builds y actualizaciones.',
    href: '/docs/introduccion/que-es-expo',
    version: 'SDK 58',
  },
  {
    name: 'TypeScript',
    role: 'Tipado estático',
    when: 'Siempre: detecta errores en props, datos de API y navegación antes de ejecutar.',
    href: '/docs/react-typescript/tipado-de-componentes',
    version: '6.0',
  },
  {
    name: 'Expo Router',
    role: 'Navegación',
    when: 'En cualquier app con más de una pantalla: rutas por archivos, deep links y tabs.',
    href: '/docs/expo/expo-router',
  },
  {
    name: 'NativeWind',
    role: 'Estilos con clases',
    when: 'Cuando quieres un sistema de diseño consistente y rápido de escribir con Tailwind.',
    href: '/docs/estilos/nativewind',
    version: 'v4',
  },
  {
    name: 'React Hooks',
    role: 'Estado y ciclo de vida',
    when: 'En cada componente: estado local, efectos, referencias y lógica reutilizable.',
    href: '/docs/react-typescript/usestate',
  },
  {
    name: 'TanStack Query',
    role: 'Datos del servidor',
    when: 'Cuando consumes APIs: caché, reintentos, paginación y sincronización.',
    href: '/docs/datos/tanstack-query',
    version: 'v5',
  },
  {
    name: 'Zustand',
    role: 'Estado global del cliente',
    when: 'Para estado compartido que no viene del servidor: carrito, preferencias, sesión.',
    href: '/docs/arquitectura/estado-global-zustand',
    version: 'v5',
  },
  {
    name: 'React Hook Form + Zod',
    role: 'Formularios y validación',
    when: 'En formularios con varios campos y reglas: rendimiento y tipos a partir del schema.',
    href: '/docs/sistema-de-componentes/formularios',
  },
  {
    name: 'AsyncStorage y SecureStore',
    role: 'Persistencia local',
    when: 'AsyncStorage para preferencias y caché; SecureStore para tokens y secretos.',
    href: '/docs/datos/almacenamiento-seguro',
  },
  {
    name: 'Reanimated + Gesture Handler',
    role: 'Animaciones y gestos',
    when: 'Cuando la interacción debe ir a 60–120 fps: deslizar, arrastrar, transiciones.',
    href: '/docs/estilos/reanimated',
    version: '4.7',
  },
  {
    name: 'EAS Build y Submit',
    role: 'Compilación y publicación',
    when: 'Para generar binarios firmados y enviarlos a Google Play y App Store.',
    href: '/docs/expo/eas-build',
  },
];
