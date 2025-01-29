<script lang="ts">
  import 'iconify-icon';
</script>

<header
  class="z-50 w-full border-b border-zinc-200 bg-zinc-50 px-4 py-2 shadow-sm lg:px-16 lg:py-4"
>
  <nav class="flex items-center justify-between">
    <a class="homelink flex items-center gap-4" href="/">
      <img class="size-12" src="logo-no-bg.svg" alt="Web logo" />
      <h1 class="font-virgil text-2xl font-bold tracking-wider lg:text-3xl">Code Craft</h1>
    </a>
    <div class="flex gap-4">
      <a
        class="rounded-lg bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        href="https://www.linkedin.com/in/victormhp"
        target="_blank"
        aria-label="LinkedIn Link"
        rel="noopener noreferrer"
      >
        <iconify-icon icon="ri:linkedin-fill" width="20" height="20"></iconify-icon>
      </a>
      <a
        class="rounded-lg bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        href="https://github.com/victormhp/code-craft"
        target="_blank"
        aria-label="Github Link"
        rel="noopener noreferrer"
      >
        <iconify-icon icon="bi:github" width="20" height="20"></iconify-icon>
      </a>
    </div>
  </nav>
</header>
