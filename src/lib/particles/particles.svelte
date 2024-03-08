<script lang="ts">
  import { particles } from './particles.action';
  import { particlesSettings } from './particles.store';
</script>

<canvas use:particles={$particlesSettings.color} class="fixed -z-50"></canvas>
