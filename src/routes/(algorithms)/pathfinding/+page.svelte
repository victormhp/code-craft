<script lang="ts">
  import { PathfindingSettings, PathfindingVisualizer } from '$lib/components/pathfinding';
</script>

<svelte:head>
  <title>Pathfinding Algorithms</title>
</svelte:head>

<main class="grid grid-rows-[auto_1fr] gap-4 px-4 py-4 lg:px-16 lg:py-8">
  <PathfindingSettings />
  <PathfindingVisualizer />
</main>
