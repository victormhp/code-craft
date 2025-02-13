<script lang="ts">
  interface ProgressProps {
    value: number | undefined;
    min?: number;
    max: number;
    labelledby?: string;
  }

  let {
    value = undefined,
    min = 0,
    max = 100,
    labelledby = 'Progress Bar'
  }: ProgressProps = $props();

  const fillPercent = $derived(value ? (100 * (value - min)) / (max - min) : 0);
</script>

<div
  class="progress-animation h-3 w-full overflow-hidden rounded-lg bg-zinc-200 transition-all"
  data-testid="progress-bar"
  role="progressbar"
  aria-labelledby={labelledby}
  aria-valuenow={value}
  aria-valuemin={min}
  aria-valuemax={max - min}
>
  <div class="h-full rounded-lg bg-zinc-800 transition-all" style:width="{fillPercent}%"></div>
</div>

<style>
  .progress-animation {
    transform-origin: 0% 50%;
    animation: anim-indeterminate 1s infinite linear;
  }

  @keyframes progress-animation {
    0% {
      transform: translateX(0) scaleX(0);
    }
    40% {
      transform: translateX(0) scaleX(0.4);
    }
    100% {
      transform: translateX(100%) scaleX(0.5);
    }
  }
</style>
