import { writable } from 'svelte/store';
import type { ParticlesSettings } from './particles.types';

const WHITE = '#ffffff';
const GRAY = '#a1a1aa';

const settings: ParticlesSettings = {
  color: WHITE,
  stroke: GRAY,
  effect: 'none'
};

function createParticles(initialValue: ParticlesSettings) {
  const particles = writable<ParticlesSettings>(initialValue);

  function reset() {
    particles.set({
      color: WHITE,
      stroke: GRAY,
      effect: 'none'
    });
  }

  return {
    ...particles,
    reset
  };
}

export const particlesSettings = createParticles(settings);
