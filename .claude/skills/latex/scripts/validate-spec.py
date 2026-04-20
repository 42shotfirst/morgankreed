#!/usr/bin/env python3
"""
Validate a document specification file.

Usage:
    python validate-spec.py <spec-file>
    python validate-spec.py document-spec.yml
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
        return None

    with open(REGISTRY_FILE) as f:
        return yaml.safe_load(f)


def validate_spec(spec_file: str) -> tuple[bool, list[str], list[str]]:
    """
    Validate a document specification file.

    Returns:
        (is_valid, errors, warnings)
    """
    errors = []
    warnings = []

    # Check file exists
    spec_path = Path(spec_file)
    if not spec_path.exists():
        return False, [f"File not found: {spec_file}"], []

    # Load spec
    try:
        with open(spec_path) as f:
            spec = yaml.safe_load(f)
    except yaml.YAMLError as e:
        return False, [f"Invalid YAML: {e}"], []

    if not spec:
        return False, ["Empty specification file"], []

    # Required fields
    required_fields = ["document", "template"]
    for field in required_fields:
        if field not in spec:
            errors.append(f"Missing required field: {field}")

    # Validate document section
    if "document" in spec:
        doc = spec["document"]
        if not isinstance(doc, dict):
            errors.append("'document' must be a dictionary")
        else:
            if "title" not in doc:
                warnings.append("Missing document.title")
            if "author" not in doc:
                warnings.append("Missing document.author")

    # Validate template
    if "template" in spec:
        template_name = spec["template"]
        registry = load_registry()
        if registry:
            templates = registry.get("templates", {})
            if template_name not in templates:
                errors.append(f"Unknown template: {template_name}")
                errors.append(f"  Available: {', '.join(templates.keys())}")

    # Validate project section
    if "project" in spec:
        project = spec["project"]
        if not isinstance(project, dict):
            errors.append("'project' must be a dictionary")
        else:
            if "name" not in project:
                warnings.append("Missing project.name")
            if "output_base" not in project:
                warnings.append("Missing project.output_base")

    # Validate build section
    if "build" in spec:
        build = spec["build"]
        if not isinstance(build, dict):
            errors.append("'build' must be a dictionary")
        else:
            valid_compilers = ["pdflatex", "lualatex", "xelatex"]
            compiler = build.get("compiler")
            if compiler and compiler not in valid_compilers:
                errors.append(f"Invalid compiler: {compiler}")
                errors.append(f"  Valid options: {', '.join(valid_compilers)}")

            valid_bib_tools = ["bibtex", "biber", "none"]
            bib_tool = build.get("bib_tool")
            if bib_tool and bib_tool not in valid_bib_tools:
                errors.append(f"Invalid bib_tool: {bib_tool}")
                errors.append(f"  Valid options: {', '.join(valid_bib_tools)}")

    # Validate sections
    if "sections" in spec:
        sections = spec["sections"]
        if not isinstance(sections, list):
            errors.append("'sections' must be a list")
        else:
            for i, section in enumerate(sections):
                if isinstance(section, str):
                    continue
                elif isinstance(section, dict):
                    if "name" not in section:
                        warnings.append(f"Section {i} missing 'name' field")
                else:
                    errors.append(f"Section {i} must be a string or dictionary")

    # Validate packages
    if "packages" in spec:
        packages = spec["packages"]
        if not isinstance(packages, list):
            errors.append("'packages' must be a list")
        else:
            valid_packages = ["doc-reed", "doc-premium", "doc-butterick",
                            "doc-digital", "doc-arcane", "doc-tables",
                            "doc-math", "doc-code"]
            for pkg in packages:
                if pkg not in valid_packages and pkg.startswith("doc-"):
                    warnings.append(f"Unknown doc package: {pkg}")

    is_valid = len(errors) == 0
    return is_valid, errors, warnings


def main():
    parser = argparse.ArgumentParser(
        description="Validate a document specification file"
    )
    parser.add_argument("spec_file", help="Path to the document-spec.yml file")
    parser.add_argument("--quiet", "-q", action="store_true",
                       help="Only output errors, no status messages")

    args = parser.parse_args()

    is_valid, errors, warnings = validate_spec(args.spec_file)

    if not args.quiet:
        print(f"Validating: {args.spec_file}")
        print()

    if errors:
        print("ERRORS:")
        for error in errors:
            print(f"  - {error}")
        print()

    if warnings:
        print("WARNINGS:")
        for warning in warnings:
            print(f"  - {warning}")
        print()

    if is_valid:
        if not args.quiet:
            print("Validation: PASSED")
            if warnings:
                print(f"  ({len(warnings)} warnings)")
        sys.exit(0)
    else:
        if not args.quiet:
            print("Validation: FAILED")
            print(f"  ({len(errors)} errors, {len(warnings)} warnings)")
        sys.exit(1)


if __name__ == "__main__":
    main()
