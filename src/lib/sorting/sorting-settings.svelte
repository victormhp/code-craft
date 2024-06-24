<script lang="ts">
  import {
    sortingSize,
    sortingDelay,
    sortingAlgorithm,
    sortingShowValues,
    sortingState,
    sortingOrder,
    sortingRectColor,
    sortingAlgorithmsRecord
  } from './sorting.store';
</script>

<article class="space-y-8 rounded-lg border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
  <div class="space-y-5">
    <h2 class="border-b border-zinc-200 pb-2 text-lg font-bold">Sorting Settings</h2>
    <div class="flex grow flex-col items-start gap-1">
      <label class="pl-1 text-sm text-zinc-500" for="sorting">Algorithm</label>
      <select
        id="sorting"
        bind:value={$sortingAlgorithm}
        class="w-full rounded border border-zinc-200 bg-transparent p-2"
        disabled={$sortingState.current > 0}
      >
        {#each sortingAlgorithmsRecord as { algorithmName, algorithmFunction }}
          <option value={algorithmFunction}>{algorithmName}</option>
        {/each}
      </select>
    </div>
    <div class="flex grow flex-col items-start gap-1">
      <label class="pl-1 text-sm text-zinc-500" for="order">Order</label>
      <select
        id="order"
        bind:value={$sortingOrder}
        class="w-full rounded border border-zinc-200 bg-transparent p-2"
        disabled={$sortingState.current > 0}
      >
        <option value="Random">Random</option>
        <option value="Reverse">Reverse</option>
      </select>
    </div>
    <div class="space-y-2">
      <label for="delay">Delay: {$sortingDelay}ms</label>
      <div class="flex gap-2">
        <input
          id="delay"
          class="grow"
          name="delay"
          type="range"
          bind:value={$sortingDelay}
          min="0"
          max="1000"
          step="100"
          disabled={$sortingState.current > 0}
        />
      </div>
    </div>
    <div class="space-y-2">
      <label for="rect-size">Size: {$sortingSize}</label>
      <div class="flex gap-2">
        <input
          id="rect-size"
          class="grow"
          name="rect-size"
          type="range"
          bind:value={$sortingSize}
          min="10"
          max="64"
          disabled={$sortingState.current > 0}
        />
      </div>
    </div>
  </div>
  <div class="space-y-5">
    <h2 class="border-b border-zinc-200 pb-2 text-lg font-bold">Visual Settings</h2>
    <div class="flex gap-4">
      <label class="whitespace-nowrap" for="rect-color">Rect Color</label>
      <input
        id="rect-color"
        bind:value={$sortingRectColor}
        class="grow"
        name="rect-color"
        type="color"
        disabled={$sortingState.current > 0}
      />
    </div>

    <div class="flex gap-2">
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
