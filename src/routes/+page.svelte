<script lang="ts">
  import { Particles } from '$lib/particles';
  import { NavHome } from '$lib/ui';
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
<main
  class="relative mx-auto flex min-h-screen w-[min(80rem,100%-4rem)] items-center justify-center pb-10 pt-20 lg:pb-16 lg:pt-32"
>
  {#if $isMenuOpened}
    <section
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
      class="grid w-full grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] place-items-center gap-8 select-none"
    >
      {#each routes as { title, img, path }}
        <article
          class="flex h-full w-full flex-col justify-between gap-2 rounded-lg border border-zinc-200/60 bg-zinc-50 p-4 shadow-md"
        >
          <div class="text-center">
            <a href={path}>
              <img class="inline-block" src={img} alt={title} />
            </a>
          </div>
          <h2 class="text-center font-virgil text-xl">{title}</h2>
        </article>
      {/each}
    </section>
  {/if}
</main>
