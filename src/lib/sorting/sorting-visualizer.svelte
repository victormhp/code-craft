<script lang="ts">
  import 'iconify-icon';
  import {
    sortingSize,
    sortingOrder,
    sortingDelay,
    sortingAlgorithm,
    sortingState,
    canStep,
    canStepBack
  } from './sorting.store';
  import { generateRandomArray } from './sorting.utils';
  import { Progress } from '$lib/ui';
  import Rect from './rect.svelte';

  let frame: number;
  let timeout: number;
  let rectWidth: number;
  let rectsContainerWidth: number;
  let rectsContainerHeight: number;
  let rectMinHeight = 20;
  let rectMaxHeight = 450;
  let initialHeights: number[] = [];

  $: {
    initialHeights = generateRandomArray($sortingSize, rectMinHeight, rectMaxHeight);
    if ($sortingOrder === 'Reverse') {
      initialHeights.sort((a, b) => b - a);
    }
  }

  $: rectWidth = rectsContainerWidth / $sortingSize;
  $: ({ moves, states } = $sortingAlgorithm([...initialHeights]));

  $: $sortingState.total = states.length;
  $: $sortingState.move = moves[$sortingState.current];
  $: rectHeights = states[$sortingState.current];

  function animate() {
    if ($sortingState.isPlaying && !$canStep) {
      $sortingState.isPlaying = false;
    }

    if ($sortingState.isPlaying && $canStep) {
      timeout = setTimeout(() => {
        frame = requestAnimationFrame(animate);
        sortingState.step();
      }, $sortingDelay);

      return () => {
        clearTimeout(timeout);
        cancelAnimationFrame(frame);
      };
    }
  }

  function play() {
    if ($sortingState.isPlaying) {
      $sortingState.isPlaying = false;
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    } else {
      $sortingState.isPlaying = true;
      animate();
    }
  }

  function keysControls(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        play();
        break;
      case 'ArrowLeft':
        if ($sortingState.current > 0 && canStepBack) {
          sortingState.stepBack();
        }
        break;
      case 'ArrowRight':
        if ($sortingState.current + 1 < $sortingState.total && canStep) {
          sortingState.step();
        }
        break;
    }
  }

  function randomize() {
    sortingState.reset();
    $sortingState.isPlaying = false;
    initialHeights = generateRandomArray($sortingSize, rectMinHeight, rectMaxHeight);
  }

  function restart() {
    cancelAnimationFrame(frame);
    sortingState.reset();
    $sortingState.isPlaying = false;
  }
</script>

<svelte:window on:keydown={keysControls} />

<div class="flex flex-col gap-4">
  <div
    bind:clientWidth={rectsContainerWidth}
    bind:clientHeight={rectsContainerHeight}
    class="mb-4 flex w-full grow items-end justify-center rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm"
    style="height: {rectMaxHeight + 100}px"
  >
    {#each rectHeights as rectHeight, i}
      <Rect id={i} width={rectWidth} height={rectHeight} />
    {/each}
  </div>
  <div class="mt-auto space-y-4">
    <Progress max={$sortingState.total - 1} value={$sortingState.current} />
    <div
      class="flex justify-between gap-2 rounded-lg border border-zinc-200 bg-zinc-100 p-2 shadow-sm"
    >
      <button
        class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
        type="button"
        on:click={randomize}
        disabled={$sortingState.isPlaying || ($canStep && $canStepBack)}
      >
        <iconify-icon icon="mingcute:shuffle-2-line" width="20" height="20" style="color: #27272a"
        ></iconify-icon>
      </button>
      <div class="flex gap-2">
        <button
          class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
          type="button"
          on:click={sortingState.stepBack}
          disabled={$sortingState.isPlaying || !$canStepBack}
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
            icon={$sortingState.isPlaying ? 'mingcute:pause-fill' : 'mingcute:play-fill'}
            width="20"
            height="20"
            style="color: #27272a"
          ></iconify-icon>
        </button>
        <button
          class="rounded border bg-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-300"
          type="button"
          on:click={sortingState.step}
          disabled={$sortingState.isPlaying || !$canStep}
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
        disabled={$sortingState.isPlaying || $sortingState.current < 1}
      >
        <iconify-icon icon="mingcute:refresh-3-line" width="20" height="20" style="color: #27272a"
        ></iconify-icon>
      </button>
    </div>
  </div>
</div>
