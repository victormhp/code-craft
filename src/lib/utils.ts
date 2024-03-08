import type { Action } from 'svelte/action';

interface Attributes {
  'on:outside'?: (event: CustomEvent) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type clickOutsideAction = Action<HTMLElement, any, Attributes>;

export const clickOutside: clickOutsideAction = (
  element: HTMLElement,
  options: { ignore: string }
) => {
  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const ignore = document.getElementById(options.ignore);

    if (!element || element.contains(target)) return;
    if (ignore?.contains(target)) return;

    const clickOutsideEvent = new CustomEvent('outside');
    element.dispatchEvent(clickOutsideEvent);
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
};
