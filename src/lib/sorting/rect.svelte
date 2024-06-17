<script lang="ts">
  import { sortingState, canStep, canStepBack, sortingShowValues } from './sorting.store';

  export let id = 0;
  export let width = 0;
  export let height = 0;


  $: isMoving = $sortingState.move.includes(id) && $canStep && $canStepBack;
</script>

<div
  data-moving={isMoving}
  class="relative flex items-center justify-center rounded-t-md border border-white bg-zinc-800 data-[moving=true]:bg-red-500"
  style="width: {width}px; height: {height}px"
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
