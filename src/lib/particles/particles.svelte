<script lang="ts">
  import { onMount } from 'svelte';
  import { Effect } from './particles.setup';
  import { particles } from './particles.store';

  $: innerWidth = 0;
  $: innerHeight = 0;

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D | null;
  let effect: Effect;
  let frame: number;

  function animateParticles() {
    if (context) {
      frame = requestAnimationFrame(() => animateParticles());

      context.strokeStyle = $particles.color;
      context.fillStyle = $particles.color;
      context.clearRect(0, 0, canvas.width, canvas.height);

      effect.handleParticles(context);
    }
  }

  onMount(() => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    context = canvas.getContext('2d');
    effect = new Effect(canvas);

    animateParticles();

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<canvas class="fixed inset-0 -z-50" bind:this={canvas}></canvas>
