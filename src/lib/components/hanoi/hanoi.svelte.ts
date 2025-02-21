import { getContext, setContext } from 'svelte';
import type { Disk, HanoiMove } from './hanoi.types';

class HanoiState {
  isSettings = $state(true);
  levels = $state(1);
  disks = $state<Disk[]>([]);
  states = $state<Disk[][]>([]);
  current = $state(0);
  currDisks = $derived(this.states[this.current]);
  total = $derived(this.states.length - 1);

  timeout = 0;
  frame = 0;
  isPlaying = $state(false);

  constructor() { }

  clearAnimation = () => {
    this.isPlaying = false;
    clearTimeout(this.timeout);
    cancelAnimationFrame(this.frame);
  };

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

  initDisks = () => {
    this.disks = [];
    for (let i = 0; i < this.levels; i++) {
      const d: Disk = {
        id: i,
        tower: 0,
        height: i + 1
      };
      this.disks.push(d);
    }
  };

  goToHanoi = () => {
    this.isSettings = false;
    this.current = 0;
    this.initDisks();
    this.getStates();
  };

  goToSettings = () => {
    this.clearAnimation();
    this.current = 0;
    this.isSettings = true;
  };

  restart = () => {
    this.clearAnimation();
    this.current = 0;
    this.isPlaying = false;
  };

  private *getMoves(disks: number, start: number, end: number, aux: number): Generator<HanoiMove> {
    if (disks === 1) {
      yield { from: start, to: end };
    } else {
      yield* this.getMoves(disks - 1, start, aux, end);
      yield { from: start, to: end };
      yield* this.getMoves(disks - 1, aux, end, start);
    }
  }

  applyMove = (disks: Disk[], move: HanoiMove) => {
    const disksOnSrc = disks.filter((d) => d.tower === move.from);
    if (disksOnSrc.length === 0) return;

    const movingDisk = disksOnSrc[0];

    for (const d of disks) {
      if (d.id === movingDisk.id) {
        d.tower = move.to;
      }
    }
  };

  getDisksFromTower = (tower: number) => {
    return this.disks.filter((d) => d.tower === tower);
  };

  getStates = () => {
    this.states = [this.disks];
    let i = 0;
    for (const move of this.getMoves(this.levels, 0, 2, 1)) {
      const disks: Disk[] = this.states[i].map((d) => ({ ...d }));
      this.applyMove(disks, move);
      this.states.push(disks);
      i += 1;
    }
  };

  canStep = () => {
    return this.current < this.total;
  };

  step = () => {
    if (!this.canStep()) return;
    this.current += 1;
  };

  canStepBack = () => {
    return this.current > 0;
  };

  stepBack = () => {
    if (!this.canStepBack()) return;
    this.current -= 1;
  };

  play = () => {
    if (!this.canStep()) return;

    if (this.isPlaying) {
      this.clearAnimation();
    } else {
      this.isPlaying = true;
      this.animate();
    }
  };

  animate = () => {
    if (this.isPlaying && !this.canStep()) {
      this.isPlaying = false;
    }

    if (this.isPlaying && this.canStep()) {
      this.timeout = setTimeout(() => {
        this.frame = requestAnimationFrame(this.animate);
        this.step();
      }, 300);

      return () => {
        clearTimeout(this.timeout);
        cancelAnimationFrame(this.frame);
      };
    }
  };
}

const HANOI_KEY = Symbol('HANOI');

export function setHanoiState() {
  return setContext(HANOI_KEY, new HanoiState());
}

export function getHanoiState() {
  return getContext<ReturnType<typeof setHanoiState>>(HANOI_KEY);
}
