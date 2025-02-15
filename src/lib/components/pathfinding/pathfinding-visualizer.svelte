<script lang="ts">
  import 'iconify-icon';
  import Cell from './cell.svelte';
  import { getGridState } from './pathfinding.svelte';
  import type { Grid } from './pathfinding.types';

  const grid = getGridState();

  let mousePressed = $state(false);
  let cellSize = $state(25);
  let gridHeight = $state(0);
  let gridWidth = $state(0);

  let rows = $derived(Math.floor(gridHeight / cellSize));
  let cols = $derived(Math.floor(gridWidth / cellSize));
  let xValues = $derived(Array.from({ length: cols }, (_, i) => i));
  let yValues = $derived(Array.from({ length: rows }, (_, i) => i));

  const createGrid = () => {
    const newGrid: Grid = Array.from({ length: rows }, () => []);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        newGrid[y].push({ x, y, state: 'empty' });
      }
    }
    grid.cells = newGrid;
    grid.setStartAndTarget();
  };

  $effect(() => createGrid());

  const press = () => (mousePressed = true);
  const release = () => (mousePressed = false);
</script>

<svelte:body onmousedown={press} onmouseup={release} ondragstart={press} ondragleave={release} />

<table
  oncontextmenu={(event) => event.preventDefault()}
  bind:clientWidth={gridWidth}
  bind:clientHeight={gridHeight}
  class="max-w-full border-collapse overflow-hidden"
>
  <tbody>
    {#each yValues as y (y)}
      <tr class="table-row">
        {#each xValues as x (x)}
          <Cell {x} {y} width={cellSize} height={cellSize} bind:mousePressed />
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
