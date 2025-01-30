import type { Action } from 'svelte/action';

type ClickOutsideAction = Action<
  HTMLElement,
  { ignore: string },
  { onoutside?: (e: CustomEvent) => void }
>;

export const clickOutside: ClickOutsideAction = (element, options) => {
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

interface DraggableProps {
  data: string;
}

type DraggableAction = Action<HTMLElement, DraggableProps>;

export const draggable: DraggableAction = (element, options) => {
  let state = { ...options };

  const handleDragStart = (event: DragEvent) => {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData('text/plain', state.data);
  };

  const updateDraggable = () => {
    element.draggable = true;
    element.style.cursor = 'grab';
    element.addEventListener('dragstart', handleDragStart);
  };

  updateDraggable();

  return {
    update(options: DraggableProps) {
      state = { ...options };
      updateDraggable();
    },
    destroy() {
      element.removeEventListener('dragstart', handleDragStart);
    }
  };
};

interface DropzoneProps {
  dropEffect: DataTransfer['dropEffect'];
  dragoverClass: string;
}

type DropzoneAction = Action<HTMLElement, DropzoneProps, { ondropzone?: (e: CustomEvent) => void }>;

export const dropzone: DropzoneAction = (element, options) => {
  const state = { ...options };

  const handleDragEnter = (event: DragEvent) => {
    event.preventDefault();
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
