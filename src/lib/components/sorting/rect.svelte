<script lang="ts">
  import { rectSettings } from './sorting.svelte';
  import type { SortingStatus } from './sorting.types';

  type RectProps = {
    width: number;
    height: number;
    status: SortingStatus;
  };

  let { width, height, status }: RectProps = $props();

  const color = $derived(rectSettings.getColor(status));
</script>

<div
  class="relative flex origin-bottom items-center justify-center rounded-t-md border border-zinc-50"
  style="width: {width}px; height: {height}px; background-color: {color};"
></div>
