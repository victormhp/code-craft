<script lang="ts">
  import { particlesAction } from './particles.action';
  import { particles } from './particles.svelte';
</script>

<canvas use:particlesAction={particles} class="fixed -z-50"></canvas>
