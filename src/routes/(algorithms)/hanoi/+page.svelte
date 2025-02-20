<script lang="ts">
  import { HanoiVisualizer } from '$lib/components/hanoi';
  import { setHanoiState } from '$lib/components/hanoi/hanoi.svelte';

  setHanoiState();
</script>

<svelte:head>
  <title>Hanoi Tower</title>
</svelte:head>

<main class="flex flex-col gap-8 px-4 py-8 lg:px-16">
  <HanoiVisualizer />
</main>
