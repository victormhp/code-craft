<script lang="ts">
  export let value: number | undefined = undefined;
  export let min = 0;
  export let max = 100;

  export let labelledby = '';
  $: fillPercent = value ? (100 * (value - min)) / (max - min) : 0;
</script>

<div
  class="progress-animation bg-zinc-200 h-3 w-full overflow-hidden rounded-lg transition-all"
  data-testid="progress-bar"
  role="progressbar"
  aria-labelledby={labelledby}
  aria-valuenow={value}
  aria-valuemin={min}
  aria-valuemax={max - min}
>
  <div class="h-full rounded-lg bg-zinc-800 transition-all" style:width="{fillPercent}%" />
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
