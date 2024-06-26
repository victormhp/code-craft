<script lang="ts">
  import type { GridNode } from './pathfinding.types';

  export let gridNode: GridNode;
  export let mousePressed = false;
  export let width = 25;
  export let height = 25;

  function visitNode(event: MouseEvent) {
    const mouseButton = event.buttons;
    if (mousePressed && gridNode.nodeType !== 'Start' && gridNode.nodeType !== 'Finish') {
      if (mouseButton == 1) {
        // Add wall with left click
        gridNode.nodeType = 'Wall';
      } else if (mouseButton == 2) {
        // Remove wall with right click
        gridNode.nodeType = 'Empty';
      }
    }
  }

  function toggleNode(event: MouseEvent) {
    const mouseButton = event.buttons;
    if (gridNode.nodeType !== 'Start' && gridNode.nodeType !== 'Finish') {
      if (mouseButton == 1) {
        // Add wall with left click
        gridNode.nodeType = 'Wall';
      } else if (mouseButton == 2) {
        // Remove wall with right click
        gridNode.nodeType = 'Empty';
      }
    }
  }
</script>

<div
  class="inline-block cursor-default select-none border-b border-r border-b-zinc-200 border-r-zinc-200 bg-zinc-50 hover:opacity-80"
  class:node-start={gridNode.nodeType === 'Start'}
  class:node-finish={gridNode.nodeType === 'Finish'}
  class:node-wall={gridNode.nodeType === 'Wall'}
  class:node-path={gridNode.nodeType === 'Path'}
  style="width: {width}px; height: {height}px;"
  on:mouseenter={visitNode}
  on:mousedown={toggleNode}
  on:contextmenu|preventDefault
  draggable="false"
  role="button"
  tabindex="0"
></div>

<style>
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
