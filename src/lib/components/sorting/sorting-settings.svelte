<script lang="ts">
  import 'iconify-icon';
  import { sortingProgress, sortingSettings, rectSettings } from './sorting.svelte';
  import { bubbleSort, insertionSort, mergeSort, selectionSort } from './sorting.utils';

  const sortingAlgorithms = [
    { label: 'Bubble Sort', action: bubbleSort },
    { label: 'Insertion Sort', action: insertionSort },
    { label: 'Selection Sort', action: selectionSort },
    { label: 'Merge Sort', action: mergeSort }
  ];

  const sortingSpeeds = [
    { label: 'Slow', delay: 300 },
    { label: 'Mid', delay: 100 },
    { label: 'Fast', delay: 0 }
  ];
  let currSpeed = $state(0);
</script>

<div class="h-full w-full space-y-12 rounded-lg border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
  <div class="space-y-5">
    <h2 class="font-virgil border-b border-zinc-200 pb-2 text-2xl font-bold">Sorting Settings</h2>
    <div class="flex grow flex-col items-start gap-1">
      <label class="pl-1 text-sm text-zinc-500" for="sorting">Algorithm</label>
      <select
        id="sorting"
        bind:value={sortingSettings.algorithm}
        class="w-full rounded border border-zinc-200 bg-transparent p-2"
        disabled={sortingProgress.current > 0}
      >
        {#each sortingAlgorithms as { label, action }}
          <option value={action}>{label}</option>
        {/each}
      </select>
    </div>
    <div class="flex grow flex-col items-start gap-1">
      <label class="pl-1 text-sm text-zinc-500" for="order">Order</label>
      <select
        id="order"
        bind:value={sortingSettings.order}
        class="w-full rounded border border-zinc-200 bg-transparent p-2"
        disabled={sortingProgress.current > 0}
      >
        <option value="Random">Random</option>
        <option value="Reverse">Reverse</option>
      </select>
    </div>
    <div class="space-y-2">
      <label class="pl-1 text-sm text-zinc-500" for="delay">Speed</label>
      <div class="flex gap-2">
        <select
          id="speed"
          class="w-full rounded border border-zinc-200 bg-transparent p-2"
          bind:value={currSpeed}
          onchange={() => (sortingSettings.delay = currSpeed)}
        >
          {#each sortingSpeeds as { label, delay }}
            <option value={delay}>{label}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="space-y-2">
      <label for="rect-size">Size: {sortingSettings.size}</label>
      <div class="flex gap-2">
        <input
          id="rect-size"
          class="grow"
          name="rect-size"
          type="range"
          bind:value={sortingSettings.size}
          min="10"
          max="64"
          disabled={sortingProgress.current > 0}
        />
      </div>
    </div>
  </div>
  <div class="space-y-5">
    <h2 class="font-virgil border-b border-zinc-200 pb-2 text-2xl font-bold">Visual Settings</h2>
    <div>
      <label class="pl-1 text-sm whitespace-nowrap text-zinc-500" for="rect-color">Rect Color</label
      >
      <div class="flex items-center gap-2 rounded border border-zinc-200 bg-transparent p-2">
        <input
          id="rect-color"
          bind:value={rectSettings.unorderedColor}
          class="h-7 w-20 rounded-lg border-none"
          name="rect-color"
          type="color"
          disabled={sortingProgress.current > 0}
        />
        <p class:text-disabled={sortingProgress.current > 0}>{rectSettings.unorderedColor}</p>
        <button
          onclick={rectSettings.resetUnorderedColor}
          class="ml-auto rounded bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
          type="button"
          aria-label="Reset unordered rect color"
          disabled={sortingProgress.current > 0}
        >
          <iconify-icon
            icon="material-symbols:restart-alt-rounded"
            width="20"
            height="20"
            class="text-zinc-800"
          ></iconify-icon>
        </button>
      </div>
    </div>
    <div>
      <label class="pl-1 text-sm whitespace-nowrap text-zinc-500" for="rect-moving-color"
        >Moving Rect Color</label
      >
      <div class="flex items-center gap-2 rounded border border-zinc-200 bg-transparent p-2">
        <input
          id="rect-moving-color"
          bind:value={rectSettings.movingColor}
          class="h-7 w-20 rounded-lg border-none"
          name="rect-moving-color"
          type="color"
          disabled={sortingProgress.current > 0}
        />
        <p class:text-disabled={sortingProgress.current > 0}>{rectSettings.movingColor}</p>
        <button
          onclick={rectSettings.resetMovingColor}
          class="ml-auto rounded bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
          type="button"
          aria-label="Reset moving rect color"
          disabled={sortingProgress.current > 0}
        >
          <iconify-icon
            icon="material-symbols:restart-alt-rounded"
            width="20"
            height="20"
            class="text-zinc-800"
          ></iconify-icon>
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .text-disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
</style>
