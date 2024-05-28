import { writable } from 'svelte/store';
import type { ParticlesSettings } from './particles.types';

const settings: ParticlesSettings = {
  color: '#ffffff',
  stroke: '#a1a1aa',
  effect: 'none'
};

function createParticles(initialValue: ParticlesSettings) {
  const particles = writable<ParticlesSettings>(initialValue);

  function reset() {
    particles.set({
      color: '#ffffff',
      stroke: '#a1a1aa',
      effect: 'none'
    });
  }

  return {
    ...particles,
    reset
  };
}

export const particlesSettings = createParticles(settings);
