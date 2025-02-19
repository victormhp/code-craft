<script lang="ts">
  import 'iconify-icon';
  import { links, algorithms, type Algorithm } from '$lib/config';

  type NavProps = {
    algorithm: Algorithm;
  };

  const { algorithm: selectedAlgorithm }: NavProps = $props();

  const { title, img, alt } = algorithms[selectedAlgorithm];
</script>

<header class="z-50 w-full border-b border-zinc-200 bg-zinc-50 px-4 py-2 shadow-xs lg:px-16">
  <nav class="flex items-center justify-between">
    <a class="flex items-center gap-4" href="/">
      <img class="size-12 sm:size-14 lg:size-16" src={img} {alt} />
      <h1 class="font-virgil text-lg font-bold tracking-wider sm:text-2xl lg:text-3xl">{title}</h1>
    </a>
    <div class="flex items-center gap-4">
      <a
        class="rounded-lg bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        href="/"
        aria-label="Go Back"
      >
        <iconify-icon icon="material-symbols:arrow-back-rounded" width="20" height="20"
        ></iconify-icon>
      </a>
      <div class="h-8 w-0.25 bg-zinc-300 max-sm:hidden"></div>
      <a
        class="rounded-lg bg-zinc-200 p-2 transition-colors hover:bg-zinc-300 max-sm:hidden"
        href={links.linkedin}
        target="_blank"
        aria-label="LinkedIn Link"
        rel="noopener noreferrer"
      >
        <iconify-icon icon="ri:linkedin-fill" width="20" height="20"></iconify-icon>
      </a>
      <a
        class="rounded-lg bg-zinc-200 p-2 transition-colors hover:bg-zinc-300 max-sm:hidden"
        href={links.github}
        target="_blank"
        aria-label="Github Link"
        rel="noopener noreferrer"
      >
        <iconify-icon icon="bi:github" width="20" height="20"></iconify-icon>
      </a>
    </div>
  </nav>
</header>
