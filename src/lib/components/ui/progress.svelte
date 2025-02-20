<script lang="ts">
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  interface ProgressProps {
    value: number;
    min?: number;
    max: number;
    labelledby?: string;
  }

  let { value, min = 0, max = 100, labelledby = 'Progress Bar' }: ProgressProps = $props();
  const progress = Tween.of(() => (value - min) / (max - min), { easing: cubicOut });
</script>

<progress
  value={progress.current}
  class="h-3 w-full overflow-hidden rounded-lg bg-zinc-200 transition-all"
  aria-labelledby={labelledby}
  aria-valuenow={value}
  aria-valuemin={min}
  aria-valuemax={max - min}
>
</progress>

<style>
  progress::-webkit-progress-bar {
    background-color: var(--color-zinc-200);
  }

  progress::-webkit-progress-value {
    background-color: var(--color-emerald-500);
  }
</style>
