/**
 * Hydration Script for Apollo Elements
 *
 * This script handles progressive enhancement and hydration of
 * server-side rendered Lit components.
 */

class ComponentHydrator {
  constructor() {
    this.componentRegistry = new Map();
    this.pendingComponents = new Set();
    this.observedComponents = new WeakSet();
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    // Lazy load components when they come into view
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.observedComponents.has(entry.target)) {
            this.observedComponents.add(entry.target);
            this.hydrateComponent(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );
  }

  async hydrateComponent(element) {
    const tagName = element.tagName.toLowerCase();

    try {
      // Check if component is already defined
      if (customElements.get(tagName)) {
        return;
      }

      // Load component module
      await this.loadComponentModule(tagName);

      // Mark as hydrated
      element.setAttribute('hydrated', '');

      console.log(`✅ Hydrated component: ${tagName}`);
    } catch (error) {
      console.error(`❌ Failed to hydrate component ${tagName}:`, error);
    }
  }

  async loadComponentModule(tagName) {
    if (this.componentRegistry.has(tagName)) {
      return this.componentRegistry.get(tagName);
    }

    // Prevent duplicate loads
    if (this.pendingComponents.has(tagName)) {
      return;
    }

    this.pendingComponents.add(tagName);

    try {
      let module;

      // Determine module path based on tag name
      if (tagName.startsWith('apollo-')) {
        module = await import(`@apollo-elements/components/${tagName}`);
      } else if (tagName.startsWith('playground-')) {
        module = await import(`/components/${tagName}.js`);
      } else if (tagName.includes('-')) {
        // Generic web component
        module = await import(`/components/${tagName}.js`);
      } else {
        throw new Error(`Unknown component type: ${tagName}`);
      }

      this.componentRegistry.set(tagName, module);
      this.pendingComponents.delete(tagName);

      return module;
    } catch (error) {
      this.pendingComponents.delete(tagName);
      throw error;
    }
  }

  observeComponent(element) {
    if (this.intersectionObserver && !this.observedComponents.has(element)) {
      this.intersectionObserver.observe(element);
    }
  }

  async hydrateAll() {
    // Find all potential web components
    const components = document.querySelectorAll('[is], *:not(:defined)');

    for (const component of components) {
      const tagName = component.tagName.toLowerCase();

      // Skip if not a custom element
      if (!tagName.includes('-')) continue;

      // Skip if already hydrated
      if (component.hasAttribute('hydrated')) continue;

      // Check if it's visible or critical
      const rect = component.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible || component.hasAttribute('critical')) {
        // Hydrate immediately for visible/critical components
        await this.hydrateComponent(component);
      } else {
        // Lazy hydrate for others
        this.observeComponent(component);
      }
    }
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      });
    }

    // Start hydration process
    await this.hydrateAll();

    // Setup mutation observer for dynamically added components
    this.setupMutationObserver();

    console.log('🔧 Component hydration system initialized');
  }

  setupMutationObserver() {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = node.tagName?.toLowerCase();

            if (tagName && tagName.includes('-') && !node.hasAttribute('hydrated')) {
              this.observeComponent(node);
            }

            // Check for nested components
            const nestedComponents = node.querySelectorAll?.('*:not(:defined)');
            nestedComponents?.forEach((component) => {
              if (!component.hasAttribute('hydrated')) {
                this.observeComponent(component);
              }
            });
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Apollo Elements specific hydration helpers
class ApolloElementsHydrator {
  constructor() {
    this.clientInstances = new Map();
  }

  async setupApolloClient() {
    // Check for apollo-client elements
    const apolloClients = document.querySelectorAll('apollo-client');

    for (const clientEl of apolloClients) {
      if (!clientEl.hasAttribute('hydrated')) {
        await this.hydrateApolloClient(clientEl);
      }
    }
  }

  async hydrateApolloClient(clientElement) {
    try {
      // Load Apollo Client module
      await import('@apollo-elements/components/apollo-client');

      // Configure client if needed
      const uri = clientElement.getAttribute('uri');
      if (uri && !clientElement.client) {
        const { ApolloClient, InMemoryCache, createHttpLink } = await import('@apollo/client/core');

        const client = new ApolloClient({
          link: createHttpLink({ uri }),
          cache: new InMemoryCache()
        });

        clientElement.client = client;
      }

      clientElement.setAttribute('hydrated', '');
      console.log('✅ Hydrated Apollo Client');
    } catch (error) {
      console.error('❌ Failed to hydrate Apollo Client:', error);
    }
  }

  async init() {
    await this.setupApolloClient();
  }
}

// Initialize hydration system
async function initHydration() {
  try {
    const hydrator = new ComponentHydrator();
    const apolloHydrator = new ApolloElementsHydrator();

    await Promise.all([
      hydrator.init(),
      apolloHydrator.init()
    ]);

    // Expose for debugging
    if (typeof window !== 'undefined') {
      window.__HYDRATION__ = {
        hydrator,
        apolloHydrator,
        registry: hydrator.componentRegistry
      };
    }
  } catch (error) {
    console.error('❌ Hydration initialization failed:', error);
  }
}

// Auto-initialize
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHydration);
  } else {
    initHydration();
  }
}

export { ComponentHydrator, ApolloElementsHydrator, initHydration };