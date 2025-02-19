<script lang="ts">
  import 'iconify-icon';
  import { ParticlesSettings } from '$lib/components/particles';
  import { clickOutside } from '$lib/utils';
  import { appSettings } from '$lib/store.svelte';
  import { links } from '$lib/config';

  let isClosed = true;
  const closeParticleSettings = () => (isClosed = true);
  const toggleParticleSettings = () => (isClosed = !isClosed);
  const toggleMenu = () => (appSettings.isMenuOpened = !appSettings.isMenuOpened);
</script>

<header class="z-50 w-full bg-transparent px-4 py-2 lg:px-16">
  <nav class="flex items-center justify-between select-none">
    <div class="hidden lg:flex lg:gap-4">
      <a
        class="rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        href={links.linkedin}
        target="_blank"
        aria-label="LinkedIn Link"
        rel="noopener noreferrer"
      >
        <iconify-icon icon="ri:linkedin-fill" width="20" height="20" class="text-zinc-800"
        ></iconify-icon>
      </a>
      <a
        class="rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        href={links.linkedin}
        target="_blank"
        aria-label="Github Link"
        rel="noopener noreferrer"
      >
        <iconify-icon icon="bi:github" width="20" height="20" class="text-zinc-800"></iconify-icon>
      </a>
    </div>
    <a class="flex items-center" href="/">
      <img class="size-16 lg:size-22" src="logo-no-bg.svg" alt="Web logo" />
      <h1 class="font-virgil text-3xl font-bold tracking-wider lg:text-4xl">Code Craft</h1>
    </a>
    <div class="relative flex gap-4">
      <button
        class="rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        aria-label="Toggle menu visibility"
        onclick={toggleMenu}
      >
        <iconify-icon
          icon={appSettings.isMenuOpened ? 'lucide:eye-off' : 'lucide:eye'}
          width="20"
          height="20"
          class="text-color-800"
        ></iconify-icon>
      </button>
      <button
        id="btn-particles-settings"
        class="rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300"
        aria-label="Toggle particles settings"
        onclick={toggleParticleSettings}
      >
        <iconify-icon icon="lucide:settings-2" width="20" height="20" class="text-color-800"
        ></iconify-icon>
      </button>
      <div
        aria-hidden={isClosed}
        onoutside={closeParticleSettings}
        use:clickOutside={{ ignore: 'btn-particles-settings' }}
        class="absolute top-12 right-0 z-50 w-[300px] aria-hidden:hidden"
      >
        <ParticlesSettings />
      </div>
    </div>
  </nav>
</header>
