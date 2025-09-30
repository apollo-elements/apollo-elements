# Apollo Elements Hugo Migration - Completion Checklist

This checklist guides you through the final steps to complete the Rocket → Hugo migration.

---

## Migration Status: 🟢 STRUCTURALLY COMPLETE

**Files Migrated:** 92/92 (100%)
**Static Assets:** 7/7 (100%)
**Next Phase:** Implementation & Testing

---

## Phase 1: Core Setup ✅ COMPLETE

- [x] Migrate all markdown files (92 files)
- [x] Convert frontmatter to Hugo format
- [x] Copy static assets to `/static/assets/`
- [x] Convert directory structure (use `_index.md`)
- [x] Convert code-tabs to Hugo shortcode format
- [x] Mark SVG includes for manual intervention
- [x] Extract and comment CSS style blocks

---

## Phase 2: Hugo Configuration ⏳ PENDING

### 2.1 Basic Configuration

- [ ] Create or update `config.toml` / `config.yaml`
  ```toml
  baseURL = "https://apolloelements.dev/"
  languageCode = "en-us"
  title = "Apollo Elements"
  theme = "your-theme"

  [markup]
    [markup.goldmark]
      [markup.goldmark.renderer]
        unsafe = true  # Allow raw HTML

  [params]
    description = "Build high-performance GraphQL web apps"
  ```

- [ ] Set up menu navigation
  ```toml
  [[menu.main]]
    name = "Guides"
    url = "/guides/"
    weight = 10

  [[menu.main]]
    name = "API"
    url = "/api/"
    weight = 20
  ```

### 2.2 Theme Selection/Configuration

- [ ] Choose a Hugo theme or create custom theme
- [ ] Install theme: `git submodule add <theme-repo> themes/<theme-name>`
- [ ] Configure theme in `config.toml`: `theme = "theme-name"`

**Recommended themes for documentation:**
- [Docsy](https://www.docsy.dev/)
- [Hugo Book](https://github.com/alex-shpak/hugo-book)
- [Geekdoc](https://geekdocs.de/)
- [Relearn](https://mcshelby.github.io/hugo-theme-relearn/)

---

## Phase 3: Implement Shortcodes ⏳ PENDING

### 3.1 Code Tabs Shortcode (Priority: HIGH)

**Count:** 101 instances

- [ ] Create `/layouts/shortcodes/code-tabs.html`
- [ ] Copy implementation from `HUGO_SHORTCODES_GUIDE.md`
- [ ] Test with sample content
- [ ] Verify all 101 instances render correctly

**Test File:** `/content/guides/_index.md` (contains code-tabs)

### 3.2 SVG Include Shortcode (Priority: MEDIUM)

**Count:** 2 instances

- [ ] Create `/layouts/shortcodes/svg.html`
- [ ] Or create `/layouts/shortcodes/svg-inline.html` for inline SVG
- [ ] Update TODO comments in:
  - `/content/guides/getting-started/_index.md` (cycle.svg)
  - (1 more file - search for SVG TODOs)

### 3.3 Icon Shortcode (Priority: MEDIUM)

**Count:** 2 instances

- [ ] Create `/layouts/shortcodes/icon.html`
- [ ] Create icon SVG partials in `/layouts/partials/icons/`
  - `moon-landing.svg`
  - `space-capsule.svg`
- [ ] Update TODO comments in:
  - `/content/guides/_index.md`
  - `/content/guides/usage/_index.md`

### 3.4 Optional Helper Shortcodes

- [ ] Create `/layouts/shortcodes/figure.html` (for images with captions)
- [ ] Create `/layouts/shortcodes/alert.html` (for callouts/notes)
- [ ] Create `/layouts/shortcodes/install.html` (for package installation)

---

## Phase 4: Handle Static Assets ⏳ PENDING

### 4.1 CSS Styles

**Count:** 13 style blocks

- [ ] Create `/assets/scss/main.scss`
- [ ] Extract CSS from TODO comments and organize:

  ```
  /assets/scss/
  ├── main.scss
  ├── _variables.scss
  ├── components/
  │   ├── _code-tabs.scss
  │   ├── _diagrams.scss
  │   └── _icons.scss
  └── pages/
      ├── _getting-started.scss
      └── _usage.scss
  ```

- [ ] Files with CSS to extract:
  - `/content/guides/getting-started/_index.md` (cycle diagram styles)
  - `/content/guides/usage/_index.md` (space-capsule icon, figure styles)
  - Additional 11 files (search for "TODO: Review and move to Hugo CSS")

- [ ] Set up SCSS processing in Hugo
- [ ] Remove CSS TODO comments after extraction

### 4.2 SVG Assets

**Location:** `/static/assets/`

Files already copied:
- [x] `/static/assets/getting-started/cycle.svg`
- [x] `/static/assets/usage/local-state/mermaid-local-state.svg`
- [x] `/static/assets/core/interfaces/mermaid-inheritance.svg`

- [ ] Verify all SVG files are accessible
- [ ] Create icon SVG files if using icon shortcode

### 4.3 CSS Assets

Files already copied:
- [x] `/static/assets/usage/mutations/_assets/add-user.css`
- [x] `/static/assets/libraries/_assets/SpacexLaunches.css`
- [x] `/static/assets/libraries/mixins/controller-host-mixin/_assets/color-picker.css`
- [x] `/static/assets/libraries/mixins/controller-host-mixin/_assets/style.css`

- [ ] Reference these in appropriate pages or import into main SCSS

---

## Phase 5: Data Files ⏳ PENDING

### 5.1 Package Managers Collection

- [ ] Create `/data/packageManagers.yaml`
  ```yaml
  - id: npm
    name: npm
  - id: yarn
    name: Yarn
  - id: pnpm
    name: pnpm
  ```

### 5.2 Libraries Collection

- [ ] Create `/data/libraries.yaml`
  ```yaml
  - id: lit
    name: Lit
  - id: fast
    name: FAST
  - id: haunted
    name: Haunted
  - id: atomico
    name: Atomico
  - id: hybrids
    name: Hybrids
  - id: mixins
    name: Mixins
  - id: html
    name: HTML
  ```

---

## Phase 6: Testing & Validation ⏳ PENDING

### 6.1 Build Test

- [ ] Run Hugo build: `hugo`
- [ ] Check for errors in output
- [ ] Verify `/public/` directory created successfully
- [ ] Check file count: should have ~92+ HTML files

### 6.2 Dev Server Test

- [ ] Start dev server: `hugo server -D`
- [ ] Visit http://localhost:1313
- [ ] Navigate through all sections:
  - [ ] Home page
  - [ ] Guides section
  - [ ] Getting Started subsection
  - [ ] Usage subsection
  - [ ] Cool Tricks subsection
  - [ ] API section
  - [ ] Components subsection
  - [ ] Core subsection
  - [ ] Libraries subsection

### 6.3 Visual Validation

- [ ] Verify code-tabs render and switch correctly
- [ ] Check SVG diagrams display properly
- [ ] Verify icons render
- [ ] Check all code blocks have syntax highlighting
- [ ] Verify navigation menu works
- [ ] Check responsive design on mobile

### 6.4 Link Validation

- [ ] Install htmltest: `go install github.com/wjdp/htmltest@latest`
- [ ] Build site: `hugo --minify`
- [ ] Run link checker: `htmltest`
- [ ] Fix any broken internal links
- [ ] Fix any broken external links (optional)

### 6.5 Content Validation

- [ ] Search for remaining TODO comments: `grep -r "TODO:" content/`
- [ ] Verify all resolved
- [ ] Check frontmatter in random files
- [ ] Verify weights are correct for ordering

---

## Phase 7: Cleanup & Optimization ⏳ PENDING

### 7.1 Remove Old Files

After confirming Hugo site works:

- [ ] Archive original Rocket files (keep as backup)
- [ ] Remove Rocket-specific configuration files
- [ ] Update `.gitignore` for Hugo (`/public/`, `/resources/`)

### 7.2 Optimization

- [ ] Minify HTML: add to config `[minify]` section
- [ ] Optimize images if needed
- [ ] Set up asset fingerprinting
- [ ] Configure caching headers

### 7.3 Documentation

- [ ] Update README.md with Hugo instructions
- [ ] Document custom shortcodes
- [ ] Create contribution guide for content
- [ ] Document build and deployment process

---

## Phase 8: Deployment ⏳ PENDING

### 8.1 Choose Hosting

Options:
- [ ] Netlify (recommended for Hugo)
- [ ] Vercel
- [ ] GitHub Pages
- [ ] Cloudflare Pages
- [ ] AWS S3 + CloudFront

### 8.2 Set Up CI/CD

Example for Netlify (`netlify.toml`):

```toml
[build]
  publish = "public"
  command = "hugo --minify"

[build.environment]
  HUGO_VERSION = "0.120.0"
  HUGO_ENV = "production"

[context.production.environment]
  HUGO_ENV = "production"

[context.deploy-preview]
  command = "hugo --buildFuture --buildDrafts"
```

- [ ] Create deployment configuration
- [ ] Set up automatic deployments
- [ ] Test preview deployments
- [ ] Verify production build

### 8.3 DNS & Domain

- [ ] Configure custom domain (if applicable)
- [ ] Set up SSL certificate
- [ ] Test HTTPS access
- [ ] Set up redirects from old URLs (if needed)

---

## Quick Commands Reference

```bash
# Development
hugo server -D          # Start dev server with drafts
hugo server --bind=0.0.0.0 --baseURL=http://192.168.1.x  # LAN access

# Building
hugo                    # Build site
hugo --minify          # Build and minify
hugo --gc              # Build and run garbage collection

# Testing
hugo list drafts       # List draft pages
hugo list future       # List future-dated pages
hugo list expired      # List expired pages

# Content
hugo new content/guides/new-guide.md  # Create new content

# Troubleshooting
hugo --verbose         # Verbose output
hugo --debug          # Debug mode
hugo --buildDrafts --buildFuture --buildExpired  # Build all
```

---

## Troubleshooting Common Issues

### Issue: Code tabs not switching

**Solution:** Ensure JavaScript is enabled and check browser console for errors. Verify code-tabs shortcode HTML structure.

### Issue: SVG not displaying

**Solution:**
1. Check SVG file exists in `/static/assets/`
2. Verify path in shortcode is correct
3. Try inline SVG instead of `<img>` tag

### Issue: Styles not applying

**Solution:**
1. Verify SCSS is being processed (check `config.toml`)
2. Check CSS is included in head template
3. Inspect browser dev tools for loaded stylesheets

### Issue: 404 on pages

**Solution:**
1. Check `_index.md` exists for sections
2. Verify frontmatter is valid YAML
3. Check file names follow Hugo conventions
4. Ensure no special characters in filenames

### Issue: Menu not showing

**Solution:**
1. Check menu configuration in `config.toml`
2. Verify frontmatter has correct `weight` values
3. Check theme's menu template exists

---

## Success Criteria

Migration is complete when:

- [x] All 92 markdown files converted
- [ ] Hugo builds without errors
- [ ] All pages render correctly
- [ ] Code tabs work on all pages
- [ ] SVGs and images display
- [ ] Navigation menu works
- [ ] All links are valid
- [ ] No TODO comments remain in content
- [ ] CSS styles properly applied
- [ ] Site is deployed and accessible

---

## Resources

### Documentation
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hugo Shortcodes](https://gohugo.io/content-management/shortcodes/)
- [Hugo Templates](https://gohugo.io/templates/introduction/)

### Tools
- [Hugo Theme Directory](https://themes.gohugo.io/)
- [htmltest](https://github.com/wjdp/htmltest) - Link checker
- [Hugo Mod Tool](https://gohugo.io/hugo-modules/)

### Migration Files
- `MIGRATION_SUMMARY.md` - Detailed migration report
- `HUGO_SHORTCODES_GUIDE.md` - Shortcode implementations
- `migrate_to_hugo.py` - Migration script

---

## Timeline Estimate

- **Phase 2:** Hugo Configuration - 1-2 hours
- **Phase 3:** Implement Shortcodes - 2-3 hours
- **Phase 4:** Static Assets - 1-2 hours
- **Phase 5:** Data Files - 30 minutes
- **Phase 6:** Testing - 2-3 hours
- **Phase 7:** Cleanup - 1 hour
- **Phase 8:** Deployment - 1-2 hours

**Total Estimated Time:** 9-14 hours

---

**Last Updated:** 2025-09-30
**Migration Tool:** `migrate_to_hugo.py`
**Hugo Version Required:** 0.110.0 or higher
