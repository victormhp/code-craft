<script lang="ts">
  import 'iconify-icon';
  import Node from './node.svelte';

  let gridWidth: number = 0;
  let gridHeight: number = 0;
  let nodeSize = 25;

  const pathfindingAlgorithms = ['Dijkstra', 'A Star', 'Breath First Search', 'Depth First Search'];

  $: gridRows = Math.floor(gridHeight / nodeSize);
  $: gridColumns = Math.floor(gridWidth / nodeSize);

  // Adjust the node size to ensure the grid is filled without any gaps.
  $: nodeWidth = gridWidth / gridColumns;
  $: nodeHeight = gridHeight / gridRows;
</script>

<div
  class="flex flex-col justify-between items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 p-2 shadow-sm sm:flex-row"
>
  <div class="flex gap-4">
    <div class="flex flex-col items-start gap-1">
      <label class="pl-1 text-sm text-zinc-500" for="pathfinding">Algorithm</label>
      <select id="pathfinding" class="rounded border border-zinc-200 bg-zinc-50 p-2">
        {#each pathfindingAlgorithms as algorithm}
          <option value={algorithm}>{algorithm}</option>
        {/each}
      </select>
    </div>

    <div class="flex flex-col items-start gap-1">
      <label class="pl-1 text-sm text-zinc-500" for="maze">Maze</label>
      <select id="maze" class="rounded border border-zinc-200 bg-zinc-50 p-2">
        {#each pathfindingAlgorithms as algorithm}
          <option value={algorithm}>{algorithm}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="flex items-center gap-2">
    <label for="node-size">Node Size</label>
    <div class="flex gap-2">
      <input
        id="node-size"
        class="grow"
        name="node-size"
        type="range"
        bind:value={nodeSize}
        min="20"
        max="60"
      />
      <p class="rounded border border-zinc-300 px-2 py-1 shadow-sm">{nodeSize}</p>
    </div>
  </div>
  <div>
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
</div>
<div
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
