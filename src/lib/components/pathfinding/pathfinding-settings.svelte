<script lang="ts">
  import { grid } from './pathfinding.store';

  const pathfindingAlgorithms = ['Dijkstra', 'A Star', 'Breath First Search', 'Depth First Search'];

  const pathfindingMazes = [
    { name: '-', action: grid.clearBoard },
    { name: 'Recursive Maze', action: () => grid.createMaze($grid, 0, 0) }
  ];
  let selectedMaze = pathfindingMazes[0];

  const clearButtons = [
    { name: 'Clear Path', action: grid.clearPath },
    { name: 'Clear Board', action: grid.clearBoard },
    { name: 'Reset', action: grid.reset }
  ];
</script>

<div
  class="flex flex-col items-center justify-between gap-4 whitespace-nowrap rounded-lg border border-zinc-200 bg-zinc-100 p-2 shadow-sm lg:flex-row lg:gap-8 lg:px-4"
>
  <div class="grid auto-cols-fr grid-flow-col gap-4">
    <div class="flex flex-col items-start gap-1">
      <label class="pl-1 text-xs text-zinc-500 sm:text-sm" for="pathfinding">Algorithm</label>
      <select
        id="pathfinding"
        class="w-full rounded border border-zinc-200 bg-zinc-50 p-2 text-xs sm:text-base"
      >
        {#each pathfindingAlgorithms as algorithm}
          <option value={algorithm}>{algorithm}</option>
        {/each}
      </select>
    </div>
    <div class="flex flex-col items-start gap-1">
      <label class="pl-1 text-xs text-zinc-500 lg:text-sm" for="maze">Maze</label>
      <select
        id="maze"
        class="w-full rounded border border-zinc-200 bg-zinc-50 p-2 text-xs sm:text-base"
        bind:value={selectedMaze}
        on:change={selectedMaze.action}
      >
        {#each pathfindingMazes as maze}
          <option value={maze}>{maze.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="grid auto-cols-fr grid-flow-col gap-4">
    {#each clearButtons as { name, action }}
      <button
        class="rounded border bg-zinc-200 px-4 py-2 text-xs transition-colors hover:bg-zinc-300 sm:text-base"
        type="button"
        on:click={action}
      >
        <p class="font-bold">{name}</p>
      </button>
    {/each}
  </div>

  <div class="ml-auto">
    <button
      class="rounded-full border bg-zinc-800 p-2 transition-colors hover:bg-zinc-700 focus-visible:bg-zinc-700"
      type="button"
    >
      <iconify-icon icon="mingcute:play-fill" width="20" height="20" style="color: #fafafa"
      ></iconify-icon>
    </button>
  </div>
</div>
