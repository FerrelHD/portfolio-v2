const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Capture the currently focused element before opening a modal/drawer. */
export const captureFocusOrigin = (): HTMLElement | null => {
  return document.activeElement instanceof HTMLElement ? document.activeElement : null;
};

/** Return focus to the element that triggered a modal/drawer, without scrolling. */
export const restoreFocusOrigin = (origin: HTMLElement | null): void => {
  if (origin && origin.isConnected) {
    origin.focus({ preventScroll: true });
  }
};

/** Constrain Tab / Shift+Tab keyboard navigation inside an open dialog element. */
export const trapDialogTab = (container: HTMLElement | null, e: KeyboardEvent): void => {
  if (e.key !== 'Tab' || !container) return;

  const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (!container.contains(active)) {
    e.preventDefault();
    (e.shiftKey ? last : first).focus();
    return;
  }

  if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
};
