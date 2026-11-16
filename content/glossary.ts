import type { GlossaryEntry } from '@/lib/content/types';

/** Glosario técnico. Ordenado alfabéticamente al mostrarse. */
export const glossary: GlossaryEntry[] = [
  {
    slug: 'aab',
    term: 'AAB / APK',
    definition:
      'Formatos de paquete de Android. El APK se instala directamente en un dispositivo; el AAB (Android App Bundle) es el formato que exige Google Play para publicar.',
    docs: ['expo/eas-build', 'expo/publicacion-en-tiendas'],
  },
  {
    slug: 'app-config',
    term: 'App config',
    definition:
      'Configuración de la app Expo en app.json o app.config.ts: nombre, identificadores, iconos, permisos y plugins. Expo la usa para generar los proyectos nativos.',
    docs: ['expo/app-json'],
  },
  {
    slug: 'asyncstorage',
    term: 'AsyncStorage',
    definition:
      'Almacenamiento clave-valor asíncrono, persistente y sin cifrar. Útil para preferencias y caché; nunca para tokens o datos sensibles.',
    docs: ['datos/almacenamiento-seguro'],
  },
  {
    slug: 'babel',
    term: 'Babel',
    definition:
      'Transpilador que transforma JSX y TypeScript en JavaScript que el motor puede ejecutar. En Expo se configura con babel-preset-expo.',
    docs: ['estilos/configuracion-de-nativewind'],
  },
  {
    slug: 'bundle',
    term: 'Bundle',
    definition:
      'Archivo JavaScript único que Metro genera a partir de todo tu código y dependencias. Es lo que ejecuta la app y lo que reemplaza una actualización OTA.',
    docs: ['introduccion/como-funciona-react-native', 'expo/eas-update'],
  },
  {
    slug: 'cng',
    term: 'CNG (Continuous Native Generation)',
    definition:
      'Enfoque de Expo en el que las carpetas android/ e ios/ se generan a partir de la app config y los config plugins, en lugar de editarse a mano.',
    docs: ['expo/app-json', 'introduccion/expo-go-vs-development-builds'],
  },
  {
    slug: 'componente',
    term: 'Componente',
    definition:
      'Función que recibe props y devuelve una descripción de la interfaz (JSX). Es la unidad básica de reutilización en React.',
    docs: ['fundamentos/componentes-principales', 'react-typescript/props'],
  },
  {
    slug: 'componente-controlado',
    term: 'Componente controlado',
    definition:
      'Input cuyo valor vive en el estado de React (value + onChangeText). React es la única fuente de verdad del valor mostrado.',
    docs: ['fundamentos/textinput'],
  },
  {
    slug: 'config-plugin',
    term: 'Config plugin',
    definition:
      'Función que modifica los proyectos nativos durante el prebuild (por ejemplo, para añadir permisos o claves). Se declaran en la propiedad plugins de la app config.',
    docs: ['expo/app-json'],
  },
  {
    slug: 'context',
    term: 'Context',
    definition:
      'Mecanismo de React para compartir un valor con todo un subárbol de componentes sin pasarlo manualmente como prop en cada nivel.',
    docs: ['react-typescript/context-api'],
  },
  {
    slug: 'deep-link',
    term: 'Deep link',
    definition:
      'URL que abre la app directamente en una pantalla concreta, por ejemplo miapp://pedidos/42. Con Expo Router cada pantalla tiene una URL.',
    docs: ['expo/expo-linking', 'expo/navegacion-por-archivos'],
  },
  {
    slug: 'design-system',
    term: 'Design system',
    definition:
      'Conjunto de tokens (colores, espaciados, tipografía), componentes y reglas de uso que garantizan una interfaz coherente entre pantallas y equipos.',
    docs: ['arquitectura/design-system', 'sistema-de-componentes/temas-y-variantes'],
  },
  {
    slug: 'development-build',
    term: 'Development build',
    definition:
      'Versión de depuración de tu propia app que incluye expo-dev-client. Funciona como un Expo Go personalizado con cualquier librería nativa.',
    docs: ['introduccion/expo-go-vs-development-builds'],
  },
  {
    slug: 'eas',
    term: 'EAS (Expo Application Services)',
    definition:
      'Servicios en la nube de Expo para compilar (Build), publicar en tiendas (Submit) y enviar actualizaciones OTA (Update). La documentación oficial actual los llama Expo Build, Expo Submit y Expo Update.',
    docs: ['expo/eas-build', 'expo/eas-update', 'expo/publicacion-en-tiendas'],
  },
  {
    slug: 'edge-to-edge',
    term: 'Edge-to-edge',
    definition:
      'Modo en el que la app dibuja detrás de la barra de estado y de navegación del sistema. Es obligatorio en Android moderno, por eso hay que respetar las áreas seguras.',
    docs: ['fundamentos/safe-area'],
  },
  {
    slug: 'expo-go',
    term: 'Expo Go',
    definition:
      'App de las tiendas que ejecuta proyectos Expo sin compilar. Solo incluye los módulos nativos del SDK de Expo, por eso no admite librerías nativas personalizadas.',
    docs: ['introduccion/expo-go-vs-development-builds'],
  },
  {
    slug: 'expo-router',
    term: 'Expo Router',
    definition:
      'Sistema de navegación basado en archivos: cada archivo dentro de src/app es una pantalla con su propia URL.',
    docs: ['expo/expo-router', 'expo/navegacion-por-archivos'],
  },
  {
    slug: 'fabric',
    term: 'Fabric',
    definition:
      'Renderizador de la Nueva Arquitectura de React Native. Calcula el layout en C++ y permite renderizado concurrente y actualizaciones síncronas.',
    docs: ['introduccion/como-funciona-react-native'],
  },
  {
    slug: 'fast-refresh',
    term: 'Fast Refresh',
    definition:
      'Recarga en caliente que aplica tus cambios de código en segundos conservando el estado de los componentes.',
    docs: ['introduccion/preparacion-del-entorno'],
  },
  {
    slug: 'flexbox',
    term: 'Flexbox',
    definition:
      'Modelo de layout que React Native usa por defecto. A diferencia de la web, flexDirection es column por defecto.',
    docs: ['fundamentos/flexbox-y-responsive', 'estilos/flexbox'],
  },
  {
    slug: 'hermes',
    term: 'Hermes',
    definition:
      'Motor de JavaScript optimizado para React Native. Compila el bundle a bytecode para arrancar más rápido y consumir menos memoria.',
    docs: ['introduccion/como-funciona-react-native'],
  },
  {
    slug: 'hook',
    term: 'Hook',
    definition:
      'Función de React cuyo nombre empieza por use (useState, useEffect…) que permite usar estado y efectos dentro de componentes funcionales.',
    docs: ['react-typescript/usestate', 'react-typescript/hooks-personalizados'],
  },
  {
    slug: 'interceptor',
    term: 'Interceptor',
    definition:
      'Función que se ejecuta antes de cada petición o después de cada respuesta HTTP. Se usa para añadir tokens, refrescarlos o normalizar errores.',
    docs: ['datos/fetch-y-axios', 'datos/jwt'],
  },
  {
    slug: 'jsi',
    term: 'JSI (JavaScript Interface)',
    definition:
      'Capa en C++ que permite a JavaScript llamar directamente a código nativo y mantener referencias a objetos nativos, sin serializar mensajes como hacía el antiguo bridge.',
    docs: ['introduccion/como-funciona-react-native'],
  },
  {
    slug: 'jsx',
    term: 'JSX / TSX',
    definition:
      'Sintaxis que permite escribir la interfaz con etiquetas dentro de JavaScript. TSX es la misma sintaxis en archivos TypeScript.',
    docs: ['react-typescript/jsx-y-tsx'],
  },
  {
    slug: 'jwt',
    term: 'JWT',
    definition:
      'JSON Web Token: credencial firmada que el servidor emite tras el login y que el cliente envía en cada petición, normalmente en la cabecera Authorization.',
    docs: ['datos/jwt', 'datos/autenticacion'],
  },
  {
    slug: 'keychain',
    term: 'Keychain / Keystore',
    definition:
      'Almacenes cifrados del sistema operativo (iOS y Android). expo-secure-store los utiliza para guardar secretos.',
    docs: ['expo/expo-secure-store'],
  },
  {
    slug: 'layout-route',
    term: 'Layout (Expo Router)',
    definition:
      'Archivo _layout.tsx que define cómo se presentan las pantallas de una carpeta (Stack, Tabs…) y envuelve a todas sus rutas hijas.',
    docs: ['expo/expo-router'],
  },
  {
    slug: 'memoizacion',
    term: 'Memoización',
    definition:
      'Guardar el resultado de un cálculo o una referencia para reutilizarlo mientras sus dependencias no cambien (memo, useMemo, useCallback).',
    docs: ['react-typescript/usememo-y-usecallback', 'calidad/memoizacion'],
  },
  {
    slug: 'metro',
    term: 'Metro',
    definition:
      'Empaquetador de JavaScript de React Native. Resuelve módulos, transforma el código con Babel y sirve el bundle durante el desarrollo.',
    docs: ['introduccion/como-funciona-react-native'],
  },
  {
    slug: 'modulo-nativo',
    term: 'Módulo nativo',
    definition:
      'Código Swift/Kotlin expuesto a JavaScript. En Expo se escriben con la Expo Modules API y se consumen como cualquier paquete npm.',
    docs: ['introduccion/como-funciona-react-native', 'introduccion/expo-go-vs-development-builds'],
  },
  {
    slug: 'monorepo',
    term: 'Monorepo',
    definition:
      'Repositorio que contiene varios paquetes o apps (por ejemplo, dos apps y una biblioteca de UI compartida) gestionados con workspaces.',
    docs: ['sistema-de-componentes/biblioteca-compartida', 'arquitectura/biblioteca-interna'],
  },
  {
    slug: 'mutacion',
    term: 'Mutación',
    definition:
      'En TanStack Query, una operación que modifica datos en el servidor (crear, actualizar, borrar), gestionada con useMutation.',
    docs: ['datos/tanstack-query'],
  },
  {
    slug: 'nativewind',
    term: 'NativeWind',
    definition:
      'Librería que permite estilizar componentes de React Native con clases de Tailwind CSS mediante la prop className.',
    docs: ['estilos/nativewind', 'estilos/configuracion-de-nativewind'],
  },
  {
    slug: 'nueva-arquitectura',
    term: 'Nueva Arquitectura',
    definition:
      'Arquitectura actual de React Native basada en JSI, Fabric y TurboModules. Desde React Native 0.82 (Expo SDK 55) es la única disponible.',
    docs: ['introduccion/como-funciona-react-native'],
  },
  {
    slug: 'ota',
    term: 'Actualización OTA',
    definition:
      'Over-the-air: publicar un nuevo bundle de JavaScript y assets sin pasar por la revisión de las tiendas. Solo sirve para cambios que no tocan código nativo.',
    docs: ['expo/eas-update'],
  },
  {
    slug: 'optimistic-update',
    term: 'Actualización optimista',
    definition:
      'Mostrar el resultado de una acción en la UI antes de que el servidor la confirme, y revertirlo si la petición falla.',
    docs: ['datos/tanstack-query', 'proyectos/lista-de-tareas'],
  },
  {
    slug: 'prebuild',
    term: 'Prebuild',
    definition:
      'Comando (npx expo prebuild) que genera las carpetas nativas android/ e ios/ a partir de la app config y los config plugins.',
    docs: ['expo/app-json'],
  },
  {
    slug: 'props',
    term: 'Props',
    definition:
      'Parámetros de entrada de un componente. Son de solo lectura: el componente no debe modificarlos.',
    docs: ['react-typescript/props'],
  },
  {
    slug: 'query-key',
    term: 'Query key',
    definition:
      'Arreglo que identifica de forma única una consulta en TanStack Query, por ejemplo [\'products\', { page: 2 }]. Determina la caché y la invalidación.',
    docs: ['datos/tanstack-query'],
  },
  {
    slug: 'react-compiler',
    term: 'React Compiler',
    definition:
      'Compilador que memoiza componentes y valores automáticamente en tiempo de build. Reduce la necesidad de useMemo, useCallback y memo manuales.',
    docs: ['calidad/memoizacion', 'react-typescript/usememo-y-usecallback'],
  },
  {
    slug: 'reconciliacion',
    term: 'Reconciliación',
    definition:
      'Proceso con el que React compara el árbol anterior con el nuevo para aplicar solo los cambios necesarios en las vistas nativas.',
    docs: ['calidad/rendimiento'],
  },
  {
    slug: 'refresh-token',
    term: 'Refresh token',
    definition:
      'Credencial de larga duración que permite obtener un nuevo access token sin volver a pedir usuario y contraseña.',
    docs: ['datos/jwt'],
  },
  {
    slug: 'render',
    term: 'Render',
    definition:
      'Ejecución de la función de un componente para calcular qué debe mostrarse. Ocurre al montar y cada vez que cambian su estado, sus props o un contexto que consume.',
    docs: ['react-typescript/state', 'calidad/rendimiento'],
  },
  {
    slug: 'ruta-dinamica',
    term: 'Ruta dinámica',
    definition:
      'Archivo con nombre entre corchetes, como [id].tsx, que coincide con cualquier valor en ese segmento de la URL.',
    docs: ['expo/navegacion-por-archivos'],
  },
  {
    slug: 'safe-area',
    term: 'Área segura',
    definition:
      'Zona de la pantalla que no queda tapada por el notch, la isla dinámica, la barra de estado o los gestos del sistema.',
    docs: ['fundamentos/safe-area'],
  },
  {
    slug: 'schema',
    term: 'Schema (Zod)',
    definition:
      'Descripción declarativa de la forma de un dato que permite validarlo en tiempo de ejecución e inferir su tipo de TypeScript.',
    docs: ['sistema-de-componentes/formularios', 'datos/apis-rest'],
  },
  {
    slug: 'shared-value',
    term: 'Shared value',
    definition:
      'Valor de Reanimated que vive en el hilo de UI y puede animarse sin provocar renders de React.',
    docs: ['estilos/reanimated'],
  },
  {
    slug: 'stale-time',
    term: 'staleTime',
    definition:
      'Tiempo durante el cual TanStack Query considera fresco un dato en caché y no lo vuelve a pedir automáticamente.',
    docs: ['datos/tanstack-query'],
  },
  {
    slug: 'state',
    term: 'Estado (state)',
    definition:
      'Datos que pertenecen a un componente y que, al cambiar, provocan un nuevo render.',
    docs: ['react-typescript/state', 'react-typescript/usestate'],
  },
  {
    slug: 'store',
    term: 'Store',
    definition:
      'Contenedor de estado global fuera del árbol de componentes. En Zustand se crea con create() y se consume con un hook y un selector.',
    docs: ['arquitectura/estado-global-zustand', 'proyectos/ecommerce'],
  },
  {
    slug: 'token-diseno',
    term: 'Token de diseño',
    definition:
      'Valor con nombre semántico (por ejemplo, color.primary o spacing.md) que sustituye a valores literales en los estilos.',
    docs: ['arquitectura/design-system', 'estilos/temas-personalizados'],
  },
  {
    slug: 'turbomodules',
    term: 'TurboModules',
    definition:
      'Sistema de módulos nativos de la Nueva Arquitectura: se cargan bajo demanda y se comunican por JSI con tipos generados por Codegen.',
    docs: ['introduccion/como-funciona-react-native'],
  },
  {
    slug: 'typescript',
    term: 'TypeScript',
    definition:
      'Superconjunto de JavaScript con tipos estáticos. Detecta errores antes de ejecutar y mejora el autocompletado. Es el estándar en proyectos Expo.',
    docs: ['react-typescript/tipado-de-componentes', 'react-typescript/interfaces-y-tipos'],
  },
  {
    slug: 'ui-thread',
    term: 'Hilo de UI / hilo de JS',
    definition:
      'React Native ejecuta tu JavaScript en un hilo y dibuja la interfaz en el hilo principal (UI). Bloquear el hilo de JS provoca animaciones y toques lentos.',
    docs: ['introduccion/como-funciona-react-native', 'estilos/reanimated'],
  },
  {
    slug: 'variables-de-entorno',
    term: 'Variables de entorno',
    definition:
      'Valores de configuración externos al código. En Expo, solo las que empiezan por EXPO_PUBLIC_ se incrustan en el bundle de la app.',
    docs: ['expo/variables-de-entorno'],
  },
  {
    slug: 'virtualizacion',
    term: 'Virtualización',
    definition:
      'Técnica de las listas (FlatList, FlashList) que solo renderiza los elementos visibles y recicla o desmonta los que salen de pantalla.',
    docs: ['fundamentos/scrollview-y-flatlist', 'calidad/optimizacion-de-flatlist'],
  },
  {
    slug: 'worklet',
    term: 'Worklet',
    definition:
      'Función de JavaScript que se ejecuta en el hilo de UI. Reanimated y Gesture Handler las usan para animar a 60–120 fps.',
    docs: ['estilos/reanimated', 'estilos/gesture-handler'],
  },
  {
    slug: 'yoga',
    term: 'Yoga',
    definition:
      'Motor de layout multiplataforma, escrito en C++, que implementa Flexbox en React Native.',
    docs: ['fundamentos/flexbox-y-responsive'],
  },
  {
    slug: 'zustand',
    term: 'Zustand',
    definition:
      'Librería mínima de estado global basada en hooks. Permite leer solo la parte del estado que necesita cada componente mediante selectores.',
    docs: ['arquitectura/estado-global-zustand', 'proyectos/finanzas-personales'],
  },
];
