/* Basic modal manager: open/close, ESC, backdrop, focus trap */
(function () {
  const openButtons = document.querySelectorAll('[data-modal-target]');
  const body = document.body;
  let activeModal = null;
  let lastFocused = null;

  function getFocusableElements(container) {
    return container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
  }

  function openModal(target) {
    const modal = document.querySelector(target);
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
    activeModal = modal;
    const focusables = getFocusableElements(modal);
    if (focusables.length) focusables[0].focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
    activeModal = null;
    if (lastFocused) lastFocused.focus();
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-modal-target');
      openModal(target);
    });
  });

  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      const modal = e.target.closest('.modal');
      closeModal(modal);
    }
    // Close by clicking overlay
    if (e.target.classList && e.target.classList.contains('modal__overlay')) {
      const modal = e.target.closest('.modal');
      closeModal(modal);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      closeModal(activeModal);
    }
    // basic focus trap
    if (e.key === 'Tab' && activeModal) {
      const focusables = Array.from(getFocusableElements(activeModal));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();

