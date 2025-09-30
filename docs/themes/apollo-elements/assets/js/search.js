/**
 * Apollo Elements Documentation Search
 *
 * Client-side search functionality using Lunr.js for full-text search
 */

class DocumentationSearch {
  constructor() {
    this.searchInput = document.getElementById('search-input');
    this.searchClear = document.getElementById('search-clear');
    this.searchSuggestions = document.getElementById('search-suggestions');
    this.searchResults = document.getElementById('search-results');
    this.resultsCount = document.getElementById('results-count');
    this.searchTime = document.getElementById('search-time');
    this.resultsList = document.getElementById('results-list');
    this.noResults = document.getElementById('no-results');

    this.searchIndex = null;
    this.documents = [];
    this.isLoading = false;

    this.init();
  }

  async init() {
    if (!this.searchInput) return;

    this.setupEventListeners();
    await this.loadSearchIndex();

    // Handle initial search from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      this.searchInput.value = query;
      this.performSearch(query);
    }
  }

  setupEventListeners() {
    // Search input events
    this.searchInput.addEventListener('input', this.debounce((e) => {
      const query = e.target.value.trim();
      if (query.length >= 2) {
        this.performSearch(query);
      } else {
        this.clearResults();
        this.showSuggestions();
      }
    }, 300));

    this.searchInput.addEventListener('focus', () => {
      if (!this.searchInput.value.trim()) {
        this.showSuggestions();
      }
    });

    this.searchInput.addEventListener('blur', () => {
      // Delay hiding suggestions to allow clicking
      setTimeout(() => this.hideSuggestions(), 150);
    });

    // Clear button
    this.searchClear.addEventListener('click', () => {
      this.searchInput.value = '';
      this.clearResults();
      this.searchInput.focus();
      this.updateURL('');
    });

    // Keyboard navigation
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.searchInput.blur();
        this.hideSuggestions();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.performSearch(this.searchInput.value.trim());
      }
    });

    // Update clear button visibility
    this.searchInput.addEventListener('input', () => {
      this.searchClear.style.display = this.searchInput.value ? 'block' : 'none';
    });
  }

  async loadSearchIndex() {
    if (this.isLoading) return;

    this.isLoading = true;

    try {
      // Load Lunr.js
      if (!window.lunr) {
        await this.loadScript('https://unpkg.com/lunr@2.3.9/lunr.min.js');
      }

      // Load search index
      const response = await fetch('/search-index.json');
      if (!response.ok) {
        throw new Error(`Failed to load search index: ${response.statusText}`);
      }

      const data = await response.json();
      this.documents = data.documents;

      // Build Lunr index
      this.searchIndex = lunr(function() {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('content', { boost: 1 });
        this.field('tags', { boost: 5 });
        this.field('category', { boost: 3 });

        data.documents.forEach((doc) => {
          this.add(doc);
        });
      });

      console.log(`Search index loaded with ${this.documents.length} documents`);
    } catch (error) {
      console.error('Failed to load search index:', error);
      this.showError('Search functionality is currently unavailable.');
    } finally {
      this.isLoading = false;
    }
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  performSearch(query) {
    if (!this.searchIndex || !query.trim()) {
      this.clearResults();
      return;
    }

    const startTime = Date.now();

    try {
      // Sanitize query
      const sanitizedQuery = query.replace(/[^\w\s-]/g, ' ').trim();

      // Perform search with different strategies
      let results = [];

      // Exact phrase search
      if (sanitizedQuery.includes(' ')) {
        const phraseResults = this.searchIndex.search(`"${sanitizedQuery}"`);
        results.push(...phraseResults);
      }

      // Fuzzy search for individual terms
      const terms = sanitizedQuery.split(/\s+/);
      const fuzzyQuery = terms.map(term => {
        if (term.length > 3) {
          return `${term}~1 ${term}*`;
        }
        return `${term}*`;
      }).join(' ');

      const fuzzyResults = this.searchIndex.search(fuzzyQuery);

      // Merge results and remove duplicates
      const allResults = [...results, ...fuzzyResults];
      const uniqueResults = allResults.filter((result, index, self) =>
        self.findIndex(r => r.ref === result.ref) === index
      );

      // Sort by relevance score
      const sortedResults = uniqueResults.sort((a, b) => b.score - a.score);

      const searchTime = Date.now() - startTime;

      this.displayResults(sortedResults, query, searchTime);
      this.updateURL(query);

    } catch (error) {
      console.error('Search error:', error);
      this.showError('An error occurred while searching.');
    }
  }

  displayResults(results, query, searchTime) {
    this.hideSuggestions();

    if (results.length === 0) {
      this.showNoResults();
      return;
    }

    this.searchResults.hidden = false;
    this.noResults.hidden = true;

    // Update results header
    this.resultsCount.textContent = `${results.length} result${results.length === 1 ? '' : 's'}`;
    this.searchTime.textContent = `(${searchTime}ms)`;

    // Generate results HTML
    const resultsHTML = results.slice(0, 20).map(result => {
      const doc = this.documents.find(d => d.id === result.ref);
      if (!doc) return '';

      const highlightedTitle = this.highlightText(doc.title, query);
      const highlightedExcerpt = this.generateExcerpt(doc.content, query);

      return `
        <div class="result-item">
          <h3 class="result-title">
            <a href="${doc.url}">${highlightedTitle}</a>
          </h3>
          <div class="result-url">${window.location.origin}${doc.url}</div>
          <div class="result-excerpt">${highlightedExcerpt}</div>
        </div>
      `;
    }).join('');

    this.resultsList.innerHTML = resultsHTML;
  }

  generateExcerpt(content, query, maxLength = 200) {
    const terms = query.toLowerCase().split(/\s+/);
    const sentences = content.split(/[.!?]+/);

    // Find sentence with most query terms
    let bestSentence = sentences[0] || '';
    let maxMatches = 0;

    sentences.forEach(sentence => {
      const matches = terms.filter(term =>
        sentence.toLowerCase().includes(term)
      ).length;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestSentence = sentence;
      }
    });

    // Truncate if too long
    if (bestSentence.length > maxLength) {
      bestSentence = bestSentence.substring(0, maxLength) + '...';
    }

    return this.highlightText(bestSentence, query);
  }

  highlightText(text, query) {
    if (!query.trim()) return text;

    const terms = query.toLowerCase().split(/\s+/);
    let highlightedText = text;

    terms.forEach(term => {
      if (term.length > 2) {
        const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
      }
    });

    return highlightedText;
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  showNoResults() {
    this.searchResults.hidden = true;
    this.noResults.hidden = false;
  }

  showError(message) {
    this.searchResults.hidden = true;
    this.noResults.hidden = false;
    this.noResults.querySelector('h3').textContent = 'Search Error';
    this.noResults.querySelector('p').textContent = message;
  }

  clearResults() {
    this.searchResults.hidden = true;
    this.noResults.hidden = true;
  }

  showSuggestions() {
    if (!this.searchInput.value.trim()) {
      this.searchSuggestions.hidden = false;
    }
  }

  hideSuggestions() {
    this.searchSuggestions.hidden = true;
  }

  updateURL(query) {
    const url = new URL(window.location);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }

    window.history.replaceState({}, '', url);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DocumentationSearch();
});

// Global search shortcut
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    } else {
      // Navigate to search page if not on it
      window.location.href = '/search/';
    }
  }
});