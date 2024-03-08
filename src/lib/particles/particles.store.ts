import { writable } from 'svelte/store';

interface Particles {
  color: string;
}

const settings: Particles = {
  color: '#d4d4d8'
};

function createParticles(initialValue: Particles) {
  const particles = writable<Particles>(initialValue);

  function reset() {
    particles.set({ color: '#d4d4d8' });
  }

  return {
    ...particles,
    reset
  };
}

export const particlesSettings = createParticles(settings);
