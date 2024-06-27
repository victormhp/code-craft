<script lang="ts">
  import { grid } from "./pathfinding.store";

  const pathfindingAlgorithms = ['Dijkstra', 'A Star', 'Breath First Search', 'Depth First Search'];
  const pathfindingMazes = ['-', 'Recursive Maze', 'Random Maze'];
</script>

<div
  class="flex flex-row items-center justify-between gap-2 overflow-x-auto whitespace-nowrap rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2 shadow-sm"
>
  <div class="flex shrink-0 flex-row items-center gap-4">
    <div class="flex flex-col items-start gap-1">
      <label class="pl-1 text-sm text-zinc-500" for="pathfinding">Algorithm</label>
      <select id="pathfinding" class="rounded border border-zinc-200 bg-zinc-50 p-2">
        {#each pathfindingAlgorithms as algorithm}
          <option value={algorithm}>{algorithm}</option>
        {/each}
      </select>
    </div>
    <div class="flex flex-col items-start gap-1">
      <label class="pl-1 text-sm text-zinc-500" for="maze">Maze</label>
      <select id="maze" class="rounded border border-zinc-200 bg-zinc-50 p-2">
        {#each pathfindingMazes as maze}
          <option value={maze}>{maze}</option>
        {/each}
      </select>
    </div>
    <button
      class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
      type="button"
    >
      <p class="font-bold">Clear Path</p>
    </button>
    <button
      class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
      type="button"
      on:click={grid.clearBoard}
    >
      <p class="font-bold">Clear Board</p>
    </button>
  </div>
  <div class="shrink-0">
    <button
      class="rounded-full border bg-zinc-800 p-2 transition-colors hover:bg-zinc-700 focus-visible:bg-zinc-700"
      type="button"
    >
      <iconify-icon icon="mingcute:play-fill" width="20" height="20" style="color: #fafafa"
      ></iconify-icon>
    </button>
  </div>
</div>
