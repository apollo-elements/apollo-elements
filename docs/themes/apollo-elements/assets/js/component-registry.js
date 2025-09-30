/**
 * Web Component Registry for Apollo Elements Documentation
 *
 * This module manages the registration, loading, and instantiation
 * of web components throughout the documentation site.
 */

class ComponentRegistry {
  constructor() {
    this.components = new Map();
    this.loadingPromises = new Map();
    this.observers = new Map();
    this.config = this.getConfiguration();

    this.setupGlobalErrorHandling();
  }

  getConfiguration() {
    // Get configuration from import map or default values
    return {
      baseUrl: '/',
      retryAttempts: 3,
      retryDelay: 1000,
      enableLazyLoading: true,
      enableErrorReporting: true,
      polyfillUrl: '/_assets/polyfills/',
      components: {
        // Apollo Elements
        'apollo-client': {
          module: '@apollo-elements/components/apollo-client',
          dependencies: ['@apollo/client/core'],
          priority: 'high',
          lazy: false
        },
        'apollo-query': {
          module: '@apollo-elements/components/apollo-query',
          dependencies: ['@apollo-elements/core', '@apollo/client/core'],
          priority: 'high',
          lazy: true
        },
        'apollo-mutation': {
          module: '@apollo-elements/components/apollo-mutation',
          dependencies: ['@apollo-elements/core', '@apollo/client/core'],
          priority: 'medium',
          lazy: true
        },
        'apollo-subscription': {
          module: '@apollo-elements/components/apollo-subscription',
          dependencies: ['@apollo-elements/core', '@apollo/client/core'],
          priority: 'medium',
          lazy: true
        },

        // Playground Elements
        'playground-project': {
          module: 'playground-elements/playground-project',
          dependencies: [],
          priority: 'low',
          lazy: true
        },
        'playground-file-editor': {
          module: 'playground-elements/playground-file-editor',
          dependencies: [],
          priority: 'low',
          lazy: true
        },

        // Documentation Components
        'code-tabs': {
          module: '/components/code-tabs',
          dependencies: [],
          priority: 'medium',
          lazy: true
        },
        'wibbler-wobbler': {
          module: '/components/wibbler',
          dependencies: [],
          priority: 'low',
          lazy: true
        },
        'codesandbox-button': {
          module: '/components/codesandbox-button',
          dependencies: [],
          priority: 'low',
          lazy: true
        }
      }
    };
  }

  setupGlobalErrorHandling() {
    if (this.config.enableErrorReporting) {
      window.addEventListener('error', (event) => {
        if (event.filename && event.filename.includes('components')) {
          this.handleComponentError(event.error, event.filename);
        }
      });

      window.addEventListener('unhandledrejection', (event) => {
        if (event.reason && event.reason.message && event.reason.message.includes('component')) {
          this.handleComponentError(event.reason, 'dynamic-import');
        }
      });
    }
  }

  handleComponentError(error, source) {
    console.error(`Component loading error from ${source}:`, error);

    // Emit custom event for error tracking
    document.dispatchEvent(new CustomEvent('component-error', {
      detail: { error, source, timestamp: Date.now() }
    }));
  }

  async register(tagName, config = {}) {
    if (this.components.has(tagName)) {
      return this.components.get(tagName);
    }

    const componentConfig = {
      ...this.config.components[tagName],
      ...config
    };

    if (!componentConfig.module) {
      throw new Error(`No module specified for component: ${tagName}`);
    }

    this.components.set(tagName, {
      tagName,
      config: componentConfig,
      loaded: false,
      loading: false,
      error: null
    });

    // Preload high-priority components
    if (componentConfig.priority === 'high' && !componentConfig.lazy) {
      await this.load(tagName);
    }

    return this.components.get(tagName);
  }

  async load(tagName, retryCount = 0) {
    const component = this.components.get(tagName);

    if (!component) {
      throw new Error(`Component not registered: ${tagName}`);
    }

    if (component.loaded) {
      return component;
    }

    // Prevent duplicate loading
    if (this.loadingPromises.has(tagName)) {
      return this.loadingPromises.get(tagName);
    }

    const loadPromise = this._loadComponent(component, retryCount);
    this.loadingPromises.set(tagName, loadPromise);

    try {
      await loadPromise;
      component.loaded = true;
      component.loading = false;
      this.loadingPromises.delete(tagName);

      // Emit loaded event
      document.dispatchEvent(new CustomEvent('component-loaded', {
        detail: { tagName, component }
      }));

      return component;
    } catch (error) {
      this.loadingPromises.delete(tagName);
      component.error = error;
      component.loading = false;

      if (retryCount < this.config.retryAttempts) {
        console.warn(`Retrying component load: ${tagName} (attempt ${retryCount + 1})`);
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
        return this.load(tagName, retryCount + 1);
      }

      throw error;
    }
  }

  async _loadComponent(component, retryCount) {
    const { tagName, config } = component;

    try {
      component.loading = true;

      // Load dependencies first
      if (config.dependencies && config.dependencies.length > 0) {
        await this.loadDependencies(config.dependencies);
      }

      // Import the component module
      console.log(`Loading component: ${tagName} from ${config.module}`);
      await import(config.module);

      // Verify the component is now defined
      if (!customElements.get(tagName)) {
        // Some components might use a different tag name or need time to register
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!customElements.get(tagName)) {
          throw new Error(`Component ${tagName} failed to register after loading ${config.module}`);
        }
      }

      console.log(`✅ Component loaded: ${tagName}`);
    } catch (error) {
      console.error(`❌ Failed to load component ${tagName}:`, error);
      throw error;
    }
  }

  async loadDependencies(dependencies) {
    const loadPromises = dependencies.map(async (dep) => {
      try {
        await import(dep);
      } catch (error) {
        console.warn(`Failed to load dependency ${dep}:`, error);
        // Don't fail the whole component for optional dependencies
      }
    });

    await Promise.allSettled(loadPromises);
  }

  async loadOnDemand(tagName) {
    // Register component if not already registered
    if (!this.components.has(tagName) && this.config.components[tagName]) {
      await this.register(tagName);
    }

    return this.load(tagName);
  }

  setupLazyLoading() {
    if (!this.config.enableLazyLoading) {
      return;
    }

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const tagName = element.tagName.toLowerCase();

            if (this.config.components[tagName]) {
              this.loadOnDemand(tagName).catch((error) => {
                console.error(`Lazy loading failed for ${tagName}:`, error);
              });

              observer.unobserve(element);
            }
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    // Observe all undefined custom elements
    this.observeUndefinedElements(observer);

    // Set up mutation observer for dynamically added elements
    this.setupMutationObserver(observer);

    this.observers.set('lazy-loading', observer);
  }

  observeUndefinedElements(observer) {
    // Find all potential web components that aren't defined yet
    const undefinedElements = document.querySelectorAll('*:not(:defined)');

    undefinedElements.forEach((element) => {
      const tagName = element.tagName.toLowerCase();
      if (tagName.includes('-') && this.config.components[tagName]) {
        observer.observe(element);
      }
    });
  }

  setupMutationObserver(intersectionObserver) {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = node.tagName?.toLowerCase();

            // Check the element itself
            if (tagName && tagName.includes('-') && this.config.components[tagName]) {
              if (!customElements.get(tagName)) {
                intersectionObserver.observe(node);
              }
            }

            // Check for nested undefined elements
            const undefinedChildren = node.querySelectorAll?.('*:not(:defined)');
            undefinedChildren?.forEach((child) => {
              const childTagName = child.tagName.toLowerCase();
              if (this.config.components[childTagName]) {
                intersectionObserver.observe(child);
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

    this.observers.set('mutation', mutationObserver);
  }

  async preloadCriticalComponents() {
    const criticalComponents = Object.entries(this.config.components)
      .filter(([_, config]) => config.priority === 'high' && !config.lazy)
      .map(([tagName]) => tagName);

    const loadPromises = criticalComponents.map(async (tagName) => {
      try {
        await this.register(tagName);
        return this.load(tagName);
      } catch (error) {
        console.error(`Failed to preload critical component ${tagName}:`, error);
      }
    });

    await Promise.allSettled(loadPromises);
  }

  getLoadedComponents() {
    return Array.from(this.components.values()).filter(c => c.loaded);
  }

  getComponentStatus(tagName) {
    return this.components.get(tagName);
  }

  dispose() {
    // Clean up observers
    this.observers.forEach((observer) => {
      if (observer.disconnect) {
        observer.disconnect();
      }
    });

    this.observers.clear();
    this.components.clear();
    this.loadingPromises.clear();
  }
}

// Create global registry instance
const componentRegistry = new ComponentRegistry();

// Auto-initialize
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      await componentRegistry.preloadCriticalComponents();
      componentRegistry.setupLazyLoading();

      // Expose for debugging
      window.__COMPONENT_REGISTRY__ = componentRegistry;

      console.log('🔧 Component registry initialized');
    } catch (error) {
      console.error('❌ Component registry initialization failed:', error);
    }
  });
}

export { ComponentRegistry, componentRegistry };
