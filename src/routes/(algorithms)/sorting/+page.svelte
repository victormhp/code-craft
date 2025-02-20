<script lang="ts">
  import { SortingSettings, SortingVisualizer } from '$lib/components/sorting';
  import { setSortingState, setRectState } from '$lib/components/sorting/sorting.svelte';

  setSortingState();
  setRectState();
</script>

<svelte:head>
  <title>Sorting Algorithms</title>
</svelte:head>

<main class="flex flex-col gap-8 px-4 py-8 lg:grid lg:grid-cols-[2fr_5fr] lg:grid-rows-1 lg:px-16">
  <div class="max-lg:order-last">
    <SortingSettings />
  </div>
  <SortingVisualizer />
</main>
