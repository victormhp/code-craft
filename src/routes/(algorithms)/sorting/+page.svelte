<script lang="ts">
  import { SortingSettings, SortingVisualizer } from '$lib/sorting';
</script>

<svelte:head>
  <title>Sorting Algorithms</title>
</svelte:head>

<main class="flex flex-col-reverse gap-8 px-4 py-8 lg:grid lg:grid-cols-[2fr,5fr] lg:p-16">
  <SortingSettings />
  <SortingVisualizer />
</main>
