<script lang="ts">
  import { sortingSize, sortingDelay, sortingState, SortingAlgorithm } from './sorting.store';

  const sortAlgorithms = Object.values(SortingAlgorithm);
</script>

<article class="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
  <h2 class="border-b border-zinc-200 pb-2 text-lg font-bold">Settings</h2>
  <div class="flex w-full items-center justify-between gap-2">
    <label for="algorithm">Algorithm</label>
    <select
      id="algorithm"
      bind:value={$sortingState.algorithm}
      class="flex-grow rounded border border-zinc-200 bg-transparent p-2"
      disabled={$sortingState.current > 0}
    >
      {#each sortAlgorithms as algorithm}
        <option value={algorithm}>{algorithm}</option>
      {/each}
    </select>
  </div>
  <div class="flex flex-col gap-2">
    <label for="delay">Delay</label>
    <input
      id="delay"
      name="delay"
      type="range"
      bind:value={$sortingDelay}
      min="1"
      max="401"
      step="50"
      disabled={$sortingState.current > 0}
    />
  </div>
  <div class="flex flex-col gap-2">
    <label for="size">Size</label>
    <input
      id="size"
      name="size"
      type="range"
      bind:value={$sortingSize}
      min="5"
      max="50"
      disabled={$sortingState.current > 0}
    />
  </div>
</article>
