import { derived, writable } from 'svelte/store';

export const sortingSize = writable(15);

export const sortingDelay = writable(50);

interface SortingState {
  isPlaying: boolean;
  move: number[];
  current: number;
  total: number;
}

const state: SortingState = {
  isPlaying: false,
  move: [0, 1],
  current: 0,
  total: 0
};

function createSortingState(initialValue: SortingState) {
  const sortingState = writable<SortingState>(initialValue);

  function step() {
    sortingState.update((state) => {
      const current = state.current + 1;
      return { ...state, current };
    });
  }

  function stepBack() {
    sortingState.update((state) => {
      const current = state.current - 1;
      return { ...state, current };
    });
  }

  function reset() {
    sortingState.set(initialValue);
  }

  return {
    ...sortingState,
    step,
    stepBack,
    reset
  };
}

export const sortingState = createSortingState(state);

export const canStep = derived(
  sortingState,
  ($sortingState) => $sortingState.current < $sortingState.total - 1
);

export const canStepBack = derived(sortingState, ($sortingState) => $sortingState.current > 0);
