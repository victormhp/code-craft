<script lang="ts">
  import { particlesSettings } from './particles.store';
</script>

<article class="flex flex-col gap-4 rounded-lg border border-zinc-200/60 bg-zinc-50 p-4 shadow-md">
  <h2 class="border-b border-zinc-200 pb-1 text-lg font-bold">Particles Settings</h2>
  <div class="flex gap-4">
    <label for="particles-color">Color</label>
    <input
      id="particles-color"
      class="flex-grow rounded-md bg-zinc-50"
      name="color"
      type="color"
      bind:value={$particlesSettings.color}
    />
  </div>
  <button
    class="rounded-lg bg-zinc-900 px-4 py-2 font-bold text-zinc-50 hover:bg-zinc-800"
    on:click={particlesSettings.reset}
  >
    Reset
  </button>
</article>
