<script lang="ts">
  import PressableButton from '../ui/pressable-button.svelte';
  import { getGridState } from './pathfinding.svelte';
  import type { MazeAlgorithms, PathfindingAlgorithms } from './pathfinding.types';

  const grid = getGridState();

  const pathfindingAlgorithms: PathfindingAlgorithms[] = ['Depth First Search'];
  let currPathfindingAlgorithm = $state<PathfindingAlgorithms>('Depth First Search');

  const mazeAlgorithms: MazeAlgorithms[] = ['-', 'Recursive Division'];
  let currMazeAlgorithm = $state<MazeAlgorithms>('-');

  const resetSettings = () => {
    grid.reset();
    currPathfindingAlgorithm = pathfindingAlgorithms[0];
    currMazeAlgorithm = '-';
  };

  const clearBoard = () => {
    grid.clearBoard();
    currPathfindingAlgorithm = pathfindingAlgorithms[0];
    currMazeAlgorithm = '-';
  };

  const settingsButtons = [
    {
      label: 'Clear Board',
      color: 'text-zinc-800',
      icon: 'material-symbols:ink-eraser',
      action: clearBoard
    },
    {
      label: 'Reset',
      color: 'text-red-500',
      icon: 'material-symbols:restart-alt-rounded',
      action: resetSettings
    },
    {
      label: 'Play',
      color: 'text-emerald-500',
      icon: 'material-symbols:play-arrow-rounded',
      action: () => grid.solveMaze(currPathfindingAlgorithm)
    }
  ];

  const symbols = [
    { label: 'Empty', color: 'bg-zinc-50' },
    { label: 'Visited', color: 'bg-cyan-400' },
    { label: 'Wall', color: 'bg-zinc-800' },
    { label: 'Path', color: 'bg-yellow-500' },
    { label: 'Start', color: 'bg-emerald-500' },
    { label: 'Target', color: 'bg-red-500' }
  ];
</script>

<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] gap-4 xl:grid-cols-[1fr_1fr_auto]">
  <div
    class=" grid h-full auto-cols-fr grid-flow-col gap-4 rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-xs"
  >
    <div class="flex flex-col items-start gap-1">
      <label class="pl-1 text-xs text-zinc-500 sm:text-sm" for="pathfinding">Algorithm</label>
      <select
        id="pathfinding"
        class="w-full rounded border border-zinc-200 bg-zinc-50 p-2 text-xs sm:text-base"
        bind:value={currPathfindingAlgorithm}
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
        bind:value={currMazeAlgorithm}
        onchange={() => grid.generateMaze(currMazeAlgorithm)}
      >
        {#each mazeAlgorithms as algorithm}
          <option value={algorithm}>{algorithm}</option>
        {/each}
      </select>
    </div>
    <div class="flex flex-col items-start gap-1">
      <label class="pl-1 text-xs text-zinc-500 lg:text-sm" for="speed">Speed</label>
      <select
        id="speed"
        class="w-full rounded border border-zinc-200 bg-zinc-50 p-2 text-xs sm:text-base"
      >
        <option>Slow</option>
        <option>Fast</option>
      </select>
    </div>
  </div>

  <div
    class="grid h-full w-full grid-cols-[repeat(auto-fit,minmax(75px,1fr))] items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-xs"
  >
    {#each symbols as { label, color }}
      <div class="flex gap-2">
        <div class={`h-6 w-6 rounded border border-zinc-300 ${color}`}></div>
        <p>{label}</p>
      </div>
    {/each}
  </div>

  <div
    class="flex h-full flex-wrap items-center justify-evenly gap-4 rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-xs"
  >
    {#each settingsButtons as { label, color, icon, action }}
      <PressableButton {label} {action}>
        <iconify-icon {icon} width="20" height="20" class={color}></iconify-icon>
      </PressableButton>
    {/each}
  </div>
</div>
