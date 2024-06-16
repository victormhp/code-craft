<script lang="ts">
  import { sortingState, canStep, canStepBack, sortingShowValues } from './sorting.store';

  export let id = 0;
  export let width = 0;
  export let height = 0;
  export let move: number[] = [];

  let isSorted = false;

  // Track the move index in which the rect is correctly sorted.
  let sortedMoveIndex = 0;

  $: isMoving = $sortingState.move.includes(id) && $canStep && $canStepBack;
  $: {
    if (move.length == 2 && id === move[0] && id === move[1]) {
      sortedMoveIndex = $sortingState.current;
      isSorted = true;
    } else if ($sortingState.current < 1 || $sortingState.current < sortedMoveIndex) {
      sortedMoveIndex = $sortingState.current;
      isSorted = false;
    }

    if (move.length > 2) {
      if ($sortingState.current + 1 === $sortingState.total) {
        isSorted = true;
      } else {
        isSorted = false;
      }
    }
  }
</script>

<div
  data-moving={isMoving}
  data-sorted={isSorted}
  class="relative flex items-center justify-center rounded-t-md border border-white bg-zinc-800 data-[moving=true]:bg-red-500 data-[sorted=true]:bg-green-500"
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
