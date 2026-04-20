#!/usr/bin/env python3
"""
List available LaTeX templates.

Usage:
    python list-templates.py [--detail] [--category CATEGORY]
"""

import argparse
import sys
import yaml
from pathlib import Path

# Paths
SCRIPT_DIR = Path(__file__).parent
REPO_ROOT = SCRIPT_DIR.parent.parent.parent.parent
TEMPLATES_DIR = REPO_ROOT / "documents" / "latex" / "templates"
REGISTRY_FILE = TEMPLATES_DIR / "registry.yml"


def load_registry():
    """Load the template registry."""
    if not REGISTRY_FILE.exists():
        print(f"Error: Registry file not found: {REGISTRY_FILE}")
        sys.exit(1)

    with open(REGISTRY_FILE) as f:
        return yaml.safe_load(f)


def list_templates(detail: bool = False, category: str = None):
    """List available templates."""
    registry = load_registry()
    templates = registry.get("templates", {})
    categories = registry.get("categories", {})

    # Filter by category if specified
    if category:
        templates = {
            k: v for k, v in templates.items()
            if v.get("category") == category
        }
        if not templates:
            print(f"No templates found for category: {category}")
            print(f"Available categories: {', '.join(categories.keys())}")
            return

    if detail:
        print("=" * 70)
        print("AVAILABLE LATEX TEMPLATES")
        print("=" * 70)
        print()

        # Group by category
        by_category = {}
        for name, config in templates.items():
            cat = config.get("category", "other")
            if cat not in by_category:
                by_category[cat] = []
            by_category[cat].append((name, config))

        for cat_name, cat_templates in by_category.items():
            cat_info = categories.get(cat_name, {"name": cat_name.title()})
            print(f"### {cat_info.get('name', cat_name.title())}")
            print(f"    {cat_info.get('description', '')}")
            print()

            for name, config in cat_templates:
                print(f"  {name}")
                print(f"    Name: {config.get('name', name)}")
                print(f"    Description: {config.get('description', 'No description')}")
                print(f"    Pages: {config.get('estimated_pages', 'unknown')}")
                print(f"    Compiler: {config.get('compiler', 'pdflatex')}")

                packages = config.get("packages", [])
                if packages:
                    print(f"    Packages: {', '.join(packages)}")

                sections = config.get("sections", [])
                if sections:
                    print(f"    Sections: {len(sections)} ({', '.join(sections[:3])}{'...' if len(sections) > 3 else ''})")

                print()
    else:
        # Simple list
        print("Available templates:")
        print()

        # Calculate column widths
        max_name = max(len(name) for name in templates.keys())
        max_cat = max(len(t.get("category", "other")) for t in templates.values())

        # Header
        print(f"  {'NAME':<{max_name}}  {'CATEGORY':<{max_cat}}  PAGES       DESCRIPTION")
        print(f"  {'-' * max_name}  {'-' * max_cat}  ----------  -----------")

        for name, config in templates.items():
            cat = config.get("category", "other")
            pages = config.get("estimated_pages", "?")
            desc = config.get("description", "No description")
            # Truncate description
            if len(desc) > 40:
                desc = desc[:37] + "..."

            print(f"  {name:<{max_name}}  {cat:<{max_cat}}  {pages:<10}  {desc}")

        print()
        print(f"Total: {len(templates)} templates")
        print()
        print("Use --detail for more information")
        print("Use --category <name> to filter (categories: " + ", ".join(categories.keys()) + ")")


def main():
    parser = argparse.ArgumentParser(
        description="List available LaTeX templates"
    )
    parser.add_argument("--detail", "-d", action="store_true",
                       help="Show detailed template information")
    parser.add_argument("--category", "-c",
                       help="Filter by category (technical, academic, business, internal)")

    args = parser.parse_args()
    list_templates(detail=args.detail, category=args.category)


if __name__ == "__main__":
    main()
