<script lang="ts">
  import 'iconify-icon';
  import { PressableButton } from '$lib/components/ui';
  import { getHanoiState } from './hanoi.svelte';

  const hanoi = getHanoiState();
</script>

<div class="flex flex-col items-center gap-8">
  <PressableButton label="Increase hanoi tower levels" action={hanoi.increaseLevel}>
    <iconify-icon
      icon="material-symbols:keyboard-arrow-up-rounded"
      width="32"
      height="32"
      class="text-zinc-800"
    ></iconify-icon>
  </PressableButton>
  <p class="font-virgil text-4xl">{hanoi.levels}</p>
  <PressableButton label="Decrease hanoi tower levels" action={hanoi.decreaseLevel}>
    <iconify-icon
      icon="material-symbols:keyboard-arrow-down-rounded"
      width="32"
      height="32"
      class="text-zinc-800"
    ></iconify-icon>
  </PressableButton>
  <PressableButton label="Go to hanoi visualizer" action={hanoi.initHanoi}>
    <iconify-icon
      icon="material-symbols:play-arrow-rounded"
      width="32"
      height="32"
      class="text-zinc-800"
    ></iconify-icon>
  </PressableButton>
</div>
