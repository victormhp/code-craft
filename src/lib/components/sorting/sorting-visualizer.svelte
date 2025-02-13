<script lang="ts">
  import 'iconify-icon';
  import { generateRandomArray } from '$lib/utils';
  import { Progress, PressableButton } from '$lib/components/ui';
  import Rect from './rect.svelte';
  import { sortingSettings, sortingProgress } from './sorting.svelte';

  let frame: number;
  let timeout: number;
  let rectsContainerWidth = $state(0);
  let rectsContainerHeight = $state(0);
  let rectWidth = $derived(rectsContainerWidth / sortingSettings.size);
  let rectMaxHeight = $derived(rectsContainerHeight - 50);

  let rectHeights = $derived.by(() => {
    let rectHeights = generateRandomArray(sortingSettings.size, 20, rectMaxHeight);
    if (sortingSettings.order === 'Reverse') {
      rectHeights.sort((a, b) => b - a);
    }
    return rectHeights;
  });

  let { values, statuses } = $derived(sortingSettings.algorithm([...rectHeights]));

  $effect(() => {
    sortingProgress.total = values.length;
  });

  let currentValues = $derived(values[sortingProgress.current]);
  let currentStatuses = $derived(statuses[sortingProgress.current]);

  const canStep = $derived.by(() => {
    return sortingProgress.current < sortingProgress.total - 1;
  });

  const canStepBack = $derived.by(() => {
    return sortingProgress.current > 0;
  });

  function play() {
    if (!canStep) return;

    if (sortingSettings.isPlaying) {
      sortingSettings.isPlaying = false;
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    } else {
      sortingSettings.isPlaying = true;
      animate();
    }
  }

  function animate() {
    if (sortingSettings.isPlaying && !canStep) {
      sortingSettings.isPlaying = false;
    }

    if (sortingSettings.isPlaying && canStep) {
      timeout = setTimeout(() => {
        frame = requestAnimationFrame(animate);
        sortingProgress.step();
      }, sortingSettings.delay);

      return () => {
        clearTimeout(timeout);
        cancelAnimationFrame(frame);
      };
    }
  }

  function stepBack() {
    if (canStepBack) {
      sortingProgress.stepBack();
    }
  }

  function step() {
    if (canStep) {
      sortingProgress.step();
    }
  }

  function randomize() {
    if (sortingSettings.isPlaying || sortingProgress.current > 0) return;

    sortingProgress.reset();
    sortingSettings.isPlaying = false;

    // This forces to recalculate rectHeights, someday i'll fine a better way to do this xd
    sortingSettings.size++;
    sortingSettings.size--;
  }

  function restart() {
    if (sortingSettings.isPlaying || sortingProgress.current < 1) return;

    cancelAnimationFrame(frame);
    sortingProgress.reset();
    sortingSettings.isPlaying = false;
  }

  const mediaButtons = $derived([
    {
      label: 'Randomize',
      icon: 'material-symbols:shuffle-rounded',
      action: randomize,
      disabled: sortingSettings.isPlaying || sortingProgress.current > 0
    },
    {
      label: 'Previous Step',
      icon: 'material-symbols:fast-rewind-rounded',
      action: stepBack,
      disabled: sortingSettings.isPlaying || !canStepBack
    },
    {
      label: 'Play/Pause',
      icon: sortingSettings.isPlaying
        ? 'material-symbols:pause-rounded'
        : 'material-symbols:play-arrow-rounded',
      action: play,
      disabled: !canStep
    },
    {
      label: 'Next Step',
      icon: 'material-symbols:fast-forward-rounded',
      action: step,
      disabled: sortingSettings.isPlaying || !canStep
    },
    {
      label: 'Restart',
      icon: 'material-symbols:restart-alt-rounded',
      action: restart,
      disabled: sortingSettings.isPlaying || sortingProgress.current < 1
    }
  ]);

  function keysControls(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        play();
        break;
      case 'ArrowLeft':
        if (!sortingSettings.isPlaying) {
          stepBack();
        }
        break;
      case 'ArrowRight':
        if (!sortingSettings.isPlaying) {
          step();
        }
        break;
      default:
        break;
    }
  }

  $effect(() => {
    console.log('Container height:', rectsContainerHeight);
  });
</script>

<svelte:window on:keydown={keysControls} />

<div class=" grid grid-rows-[1fr_auto] gap-4">
  <div
    bind:clientWidth={rectsContainerWidth}
    bind:clientHeight={rectsContainerHeight}
    class="mb-4 flex min-h-[400px] max-w-full items-end justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm"
  >
    {#each currentValues as rectHeight, i}
      <Rect width={rectWidth} height={rectHeight} status={currentStatuses[i]} />
    {/each}
  </div>
  <div class="space-y-4">
    <Progress max={sortingProgress.total - 1} value={sortingProgress.current} />
    <div
      class="media flex justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm"
    >
      {#each mediaButtons as { label, icon, action, disabled }}
        <div>
          <PressableButton {label} {action} {disabled}>
            <iconify-icon {icon} width="24" height="24" style="color: var(--color-zinc-800)"
            ></iconify-icon>
          </PressableButton>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .media div:first-child {
    margin-right: auto;
  }

  .media div:last-child {
    margin-left: auto;
  }

  @media (width <= 40rem) {
    .media {
      display: grid;
      grid-template-rows: repeat(2, auto);
      justify-items: center;
      align-items: center;
      grid-auto-columns: auto;
    }

    .media div:first-child {
      grid-row: 2;
    }

    .media div:last-child {
      grid-row: 2;
    }

    .media div:nth-child(2) {
      grid-row: 1;
    }

    .media div:nth-child(3) {
      grid-row: 1;
    }

    .media div:nth-child(4) {
      grid-row: 1;
    }
  }
</style>
