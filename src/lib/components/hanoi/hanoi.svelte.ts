import { getContext, setContext } from 'svelte';
import type { Towers } from './hanoi.types';

class HanoiState {
    levels = $state(1);
    isSettings = $state(true);
    isPlaying = $state(false);
    towers = $state<Towers>([[], [], []]);

    constructor() { }

    increaseLevel = () => {
        if (this.levels == 10) {
            return;
        }
        this.levels++;
    };

    decreaseLevel = () => {
        if (this.levels == 1) {
            return;
        }
        this.levels--;
    };

    initTowers = () => {
        for (let i = 0; i < this.towers.length; i++) {
            this.towers[i] = [];
        }
    };

    initDisks = () => {
        for (let i = 0; i < this.levels; i++) {
            this.towers[0].push(i + 1);
        }
    };

    initHanoi = () => {
        this.isSettings = false;
        this.initTowers();
        this.initDisks();
    };
}

const HANOI_KEY = Symbol('HANOI');

export function setHanoiState() {
    return setContext(HANOI_KEY, new HanoiState());
}

export function getHanoiState() {
    return getContext<ReturnType<typeof setHanoiState>>(HANOI_KEY);
}
