<script lang="ts">
  import { particles } from './particles.svelte';

  const effects = [
    { name: 'none', label: 'None' },
    { name: 'physics', label: 'Physics' },
    { name: 'sunrays', label: 'Sunrays' }
  ];
</script>

<article class="flex flex-col gap-6 rounded-lg border border-zinc-200/60 bg-zinc-50 p-4 shadow-md">
  <div>
    <h2 class="mb-4 border-b border-zinc-200 pb-1 text-lg font-bold">Particle Settings</h2>
    <div class="flex flex-col gap-2">
      <div class="flex justify-between gap-4">
        <label for="particles-color">Stroke Color</label>
        <input
          id="particles-color"
          class="flex-grow rounded-md bg-zinc-50"
          name="color"
          type="color"
          bind:value={particles.stroke}
        />
      </div>
      <div class="flex justify-between gap-4">
        <label for="particles-color">Fill Color</label>
        <input
          id="particles-color"
          class="flex-grow rounded-md bg-zinc-50"
          name="color"
          type="color"
          bind:value={particles.color}
        />
      </div>
    </div>
  </div>
  <div>
    <h2 class="mb-4 border-b border-zinc-200 pb-1 text-lg font-bold">Effects</h2>
    <fieldset class="space-y-2">
      {#each effects as effect}
        <div class="flex gap-2">
          <input
            bind:group={particles.effect}
            type="radio"
            name={effect.name}
            value={effect.name}
          />
          <label for={effect.name}>{effect.label}</label>
        </div>
      {/each}
    </fieldset>
  </div>
  <button
    class="rounded-lg bg-zinc-900 px-4 py-2 font-bold text-zinc-50 hover:bg-zinc-800"
    onclick={particles.reset}
  >
    Reset
  </button>
</article>
