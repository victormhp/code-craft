<script lang="ts">
  import { sortingColors } from './sorting.store';
  import type { RectStatus } from './sorting.types';

  export let width = 0;
  export let height = 0;
  export let status: RectStatus = 'unordered';
  export let isHeightVisible = false;

  $: textSize = width > 50 ? '14px' : '10px';
</script>

<div
  class="relative flex origin-bottom items-center justify-center rounded-t-md border border-zinc-50"
  style="width: {width}px; height: {height}px; background-color: {$sortingColors[status]};"
>
  {#if isHeightVisible}
    <p class="vertical-lr text-zinc-50" style="font-size: {textSize}">{height}</p>
  {/if}
</div>

<style>
  .vertical-lr {
    writing-mode: vertical-lr;
  }
</style>
