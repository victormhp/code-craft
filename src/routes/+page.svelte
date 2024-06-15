<script lang="ts">
  import { Particles } from '$lib/particles';
  import { NavHome } from '$lib/ui';
  import { isMenuOpened } from '$lib/store';

  const routes = [{ title: 'Sorting Algorithms', img: './sorting.png', path: '/sorting' }];
</script>

<svelte:head>
  <title>Code Craft</title>
</svelte:head>

<Particles />
<NavHome />
<main class="relative flex min-h-screen w-full items-center justify-center">
  <section
    aria-hidden={!$isMenuOpened}
    class="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] place-items-center gap-4 px-8 pb-10 pt-20 aria-hidden:hidden lg:gap-8 lg:pb-16 lg:pt-32"
  >
    {#each routes as { title, img, path }}
      <article class="select-none rounded-lg border border-zinc-200/60 bg-zinc-50 p-4 shadow-md">
        <div class="px-2 py-4">
          <a href={path}>
            <img src={img} alt={title} />
          </a>
        </div>
        <h2 class="text-center font-virgil text-xl">{title}</h2>
      </article>
    {/each}
  </section>
</main>
