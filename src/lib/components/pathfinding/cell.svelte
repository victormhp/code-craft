<script lang="ts">
  import { draggable, dropzone } from '$lib/utils';
  import { getGridState } from './pathfinding.svelte';

  interface CellProps {
    x: number;
    y: number;
    width: number;
    height: number;
    mousePressed: boolean;
  }

  let { x, y, width = 25, height = 25, mousePressed = $bindable() }: CellProps = $props();

  const grid = getGridState();

  let isVisited = $derived(grid.cells[y]?.[x]?.visited);
  let isWall = $derived(grid.cells[y]?.[x]?.state === 'wall');
  let isPath = $derived(grid.cells[y]?.[x]?.state === 'path');
  let isStart = $derived(grid.cells[y]?.[x]?.state === 'start');
  let isTarget = $derived(grid.cells[y]?.[x]?.state === 'target');
  let isDraggable = $derived(isStart || isTarget);

  function visitNode(event: MouseEvent) {
    event.preventDefault();

    const mouseButton = event.buttons;
    if (mousePressed) {
      if (mouseButton == 1) {
        grid.updateCell(x, y, 'wall');
      } else if (mouseButton == 2) {
        grid.updateCell(x, y, 'empty');
      }
    }
  }

  function toggleNode(event: MouseEvent) {
    event.preventDefault();

    const mouseButton = event.buttons;
    if (mouseButton == 1) {
      grid.updateCell(x, y, 'wall');
    } else if (mouseButton == 2) {
      grid.updateCell(x, y, 'empty');
    }
  }

  function dropNode(event: CustomEvent) {
    event.preventDefault();

    let [currX, currY] = event.detail.data.split('-').map(Number);
    const currCell = grid.cells[currY][currX];

    if (currCell.state == 'start') {
      grid.updateCell(x, y, 'start');
    } else if (currCell.state == 'target') {
      grid.updateCell(x, y, 'target');
    }

    grid.updateCell(currX, currY, 'empty');
  }
</script>

{#if isDraggable}
  <td
    use:draggable={{ data: `${x}-${y}` }}
    class="border border-zinc-200 select-none hover:opacity-80"
    class:node-start={isStart}
    class:node-finish={isTarget}
    style="width: {width}px; height: {height}px;"
  ></td>
{:else}
  <td
    id="node"
    use:dropzone={{ dropEffect: 'move', dragoverClass: 'droppable' }}
    ondropzone={dropNode}
    onmouseenter={visitNode}
    onmousedown={toggleNode}
    class="max-w-full overflow-hidden border border-zinc-300/80 bg-zinc-50 select-none hover:opacity-80"
    class:node-visited={isVisited}
    class:node-path={isPath}
    class:node-wall={isWall}
    style="width: {width}px; height: {height}px;"
  ></td>
{/if}

<style>
  :global(.droppable) {
    outline: 1px solid var(--color-zinc-800);
    outline-offset: 0.1rem;
  }

  .node-visited {
    background-color: var(--color-cyan-400);
    animation-name: node;
    animation-duration: 0.15s;
  }

  .node-wall {
    background-color: var(--color-zinc-800);
    animation-name: node;
    animation-duration: 0.15s;
    animation-fill-mode: forwards;
  }

  .node-path {
    background-color: var(--color-yellow-500);
    animation-name: node;
    animation-duration: 0.15s;
  }

  .node-start {
    background-color: var(--color-emerald-500);
  }

  .node-finish {
    background-color: var(--color-red-500);
  }

  @keyframes node {
    0% {
      transform: scale(0.25);
    }

    50% {
      transform: scale(0.6);
    }

    100% {
      transform: scale(1);
    }
  }
</style>
