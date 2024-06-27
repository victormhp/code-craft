<script lang="ts">
  import { draggable, dropzone } from '$lib/utils';
  import { grid, gridStart, gridFinish } from './pathfinding.store';

  export let id: number;
  export let mousePressed = false;
  export let width = 25;
  export let height = 25;

  $: isDraggable = id === $gridStart || id === $gridFinish;

  function visitNode(event: MouseEvent) {
    const mouseButton = event.buttons;
    if (mousePressed && !isDraggable) {
      if (mouseButton == 1) {
        // Add wall with left click
        grid.updateState(id, 'wall');
      } else if (mouseButton == 2) {
        // Remove wall with right click
        grid.updateState(id, 'empty');
      }
    }
  }

  function toggleNode(event: MouseEvent) {
    const mouseButton = event.buttons;
    if (!isDraggable) {
      if (mouseButton == 1) {
        // Add wall with left click
        grid.updateState(id, 'wall');
      } else if (mouseButton == 2) {
        // Remove wall with right click
        grid.updateState(id, 'empty');
      }
    }
  }

  function dropNode(event: CustomEvent) {
    const sourceId = Number(event.detail.data);
    const target = event.target as HTMLElement;
    const targetId = Number(target.id.split('-')[1]);

    if (sourceId === $gridStart) {
      grid.updateState(targetId, 'start');
      grid.updateState(sourceId, 'empty');
    } else if (sourceId === $gridFinish) {
      grid.updateState(targetId, 'finish');
      grid.updateState(sourceId, 'empty');
    }
  }
</script>

<td
  id="node-{id}"
  use:draggable={{ data: id, isDraggable }}
  use:dropzone
  on:dropzone={dropNode}
  on:mouseenter={visitNode}
  on:mousedown={toggleNode}
  on:contextmenu|preventDefault
  class="cursor-default select-none border border-zinc-200 bg-zinc-50 hover:opacity-80"
  class:node-start={id === $gridStart}
  class:node-finish={id === $gridFinish}
  class:node-wall={$grid[id].state === 'wall'}
  class:node-path={$grid[id].state === 'path'}
  style="width: {width}px; height: {height}px;"
/>

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
    animation-delay: 0;
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
