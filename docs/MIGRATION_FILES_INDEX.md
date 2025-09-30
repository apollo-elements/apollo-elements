# Migration Files Index

This document provides a complete index of all files created and migrated during the Rocket → Hugo migration.

## Generated Documentation Files

Located in: `/home/bennyp/Developer/apollo-elements/docs/`

| File | Description | Lines | Purpose |
|------|-------------|-------|---------|
| `MIGRATION_SUMMARY.md` | Comprehensive migration report | 447 | Detailed overview of migration process, statistics, and changes |
| `HUGO_SHORTCODES_GUIDE.md` | Shortcode implementations | 541 | Ready-to-use Hugo shortcode code with examples |
| `MIGRATION_CHECKLIST.md` | Step-by-step completion guide | 438 | Phase-by-phase checklist for finishing migration |
| `MIGRATION_FILES_INDEX.md` | This file | - | Index of all migrated files |
| `migrate_to_hugo.py` | Migration automation script | 246 | Python script used to perform migration |

## Migrated Content Files

### Guides Section (26 files)

```
/content/guides/
├── _index.md
├── cool-tricks/
│   ├── _index.md
│   ├── async-client.md
│   ├── code-splitting.md
│   ├── inline-graphql-scripts.md
│   └── validating-variables.md
├── getting-started/
│   ├── _index.md
│   ├── building-for-production.md
│   ├── buildless-development.md
│   ├── codegen/
│   │   ├── _index.md
│   │   └── typed-document-node.md
│   └── migrating/
│       ├── _index.md
│       └── apollo-client-2.md
└── usage/
    ├── _index.md
    ├── apollo-client/
    │   ├── _index.md
    │   └── html.md
    ├── local-state/
    │   ├── _index.md
    │   └── advanced-local-state.md
    ├── mutations/
    │   ├── _index.md
    │   ├── cache-management.md
    │   ├── composition.md
    │   └── html.md
    ├── queries/
    │   ├── _index.md
    │   └── html.md
    └── subscriptions/
        ├── _index.md
        └── html.md
```

### API Documentation (66 files)

```
/content/api/
├── _index.md
├── components/
│   ├── _index.md
│   ├── apollo-client/
│   │   └── _index.md
│   ├── apollo-mutation/
│   │   └── _index.md
│   ├── apollo-query/
│   │   └── _index.md
│   └── apollo-subscription/
│       └── _index.md
├── core/
│   ├── _index.md
│   ├── controllers/
│   │   ├── _index.md
│   │   ├── controller.md
│   │   ├── mutation.md
│   │   ├── query.md
│   │   ├── reactive-variable.md
│   │   └── subscription.md
│   ├── helpers/
│   │   ├── _index.md
│   │   ├── decorators.md
│   │   ├── events.md
│   │   └── lib.md
│   └── interfaces/
│       ├── _index.md
│       ├── element.md
│       ├── mutation/
│       │   ├── _index.md
│       │   └── lifecycle.md
│       ├── query/
│       │   ├── _index.md
│       │   └── lifecycle.md
│       └── subscription/
│           ├── _index.md
│           └── lifecycle.md
├── create/
│   ├── _index.md
│   ├── app.md
│   └── component.md
└── libraries/
    ├── _index.md
    ├── atomico/
    │   ├── _index.md
    │   ├── useMutation.md
    │   ├── useQuery.md
    │   └── useSubscription.md
    ├── fast/
    │   ├── _index.md
    │   ├── apollo-mutation.md
    │   ├── apollo-query.md
    │   └── apollo-subscription.md
    ├── gluon/
    │   ├── _index.md
    │   ├── apollo-mutation.md
    │   ├── apollo-query.md
    │   └── apollo-subscription.md
    ├── haunted/
    │   ├── _index.md
    │   ├── useMutation.md
    │   ├── useQuery.md
    │   └── useSubscription.md
    ├── hybrids/
    │   ├── _index.md
    │   ├── mutation.md
    │   ├── query.md
    │   └── subscription.md
    ├── lit-apollo/
    │   ├── _index.md
    │   ├── apollo-mutation.md
    │   ├── apollo-query.md
    │   └── apollo-subscription.md
    ├── mixins/
    │   ├── _index.md
    │   ├── apollo-client-mixin.md
    │   ├── apollo-mutation-mixin.md
    │   ├── apollo-query-mixin.md
    │   ├── apollo-subscription-mixin.md
    │   ├── controller-host-mixin/
    │   │   └── _index.md
    │   ├── graphql-script-child-mixin.md
    │   ├── type-policies-mixin.md
    │   └── validate-variables-mixin.md
    └── polymer/
        ├── _index.md
        ├── apollo-mutation.md
        ├── apollo-query.md
        └── apollo-subscription.md
```

## Static Assets (7 files)

```
/static/assets/
├── core/
│   └── interfaces/
│       └── mermaid-inheritance.svg
├── getting-started/
│   └── cycle.svg
├── libraries/
│   ├── _assets/
│   │   └── SpacexLaunches.css
│   └── mixins/
│       └── controller-host-mixin/
│           └── _assets/
│               ├── color-picker.css
│               └── style.css
└── usage/
    ├── local-state/
    │   └── mermaid-local-state.svg
    └── mutations/
        └── _assets/
            └── add-user.css
```

## File Statistics by Type

| File Type | Count | Location |
|-----------|-------|----------|
| Markdown Files | 92 | `/content/` |
| Index Pages (_index.md) | 36 | `/content/` |
| SVG Diagrams | 3 | `/static/assets/` |
| CSS Stylesheets | 4 | `/static/assets/` |
| Documentation Files | 4 | `/docs/` root |
| Migration Script | 1 | `/docs/` root |
| **Total** | **104** | - |

## Priority Files for Review

### High Priority (Require Immediate Attention)

1. `/content/guides/_index.md`
   - Contains code-tabs shortcode
   - Contains icon reference TODO

2. `/content/guides/getting-started/_index.md`
   - Contains SVG include TODO
   - Contains CSS style block TODO
   - High-traffic page

3. `/content/guides/usage/_index.md`
   - Contains multiple code-tabs
   - Contains CSS style blocks
   - Contains icon reference TODO

4. `/content/api/components/_index.md`
   - Entry point for API documentation
   - Contains code-tabs shortcode

### Medium Priority (Important but Less Urgent)

5. All files in `/content/guides/usage/mutations/`
   - Contains multiple code-tabs instances
   - Contains CSS assets

6. All files in `/content/guides/usage/queries/`
   - Contains multiple code-tabs instances

7. All files in `/content/api/libraries/`
   - API reference documentation
   - Contains code examples

### Low Priority (Minor Updates Needed)

8. Files with isolated CSS TODO comments
9. Files with minimal template conversions
10. Leaf node documentation pages

## Search Patterns for Remaining Work

Use these grep commands to find remaining TODO items:

```bash
# Find all TODO comments
grep -r "<!-- TODO:" content/

# Find SVG includes
grep -r "TODO: Include SVG" content/

# Find icon references
grep -r "TODO: Icon" content/

# Find CSS style blocks
grep -r "TODO: Review and move to Hugo CSS" content/

# Find code-tabs usage
grep -r "{{< code-tabs" content/ | wc -l

# Count remaining TODOs
grep -r "<!-- TODO:" content/ | wc -l
```

## Validation Commands

```bash
# Count migrated files
find content/ -name "*.md" | wc -l

# Count index files
find content/ -name "_index.md" | wc -l

# List all static assets
find static/assets/ -type f

# Check for Rocket-specific syntax
grep -r "templateEngineOverride" content/
grep -r "{%raw%}" content/
grep -r "<code-tabs" content/

# Verify Hugo shortcodes
grep -r "{{<" content/ | head -20
```

## Quick Reference

### Directory Mapping

| Rocket Location | Hugo Location | Status |
|----------------|---------------|--------|
| `/guides/` | `/content/guides/` | ✅ Migrated |
| `/api/` | `/content/api/` | ✅ Migrated |
| `/guides/getting-started/cycle.svg` | `/static/assets/getting-started/cycle.svg` | ✅ Copied |
| N/A | `/layouts/shortcodes/` | ⏳ Needs Creation |
| N/A | `/data/` | ⏳ Needs Creation |

### Key Changes Per File

Every migrated markdown file has:

1. ✅ Hugo-compatible YAML frontmatter
2. ✅ Title extracted from Rocket `# Title || weight` format
3. ✅ Weight moved to frontmatter
4. ✅ Index files renamed to `_index.md`
5. ✅ Code-tabs converted to Hugo shortcode syntax
6. ⚠️ TODO comments for manual intervention items

## Related Documentation

- See `MIGRATION_SUMMARY.md` for detailed migration analysis
- See `HUGO_SHORTCODES_GUIDE.md` for shortcode implementations
- See `MIGRATION_CHECKLIST.md` for completion steps
- See `migrate_to_hugo.py` for migration script source

---

**Last Updated:** 2025-09-30
**Total Files Indexed:** 104
**Migration Status:** ✅ Structurally Complete
