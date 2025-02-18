<script lang="ts">
  // Giving credit to this amazing button https://www.joshwcomeau.com/animation/3d-button/
  import type { Snippet } from 'svelte';

  interface ButtonProps {
    children: Snippet;
    label: string;
    href?: string;
    action?: () => void;
    disabled?: boolean;
  }

  let {
    children,
    href,
    action,
    label = 'Pressable Button',
    disabled = $bindable(false)
  }: ButtonProps = $props();
</script>

{#if href}
  <a {href} class="pushable" aria-label={label}>
    <span class="shadow"></span>
    <span class="edge"></span>
    <span class="front">
      {@render children?.()}
    </span>
  </a>
{:else}
  <button
    type="button"
    class="pushable"
    aria-label={label}
    {disabled}
    aria-disabled={disabled}
    onclick={action}
  >
    <span class="shadow"></span>
    <span class="edge"></span>
    <span class="front">
      {@render children?.()}
    </span>
  </button>
{/if}

<style>
  .pushable {
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
  }

  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: var(--color-zinc-400);
    will-change: transform;
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: var(--color-zinc-300);
  }

  .front {
    height: 100%;
    display: flex;
    position: relative;
    padding: 0.75rem 2.5rem;
    border-radius: 12px;
    border: 1px solid var(--color-zinc-300);
    font-size: 1.25rem;
    color: var(--color-zinc-50);
    background: var(--color-zinc-50);
    will-change: transform;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  .pushable:hover:not(:disabled) {
    filter: brightness(102%);
  }

  .pushable:hover:not(:disabled) .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  .pushable:active:not(:disabled) .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  .pushable:hover:not(:disabled) .shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  .pushable:active:not(:disabled) .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }

  .pushable:focus:not(:focus-visible) {
    outline: none;
  }

  .pushable:disabled .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  .pushable:disabled .shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  @media (width < 64rem) {
    .front {
      padding: 0.5rem 1.75rem;
    }
  }
</style>
