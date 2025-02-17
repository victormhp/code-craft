<script lang="ts">
  import { Particles } from '$lib/components/particles';
  import { NavHome } from '$lib/components';
  import { appSettings } from '$lib/store.svelte';
  import { fade } from 'svelte/transition';
  import PressableButton from '$lib/components/ui/pressable-button.svelte';

  const routes = [
    { title: 'Sorting Algorithms', img: './sorting.png', path: '/sorting' },
    { title: 'Pathfinding Algorithms', img: './pathfinding.png', path: '/pathfinding' },
    { title: 'Tower of Hanoi', img: './hanoi.png', path: '/' }
  ];
</script>

<svelte:head>
  <title>Code Craft</title>
</svelte:head>

<Particles />
<NavHome />
<main class="mx-auto flex w-[min(80rem,100%-4rem)] items-center justify-center py-8">
  {#if appSettings.isMenuOpened}
    <section
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
      class="grid w-full grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] place-items-center gap-8 select-none"
    >
      {#each routes as { title, img, path }}
        <div class="h-full w-full">
          <PressableButton href={path} label={title}>
            <div class="flex h-full w-full flex-col items-center justify-between gap-2 text-center">
              <img class="h-full" src={img} alt={title} />
              <h2 class="font-virgil w-full text-center text-lg text-zinc-800">{title}</h2>
            </div>
          </PressableButton>
        </div>
      {/each}
    </section>
  {/if}
</main>
