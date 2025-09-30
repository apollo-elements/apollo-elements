/**
 * Apollo Elements Hugo Theme - Original Web Components
 */

// Initialize components and theme management
document.addEventListener('DOMContentLoaded', async () => {
  // Components are loaded inline via web-components.html partial
  // Theme toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Dispatch theme change event
      document.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: newTheme }
      }));
    });
  }

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isHidden = mobileNav.hasAttribute('hidden');
      if (isHidden) {
        mobileNav.removeAttribute('hidden');
        mobileToggle.setAttribute('aria-expanded', 'true');
      } else {
        mobileNav.setAttribute('hidden', '');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Back to top button
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.removeAttribute('hidden');
      } else {
        backToTop.setAttribute('hidden', '');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Add copy buttons to code blocks
  initCodeCopyButtons();

  // Framework demos are initialized inline in index.html
  console.log('Apollo Elements theme initialized');
});

/**
 * Add copy buttons to all code blocks
 */
function initCodeCopyButtons() {
  const codeBlocks = document.querySelectorAll('.highlight pre, pre.chroma, pre[class*="language-"]');

  codeBlocks.forEach(pre => {
    // Skip if already has a copy button
    if (pre.parentElement.querySelector('.copy-button')) return;

    // Create copy button
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <path d="M6 0h6a2 2 0 0 1 2 2v6" stroke="currentColor" stroke-width="1.5" fill="none"/>
      </svg>
      <span class="copy-text">Copy</span>
    `;

    // Add click handler
    button.addEventListener('click', async () => {
      const code = pre.textContent;

      try {
        await navigator.clipboard.writeText(code);
        button.classList.add('copied');
        button.querySelector('.copy-text').textContent = 'Copied!';

        setTimeout(() => {
          button.classList.remove('copied');
          button.querySelector('.copy-text').textContent = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
        button.querySelector('.copy-text').textContent = 'Failed';
        setTimeout(() => {
          button.querySelector('.copy-text').textContent = 'Copy';
        }, 2000);
      }
    });

    // Add button to the pre element's parent (usually .highlight)
    const container = pre.parentElement.classList.contains('highlight')
      ? pre.parentElement
      : pre;

    if (container.style.position !== 'relative') {
      container.style.position = 'relative';
    }

    container.appendChild(button);
  });
}