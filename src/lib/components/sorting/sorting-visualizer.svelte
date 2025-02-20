<script lang="ts">
  import 'iconify-icon';
  import { Progress, PressableButton } from '$lib/components/ui';
  import { getSortingState } from './sorting.svelte';
  import Rect from './rect.svelte';

  const sorting = getSortingState();

  const mediaButtons = $derived([
    {
      label: 'Randomize',
      icon: 'material-symbols:shuffle-rounded',
      color: 'text-violet-500',
      action: sorting.randomize,
      disabled: sorting.isPlaying || sorting.current > 0
    },
    {
      label: 'Previous Step',
      icon: 'material-symbols:fast-rewind-rounded',
      color: 'text-cyan-400',
      action: sorting.stepBack,
      disabled: sorting.isPlaying || !sorting.canStepBack()
    },
    {
      label: 'Play/Pause',
      icon: sorting.isPlaying
        ? 'material-symbols:pause-rounded'
        : 'material-symbols:play-arrow-rounded',
      color: sorting.isPlaying ? 'text-zinc-800' : 'text-emerald-500',
      action: sorting.play,
      disabled: !sorting.canStep()
    },
    {
      label: 'Next Step',
      icon: 'material-symbols:fast-forward-rounded',
      color: 'text-cyan-600',
      action: sorting.step,
      disabled: sorting.isPlaying || !sorting.canStep()
    },
    {
      label: 'Restart',
      icon: 'material-symbols:restart-alt-rounded',
      color: 'text-red-500',
      action: sorting.restart,
      disabled: sorting.isPlaying
    }
  ]);

  function keysControls(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        sorting.play();
        break;
      case 'ArrowLeft':
        if (!sorting.isPlaying) {
          sorting.stepBack();
        }
        break;
      case 'ArrowRight':
        if (!sorting.isPlaying) {
          sorting.step();
        }
        break;
      default:
        break;
    }
  }
</script>

<svelte:window on:keydown={keysControls} />

<div class=" grid grid-rows-[1fr_auto] gap-4">
  <div
    class="mb-4 flex min-h-[400px] items-end justify-center rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm"
  >
    {#each sorting.currValues as rectHeight, i}
      <Rect width={sorting.currValues.length % 100} height={rectHeight} status={sorting.currStatuses[i]} />
    {/each}
  </div>
  <div class="space-y-4">
    <Progress max={sorting.total - 1} value={sorting.current} />
    <div
      class="media flex justify-center gap-4 rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm sm:gap-2"
    >
      {#each mediaButtons as { label, icon, color, action, disabled }}
        <div>
          <PressableButton {label} {action} {disabled}>
            <iconify-icon {icon} width="24" height="24" class={color}></iconify-icon>
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
