import type { ParticleEffects } from './particles.types';

const WHITE = '#ffffff';
const GRAY = '#bababa';

export class ParticleState {
  color = $state(WHITE);
  stroke = $state(GRAY);
  effect = $state<ParticleEffects>('none');

  constructor() { }

  reset = () => {
    this.color = WHITE;
    this.stroke = GRAY;
    this.effect = 'none';
  };
}

export const particles = new ParticleState();
