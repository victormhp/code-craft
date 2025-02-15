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
    { label: 'Clear Board', icon: 'material-symbols:ink-eraser', action: clearBoard },
    { label: 'Reset', icon: 'material-symbols:restart-alt-rounded', action: resetSettings },
    { label: 'Play', icon: 'material-symbols:play-arrow-rounded', action: () => {} }
  ];
</script>

<div
  class="flex flex-col items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-zinc-100 p-4 whitespace-nowrap shadow-sm lg:flex-row lg:px-4"
>
  <div class="grid auto-cols-fr grid-flow-col gap-4">
    <div class="flex flex-col items-start gap-1">
      <label class="pl-1 text-xs text-zinc-500 sm:text-sm" for="pathfinding">Algorithm</label>
      <select
        id="pathfinding"
        class="w-full rounded border border-zinc-200 bg-zinc-50 p-2 text-xs sm:text-base"
        bind:value={currPathfindingAlgorithm}
        onchange={() => grid.solveMaze(currPathfindingAlgorithm)}
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
  </div>

  <div class="grid auto-cols-fr grid-flow-col gap-4">
    {#each settingsButtons as { label, icon, action }}
      <PressableButton {label} {action}>
        <iconify-icon {icon} width="20" height="20" style="color: var(--color-zinc-700)"
        ></iconify-icon>
      </PressableButton>
    {/each}
  </div>
</div>
