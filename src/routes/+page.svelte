<script lang="ts">
  import { Particles } from '$lib/components/particles';
  import { NavHome } from '$lib/components';
  import { isMenuOpened } from '$lib/store';
  import { fade } from 'svelte/transition';

  const routes = [
    { title: 'Sorting Algorithms', img: './sorting.png', path: '/sorting' },
    { title: 'Pathfinding Algorithms', img: './pathfinding.png', path: '/pathfinding' },
    { title: 'Tower of Hanoi', img: './hanoi.png', path: '/hanoi' }
  ];
</script>

<svelte:head>
  <title>Code Craft</title>
</svelte:head>

<Particles />
<NavHome />
<main class="mx-auto flex w-[min(80rem,100%-4rem)] items-center justify-center py-8">
  {#if $isMenuOpened}
    <section
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
      class="grid w-full grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] place-items-center gap-8 select-none"
    >
      {#each routes as { title, img, path }}
        <a href={path} class="contents">
          <img
            class="h-full rounded-lg border border-zinc-200/60 bg-zinc-50 px-8 py-4 shadow-md transition-transform hover:scale-[1.035]"
            src={img}
            alt={title}
          />
        </a>
      {/each}
    </section>
  {/if}
</main>
