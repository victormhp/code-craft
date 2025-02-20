<script lang="ts">
  import { fade } from 'svelte/transition';
  import { PressableButton, Progress } from '$lib/components/ui';
  import HanoiSettings from './hanoi-settings.svelte';
  import { getHanoiState } from './hanoi.svelte';

  const hanoi = getHanoiState();

  const diskColors = [
    'bg-red-400',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-green-400',
    'bg-teal-400',
    'bg-cyan-400',
    'bg-blue-400',
    'bg-indigo-400',
    'bg-purple-400',
    'bg-pink-400'
  ];

  const hanoiButtons = $derived([
    {
      label: 'Go Back',
      icon: 'material-symbols:arrow-back-rounded',
      color: 'text-zinc-800',
      action: () => (hanoi.isSettings = true)
    },
    {
      label: 'Previous Step',
      icon: 'material-symbols:fast-rewind-rounded',
      color: 'text-cyan-400'
    },
    {
      label: 'Play/Pause',
      icon: hanoi.isPlaying
        ? 'material-symbols:pause-rounded'
        : 'material-symbols:play-arrow-rounded',
      color: hanoi.isPlaying ? 'text-zinc-800' : 'text-emerald-500'
    },
    {
      label: 'Next Step',
      icon: 'material-symbols:fast-forward-rounded',
      color: 'text-cyan-600'
    },
    {
      label: 'Restart',
      icon: 'material-symbols:restart-alt-rounded',
      color: 'text-red-500'
    }
  ]);
</script>

{#if hanoi.isSettings}
  <section class="flex h-full items-center justify-center" in:fade>
    <HanoiSettings />
  </section>
{:else}
  <section class="grid h-full grid-rows-[1fr_auto] gap-4" in:fade>
    <div
      class="mb-4 grid min-h-[400px] w-full grid-cols-3 justify-items-end overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm"
    >
      {#each hanoi.towers as tower}
        <div class="flex h-full w-full flex-col items-center justify-end">
          {#each tower as t, i}
            <div
              class={['mt-2 h-[2vh] rounded shadow-xs', diskColors[i]]}
              style="width: {20 + t * (60 / hanoi.levels)}%;"
            ></div>
          {/each}
        </div>
      {/each}
    </div>
    <Progress value={0} max={10} />
    <div
      class="media flex justify-center gap-4 rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm sm:gap-2"
    >
      {#each hanoiButtons as { label, icon, color, action }}
        <div>
          <PressableButton {label} {action}>
            <iconify-icon {icon} width="24" height="24" class={color}></iconify-icon>
          </PressableButton>
        </div>
      {/each}
    </div>
  </section>
{/if}

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
