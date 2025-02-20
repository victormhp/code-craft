<script lang="ts">
  import { getRectState } from './sorting.svelte';
  import type { SortingStatus } from './sorting.types';

  interface RectProps {
    width: number;
    height: number;
    status: SortingStatus;
  }

  let { width, height, status }: RectProps = $props();

  const rect = getRectState();
  const color = $derived(rect.getColor(status));
</script>

<div
  class="flex origin-bottom items-center justify-center rounded-t-md border border-zinc-200"
  style="width: {width}%; height: {height}%; background-color: {color};"
></div>
