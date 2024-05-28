export interface ParticlesSettings {
  color: string;
  stroke: string;
  effect: 'physics' | 'sunrays' | 'none';
}

export type Mouse = {
  x: number;
  y: number;
  pressed: boolean;
  radius: number;
};
