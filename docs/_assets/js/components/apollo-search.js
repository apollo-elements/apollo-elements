class ApolloSearch extends HTMLElement {
  #input;
  #clear;
  #results;
  #resultsList;
  #count;
  #noResults;
  #serpTemplate;

  constructor() {
    super();
    this.searchIndex = null;
    this.debounceTimer = null;
    this.focusedIndex = -1;
  }

  connectedCallback() {
    this.#cacheRefs();
    this.#setupEventListeners();
    this.#loadSearchIndex();
  }

  #cacheRefs() {
    this.#input = this.shadowRoot.querySelector('input');
    this.#clear = this.shadowRoot.getElementById('clear');
    this.#results = this.shadowRoot.getElementById('results');
    this.#resultsList = this.shadowRoot.querySelector('ol');
    this.#count = this.shadowRoot.getElementById('count');
    this.#noResults = this.shadowRoot.getElementById('no-results');
    this.#serpTemplate = this.querySelector('#serp');
  }

  #setupEventListeners() {
    this.#input.addEventListener('input', (e) => this.#onInput(e));
    this.#input.addEventListener('keydown', (e) => this.#onKeyDown(e));
    this.#input.addEventListener('focus', () => this.#onFocus());
    this.#clear.addEventListener('click', () => this.#clearSearch());

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        this.#hideResults();
      }
    });
  }

  async #loadSearchIndex() {
    try {
      const response = await fetch('/index.json');
      const data = await response.json();
      this.searchIndex = Array.isArray(data) ? data : data.documents || [];
    } catch (error) {
      console.warn('Search index not available:', error);
    }
  }

  #onInput(e) {
    const query = e.target.value;
    this.#clear.classList.toggle('visible', !!query);
    if (!query) {
      this.#hideResults();
    }

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.#performSearch(query);
    }, 300);
  }

  #onKeyDown(e) {
    if (!this.#results.classList.contains('visible')) {
      if (e.key === 'Escape') {
        this.#hideResults();
        this.#input.blur();
      }
      return;
    }

    const links = Array.from(this.shadowRoot.querySelectorAll('a'));

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusedIndex = Math.min(this.focusedIndex + 1, links.length - 1);
        this.#updateFocus(links);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusedIndex = Math.max(this.focusedIndex - 1, -1);
        if (this.focusedIndex === -1) {
          this.#input.focus();
        }
        this.#updateFocus(links);
        break;
      case 'Enter':
        if (this.focusedIndex >= 0 && links[this.focusedIndex]) {
          e.preventDefault();
          links[this.focusedIndex].click();
        }
        break;
      case 'Escape':
        e.preventDefault();
        this.#hideResults();
        this.#input.blur();
        break;
    }
  }

  #updateFocus(links) {
    links.forEach((link, index) => {
      const isFocused = index === this.focusedIndex
      link.classList.toggle('focused', isFocused);
      if (isFocused) {
        link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  #onFocus() {
    if (this.#input.value && this.searchIndex) {
      this.#performSearch(this.#input.value);
    }
  }

  #performSearch(query) {
    if (!this.searchIndex || !Array.isArray(this.searchIndex) || !query.trim()) {
      this.#hideResults();
      return;
    }

    const results = this.searchIndex.filter(item => {
      const searchText = (item.title + ' ' + item.content + ' ' + (item.tags || []).join(' ')).toLowerCase();
      return searchText.includes(query.toLowerCase());
    }).slice(0, 10);

    this.#displayResults(results, query);
  }

  #displayResults(results, query) {
    this.#resultsList.innerHTML = '';
    this.focusedIndex = -1;

    if (results.length === 0) {
      this.#count.textContent = 'No results found';
      this.#noResults.style.display = 'block';
    } else {
      this.#count.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;
      this.#noResults.style.display = 'none';

      results.forEach(result => {
        const item = this.#serpTemplate.content.cloneNode(true);
        const link = item.querySelector('a');
        const title = item.querySelector('.title');
        const excerpt = item.querySelector('.excerpt');

        link.href = result.url || result.permalink;
        title.innerHTML = this.#highlightText(result.title, query);
        excerpt.innerHTML = this.#highlightText((result.content || '').substring(0, 150) + '...', query);

        this.#resultsList.appendChild(item);
      });
    }

    this.#results.classList.add('visible');
  }

  #highlightText(text, query) {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  #clearSearch() {
    this.#input.value = '';
    this.#clear.classList.remove('visible');
    this.#hideResults();
    this.#input.focus();
  }

  #hideResults() {
    this.#results.classList.remove('visible');
    this.focusedIndex = -1;
  }
}

customElements.define('apollo-search', ApolloSearch);
