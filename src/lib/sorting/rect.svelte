<script lang="ts">
  import {
    sortingRectColor,
    sortingState,
    canStep,
    canStepBack,
    sortingShowValues
  } from './sorting.store';

  export let id = 0;
  export let width = 0;
  export let height = 0;

  let red = '#ef4444';

  $: isMoving = $sortingState.move.includes(id) && $canStep && $canStepBack;
</script>

<div
  class="relative flex items-center justify-center rounded-t-md border border-white"
  style="width: {width}px; height: {height}px; background-color: {isMoving ? red : $sortingRectColor};"
>
  {#if $sortingShowValues}
    <p class="vertical-lr text-xs text-gray-100">{height}</p>
  {/if}
</div>

<style>
  .vertical-lr {
    writing-mode: vertical-lr;
  }
</style>
