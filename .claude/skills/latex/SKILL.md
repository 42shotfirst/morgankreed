---
name: latex
description: Plan, create, build, and validate professional LaTeX documents. Handles requirements gathering, template selection, outline creation, project scaffolding, building, version management, and visual PDF review. Use when working with documents/latex/.
---

# LaTeX Document Skill

## When to Use This Skill

Use this skill when:
- Starting a new LaTeX document from scratch
- Need guided requirements gathering before writing
- Want to select from document templates (tech specs, research papers, business docs, reports)
- Creating documents in `documents/latex/projects/`
- Building or managing existing LaTeX projects
- Reviewing PDF layout quality after builds

## Sub-Commands

### Interactive Planning (Default)
```bash
/latex                                # Start full planning conversation
/latex new                            # Alias for default
```

### Quick Start (Skip Planning)
```bash
/latex quick <template> <name>        # Create from template directly
/latex quick tech-spec api-design
/latex quick research-paper thesis
```

### Template Operations
```bash
/latex templates                      # List available templates
/latex templates --detail             # Show template details
/latex templates --category technical # Filter by category
```

### Build Operations
```bash
/latex build                          # Build current project (make quick)
/latex build patch                    # Build with patch version bump
/latex build minor                    # Build with minor version bump
/latex build major                    # Build with major version bump
/latex build draft                    # Fast draft build (single pass)
/latex build watch                    # Auto-rebuild on changes
```

### Validation
```bash
/latex validate                       # Validate current project spec
/latex validate <spec-file>           # Validate document spec
/latex review                         # Visual PDF review for layout issues
```

---

## Planning Conversation Flow

When invoked without arguments, the skill guides you through 5 phases:

### Phase 1: Requirements Gathering

```
I'll help you plan a new LaTeX document. Let's gather requirements:

1. **Purpose**: What is this document for?
   - Technical specification / design document
   - Research paper / academic writing
   - Business proposal / external document
   - Internal report / status update
   - Other (describe)

2. **Audience**: Who will read this document?
   - Technical level: [beginner | intermediate | expert]
   - Context: [internal team | external stakeholders | academic]

3. **Scope**: Approximately how long should it be?
   - Short (1-5 pages)
   - Medium (5-15 pages)
   - Long (15-40 pages)
   - Very long (40+ pages)

4. **Content**: Do you have an outline or key points?
```

### Phase 2: Template Selection

Based on requirements, recommend a template:

```
Based on your requirements:
- Purpose: Technical specification
- Audience: Technical architects
- Scope: Medium (15-30 pages)

I recommend the **tech-spec** template:
- Includes architecture diagrams (TikZ)
- Has code listing support
- Professional styling with doc-reed (default)

Alternative options:
- research-paper (if more academic focus)
- business-proposal (if needs executive summary focus)
```

### Phase 3: Outline Creation

Select and customize sections:

```
The tech-spec template includes these sections:

Required Sections:
- [ ] Executive Summary (1-2 pages)
- [ ] Architecture Overview (2-4 pages)
- [ ] Component Details (5-10 pages)
- [ ] Data Model (2-3 pages)
- [ ] API Reference (3-5 pages)

Optional Sections:
- [ ] Security Considerations
- [ ] Performance Requirements
- [ ] Migration Plan
- [ ] Glossary

Which optional sections do you need?
Any custom sections to add?
```

### Phase 4: Content Planning

Capture key points per section:

```
For each section, let's capture key points:

### Executive Summary
What are the 3-5 key takeaways?
1. [Your input]
2. [Your input]

### Architecture Overview
What components need to be described?
- [Component 1]
- [Component 2]

Do you need architecture diagrams? [yes/no]
```

### Phase 5: Project Generation

Create the project structure:

```
Ready to Generate

Document Specification:
- Title: API Gateway Technical Specification
- Template: tech-spec
- Estimated: 20-30 pages
- Sections: 8 (5 required + 3 optional)

Project will be created at:
documents/latex/projects/api-gateway-spec/

Files to generate:
- Makefile (inherits from Makefile.template)
- src/main.tex (from template)
- src/sections/ (8 section files)
- document-spec.yml (planning decisions)

Proceed with generation? [yes/no]
```

---

## Available Templates

| Template | Category | Pages | Use Case |
|----------|----------|-------|----------|
| `tech-spec` | technical | 15-40 | Architecture docs, design specs, API references |
| `research-paper` | academic | 10-25 | Academic papers, white papers, formal research |
| `business-proposal` | business | 8-20 | Proposals, business cases, strategy documents |
| `internal-report` | internal | 3-10 | Status reports, progress updates |
| `short-memo` | internal | 1-3 | Quick memos, brief communications |

**Template Registry:** `documents/latex/templates/registry.yml`

### Adding New Templates

1. Add entry to `registry.yml`:
```yaml
templates:
  my-template:
    name: My Template
    description: What this template is for
    category: technical|academic|business|internal
    compiler: pdflatex|lualatex
    packages: [doc-reed, doc-tables]
    sections: [section1, section2]
    estimated_pages: "X-Y"
```

2. Create template directory:
```bash
mkdir -p documents/latex/templates/my-template/sections
```

3. Create template.tex and section files

---

## Document Spec Format

The planning conversation generates a `document-spec.yml` stored in the project:

```yaml
# Document Specification
# Generated by /latex on 2026-04-19 10:30:00

document:
  title: "API Gateway Technical Specification"
  author: "Morgan K. Reed"
  date: auto

template: tech-spec

project:
  name: api-gateway-spec
  output_base: API-Gateway-Spec
  location: documents/latex/projects/api-gateway-spec

build:
  compiler: lualatex
  bib_tool: bibtex
  compile_passes: 3

packages:
  - doc-reed

sections:
  - name: executive_summary
    title: Executive Summary
    key_points:
      - System overview
      - Key capabilities
      - Business value
  - name: architecture
    title: System Architecture
    diagrams: true
    subsections:
      - High-level design
      - Component diagram

requirements:
  audience: "Technical architects and developers"
  purpose: "Design reference for API Gateway implementation"

metadata:
  created: "2026-04-19T10:30:00Z"
  estimated_pages: 20-30
```

---

## Build System

### Project Structure

```
documents/latex/projects/my-document/
├── Makefile              # Project configuration
├── .version              # Current version (auto-managed)
├── document-spec.yml     # Planning decisions
├── src/
│   ├── main.tex         # Main document
│   └── sections/        # Section files
├── archive/             # Old versions (auto-created)
│   └── My-Document-V0.1.0.pdf
├── My-Document-V0.1.1.pdf   # Current versioned build
└── My-Document.pdf          # Symlink to latest
```

### Build Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `make` | Show help | Learn available commands |
| `make patch` | Patch version (x.x.N) | Bug fixes, typos |
| `make minor` | Minor version (x.N.0) | New sections |
| `make major` | Major version (N.0.0) | Complete rewrites |
| `make quick` | No version bump | Quick test builds |
| `make draft` | Single-pass build | Rapid iteration |
| `make test` | Test compile | Debug errors |
| `make watch` | Auto-rebuild | Active development |
| `make status` | Build status | Check versions |
| `make clean` | Clean artifacts | Fresh build |

### Version Management

Uses **semantic versioning** (MAJOR.MINOR.PATCH):
- **MAJOR** (N.0.0): Breaking changes or complete rewrites
- **MINOR** (x.N.0): New features or significant additions
- **PATCH** (x.x.N): Bug fixes or minor changes

---

## Style Packages

Seven modular style packages in `documents/latex/styles/`:

### doc-reed.sty (DEFAULT, requires LuaLaTeX)
- **Butterick-compatible** print-friendly style with Morgan K. Reed brand
- Electric cyan accent (#0EA5E9), dark navy text (#16162A) on white background
- Inter (sans) + Source Serif 4 (serif body) + JetBrains Mono
- 7 callout box types: keyinsight, businessvalue, technicaldetail, criticalpoint, warningbox, callout, notebox
- `\reedtitle` for branded title pages, `\mkreed` brand wordmark
- `\glow` for accent emphasis, `\reedcode` for inline code
- TikZ pre-configured styles: component, dataflow, server, database, api
- Butterick typography: 11pt body, 1.3 line height, generous margins, proper hyphenation
- Options: block/indent, ragged/justified, sans/serif
- **Use this for all new documents unless explicitly requested otherwise**

### doc-digital.sty (requires LuaLaTeX)
- Dark-theme screen-optimized styling
- Plus Jakarta Sans, JetBrains Mono, Source Serif 4
- 7 callout box types with glass-morphism styling
- Circuit-board background decorations (circuitlight, circuitmedium, circuitfull)
- `\digitaltitle` for branded title pages, `\sectionpage` for dividers
- `\glow` for emphasis, `\pincode` for inline code
- TikZ pre-configured styles: component, dataflow, server, database, api, highlight

### doc-premium.sty (requires LuaLaTeX)
- Dark academic color palette: navy, emerald, brass, burgundy
- Premium fonts: Source Serif 4, IBM Plex Sans, JetBrains Mono
- 7 callout box types: keyinsight, businessvalue, technicaldetail, etc.
- TikZ pre-configured styles

### doc-butterick.sty
- Typography following Butterick's Practical Typography guidelines
- Clean, readable document formatting (no brand colors)

### doc-arcane.sty
- Alternative dark palette with arcane aesthetic
- Suitable for distinctive presentation

### doc-tables.sty
- 3 table environments with professional formatting
- Works with booktabs
- Compatible with pdflatex

### doc-math.sty
- 50+ math notation shortcuts
- Sets: \R, \N, \Z, \Q, \C
- Probability: \E, \Prob, \var, \cov
- Vectors: \vect, \mat, \norm

### doc-code.sty
- 7 language syntax styles
- Color highlighting integrated with palette
- Compatible with pdflatex

---

## Makefile Template

Every project needs a `Makefile`:

```makefile
# Include the unified build system
include ../../Makefile.template

# PROJECT CONFIGURATION
PROJECT_NAME = my-document
OUTPUT_BASE = My-Document
LATEX_COMPILER = lualatex    # or pdflatex
BIB_TOOL = bibtex            # or biber or none
COMPILE_PASSES = 3
```

---

## Visual PDF Review (MANDATORY)

**This review is REQUIRED after every build.** Do not deliver a document without completing the full page-by-page QA pass. Changes to earlier pages cascade to later pages, so always review sequentially from page 1.

### Review Workflow

1. **Convert PDF to images:**
```bash
bash .claude/skills/latex/scripts/review-pdf.sh /path/to/document.pdf
```

2. **Review ONE page at a time, sequentially.** Read each page image with the Read tool, assess for issues, fix any problems found, then rebuild and re-convert before continuing to the next page. This is critical because fixes on page N shift content on pages N+1 onward.

```
# Page-by-page loop:
Read /tmp/pdf-review/page-01.png
# → Assess, fix if needed, rebuild, re-convert, then:
Read /tmp/pdf-review/page-02.png
# → Assess, fix if needed, rebuild, re-convert, then:
Read /tmp/pdf-review/page-03.png
# ... continue through all pages
```

3. **Issue types to check for on each page:**

| Issue Type | Visual Indicator | Severity | Fix |
|------------|------------------|----------|-----|
| Orphaned Header | Section title at page bottom with no content following | High | `\needspace{10cm}` before heading |
| Widow | Single line of paragraph at top of page | Medium | Reword to shift line, or `\newpage` |
| Orphan | Single line of paragraph at bottom of page | Medium | Reword or adjust spacing |
| Bad Page Break | Table/figure/callout box split across pages | High | `\newpage` before element |
| Diagram Clipped | TikZ content extends past margins | Critical | Reduce node sizes, spacing, or font |
| Empty Space | Large whitespace at page bottom (>1/3 page), except final page | Low | Redistribute content |
| Overflow | Text extending into margins | Critical | Reword or adjust column widths |

4. **Fix strategies:**

```latex
% Force element to next page (simplest, use when box/table splits)
\newpage
\begin{criticalpoint}

% Reserve space so heading stays with content
\needspace{10cm}
\subsection{Section Title}

% Prevent tcolorbox from splitting (note: optional args don't work
% on newtcolorbox environments; use tcbset instead)
\tcbset{breakable=false}
\begin{criticalpoint}
...
\end{criticalpoint}
\tcbset{breakable}
```

**Sizing guide for \needspace:**
- `\needspace{6cm}` — Short subsection with 1-2 paragraphs
- `\needspace{10cm}` — Subsection with code block or table
- `\needspace{12cm}` — Section with diagram (TikZ)
- `\needspace{15cm}` — Large figure or multi-part content

5. **After fixing a page, rebuild and re-convert before reviewing the next page.** Do NOT batch-review multiple pages then fix, since earlier fixes invalidate later pages.

### Quality Checklist

Before marking review complete:

- [ ] Every page reviewed visually, one at a time in sequence
- [ ] No orphaned section/subsection headers
- [ ] No tables, figures, or callout boxes split across pages
- [ ] No diagrams clipped at margins
- [ ] No excessive whitespace (>1/3 page at bottom), final page excepted
- [ ] Code blocks stay with their introducing text
- [ ] Document rebuilt after all fixes
- [ ] Any fixed pages re-verified after rebuild

---

## Troubleshooting

### Build Fails
```bash
make test     # See detailed errors
make clean    # Clean and retry
make draft    # Try minimal build
```

### Missing Dependencies
```bash
make check-deps

# Ubuntu/Debian
sudo apt-get install texlive-latex-extra texlive-fonts-recommended

# macOS
brew install --cask mactex
```

### pdftoppm Not Found (for review)
```bash
# Ubuntu/Debian
sudo apt-get install poppler-utils

# macOS
brew install poppler
```

### Watch Mode Not Working
```bash
sudo apt-get install inotify-tools
```

---

## IMPORTANT Rules

1. **Default to doc-reed.sty** - All new documents use `doc-reed` unless explicitly requested otherwise. Use `lualatex` compiler and `\reedtitle` for title pages.
2. **Complete planning before generating** - Don't skip requirements gathering
3. **Use templates** - Start from existing templates, customize as needed
4. **Use unified build system** - Projects go in `documents/latex/projects/`
5. **Let system manage versions** - Use make patch/minor/major
6. **Preserve document-spec.yml** - Contains planning decisions for reference
7. **Test before release** - Use `make test` before versioned builds
8. **MANDATORY page-by-page QA** - After every build, convert to images and review every page sequentially using the Read tool. Fix issues as you find them, rebuilding after each fix before continuing. Never skip this step or batch-review pages.
9. **Rebuild after fixes** - Layout changes cascade to later pages; always re-convert and re-verify from the fixed page onward
10. **No section divider pages** - Do not use `\sectionpage{}` unless the user explicitly requests section dividers

---

## Integration

- **Location:** All LaTeX projects in `documents/latex/projects/`
- **Templates:** `documents/latex/templates/`
- **Styles:** `documents/latex/styles/`
- **Build System:** `documents/latex/Makefile.template`
- **Version Manager:** `documents/latex/scripts/version_manager.py`
- **Template Registry:** `documents/latex/templates/registry.yml`

---

## Resources

- **Build System README:** `documents/latex/README.md`
- **Style Reference:** `documents/latex/styles/STYLES.md`
- **Color Palette:** `documents/latex/styles/COLOR_PALETTE.md`
- **Arcane Palette:** `documents/latex/styles/ARCANE_PALETTE.md`
- **Butterick Guide:** `documents/latex/styles/BUTTERICK.md`
- **Fonts Guide:** `documents/latex/styles/FONTS.md`
