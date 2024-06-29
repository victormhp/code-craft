<script lang="ts">
  import 'iconify-icon';
  import type { Grid, GridNode } from './pathfinding.types';
  import { grid, gridDimensions, gridGoals } from './pathfinding.store';
  import Node from './node.svelte';

  let mousePressed = false;
  let nodeSize = 25;
  let gridWidth: number;
  let gridHeight: number;

  $: $gridDimensions.rows = Math.floor(gridHeight / nodeSize);
  $: $gridDimensions.columns = Math.floor(gridWidth / nodeSize);

  $: xValues = Array.from({ length: $gridDimensions.columns }, (_, i) => i);
  $: yValues = Array.from({ length: $gridDimensions.rows }, (_, i) => i);

  $: {
    const newGrid: Grid = [];
    for (let y = 0; y < $gridDimensions.rows; y++) {
      for (let x = 0; x < $gridDimensions.columns; x++) {
        const id = x + y * $gridDimensions.columns;
        const state = id === $gridGoals.start ? 'start' : id === $gridGoals.finish ? 'finish' : 'empty';
        const node: GridNode = { position: [x, y], state };
        newGrid.push(node);
      }
    }

    $grid = newGrid;
  }

  const press = () => (mousePressed = true);
  const release = () => (mousePressed = false);
</script>

<svelte:window
  on:mousedown={press}
  on:mouseup={release}
  on:dragstart={press}
  on:dragleave={release}
/>

<table bind:clientWidth={gridWidth} bind:clientHeight={gridHeight} class="border-collapse">
  <tbody>
    {#each yValues as y (y)}
      <tr class="table-row">
        {#each xValues as x (x)}
          <Node id={x + y * $gridDimensions.columns} bind:mousePressed width={nodeSize} height={nodeSize} />
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
