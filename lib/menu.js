/**
 * REPLASTICANDO — Canonical Fullscreen Menu
 * 
 * Requisitos estritos:
 * - Abertura e fechamento via botão [///] e botão Fechar [✕]
 * - Tecla ESC fecha o menu
 * - Focus Trap ativo durante exibição
 * - Focus Return ao fechar (devolve o foco para o botão acionador)
 * - Body Scroll Lock sem pulo de layout
 * - Sincronização ARIA (aria-expanded, aria-hidden, aria-modal)
 */

export function initMenu() {
  const triggerBtn = document.querySelector('[data-menu-trigger]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const menu = document.getElementById('fullscreen-menu');

  if (!triggerBtn || !menu) return;

  let lastActiveElement = null;

  function getFocusableElements() {
    return Array.from(
      menu.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
  }

  function openMenu() {
    lastActiveElement = document.activeElement;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    triggerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');

    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      // Focus close button or first element
      const target = closeBtn || focusable[0];
      target.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    triggerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');

    document.removeEventListener('keydown', handleKeyDown);

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  triggerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = menu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  // Close when clicking on any menu navigation link that points to an anchor or page
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

// Auto-initialize on DOMContentLoaded if not loaded as modular import
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }
}
