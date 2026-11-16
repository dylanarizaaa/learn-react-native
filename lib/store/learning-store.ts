'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface HistoryEntry {
  id: string;
  visitedAt: number;
}

interface LearningState {
  favorites: string[];
  completed: string[];
  history: HistoryEntry[];
  toggleFavorite: (id: string) => void;
  toggleCompleted: (id: string) => void;
  recordVisit: (id: string) => void;
  clearHistory: () => void;
  resetProgress: () => void;
}

const MAX_HISTORY = 40;

/**
 * Progreso del estudiante. Se guarda en localStorage del navegador:
 * no requiere cuenta y nunca sale del dispositivo.
 */
export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      favorites: [],
      completed: [],
      history: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [id, ...s.favorites],
        })),
      toggleCompleted: (id) =>
        set((s) => ({
          completed: s.completed.includes(id)
            ? s.completed.filter((c) => c !== id)
            : [...s.completed, id],
        })),
      recordVisit: (id) =>
        set((s) => ({
          history: [{ id, visitedAt: Date.now() }, ...s.history.filter((h) => h.id !== id)].slice(
            0,
            MAX_HISTORY,
          ),
        })),
      clearHistory: () => set({ history: [] }),
      resetProgress: () => set({ completed: [] }),
    }),
    {
      name: 'nativo-learning-v1',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

/**
 * Evita diferencias de hidratación: el HTML estático se genera sin datos del
 * usuario, así que solo mostramos el estado persistido tras montar.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
