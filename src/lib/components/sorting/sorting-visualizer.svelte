<script lang="ts">
  import 'iconify-icon';
  import {
    sortingOrder,
    sortingSize,
    sortingDelay,
    sortingAlgorithm,
    sortingIsPlaying,
    sortingProgress,
    canStep,
    canStepBack
  } from './sorting.store';
  import { generateRandomArray } from '$lib/utils';
  import { Progress } from '$lib/components/ui';
  import Rect from './rect.svelte';

  let frame: number;
  let timeout: number;
  let rectsContainerWidth = 0;
  let rectsContainerHeight = 0;
  let rectHeights: number[] = [];

  let rectMinHeight = 20;
  $: rectMaxHeight = rectsContainerHeight - 100;
  $: rectWidth = rectsContainerWidth / $sortingSize;

  $: {
    rectHeights = generateRandomArray($sortingSize, rectMinHeight, rectMaxHeight);
    if ($sortingOrder === 'Reverse') {
      rectHeights.sort((a, b) => b - a);
    }
  }

  $: ({ rectValues, rectStatuses } = $sortingAlgorithm([...rectHeights]));
  $: $sortingProgress.total = rectValues.length;
  $: currentState = rectValues[$sortingProgress.current];
  $: currentStatus = rectStatuses[$sortingProgress.current];

  function animate() {
    if ($sortingIsPlaying && !$canStep) {
      $sortingIsPlaying = false;
    }

    if ($sortingIsPlaying && $canStep) {
      timeout = setTimeout(() => {
        frame = requestAnimationFrame(animate);
        sortingProgress.step();
      }, $sortingDelay);

      return () => {
        clearTimeout(timeout);
        cancelAnimationFrame(frame);
      };
    }
  }

  function play() {
    if ($sortingIsPlaying) {
      $sortingIsPlaying = false;
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    } else {
      $sortingIsPlaying = true;
      animate();
    }
  }

  function keysControls(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        play();
        break;
      case 'ArrowLeft':
        if ($sortingProgress.current > 0 && canStepBack) {
          sortingProgress.stepBack();
        }
        break;
      case 'ArrowRight':
        if ($sortingProgress.current + 1 < $sortingProgress.total && canStep) {
          sortingProgress.step();
        }
        break;
      default:
        break;
    }
  }

  function randomize() {
    sortingProgress.reset();
    $sortingIsPlaying = false;
    rectHeights = generateRandomArray($sortingSize, rectMinHeight, rectMaxHeight);
  }

  function restart() {
    cancelAnimationFrame(frame);
    sortingProgress.reset();
    $sortingIsPlaying = false;
  }

  $: mediaButtons = [
    {
      icon: 'mingcute:shuffle-2-line',
      action: randomize,
      disabled: $sortingIsPlaying || ($canStep && $canStepBack)
    },
    {
      icon: 'mingcute:skip-previous-fill',
      action: sortingProgress.stepBack,
      disabled: $sortingIsPlaying || !canStepBack
    },
    {
      icon: $sortingIsPlaying ? 'mingcute:pause-fill' : 'mingcute:play-fill',
      action: play,
      disabled: !$canStep
    },
    {
      icon: 'mingcute:skip-forward-fill',
      action: sortingProgress.step,
      disabled: $sortingIsPlaying || !canStep
    },
    {
      icon: 'mingcute:refresh-3-line',
      action: restart,
      disabled: $sortingIsPlaying || $sortingProgress.current < 1
    }
  ];
</script>

<svelte:window on:keydown={keysControls} />

<div class="grid grid-rows-[1fr,auto] gap-4">
  <div
    bind:clientWidth={rectsContainerWidth}
    bind:clientHeight={rectsContainerHeight}
    class="mb-4 flex items-end justify-center rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm"
  >
    {#each currentState as rectHeight, i}
      <Rect width={rectWidth} height={rectHeight} status={currentStatus[i]} />
    {/each}
  </div>
  <div class="space-y-4">
    <Progress max={$sortingProgress.total - 1} value={$sortingProgress.current} />
    <div
      id="media"
      class="flex justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 p-2 shadow-sm"
    >
      {#each mediaButtons as { icon, action, disabled }}
        <button
          class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
          type="button"
          on:click={action}
          {disabled}
        >
          <iconify-icon {icon} width="20" height="20" style="color: #27272a"></iconify-icon>
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  #media button:first-child {
    margin-right: auto;
  }

  #media button:last-child {
    margin-left: auto;
  }
</style>
