<script lang="ts">
  import { SortingSettings, SortingVisualizer } from '$lib/components/sorting';

  let size = 15;
  let delay = 100;
  let isHeightVisible = false;
</script>

<svelte:head>
  <title>Sorting Algorithms</title>
</svelte:head>

<main
  class="grid grid-cols-1 grid-rows-[1fr,1fr] gap-8 px-4 py-8 lg:grid-cols-[2fr,5fr] lg:grid-rows-1 lg:p-16"
>
  <div class="max-lg:order-last">
    <SortingSettings bind:size bind:delay bind:isHeightVisible />
  </div>
  <SortingVisualizer {size} {delay} {isHeightVisible} />
</main>
