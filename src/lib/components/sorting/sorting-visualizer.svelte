<script lang="ts">
  import 'iconify-icon';
  import {
    sortingOrder,
    sortingAlgorithm,
    sortingProgress,
    canStep,
    canStepBack
  } from './sorting.store';
  import { generateRandomArray } from '$lib/utils';
  import { Progress } from '$lib/components/ui';
  import Rect from './rect.svelte';

  export let size = 15;
  export let delay = 100;
  export let isHeightVisible = false;

  let frame: number;
  let timeout: number;
  let rectsContainerWidth = 0;
  let rectsContainerHeight = 0;
  let rectHeights: number[] = [];

  let rectMinHeight = 20;
  $: rectMaxHeight = rectsContainerHeight - 100;
  $: rectWidth = rectsContainerWidth / size;

  $: {
    rectHeights = generateRandomArray(size, rectMinHeight, rectMaxHeight);
    if ($sortingOrder === 'Reverse') {
      rectHeights.sort((a, b) => b - a);
    }
  }

  $: ({ rectValues, rectStatuses } = $sortingAlgorithm([...rectHeights]));
  $: $sortingProgress.total = rectValues.length;
  $: currentState = rectValues[$sortingProgress.current];
  $: currentStatus = rectStatuses[$sortingProgress.current];

  function animate() {
    if ($sortingProgress.isPlaying && !$canStep) {
      $sortingProgress.isPlaying = false;
    }

    if ($sortingProgress.isPlaying && $canStep) {
      timeout = setTimeout(() => {
        frame = requestAnimationFrame(animate);
        sortingProgress.step();
      }, delay);

      return () => {
        clearTimeout(timeout);
        cancelAnimationFrame(frame);
      };
    }
  }

  function play() {
    if ($sortingProgress.isPlaying) {
      $sortingProgress.isPlaying = false;
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    } else {
      $sortingProgress.isPlaying = true;
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
    $sortingProgress.isPlaying = false;
    rectHeights = generateRandomArray(size, rectMinHeight, rectMaxHeight);
  }

  function restart() {
    cancelAnimationFrame(frame);
    sortingProgress.reset();
    $sortingProgress.isPlaying = false;
  }
</script>

<svelte:window on:keydown={keysControls} />

<div class="grid grid-rows-[1fr,auto] gap-4">
  <div
    bind:clientWidth={rectsContainerWidth}
    bind:clientHeight={rectsContainerHeight}
    class="mb-4 flex items-end justify-center rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm"
  >
    {#each currentState as rectHeight, i}
      <Rect width={rectWidth} height={rectHeight} status={currentStatus[i]} {isHeightVisible} />
    {/each}
  </div>
  <div class="space-y-4">
    <Progress max={$sortingProgress.total - 1} value={$sortingProgress.current} />
    <div
      class="flex justify-between gap-2 rounded-lg border border-zinc-200 bg-zinc-100 p-2 shadow-sm"
    >
      <button
        class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
        type="button"
        on:click={randomize}
        disabled={$sortingProgress.isPlaying || ($canStep && $canStepBack)}
      >
        <iconify-icon icon="mingcute:shuffle-2-line" width="20" height="20" style="color: #27272a"
        ></iconify-icon>
      </button>
      <div class="flex gap-2">
        <button
          class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
          type="button"
          on:click={sortingProgress.stepBack}
          disabled={$sortingProgress.isPlaying || !$canStepBack}
        >
          <iconify-icon
            icon="mingcute:skip-previous-fill"
            width="20"
            height="20"
            style="color: #27272a"
          >
          </iconify-icon>
        </button>
        <button
          class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
          type="button"
          on:click={play}
          disabled={!$canStep}
        >
          <iconify-icon
            icon={$sortingProgress.isPlaying ? 'mingcute:pause-fill' : 'mingcute:play-fill'}
            width="20"
            height="20"
            style="color: #27272a"
          ></iconify-icon>
        </button>
        <button
          class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
          type="button"
          on:click={sortingProgress.step}
          disabled={$sortingProgress.isPlaying || !$canStep}
        >
          <iconify-icon
            icon="mingcute:skip-forward-fill"
            width="20"
            height="20"
            style="color: #27272a"
          >
          </iconify-icon>
        </button>
      </div>
      <button
        class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
        type="button"
        on:click={restart}
        disabled={$sortingProgress.isPlaying || $sortingProgress.current < 1}
      >
        <iconify-icon icon="mingcute:refresh-3-line" width="20" height="20" style="color: #27272a"
        ></iconify-icon>
      </button>
    </div>
  </div>
</div>
