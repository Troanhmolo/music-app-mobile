import { create } from 'zustand';
import type { Track } from '@/types';

interface AudioQueueStore {
  queue: Track[];
  currentIndex: number;
  setQueue: (queue: Track[], startIndex: number) => void;
  setCurrentIndex: (index: number) => void;
}


export const useAudioQueueStore = create<AudioQueueStore>((set) => ({
  queue: [],
  currentIndex: 0,
  setQueue: (queue: Track[], startIndex: number) => {
    set({ queue, currentIndex: startIndex});
  },
  setCurrentIndex: (index: number) => {
      set({ currentIndex: index });
  },

  // pause: () => set({ isPlaying: false }),
  // next: () => {
  //   const { currentIndex, queue } = get();
  //   if (currentIndex < queue.length - 1) set({ currentIndex: currentIndex + 1, isPlaying: true });
  // },
  // prev: () => {
  //   const { currentIndex } = get();
  //   if (currentIndex > 0) set({ currentIndex: currentIndex - 1, isPlaying: true });
  // },
}));