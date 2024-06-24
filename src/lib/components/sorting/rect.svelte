<script lang="ts">
  import {
    sortingRectColor,
    sortingState,
    canStep,
    canStepBack,
  } from './sorting.store';

  export let id = 0;
  export let width = 0;
  export let height = 0;
  export let showValues = false;

  $: textSize = width > 50 ? "14px" : "10px";
  $: isMoving = $sortingState.move.includes(id) && $canStep && $canStepBack;
</script>

<div
  class="relative flex items-center justify-center rounded-t-md border border-white"
  style="width: {width}px; height: {height}px; background-color: {isMoving ? $sortingRectColor.moving : $sortingRectColor.rect};"
>
  {#if showValues}
    <p class="vertical-lr text-gray-100" style="font-size: {textSize}">{height}</p>
  {/if}
</div>

<style>
  .vertical-lr {
    writing-mode: vertical-lr;
  }
</style>
