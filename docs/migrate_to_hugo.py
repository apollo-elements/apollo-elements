#!/usr/bin/env python3
"""
Migration script to convert Rocket documentation to Hugo format.
"""

import os
import re
import shutil
from pathlib import Path
from typing import Dict, Tuple, Optional

# Configuration
DOCS_DIR = Path("/home/bennyp/Developer/apollo-elements/docs")
GUIDES_SRC = DOCS_DIR / "guides"
API_SRC = DOCS_DIR / "api"
CONTENT_DST = DOCS_DIR / "content"


def extract_frontmatter_and_title(content: str) -> Tuple[Dict[str, str], str, str]:
    """
    Extract YAML frontmatter and title with weight from Rocket format.
    Returns (frontmatter_dict, title, weight, remaining_content)
    """
    frontmatter = {}
    lines = content.split('\n')

    # Check if file starts with YAML frontmatter
    if lines[0].strip() == '---':
        end_idx = 1
        while end_idx < len(lines) and lines[end_idx].strip() != '---':
            line = lines[end_idx].strip()
            if ':' in line:
                key, value = line.split(':', 1)
                frontmatter[key.strip()] = value.strip().strip('"')
            end_idx += 1

        # Get content after frontmatter
        content_start = end_idx + 1
        remaining_lines = lines[content_start:]
    else:
        remaining_lines = lines

    # Find title line (# Title || weight)
    title = ""
    weight = ""
    content_lines = []

    for i, line in enumerate(remaining_lines):
        title_match = re.match(r'^#\s+(.+?)\s+\|\|\s+(\d+)\s*$', line)
        if title_match and not title:
            # Extract breadcrumb-style title
            full_title = title_match.group(1)
            weight = title_match.group(2)

            # Split by >> and take the last part as the actual title
            title_parts = [p.strip() for p in full_title.split('>>')]
            title = title_parts[-1]

            # Skip this line in output
            continue

        content_lines.append(line)

    remaining_content = '\n'.join(content_lines).lstrip('\n')

    return frontmatter, title, weight, remaining_content


def convert_code_tabs(content: str) -> str:
    """
    Convert <code-tabs> syntax to Hugo shortcode format.
    """
    # Replace code-tabs opening tag
    content = re.sub(
        r'<code-tabs\s+collection="([^"]+)"\s+default-tab="([^"]+)"(?:\s+align="[^"]+")?>',
        r'{{< code-tabs collection="\1" default="\2" >}}',
        content
    )

    # Replace closing tag
    content = content.replace('</code-tabs>', '{{< /code-tabs >}}')

    return content


def convert_includes(content: str) -> str:
    """
    Convert {% include file %} to Hugo static include or comment.
    """
    # For SVG includes, convert to a comment noting manual intervention needed
    content = re.sub(
        r'{%\s*include\s+([^|]+?)\s*\|\s*safe\s*%}',
        r'<!-- TODO: Include SVG file \1 - needs Hugo shortcode or static asset -->',
        content
    )

    content = re.sub(
        r'{%\s*include\s+([^%]+?)\s*%}',
        r'<!-- TODO: Include file \1 - needs Hugo shortcode or static asset -->',
        content
    )

    return content


def convert_icon_filter(content: str) -> str:
    """
    Convert {{ 'icon-name' | icon }} to a comment or shortcode.
    """
    content = re.sub(
        r"{{\s*'([^']+)'\s*\|\s*icon\s*}}",
        r'<!-- TODO: Icon "\1" - needs Hugo shortcode -->',
        content
    )

    return content


def convert_raw_tags(content: str) -> str:
    """
    Remove {%raw%} and {%endraw%} tags as they're Rocket/Liquid specific.
    """
    content = content.replace('{%raw%}', '')
    content = content.replace('{%endraw%}', '')

    return content


def remove_rocket_styles(content: str) -> str:
    """
    Remove Rocket-specific style tags marked with data-helmet.
    Convert to Hugo-compatible comment for later review.
    """
    # Match and convert <style data-helmet> blocks
    def replace_style(match):
        style_content = match.group(1)
        return f'<!-- TODO: Review and move to Hugo CSS -->\n<!-- STYLE BLOCK:\n{style_content}\n-->'

    content = re.sub(
        r'<style\s+data-helm[ae]tt?[^>]*>(.*?)</style>',
        replace_style,
        content,
        flags=re.DOTALL
    )

    return content


def create_hugo_frontmatter(original_fm: Dict[str, str], title: str, weight: str) -> str:
    """
    Create Hugo-compatible YAML frontmatter.
    """
    hugo_fm = ["---"]

    # Add title
    if title:
        hugo_fm.append(f'title: "{title}"')

    # Add weight if available
    if weight:
        hugo_fm.append(f'weight: {weight}')

    # Add description from original frontmatter
    if 'description' in original_fm:
        desc = original_fm['description'].strip('"\'')
        hugo_fm.append(f'description: "{desc}"')

    # Add layout if it existed
    if 'layout' in original_fm:
        hugo_fm.append(f'layout: "{original_fm["layout"]}"')

    # Add package and module for API docs
    if 'package' in original_fm:
        hugo_fm.append(f'package: "{original_fm["package"]}"')
    if 'module' in original_fm:
        hugo_fm.append(f'module: "{original_fm["module"]}"')

    hugo_fm.append("---")

    return '\n'.join(hugo_fm)


def convert_file(src_path: Path, dst_path: Path) -> bool:
    """
    Convert a single markdown file from Rocket to Hugo format.
    Returns True if successful, False otherwise.
    """
    try:
        # Read source file
        with open(src_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract frontmatter and title
        original_fm, title, weight, remaining_content = extract_frontmatter_and_title(content)

        # Apply conversions
        converted_content = remaining_content
        converted_content = convert_code_tabs(converted_content)
        converted_content = convert_includes(converted_content)
        converted_content = convert_icon_filter(converted_content)
        converted_content = convert_raw_tags(converted_content)
        converted_content = remove_rocket_styles(converted_content)

        # Create Hugo frontmatter
        hugo_frontmatter = create_hugo_frontmatter(original_fm, title, weight)

        # Combine frontmatter and content
        final_content = f"{hugo_frontmatter}\n\n{converted_content}"

        # Ensure destination directory exists
        dst_path.parent.mkdir(parents=True, exist_ok=True)

        # Write converted file
        with open(dst_path, 'w', encoding='utf-8') as f:
            f.write(final_content)

        return True

    except Exception as e:
        print(f"Error converting {src_path}: {e}")
        return False


def migrate_directory(src_dir: Path, dst_dir: Path, section_name: str = "") -> Tuple[int, int]:
    """
    Migrate all markdown files from src_dir to dst_dir.
    Returns (success_count, total_count)
    """
    success_count = 0
    total_count = 0

    for root, dirs, files in os.walk(src_dir):
        root_path = Path(root)
        rel_path = root_path.relative_to(src_dir)

        for file in files:
            if file.endswith('.md'):
                total_count += 1
                src_file = root_path / file

                # Convert index.md to _index.md for Hugo
                dst_file_name = '_index.md' if file == 'index.md' else file
                dst_file = dst_dir / rel_path / dst_file_name

                if convert_file(src_file, dst_file):
                    success_count += 1
                    print(f"✓ Converted: {src_file.relative_to(DOCS_DIR)} -> {dst_file.relative_to(DOCS_DIR)}")
                else:
                    print(f"✗ Failed: {src_file.relative_to(DOCS_DIR)}")

    return success_count, total_count


def copy_static_assets(src_dir: Path, dst_dir: Path):
    """
    Copy SVG and CSS files to appropriate locations.
    """
    assets_copied = 0

    for root, dirs, files in os.walk(src_dir):
        root_path = Path(root)
        rel_path = root_path.relative_to(src_dir)

        for file in files:
            if file.endswith(('.svg', '.css')):
                src_file = root_path / file

                # Copy to static directory instead of content
                static_dir = DOCS_DIR / 'static' / 'assets'
                dst_file = static_dir / rel_path / file
                dst_file.parent.mkdir(parents=True, exist_ok=True)

                shutil.copy2(src_file, dst_file)
                assets_copied += 1
                print(f"✓ Copied asset: {src_file.relative_to(DOCS_DIR)} -> {dst_file.relative_to(DOCS_DIR)}")

    return assets_copied


def main():
    """Main migration function."""
    print("=" * 80)
    print("Apollo Elements Documentation Migration: Rocket → Hugo")
    print("=" * 80)
    print()

    # Migrate guides
    print("Migrating /guides/ directory...")
    guides_dst = CONTENT_DST / 'guides'
    guides_success, guides_total = migrate_directory(GUIDES_SRC, guides_dst, "guides")
    print(f"Guides: {guides_success}/{guides_total} files converted successfully\n")

    # Migrate API docs
    print("Migrating /api/ directory...")
    api_dst = CONTENT_DST / 'api'
    api_success, api_total = migrate_directory(API_SRC, api_dst, "api")
    print(f"API: {api_success}/{api_total} files converted successfully\n")

    # Copy static assets
    print("Copying static assets (SVG, CSS)...")
    guides_assets = copy_static_assets(GUIDES_SRC, guides_dst)
    api_assets = copy_static_assets(API_SRC, api_dst)
    print(f"Assets: {guides_assets + api_assets} files copied\n")

    # Summary
    print("=" * 80)
    print("Migration Summary")
    print("=" * 80)
    print(f"Total files processed: {guides_total + api_total}")
    print(f"Successfully converted: {guides_success + api_success}")
    print(f"Failed conversions: {(guides_total + api_total) - (guides_success + api_success)}")
    print(f"Static assets copied: {guides_assets + api_assets}")
    print()
    print("Next steps:")
    print("1. Review files with TODO comments for manual intervention")
    print("2. Create Hugo shortcodes for code-tabs, icons, and includes")
    print("3. Move CSS from comments to Hugo's assets/CSS structure")
    print("4. Update SVG references to use Hugo's static asset path")
    print("5. Test the migrated content with Hugo")


if __name__ == '__main__':
    main()
