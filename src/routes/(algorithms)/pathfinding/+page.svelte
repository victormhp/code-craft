<script lang="ts">
  import { PathfindingVisualizer } from '$lib/pathfinding';
</script>

<svelte:head>
  <title>Pathfinding Algorithms</title>
</svelte:head>

<main class="grid grid-rows-[auto,1fr] gap-4 px-4 py-4 lg:py-8 lg:px-16">
  <PathfindingVisualizer />
</main>
