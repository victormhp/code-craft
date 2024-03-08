export class Particle {
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(public effect: Effect) {
    this.radius = Math.random() * 3 + 2;
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }

  update() {
    this.x += this.vx;
    if (this.x > this.effect.width - this.radius || this.x < this.radius) {
      this.vx *= -1;
    }

    this.y += this.vy;
    if (this.y > this.effect.height - this.radius || this.y < this.radius) {
      this.vy *= -1;
    }
  }
}

export class Effect {
  width: number;
  height: number;
  count: number;
  particles: Particle[];

  constructor(public canvas: HTMLCanvasElement) {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.count = 350;

    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < this.count; i++) {
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(context: CanvasRenderingContext2D) {
    this.connectParticles(context);

    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }

  connectParticles(context: CanvasRenderingContext2D) {
    const maxDistance = 100;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.hypot(dx, dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[i].x, this.particles[i].y);
          context.lineTo(this.particles[j].x, this.particles[j].y);
          context.stroke();
          context.restore();
        }
      }
    }
  }
}
