<script lang="ts">
  import { flip } from 'svelte/animate';
  import { crossfade, fade } from 'svelte/transition';
  import { PressableButton, Progress } from '$lib/components/ui';
  import HanoiSettings from './hanoi-settings.svelte';
  import { getHanoiState } from './hanoi.svelte';
  import { quintOut } from 'svelte/easing';

  const hanoi = getHanoiState();

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`
      };
    }
  });

  const diskGradients = [
    'bg-linear-to-r from-red-400 to-red-500',
    'bg-linear-to-r from-orange-400 to-orange-500',
    'bg-linear-to-r from-yellow-400 to-yellow-500',
    'bg-linear-to-r from-green-400 to-green-500',
    'bg-linear-to-r from-teal-400 to-teal-500',
    'bg-linear-to-r from-cyan-400 to-cyan-500',
    'bg-linear-to-r from-blue-400 to-blue-500',
    'bg-linear-to-r from-indigo-400 to-indigo-500',
    'bg-linear-to-r from-purple-400 to-purple-500',
    'bg-linear-to-r from-pink-400 to-pink-500'
  ];

  const hanoiButtons = $derived([
    {
      label: 'Go Back',
      icon: 'material-symbols:arrow-back-rounded',
      color: 'text-zinc-800',
      action: hanoi.goToSettings,
      disabled: false
    },
    {
      label: 'Previous Step',
      icon: 'material-symbols:fast-rewind-rounded',
      color: 'text-cyan-400',
      action: hanoi.stepBack,
      disabled: !hanoi.canStepBack() || hanoi.isPlaying
    },
    {
      label: 'Play/Pause',
      icon: hanoi.isPlaying
        ? 'material-symbols:pause-rounded'
        : 'material-symbols:play-arrow-rounded',
      color: hanoi.isPlaying ? 'text-zinc-800' : 'text-emerald-500',
      action: hanoi.play,
      disabled: !hanoi.canStep()
    },
    {
      label: 'Next Step',
      icon: 'material-symbols:fast-forward-rounded',
      color: 'text-cyan-600',
      action: hanoi.step,
      disabled: !hanoi.canStep() || hanoi.isPlaying
    },
    {
      label: 'Restart',
      icon: 'material-symbols:restart-alt-rounded',
      color: 'text-red-500',
      action: hanoi.restart,
      disabled: hanoi.isPlaying
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
      class="mb-4 grid min-h-[500px] w-full grid-rows-[auto_1fr] rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm"
    >
      <div class="space-y-4 p-4 text-center">
        <h2 class="font-virgil text-5xl">{hanoi.current}</h2>
        <h3 class="font-virgil text-2xl text-zinc-500">{hanoi.total - hanoi.current}</h3>
      </div>
      <div class="grid grid-cols-3 items-end justify-items-center">
        {#each [0, 1, 2] as tower}
          <div class="relative flex h-full w-full flex-col items-center justify-end">
            <div
              class="absolute bottom-0 h-3/4 w-[2vh] rounded bg-linear-to-tr from-zinc-600 to-zinc-800 shadow lg:h-9/10 lg:w-[3vh]"
            ></div>
            <div class="flex h-full w-full flex-col items-center justify-end">
              {#each hanoi.currDisks.filter((d) => d.tower === tower) as d (d.id)}
                <div
                  in:receive={{ key: d.id }}
                  out:send={{ key: d.id }}
                  animate:flip
                  class={[
                    'z-50 mt-1 h-[2vh] rounded-full shadow-xs sm:mt-2 lg:h-[3vh]',
                    diskGradients[d.id]
                  ]}
                  style="width: {20 + d.height * (80 / hanoi.levels)}%;"
                ></div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
    <Progress value={hanoi.current} max={hanoi.total} />
    <div
      class="media flex justify-center gap-4 rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-sm sm:gap-2"
    >
      {#each hanoiButtons as { label, icon, color, action, disabled }}
        <div>
          <PressableButton {label} {action} {disabled}>
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
