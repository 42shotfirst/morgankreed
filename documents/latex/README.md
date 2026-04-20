---
last_modified: 2025-11-01
git_commit: New
---

# Unified LaTeX Build System

Make-based build system with semantic versioning, automatic archiving, and modular style packages. Combines patterns from Adrata, Education-Plan, and VSLA legacy projects.

## Core Capabilities

- Semantic versioning (MAJOR.MINOR.PATCH) with Python script
- PDF versioning and archiving (never overwrites previous builds)
- Single-pass draft mode vs full multi-pass compilation
- Watch mode (requires inotifywait/fswatch)
- TEXINPUTS auto-configuration for style packages
- Parallel builds supported

## Style Packages

Four modular .sty files in `styles/`:

```
doc-premium.sty  → LuaLaTeX only (fontspec)
                  → 8 colors, 7 callout boxes, TikZ styles
                  → Requires: Source Serif 4, IBM Plex Sans, JetBrains Mono

doc-tables.sty   → Any compiler
                  → 3 pre-configured table environments

doc-math.sty     → Any compiler
                  → 50+ notation shortcuts

doc-code.sty     → Any compiler
                  → 7 language syntax styles
```

**Load all**:
```latex
\usepackage{doc-premium}
\usepackage{doc-tables}
\usepackage{doc-math}
\usepackage{doc-code}
```

**Documentation**: [styles/STYLES.md](styles/STYLES.md), [styles/COLOR_PALETTE.md](styles/COLOR_PALETTE.md), [styles/FONTS.md](styles/FONTS.md)

## Build Commands

```bash
make patch    # Bump x.x.N, compile full, archive old version
make minor    # Bump x.N.0, compile full, archive old version
make major    # Bump N.0.0, compile full, archive old version
make quick    # Compile without version bump
make draft    # Single-pass compile (no bib, fast iteration)
make watch    # Auto-rebuild on file changes
make test     # Compile to output/ without deploying to deploy/
make status   # Show current version and build state
make clean    # Remove build artifacts (preserves archive/)
make help     # Show all targets
```

**Versioning semantics**:
- MAJOR: Breaking changes, complete rewrites
- MINOR: New sections, significant additions
- PATCH: Bug fixes, minor edits

**Output locations**:
- `output/`: Build artifacts (aux, log, PDF)
- `archive/`: Old versions (My-Document-V0.1.0.pdf, ...)
- `deploy/`: Latest versioned PDF + unversioned symlink

## Project Structure

### Minimal
```
my-document/
├── Makefile          # include ../../Makefile.template
├── .version          # 0.1.0 (auto-managed by version_manager.py)
└── src/
    └── main.tex      # \usepackage{wyrd-*}
```

### Full
```
my-document/
├── Makefile
├── .version
├── src/
│   ├── main.tex
│   ├── sections/
│   │   ├── intro.tex
│   │   └── methods.tex
│   └── bibliography.bib
├── figures/
│   └── *.pdf
└── archive/          # Auto-created
```

## Creating New Project

```bash
cd documents/latex/projects
mkdir my-doc && cd my-doc
mkdir -p src
```

**Makefile**:
```makefile
PROJECT_NAME = my-doc
OUTPUT_BASE = My-Doc
LATEX_COMPILER = lualatex
BIB_TOOL = bibtex
COMPILE_PASSES = 3

include ../../Makefile.template
```

**src/main.tex**:
```latex
\documentclass{article}
\usepackage{doc-premium}

\title{Document Title}
\author{Author}

\begin{document}
\maketitle
Content here.
\end{document}
```

Build:
```bash
make patch  # Creates v0.1.0
```

## Configuration

### Makefile Variables

```makefile
PROJECT_NAME     # Used for build directory names
OUTPUT_BASE      # PDF filename prefix (My-Document → My-Document-V0.1.0.pdf)
LATEX_COMPILER   # pdflatex | lualatex | xelatex
BIB_TOOL         # bibtex | biber | none
COMPILE_PASSES   # Default: 3 (LaTeX → BibTeX → LaTeX × 2)
SRC_DIR          # Default: src
MAIN_TEX         # Default: $(SRC_DIR)/main.tex
OUTPUT_DIR       # Default: output
ARCHIVE_DIR      # Default: archive
DEPLOY_DIR       # Default: deploy
```

### Non-Standard Layouts

**Custom source location**:
```makefile
SRC_DIR = content
MAIN_TEX = $(SRC_DIR)/document.tex
```

**Multiple variants**:
```makefile
acm: compile-full
	cd $(SRC_DIR) && $(LATEX_COMPILER) document_acm.tex
	cp $(SRC_DIR)/document_acm.pdf $(OUTPUT_BASE)-ACM.pdf
```

## Version Management

Handled by `scripts/version_manager.py`. Reads/writes `.version` file.

**Manual version control**:
```bash
python3 ../../scripts/version_manager.py show           # Display current
python3 ../../scripts/version_manager.py bump major     # Increment MAJOR
python3 ../../scripts/version_manager.py bump minor     # Increment MINOR
python3 ../../scripts/version_manager.py bump patch     # Increment PATCH
```

**Version file format**:
```
0.1.0
```

Single line, MAJOR.MINOR.PATCH, no trailing newline.

## Compilation Flow

### Full Build (patch/minor/major)

1. Bump version (version_manager.py)
2. LaTeX pass 1 (generate aux)
3. BibTeX (if BIB_TOOL != none)
4. LaTeX pass 2 (resolve citations)
5. LaTeX pass 3 (resolve cross-refs)
6. Move old PDF to archive/
7. Copy new PDF to deploy/ with version
8. Create unversioned symlink

### Draft Build

1. Single LaTeX pass
2. Skip BibTeX
3. Output to output/ only (no versioning)

### Watch Mode

Monitors `src/**/*.tex` and `src/**/*.bib` for changes. Runs `make quick` on modification.

**Requirements**:
- Linux: inotifywait (apt install inotify-tools)
- macOS: fswatch (brew install fswatch)

## Dependencies

**Required**:
- make
- Python 3.6+
- LaTeX distribution (TeX Live or MiKTex)
- Compiler: pdflatex, lualatex, or xelatex

**Optional**:
- bibtex or biber (for bibliographies)
- inotifywait or fswatch (for watch mode)
- Premium fonts (for doc-premium.sty)

**LaTeX packages** (auto-installed by most distributions):
- fontspec, tcolorbox, tikz, pgfplots (doc-premium)
- booktabs, colortbl, siunitx (doc-tables)
- amsmath, amsthm, bm (doc-math)
- listings, xcolor (doc-code)

## Failure Modes

**fontspec errors**: Using doc-premium with pdflatex. Fix: Set `LATEX_COMPILER = lualatex`.

**Missing fonts**: Using doc-premium without system fonts installed. Fix: Install fonts per FONTS.md or skip doc-premium.

**Version conflicts**: Multiple projects sharing same .version file. Fix: Each project needs independent directory.

**Watch mode not found**: inotifywait/fswatch not installed. Fix: Install platform-specific tool or use manual rebuilds.

**Bibliography not updating**: BIB_TOOL=none but document has \bibliography{}. Fix: Set BIB_TOOL=bibtex or biber.

**Permission errors on archive**: Directory not writable. Fix: `chmod u+w archive/` or check disk space.

## Migration from Legacy Projects

### Adrata
- Already uses similar versioning and archiving
- Replace `\input{preamble.tex}` with `\usepackage{doc-premium}`
- Replace `\input{macros.tex}` with `\usepackage{doc-math}`

### Education-Plan
- Already uses semantic versioning structure
- Add style packages to preamble
- Update OUTPUT_BASE in Makefile

### VSLA
- Uses test mode and status commands
- Adapt Makefile to include template
- Preserve custom targets if needed

**Detailed migration**: [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)

## Parallel Builds

Build system supports GNU make -j flag:

```bash
make -j4 patch  # Parallel LaTeX passes (unsafe, may corrupt aux files)
```

**Not recommended**: LaTeX expects sequential passes for cross-reference resolution. Parallel builds faster but may produce incorrect output.

**Safe parallelism**: Build multiple projects simultaneously:
```bash
(cd project1 && make patch) & (cd project2 && make patch) & wait
```

## Troubleshooting

**Problem**: LaTeX compilation hangs

**Cause**: Infinite loop in document, missing \end{document}, or interactive error prompt

**Fix**: Check last lines of output/*.log, add `\nonstopmode` to preamble, or Ctrl+C and fix source

---

**Problem**: Archived PDF has wrong name

**Cause**: OUTPUT_BASE doesn't match PROJECT_NAME convention

**Fix**: Set OUTPUT_BASE explicitly in Makefile

---

**Problem**: Style packages not found

**Cause**: TEXINPUTS not set or styles/ directory missing

**Fix**: Verify `include ../../Makefile.template` path is correct, or run `kpsewhich doc-premium.sty` to test

---

**Problem**: Version stuck at 0.0.0

**Cause**: .version file doesn't exist or corrupted

**Fix**: Create .version with content `0.1.0` or delete and run `make patch`

## Example Project

Complete working demonstration: [projects/example-project/](projects/example-project/)

Demonstrates:
- All four style packages
- Semantic versioning
- Table/math/code environments
- Build system integration

Build:
```bash
cd projects/example-project
make quick
ls output/  # Check for PDF
```

## Architecture

```
Makefile.template (354 lines)
├── Version targets (major, minor, patch)
├── Compilation targets (compile-full, compile-draft)
├── Archive management
├── Watch mode
└── Status/help commands

scripts/version_manager.py (127 lines)
├── .version file I/O
├── Semantic version parsing
└── Increment logic

styles/ (4 packages, ~600 lines total)
├── doc-premium.sty (299 lines)
├── doc-tables.sty (119 lines)
├── doc-math.sty (140 lines)
└── doc-code.sty (146 lines)
```

**Memory footprint**: Negligible (~2KB for Makefile + Python script at runtime).

**Disk usage**: ~1MB per archived PDF version.

## Resources

- Style package reference: [styles/STYLES.md](styles/STYLES.md)
- Color specifications: [styles/COLOR_PALETTE.md](styles/COLOR_PALETTE.md)
- Font installation: [styles/FONTS.md](styles/FONTS.md)
- Legacy migration: [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- Example project: [projects/example-project/](projects/example-project/)

---

**Version**: 1.0
**Date**: 2025-11-01
**Source**: Unified from Adrata (versioning), Education-Plan (Makefile), VSLA (status/test modes)
