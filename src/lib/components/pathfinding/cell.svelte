<script lang="ts">
  import { draggable, dropzone } from '$lib/utils';
  import { grid, gridStart, gridFinish } from './pathfinding.store';

  export let x: number;
  export let y: number;
  export let mousePressed = false;
  export let width = 25;
  export let height = 25;

  $: isWall = $grid[y][x].state === 'wall';
  $: isStart = x === $gridStart.x && y === $gridStart.y;
  $: isFinish = x === $gridFinish.x && y === $gridFinish.y;
  $: isDraggable = isStart || isFinish;

  function visitNode(event: MouseEvent) {
    const mouseButton = event.buttons;
    if (mousePressed) {
      if (mouseButton == 1) {
        // Add wall with left click
        grid.updateState(x, y, 'wall');
      } else if (mouseButton == 2) {
        // Remove wall with right click
        grid.updateState(x, y, 'empty');
      }
    }
  }

  function toggleNode(event: MouseEvent) {
    const mouseButton = event.buttons;
    if (mouseButton == 1) {
      // Add wall with left click
      grid.updateState(x, y, 'wall');
    } else if (mouseButton == 2) {
      // Remove wall with right click
      grid.updateState(x, y, 'empty');
    }
  }

  function dropNode(event: CustomEvent) {
    let [destX, destY] = event.detail.data.split('-');
    destX = Number(destX);
    destY = Number(destY);

    if (destX === $gridStart.x && destY === $gridStart.y) {
      grid.updateState(x, y, 'start');
    } else if (destX === $gridFinish.x && destY === $gridFinish.y) {
      grid.updateState(x, y, 'finish');
    }
    grid.updateState(destX, destY, 'empty');
  }
</script>

{#if isDraggable}
  <td
    use:draggable={{ data: `${x}-${y}`, isDraggable }}
    class="border border-zinc-200 select-none hover:opacity-80"
    class:node-start={isStart}
    class:node-finish={isFinish}
    style="width: {width}px; height: {height}px;"
  ></td>
{:else}
  <td
    use:dropzone
    on:dropzone={dropNode}
    on:mouseenter|preventDefault={visitNode}
    on:mousedown|preventDefault={toggleNode}
    on:contextmenu|preventDefault
    class="border border-zinc-200 bg-zinc-100 select-none hover:opacity-80"
    class:node-wall={isWall}
    style="width: {width}px; height: {height}px;"
  ></td>
{/if}

<style>
  :global(.droppable) {
    outline: 1px solid #27272a;
    outline-offset: 0.1rem;
  }

  .node-start {
    background-color: #10b981;
  }

  .node-finish {
    background-color: #ef4444;
  }

  .node-wall {
    background-color: #27272a;
    animation-name: wall-animation;
    animation-duration: 0.15s;
    animation-timing-function: ease-out;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
  }

  @keyframes wall-animation {
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
