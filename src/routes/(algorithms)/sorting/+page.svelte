<script lang="ts">
  import { SortingSettings, SortingVisualizer } from '$lib/components/sorting';

  let size = 15;
  let delay = 100;
  let showValues = false;
</script>

<svelte:head>
  <title>Sorting Algorithms</title>
</svelte:head>

<main class="flex flex-col-reverse gap-8 px-4 py-8 lg:grid lg:grid-cols-[2fr,5fr] lg:p-16">
  <SortingSettings bind:size bind:delay bind:showValues />
  <SortingVisualizer {size} {delay} {showValues} />
</main>
