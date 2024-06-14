<script>
  import '../app.css';
  import { onNavigate } from '$app/navigation';

  onNavigate((navigation) => {
    // @ts-expect-error View Transitions
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
    // @ts-expect-error View Transitions
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<slot />
