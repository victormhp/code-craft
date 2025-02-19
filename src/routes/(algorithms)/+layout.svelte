<script lang="ts">
  import { page } from '$app/state';
  import { NavAlgorithm } from '$lib/components';
  import type { Algorithm } from '$lib/config';

  const path = page.url.pathname;
  const algorithm = path.slice(1) as Algorithm;
</script>

<NavAlgorithm {algorithm} />
<slot />
