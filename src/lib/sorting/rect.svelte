<script lang="ts">
  import { sortingState, canStep, canStepBack } from './sorting.store';

  export let id = 0;
  export let width = 0;
  export let height = 0;
  export let move: number[] = [];

  let sorted = false;
  // Track the move index in which the rect is correctly sorted.
  let sortedMoveIndex = 0;

  $: isMoving = $sortingState.move.includes(id) && $canStep && $canStepBack;
  $: {
    if ((id === move[0] && id === move[1]) || $sortingState.current + 1 == $sortingState.total) {
      sorted = true;
      sortedMoveIndex = $sortingState.current;
    } else if ($sortingState.current < 1 || $sortingState.current < sortedMoveIndex) {
      sorted = false;
    }
  }
  $: isSorted = sorted && $sortingState.current > 0;
</script>

<div
  data-moving={isMoving}
  data-sorted={isSorted}
  class="relative rounded-t-md border border-white bg-zinc-800 data-[moving=true]:bg-red-500 data-[sorted=true]:bg-green-500"
  style="width: {width}px; height: {height}px"
></div>
