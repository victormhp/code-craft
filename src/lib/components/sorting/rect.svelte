<script lang="ts">
  import { sortingColors } from './sorting.store';
  import type { RectStatus } from './sorting.types';

  export let width = 0;
  export let height = 0;
  export let status: RectStatus = 'unordered';
</script>

<div
  class="relative flex origin-bottom items-center justify-center rounded-t-md border border-zinc-50"
  style="width: {width}px; height: {height}px; background-color: {$sortingColors[status]};"
/>
