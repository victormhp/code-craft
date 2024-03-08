<script lang="ts">
  import 'iconify-icon';
  import { ParticlesSettings } from '$lib/particles';
  import { clickOutside } from '$lib/utils';
  import { isMenuOpened } from '$lib/store';

  let isClosed = true;
  const closeParticleSettings = () => (isClosed = true);
  const toggleParticleSettings = () => (isClosed = !isClosed);
  const toggleMenu = () => isMenuOpened.update((state) => !state);
</script>

<header class="fixed left-0 top-0 z-50 w-full bg-transparent px-4 py-3 lg:px-16 lg:py-6">
  <nav class="flex items-center justify-between">
    <div class="hidden lg:flex lg:gap-4">
      <a
        class="rounded-lg bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        href="https://www.linkedin.com/in/victormhp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <iconify-icon icon="ri:linkedin-fill" width="20" height="20" style="color: #18181b"
        ></iconify-icon>
      </a>
      <a
        class="rounded-lg bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        href="https://github.com/victormhp/code-craft"
        target="_blank"
        rel="noopener noreferrer"
      >
        <iconify-icon icon="bi:github" width="20" height="20" style="color: #18181b"></iconify-icon>
      </a>
    </div>
    <a class="homelink coursor-pointer flex items-center gap-4" href="/">
      <img src="logo-no-bg.svg" alt="Web logo" />
      <h1 class="font-virgil text-2xl font-bold tracking-wider lg:text-4xl">Code Craft</h1>
    </a>
    <div class="relative flex gap-4">
      <button
        class="cursor-pointer rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300 focus-visible:bg-zinc-300"
        on:click={toggleMenu}
      >
        <iconify-icon
          icon={$isMenuOpened ? 'lucide:eye-off' : 'lucide:eye'}
          width="20"
          height="20"
          style="color: #18181b"
        ></iconify-icon>
      </button>
      <button
        id="btn-particles-settings"
        class="cursor-pointer rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300 focus-visible:bg-zinc-300"
        on:click={toggleParticleSettings}
      >
        <iconify-icon icon="lucide:settings-2" width="20" height="20" style="color: #18181b"
        ></iconify-icon>
      </button>
      <div
        aria-hidden={isClosed}
        on:outside={closeParticleSettings}
        use:clickOutside={{ ignore: 'btn-particles-settings' }}
        class="absolute right-0 top-12 z-50 w-[300px] aria-hidden:hidden"
      >
        <ParticlesSettings />
      </div>
    </div>
  </nav>
</header>
