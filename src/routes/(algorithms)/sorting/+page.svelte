<script lang="ts">
  import { SortingSettings, SortingVisualizer } from '$lib/components/sorting';
</script>

<svelte:head>
  <title>Sorting Algorithms</title>
</svelte:head>

<main
  class="grid grid-cols-1 grid-rows-2 gap-8 px-4 py-8 lg:grid-cols-[2fr_5fr] lg:grid-rows-1 lg:p-16"
>
  <div class="max-lg:order-last">
    <SortingSettings />
  </div>
  <SortingVisualizer />
</main>
