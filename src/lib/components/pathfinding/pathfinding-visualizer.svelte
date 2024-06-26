<script lang="ts">
  import 'iconify-icon';
  import Node from './node.svelte';
  import { grid } from './pathfinding.store';
  import type { GridNode } from './pathfinding.types';

  let mousePressed = false;
  let gridWidth = 0;
  let gridHeight = 0;
  let nodeSize = 20;
  let xValues: number[] = [];
  let yValues: number[] = [];
  let nodeStart = [2, 2];

  $: gridRows = Math.floor(gridHeight / nodeSize);
  $: gridColumns = Math.floor(gridWidth / nodeSize);
  $: nodeFinish = [gridColumns - 3, gridRows - 3];

  // Adjust the node size to ensure the grid is filled without any gaps.
  $: nodeWidth = gridWidth / gridColumns;
  $: nodeHeight = gridHeight / gridRows;

  $: {
    grid.clearBoard();

    xValues = Array.from({ length: gridColumns }, (_, i) => i);
    yValues = Array.from({ length: gridRows }, (_, i) => i);

    for (const y of yValues) {
      for (const x of xValues) {
        const newNode: GridNode = { xPos: x, yPos: y, nodeType: 'Empty' };

        if (x === nodeStart[0] && y === nodeStart[1]) {
          newNode.nodeType = 'Start';
        }

        if (x === nodeFinish[0] && y === nodeFinish[1]) {
          newNode.nodeType = 'Finish';
        }

        $grid.nodes.push(newNode);
      }
    }
  }
</script>

<svelte:window
  on:mousedown={() => (mousePressed = true)}
  on:mouseup={() => (mousePressed = false)}
/>

<div
  bind:clientWidth={gridWidth}
  bind:clientHeight={gridHeight}
  class="w-full border-l border-t border-l-zinc-200 border-t-zinc-200"
>
  {#each yValues as y}
    <div class="flex grow">
      {#each xValues as x}
        <Node
          gridNode={$grid.nodes[x + y * gridColumns]}
          bind:mousePressed
          width={nodeWidth}
          height={nodeHeight}
        />
      {/each}
    </div>
  {/each}
</div>
