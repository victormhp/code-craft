<script lang="ts">
  import {
    sortingSize,
    sortingDelay,
    sortingAlgorithm,
    sortingShowValues,
    sortingState,
    sortingAlgorithmsRecord
  } from './sorting.store';

  const sortingColors = [
    { color: 'bg-red-400', status: 'Moving' },
    { color: 'bg-green-400', status: 'Sorted' },
    { color: 'bg-zinc-400', status: 'Unsorted' }
  ];
</script>

<article class="space-y-8 rounded-lg border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
  <div class="space-y-4">
    <h2 class="border-b border-zinc-200 pb-2 text-lg font-bold">Sorting Settings</h2>
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
          max="1024"
          disabled={$sortingState.current > 0}
        />
        <p class="rounded border border-zinc-300 px-2 py-1 shadow-sm">
          {$sortingDelay} ms
        </p>
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
          min="10"
          max="64"
          disabled={$sortingState.current > 0}
        />
        <p class="rounded border border-zinc-300 px-2 py-1 shadow-sm">{$sortingSize}</p>
      </div>
    </div>
  </div>
  <div class="space-y-4">
    <h2 class="border-b border-zinc-200 pb-2 text-lg font-bold">Visualization Settings</h2>
    <div class="flex flex-col gap-4">
      {#each sortingColors as { color, status }}
        <div class="flex items-center gap-2">
          <div class="flex h-4 w-4 items-center justify-center rounded-full border border-zinc-400">
            <div class={`h-2 w-2 rounded-full ${color}`} />
          </div>
          <p class="text-zinc-400">{status}</p>
        </div>
      {/each}
    </div>
    <div class="flex gap-2 pt-4">
      <input
        id="rect-heights"
        name="rect-heights"
        type="checkbox"
        bind:checked={$sortingShowValues}
        disabled={$sortingState.current > 0}
      />
      <p>Show rect heights</p>
    </div>
  </div>
</article>
