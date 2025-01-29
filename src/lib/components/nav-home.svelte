<script lang="ts">
  import 'iconify-icon';
  import { ParticlesSettings } from '$lib/components/particles';
  import { clickOutside } from '$lib/utils';
  import { isMenuOpened } from '$lib/store';

  let isClosed = true;
  const closeParticleSettings = () => (isClosed = true);
  const toggleParticleSettings = () => (isClosed = !isClosed);
  const toggleMenu = () => isMenuOpened.update((state) => !state);
</script>

<header class="z-50 w-full bg-transparent px-4 py-3 lg:px-16 lg:py-6">
  <nav class="flex items-center justify-between select-none">
    <div class="hidden lg:flex lg:gap-4">
      <a
        class="rounded-lg bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        href="https://www.linkedin.com/in/victormhp"
        target="_blank"
        aria-label="LinkedIn Link"
        rel="noopener noreferrer"
      >
        <iconify-icon icon="ri:linkedin-fill" width="20" height="20" style="color: var(--color-zinc-900)"
        ></iconify-icon>
      </a>
      <a
        class="rounded-lg bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        href="https://github.com/victormhp/code-craft"
        target="_blank"
        aria-label="Github Link"
        rel="noopener noreferrer"
      >
        <iconify-icon icon="bi:github" width="20" height="20" style="color: var(--color-gray-900)"></iconify-icon>
      </a>
    </div>
    <a class="homelink flex items-center gap-4" href="/">
      <img src="logo-no-bg.svg" alt="Web logo" />
      <h1 class="font-virgil text-2xl font-bold tracking-wider lg:text-4xl">Code Craft</h1>
    </a>
    <div class="relative flex gap-4">
      <button
        class="rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        aria-label="Toggle menu visibility"
        on:click={toggleMenu}
      >
        <iconify-icon
          icon={$isMenuOpened ? 'lucide:eye-off' : 'lucide:eye'}
          width="20"
          height="20"
          style="color: var(--color-gray-900)"
        ></iconify-icon>
      </button>
      <button
        id="btn-particles-settings"
        class="rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        aria-label="Toggle particles settings"
        on:click={toggleParticleSettings}
      >
        <iconify-icon icon="lucide:settings-2" width="20" height="20" style="color: var(--color-zinc-900)"
        ></iconify-icon>
      </button>
      <div
        aria-hidden={isClosed}
        on:outside={closeParticleSettings}
        use:clickOutside={{ ignore: 'btn-particles-settings' }}
        class="absolute top-12 right-0 z-50 w-[300px] aria-hidden:hidden"
      >
        <ParticlesSettings />
      </div>
    </div>
  </nav>
</header>
