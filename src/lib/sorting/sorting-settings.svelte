<script lang="ts">
  import {
    sortingSize,
    sortingDelay,
    sortingAlgorithm,
    sortingState,
    sortingAlgorithmsRecord
  } from './sorting.store';
</script>

<article class="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
  <h2 class="border-b border-zinc-200 pb-2 text-lg font-bold">Settings</h2>
  <div class="flex w-full items-center justify-between gap-2">
    <label for="algorithm">Algorithm</label>
    <select
      id="algorithm"
      bind:value={$sortingAlgorithm}
      class="flex-grow rounded border border-zinc-200 bg-transparent p-2"
      disabled={$sortingState.current > 0}
    >
      {#each sortingAlgorithmsRecord as { algorithmName, algorithmFunction }}
        <option value={algorithmFunction}>{algorithmName}</option>
      {/each}
    </select>
  </div>
  <div class="space-y-1">
    <label for="delay">Delay</label>
    <div class="flex gap-2">
      <input
        id="delay"
        class="grow"
        name="delay"
        type="range"
        bind:value={$sortingDelay}
        min="1"
        max="400"
        disabled={$sortingState.current > 0}
      />
      <p class="border border-zinc-300 px-2 py-1 rounded shadow-sm">{Math.floor($sortingDelay / 4)}</p>
    </div>
  </div>
  <div class="space-y-1">
    <label for="size">Size</label>
    <div class="flex gap-2">
      <input
        id="size"
        class="grow"
        name="size"
        type="range"
        bind:value={$sortingSize}
        min="5"
        max="50"
        disabled={$sortingState.current > 0}
      />
      <p class="border border-zinc-300 px-2 py-1 rounded shadow-sm">{$sortingSize}</p>
    </div>
  </div>
</article>
