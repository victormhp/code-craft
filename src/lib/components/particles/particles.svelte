<script lang="ts">
  import { particlesAction } from './particles.action';
  import { particlesSettings } from './particles.store';
</script>

<canvas use:particlesAction={$particlesSettings} class="fixed -z-50"></canvas>
