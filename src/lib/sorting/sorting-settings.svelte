<script lang="ts">
  import { sortingSize, sortingDelay, sortingState } from './sorting.store';
</script>

<div class="rounded-lg border border-zinc-200 bg-zinc-50 p-4 shadow-sm">
  <article class="space-y-4 rounded-md bg-zinc-50 p-4">
    <h2 class="border-b border-zinc-200 pb-2 text-lg font-bold">Sorting Settings</h2>
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
</div>
