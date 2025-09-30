#!/usr/bin/env node

/**
 * Lit-SSR Build Script for Apollo Elements Documentation
 *
 * This script handles server-side rendering of Lit components
 * and generates static HTML with declarative shadow DOM.
 */

import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import { join, dirname, relative, extname } from 'path';
import { fileURLToPath } from 'url';
import { render } from '@lit/ssr';
import { collectResult } from '@lit/ssr/lib/render-result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const docsRoot = join(__dirname, '..');

// Configuration
const config = {
  inputDir: join(docsRoot, 'content'),
  outputDir: join(docsRoot, 'static', '_lit-ssr'),
  componentsDir: join(docsRoot, '..', 'packages', 'components'),
  templatesDir: join(docsRoot, 'themes', 'apollo-elements', 'lit-templates'),

  // Components to prerender
  components: [
    'apollo-client',
    'apollo-query',
    'apollo-mutation',
    'apollo-subscription',
    'playground-elements'
  ],

  // SSR options
  ssrOptions: {
    elementRenderers: [],
    deferHydration: true,
    renderShadowRoots: true
  }
};

class LitSSRBuilder {
  constructor(config) {
    this.config = config;
    this.componentRegistry = new Map();
  }

  async init() {
    console.log('🚀 Initializing Lit-SSR builder...');

    // Create output directory
    await mkdir(this.config.outputDir, { recursive: true });

    // Load component definitions
    await this.loadComponents();

    console.log(`✅ Loaded ${this.componentRegistry.size} components`);
  }

  async loadComponents() {
    for (const componentName of this.config.components) {
      try {
        // Dynamically import component
        const componentPath = join(this.config.componentsDir, `${componentName}.js`);
        const module = await import(componentPath);

        // Register component
        this.componentRegistry.set(componentName, module);

        console.log(`📦 Loaded component: ${componentName}`);
      } catch (error) {
        console.warn(`⚠️  Failed to load component ${componentName}:`, error.message);
      }
    }
  }

  async renderTemplate(templatePath, data = {}) {
    try {
      const templateContent = await readFile(templatePath, 'utf-8');

      // Parse template and extract component usage
      const componentMatches = templateContent.match(/<(apollo-[^>\s]+|playground-[^>\s]+)[^>]*>/g) || [];

      if (componentMatches.length === 0) {
        return templateContent; // No components to render
      }

      // Create a virtual module for SSR
      const virtualModule = this.createVirtualModule(templateContent, componentMatches);

      // Render with Lit-SSR
      const renderResult = render(virtualModule, data, this.config.ssrOptions);
      const html = await collectResult(renderResult);

      return html;
    } catch (error) {
      console.error(`❌ Failed to render template ${templatePath}:`, error);
      return null;
    }
  }

  createVirtualModule(template, componentMatches) {
    // Extract unique component tags
    const uniqueComponents = [...new Set(
      componentMatches.map(match => match.match(/<([^>\s]+)/)[1])
    )];

    // Generate imports
    const imports = uniqueComponents
      .filter(tag => this.componentRegistry.has(tag))
      .map(tag => `import '${this.config.componentsDir}/${tag}.js';`)
      .join('\n');

    // Create template literal with proper escaping
    const templateLiteral = template
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');

    return `
      ${imports}
      import { html } from 'lit';

      export function renderTemplate(data = {}) {
        return html\`${templateLiteral}\`;
      }
    `;
  }

  async processContentFiles() {
    console.log('📄 Processing content files...');

    const contentFiles = await this.findContentFiles(this.config.inputDir);

    for (const file of contentFiles) {
      await this.processContentFile(file);
    }

    console.log(`✅ Processed ${contentFiles.length} content files`);
  }

  async findContentFiles(dir) {
    const files = [];

    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await this.findContentFiles(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && extname(entry.name) === '.md') {
        files.push(fullPath);
      }
    }

    return files;
  }

  async processContentFile(filePath) {
    try {
      const content = await readFile(filePath, 'utf-8');

      // Extract frontmatter and content
      const { frontmatter, body } = this.parseFrontmatter(content);

      // Check for components in content
      const hasComponents = /(<apollo-|<playground-)/i.test(body);

      if (!hasComponents) {
        return; // Skip files without components
      }

      // Generate SSR version
      const ssrContent = await this.renderTemplate(filePath, frontmatter);

      if (ssrContent) {
        // Save SSR version
        const relativePath = relative(this.config.inputDir, filePath);
        const outputPath = join(this.config.outputDir, relativePath.replace('.md', '.html'));

        await mkdir(dirname(outputPath), { recursive: true });
        await writeFile(outputPath, ssrContent);

        console.log(`🔄 SSR processed: ${relativePath}`);
      }
    } catch (error) {
      console.error(`❌ Failed to process ${filePath}:`, error);
    }
  }

  parseFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      return { frontmatter: {}, body: content };
    }

    try {
      // Simple YAML-like parsing (Hugo style)
      const frontmatterText = match[1];
      const frontmatter = {};

      frontmatterText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();
          frontmatter[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
        }
      });

      return {
        frontmatter,
        body: match[2]
      };
    } catch (error) {
      console.warn(`⚠️  Failed to parse frontmatter in content, using defaults`);
      return { frontmatter: {}, body: match[2] || content };
    }
  }

  async generateImportMap() {
    console.log('🗺️  Generating import map...');

    const importMap = {
      imports: {
        // Apollo Elements core
        '@apollo-elements/core/': '/modules/@apollo-elements/core/',
        '@apollo-elements/components/': '/modules/@apollo-elements/components/',

        // Apollo Client
        '@apollo/client/core': '/modules/@apollo/client/core.js',
        '@apollo/client/utilities': '/modules/@apollo/client/utilities.js',

        // Lit
        'lit': '/modules/lit/index.js',
        'lit/': '/modules/lit/',
        '@lit/reactive-element': '/modules/@lit/reactive-element/reactive-element.js',

        // Component-specific imports
        ...Object.fromEntries(
          this.config.components.map(comp => [
            `@apollo-elements/components/${comp}`,
            `/modules/@apollo-elements/components/${comp}.js`
          ])
        )
      }
    };

    const importMapPath = join(this.config.outputDir, 'import-map.json');
    await writeFile(importMapPath, JSON.stringify(importMap, null, 2));

    console.log('✅ Import map generated');
  }

  async build() {
    try {
      await this.init();
      await this.processContentFiles();
      await this.generateImportMap();

      console.log('🎉 Lit-SSR build completed successfully!');
    } catch (error) {
      console.error('❌ Lit-SSR build failed:', error);
      process.exit(1);
    }
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const builder = new LitSSRBuilder(config);
  await builder.build();
}