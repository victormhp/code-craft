<script lang="ts">
  import { SortingSettings, SortingVisualizer } from '$lib/sorting';
</script>

<svelte:head>
  <title>Sorting Algorithms</title>
</svelte:head>

<main
  class="flex flex-col-reverse gap-8 px-4 pt-24 lg:grid lg:grid-cols-[2fr,5fr] lg:px-16 lg:pt-32"
>
  <SortingSettings />
  <SortingVisualizer />
</main>
