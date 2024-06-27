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

export const draggable: DraggableAction = (element: HTMLElement, options: DraggableElement) => {
  let state = { ...options };

  const handleDragStart = (event: DragEvent) => {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData('text/plain', state.data);
  };

  const updateDraggable = () => {
    if (state.isDraggable) {
      element.draggable = true;
      element.style.cursor = 'grab';
      element.addEventListener('dragstart', handleDragStart);
    } else {
      element.draggable = false;
      element.style.cursor = 'default';
      element.removeEventListener('dragstart', handleDragStart);
    }
  };

  updateDraggable();

  return {
    update(options: DraggableElement) {
      state = { ...options };
      updateDraggable();
    },
    destroy() {
      element.removeEventListener('dragstart', handleDragStart);
    }
  };
};

interface DropzoneElement {
  dropEffect: DataTransfer['dropEffect'];
  dragoverClass: string;
}

export const dropzone: DropzoneAction = (element: HTMLElement, className: string = 'droppable') => {
  const state: DropzoneElement = {
    dragoverClass: className,
    dropEffect: 'move'
  };

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
    destroy() {
      element.removeEventListener('dragenter', handleDragEnter);
      element.removeEventListener('dragleave', handleDragLeave);
      element.removeEventListener('dragover', handleDragOver);
      element.removeEventListener('drop', handleDrop);
    }
  };
};
