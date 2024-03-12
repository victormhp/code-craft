<script lang="ts">
  import 'iconify-icon';
  import { sortingSize, sortingDelay, sortingState, canStep, canStepBack } from './sorting.store';
  import { generateRandomArray, bubbleSort } from './sorting.utils';
  import { Progress } from '$lib/ui';

  let frame: number;
  let timeout: number;
  let barWidth: number;
  let barsContainerWidth: number;

  let barMinHeight = 10;
  let barMaxHeight = 400;

  $: barWidth = barsContainerWidth / $sortingSize;
  $: initialHeights = generateRandomArray($sortingSize, barMinHeight, barMaxHeight);
  $: ({ moves, states } = bubbleSort(initialHeights));

  $: $sortingState.total = states.length;
  $: $sortingState.move = moves[$sortingState.current];
  $: barHeights = states[$sortingState.current];

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

  function randomize() {
    sortingState.reset();
    $sortingState.isPlaying = false;
    initialHeights = generateRandomArray($sortingSize, barMinHeight, barMaxHeight);
  }

  function restart() {
    cancelAnimationFrame(frame);
    sortingState.reset();
    $sortingState.isPlaying = false;
  }
</script>

<div class="flex flex-col gap-4">
  <div
    bind:clientWidth={barsContainerWidth}
    class="mb-4 flex w-full items-end justify-center rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm"
    style="height: {barMaxHeight + 100}px"
  >
    {#each barHeights as height, i (height)}
      <div
        data-moving={$sortingState.move.includes(i) && $canStep && $canStepBack}
        class="relative rounded-t-md border border-white bg-zinc-800 data-[moving=true]:bg-red-500"
        style="width: {barWidth}px; height: {height}px"
      ></div>
    {/each}
  </div>
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
          style="color: #18181b"
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
      disabled={$sortingState.isPlaying}
    >
      <iconify-icon icon="mingcute:refresh-3-line" width="20" height="20" style="color: #27272a"
      ></iconify-icon>
    </button>
  </div>
</div>
