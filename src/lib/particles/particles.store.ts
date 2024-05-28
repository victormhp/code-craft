import { writable } from 'svelte/store';
import type { ParticlesSettings } from './particles.types';

const WHITE = '#ffffff';
const GRAY = '#a1a1aa';

const settings: ParticlesSettings = {
  color: WHITE,
  stroke: GRAY,
  fill: false,
  effect: 'none'
};

function createParticles(initialValue: ParticlesSettings) {
  const particles = writable<ParticlesSettings>(initialValue);

  function reset() {
    particles.set({
      color: WHITE,
      stroke: GRAY,
      fill: false,
      effect: 'none'
    });
  }

  function toggleFill() {
    particles.update((curr) => ({
      ...curr,
      fill: !curr.fill,
      color: curr.fill ? WHITE : curr.stroke
    }));
  }

  return {
    ...particles,
    reset,
    toggleFill
  };
}

export const particlesSettings = createParticles(settings);
