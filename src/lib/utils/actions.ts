import type { Action } from 'svelte/action';

interface Attributes {
  'on:outside'?: (event: CustomEvent) => void;
  'on:dropzone'?: (event: CustomEvent) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type ClickOutsideAction = Action<HTMLElement, any, Attributes>;
type DraggableAction = Action<HTMLElement, any, Attributes>;
type DropzoneAction = Action<HTMLElement, any, Attributes>;

export const clickOutside: ClickOutsideAction = (
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

interface DraggableElement {
  data: string;
  isDraggable: boolean;
}

export const dragabble: DraggableAction = (element: HTMLElement, options: DraggableElement) => {
  let state = { ...options };
  if (!state.isDraggable) return;
  element.draggable = true;
  element.style.cursor = 'grab';

  const handleDragStart = (event: DragEvent) => {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData('text/plain', state.data);
  };

  element.addEventListener('dragstart', handleDragStart);

  return {
    update(options: DraggableElement) {
      state = { ...options };
    },
    destroy() {
      element.removeEventListener('dragstart', handleDragStart);
    }
  };
};

interface DropzoneState extends DraggableElement {
  dropEffect: DataTransfer['dropEffect'];
  dragoverClass: string;
}

export const dropzone: DropzoneAction = (element: HTMLElement, options: DraggableElement) => {
  let state: DropzoneState = {
    dragoverClass: 'droppable',
    dropEffect: 'move',
    ...options
  };

  if (state.isDraggable) return;

  const handleDragEnter = (event: DragEvent) => {
    const target = event.target as HTMLElement;
    target.classList.add(state.dragoverClass);
  };

  const handleDragLeave = (event: DragEvent) => {
    const target = event.target as HTMLElement;
    target.classList.remove(state.dragoverClass);
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = state.dropEffect;
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const target = event.target as HTMLElement;

    if (!event.dataTransfer) return;
    const data = event.dataTransfer.getData('text/plain');

    target.classList.remove(state.dragoverClass);

    const dropzoneEvent = new CustomEvent('dropzone', { detail: { data: data } });
    element.dispatchEvent(dropzoneEvent);
  };

  element.addEventListener('dragenter', handleDragEnter);
  element.addEventListener('dragleave', handleDragLeave);
  element.addEventListener('dragover', handleDragOver);
  element.addEventListener('drop', handleDrop);

  return {
    update(options: DraggableElement) {
      state = {
        dropEffect: 'move',
        dragoverClass: 'droppable',
        ...options
      };
    },
    destroy() {
      element.removeEventListener('dragenter', handleDragEnter);
      element.removeEventListener('dragleave', handleDragLeave);
      element.removeEventListener('dragover', handleDragOver);
      element.removeEventListener('drop', handleDrop);
    }
  };
};
