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

  let isWall = $derived(grid.cells[y]?.[x]?.state === 'wall');
  let isPath = $derived(grid.cells[y]?.[x]?.state === 'path');
  let isStart = $derived(x === grid.start.x && y === grid.start.y);
  let isTarget = $derived(x === grid.target.x && y === grid.target.y);
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

    let [destX, destY] = event.detail.data.split('-');
    destX = Number(destX);
    destY = Number(destY);

    if (destX === grid.start.x && destY === grid.start.y) {
      grid.start.x = x;
      grid.start.y = y;
    } else if (destX === grid.target.x && destY === grid.target.y) {
      grid.target.x = x;
      grid.target.y = y;
    }
    grid.updateCell(destX, destY, 'empty');
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
    class="max-w-full overflow-hidden border border-zinc-200 bg-zinc-100 select-none hover:opacity-80"
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

  .node-start {
    background-color: var(--color-emerald-500);
  }

  .node-finish {
    background-color: var(--color-red-500);
  }

  .node-path {
    background-color: var(--color-cyan-500);
    animation-name: node;
    animation-duration: 0.15s;
  }

  .node-wall {
    background-color: var(--color-zinc-800);
    animation-name: node;
    animation-duration: 0.15s;
    animation-fill-mode: forwards;
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
