<script lang="ts">
  import 'iconify-icon';
  import Node from './node.svelte';

  let gridWidth: number = 0;
  let gridHeight: number = 0;

  $: gridRows = Math.floor(gridHeight / 25);
  $: gridColumns = Math.floor(gridWidth / 25);

  // Adjust the node size to ensure the grid is filled without any gaps.
  $: nodeWidth = gridWidth / gridColumns;
  $: nodeHeight = gridHeight / gridRows;
</script>

<div
  class="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-100 p-2 shadow-sm sm:flex-row"
>
  <button
    class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
    type="button"
  >
    <p class="font-bold">Clear Path</p>
  </button>
  <button
    class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
    type="button"
  >
    <p class="font-bold">Clear Board</p>
  </button>
</div>
<div
  id="grid"
  bind:clientWidth={gridWidth}
  bind:clientHeight={gridHeight}
  class="w-full border border-zinc-200"
>
  {#each Array(gridRows) as row}
    <div class="flex">
      {#each Array(gridColumns) as col}
        <Node width={nodeWidth} height={nodeHeight} />
      {/each}
    </div>
  {/each}
</div>
