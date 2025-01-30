import type { Action } from 'svelte/action';
import type { Mouse } from './particles.types';
import { ParticleState } from './particles.svelte';

export class Particle {
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  pushX: number;
  pushY: number;
  friction: number;

  constructor(
    public id: number,
    public effect: Effect
  ) {
    this.radius = Math.floor(Math.random() * 4 + 2);
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
    this.pushX = 0;
    this.pushY = 0;
    this.friction = 0.95;
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.effect.settings.effect === 'sunrays' && this.id % 5 === 0) {
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.effect.mouse.x, this.effect.mouse.y);
      context.stroke();
    }

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }

  update() {
    if (this.effect.settings.effect === 'physics' && this.effect.mouse.pressed) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = this.effect.mouse.radius / distance;

      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        this.pushX += Math.cos(angle) * force;
        this.pushY += Math.sin(angle) * force;
      }
    }

    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;

    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -1;
    } else if (this.x > this.effect.width - this.radius) {
      this.x = this.effect.width - this.radius;
      this.vx *= -1;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy *= -1;
    } else if (this.y > this.effect.height - this.radius) {
      this.y = this.effect.height - this.radius;
      this.vy *= -1;
    }
  }

  reset() {
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
  }
}

export class Effect {
  width: number;
  height: number;
  count: number;
  connectDistance: number;
  particles: Particle[];
  mouse: Mouse;

  constructor(
    public canvas: HTMLCanvasElement,
    public context: CanvasRenderingContext2D,
    public settings: ParticleState
  ) {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.count = Math.floor(this.canvas.width / 5);
    this.connectDistance = 100;
    this.particles = [];
    this.mouse = {
      x: 0,
      y: 0,
      pressed: false,
      radius: 120
    };
    this.createParticles();

    window.addEventListener('resize', () => {
      this.resize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener('mousedown', (e) => {
      const target = e.target as HTMLElement;
      // Check if the user clicks in a button or menu from the main page
      if (!target.closest('button') && !target.closest('a') && !target.closest('article')) {
        this.mouse.pressed = true;
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      }
    });

    window.addEventListener('mouseup', () => {
      this.mouse.pressed = false;
    });
  }

  createParticles() {
    for (let i = 0; i < this.count; i++) {
      this.particles.push(new Particle(i, this));
    }
  }

  deleteParticles() {
    this.particles = [];
  }

  handleParticles(context: CanvasRenderingContext2D) {
    this.connectParticles(context);
    this.connectParticlesToMouse(context);

    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();

      context.fillStyle = this.settings.color
      context.strokeStyle = this.settings.stroke
    });
  }

  drawLine(
    context: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    opacity: number
  ) {
    context.save();
    context.globalAlpha = opacity;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.restore();
  }

  connectParticles(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.hypot(dx, dy);

        if (distance < this.connectDistance) {
          const opacity = 1 - distance / this.connectDistance;
          this.drawLine(
            context,
            this.particles[i].x,
            this.particles[i].y,
            this.particles[j].x,
            this.particles[j].y,
            opacity
          );
        }
      }
    }
  }

  connectParticlesToMouse(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.particles.length; i++) {
      const dx = this.particles[i].x - this.mouse.x;
      const dy = this.particles[i].y - this.mouse.y;
      const distance = Math.hypot(dx, dy);

      if (distance < this.connectDistance) {
        const opacity = 1 - distance / this.connectDistance;
        this.drawLine(
          context,
          this.particles[i].x,
          this.particles[i].y,
          this.mouse.x,
          this.mouse.y,
          opacity
        );
      }
    }
  }

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.context.fillStyle = this.settings.color;
    this.context.strokeStyle = this.settings.stroke;
    this.particles.forEach((p) => p.reset());
    this.deleteParticles();
    this.count = Math.floor(width / 5);
    this.createParticles();
  }
}

type ParticlesAction = Action<HTMLCanvasElement, ParticleState>;

export const particlesAction: ParticlesAction = (
  canvas: HTMLCanvasElement,
  settings: ParticleState
) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.fillStyle = settings.color;
  context.strokeStyle = settings.stroke;

  const effect = new Effect(canvas, context, settings);
  let frame = 0;

  const animate = () => {
    frame = requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(context);
  };

  animate();

  return {
    destroy() {
      cancelAnimationFrame(frame);
    }
  };
};
