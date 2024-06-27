<script lang="ts">
  import 'iconify-icon';
  import type { Grid, GridNode } from './pathfinding.types';
  import { grid } from './pathfinding.store';
  import Node from './node.svelte';

  let mousePressed = false;
  let nodeSize = 22;
  let gridWidth: number;
  let gridHeight: number;

  $: gridRows = Math.floor(gridHeight / nodeSize);
  $: gridColumns = Math.floor(gridWidth / nodeSize);

  $: startId = gridColumns * 2 + 2;
  $: finishId = gridColumns * (gridRows - 2) - 3;

  $: xValues = Array.from({ length: gridColumns }, (_, i) => i);
  $: yValues = Array.from({ length: gridRows }, (_, i) => i);

  $: {
    const newGrid: Grid = [];
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridColumns; x++) {
        const id = x + y * gridColumns;
        const state = id === startId ? 'start' : id === finishId ? 'finish' : 'empty';
        const node: GridNode = { position: [x, y], state };
        newGrid.push(node);
      }
    }

    $grid = newGrid;
  }
</script>

<svelte:window
  on:mousedown={() => (mousePressed = true)}
  on:mouseup={() => (mousePressed = false)}
/>

<table bind:clientWidth={gridWidth} bind:clientHeight={gridHeight} class="border-collapse">
  {#each yValues as y (y)}
    <tr class="table-row">
      {#each xValues as x (x)}
        <Node id={x + y * gridColumns} bind:mousePressed width={nodeSize} height={nodeSize} />
      {/each}
    </tr>
  {/each}
</table>
