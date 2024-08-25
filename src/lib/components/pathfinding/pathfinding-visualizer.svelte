<script lang="ts">
  import 'iconify-icon';
  import type { Grid, GridCell } from './pathfinding.types';
  import { grid } from './pathfinding.store';
  import Cell from './cell.svelte';

  let mousePressed = false;
  let cellSize = 25;
  let gridWidth: number;
  let gridHeight: number;

  $: rows = Math.floor(gridHeight / cellSize);
  $: cols = Math.floor(gridWidth / cellSize);

  $: xValues = Array.from({ length: cols }, (_, i) => i);
  $: yValues = Array.from({ length: rows }, (_, i) => i);

  $: {
    const newGrid: Grid = Array.from({ length: rows }, () => []);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const node: GridCell = { coordinates: { x, y }, state: 'empty' };
        newGrid[y].push(node);
      }
    }

    $grid = newGrid;
  }

  const press = () => (mousePressed = true);
  const release = () => (mousePressed = false);
</script>

<svelte:body
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
          <Cell {x} {y} bind:mousePressed width={cellSize} height={cellSize} />
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
