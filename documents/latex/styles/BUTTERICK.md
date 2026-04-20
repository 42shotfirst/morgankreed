# Wyrd Butterick Typography Style

Implements Matthew Butterick's principles from *Typography for Lawyers* (also known as *Butterick's Practical Typography*) for professional, highly readable documents.

## Quick Start

```latex
\documentclass[11pt,a4paper]{article}
\usepackage{doc-butterick}

\begin{document}
Your content here...
\end{document}
```

**Compile with LuaLaTeX:**
```bash
lualatex document.tex
```

## The Butterick Principles

### 1. Point Size: 10-12pt

Body text should be 10-12pt. We default to **11pt** as the optimal balance of readability and economy.

```latex
\documentclass[11pt]{article}  % Butterick approved
```

### 2. Line Spacing: 120-145%

Line spacing (leading) should be 120-145% of point size. For 11pt, that's 13.2-16pt.

We use **1.3x** (130%) = 14.3pt line height.

### 3. Line Length: 45-90 Characters

The ideal line length is **66 characters** (about 2-3 lowercase alphabets). We achieve this with generous 1.5" margins on A4/Letter paper.

```
abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmn
^-- approximately 66 characters --^
```

### 4. Margins: Generous

Butterick recommends at least 1" margins, preferably 1.5"+. Our defaults:

| Edge | Size |
|------|------|
| Top | 1.5 inches |
| Bottom | 1.5 inches |
| Left | 1.5 inches |
| Right | 1.5 inches |

### 5. Paragraph Formatting

**Choose ONE:**
- First-line indent (default) -- `indent` option
- Space between paragraphs -- `block` option

**Never both.**

```latex
\usepackage{doc-butterick}           % Indented paragraphs (default)
\usepackage[block]{doc-butterick}    % Block paragraphs with spacing
```

### 6. Font Choices

Butterick says: *"Don't use Times New Roman, Arial, or Courier."*

We use professional fonts:
- **Body:** Source Serif 4 (praised by Butterick)
- **Sans:** IBM Plex Sans (clean, professional)
- **Mono:** JetBrains Mono (highly readable)

### 7. Justified vs. Ragged Right

Justified text is acceptable **only with proper hyphenation**. We enable advanced hyphenation via `babel` and `microtype`.

For less formal documents, ragged right (unjustified) is fine:

```latex
\usepackage[ragged]{doc-butterick}   % Unjustified text
```

### 8. Emphasis

| Do This | Not This |
|---------|----------|
| *Italics* for emphasis | ~~Underlines~~ |
| **Bold** sparingly | ALL CAPS FOR EMPHASIS |
| Small caps for acronyms | SHOUTING IN CAPS |

```latex
This is \emph{emphasized} text.       % Italics
This is \strong{strong} text.         % Bold (use sparingly)
The \caps{fbi} investigated.          % Small caps for acronyms
```

### 9. Widow and Orphan Control

Butterick: *"Widows and orphans are typographic errors."*

We set maximum penalties to prevent:
- **Widows:** Last line of paragraph alone at top of page
- **Orphans:** First line of paragraph alone at bottom of page

## Package Options

| Option | Description |
|--------|-------------|
| `indent` | First-line indent, no paragraph spacing (default) |
| `block` | Paragraph spacing, no indent |
| `justified` | Justified text with hyphenation (default) |
| `ragged` | Ragged right (unjustified) |
| `serif` | Serif body font (default) |
| `sans` | Sans-serif body font |

**Examples:**
```latex
\usepackage{doc-butterick}                    % Default: indent, justified, serif
\usepackage[block,ragged]{doc-butterick}      % Block paragraphs, ragged right
\usepackage[sans]{doc-butterick}              % Sans-serif body text
```

## Commands

### Emphasis

```latex
\emph{italics}              % Italic emphasis (default)
\strong{bold}               % Bold emphasis (use sparingly!)
\caps{nasa}                 % Small caps with proper tracking
\allcaps{Warning}           % All caps with letterspacing
```

### Dashes

```latex
Hyphen: self-aware
En dash: pages 1--10
Em dash: He said\dash and I quote\dash ``hello.''
```

The `\dash` command adds thin spaces around em dashes, as Butterick recommends.

### Abbreviations

```latex
\eg, \ie, \cf, \vs          % Rendered in small caps
\etal                       % et al. in italics
\amtime, \pmtime            % Time abbreviations in small caps
```

### Title Page

```latex
\buttericktitle{Document Title}{Author Name}{January 2026}
```

Creates a simple, professional title page.

## Headings

Butterick recommends a clear hierarchy without excessive size differences:

| Level | Style | Size |
|-------|-------|------|
| Section | Bold | Large (14pt) |
| Subsection | Bold | Normal (11pt) |
| Subsubsection | Italic | Normal (11pt) |

No all-caps headings. No underlining.

## Tables

Following Butterick's table rules:
- **No vertical rules** (lines)
- **Minimal horizontal rules** (use booktabs)
- **Lining figures** in tables (not old-style)

```latex
\begin{tabular}{lrr}
\toprule
Item & Quantity & Price \\
\midrule
Widget & 100 & \$5.00 \\
Gadget & 50 & \$10.00 \\
\bottomrule
\end{tabular}
```

## Lists

Proper hanging indentation with appropriate spacing:

```latex
\begin{itemize}
    \item First item
    \item Second item with enough text to wrap
          to the next line demonstrating proper
          hanging indent
\end{itemize}
```

## Block Quotes

Indented from both margins, slightly smaller:

```latex
\begin{quote}
Typography exists to honor content.
--- Robert Bringhurst
\end{quote}
```

## Comparison with Other Styles

| Feature | doc-butterick | doc-premium | doc-arcane |
|---------|----------------|--------------|-------------|
| Purpose | Professional docs | Technical docs | Stylized docs |
| Body Font | Source Serif 4 | Source Serif 4 | Custom palette |
| Line Spacing | 1.3x | 1.08x | 1.2x |
| Margins | 1.5" all | 25-30mm | Variable |
| Paragraph | Indent OR block | Block (no indent) | Block |
| Headings | Minimal styling | Colored/styled | Decorative |
| Overall | Restrained, classic | Modern, branded | Artistic |

## When to Use

**Use doc-butterick for:**
- Legal documents
- Business proposals
- Formal reports
- Academic papers
- Contracts
- Any document requiring maximum readability and professionalism

**Use other styles for:**
- Technical documentation (doc-premium)
- Marketing materials (doc-arcane)
- Presentations (custom)

## Butterick's Key Rules Summary

1. **Body text:** 10-12 point
2. **Line spacing:** 120-145%
3. **Line length:** 45-90 characters
4. **Margins:** At least 1 inch
5. **Font:** Never Times New Roman, Arial, Courier
6. **Paragraphs:** Indent OR space, not both
7. **Emphasis:** Italics, not bold or underline
8. **Headings:** Clear hierarchy, not too large
9. **ALL CAPS:** Avoid, or use with letterspacing
10. **Justified:** Only with proper hyphenation

## Resources

- [Butterick's Practical Typography](https://practicaltypography.com/) -- Free online book
- [Typography for Lawyers](https://typographyforlawyers.com/) -- Original reference
- [Microtype documentation](https://ctan.org/pkg/microtype) -- Advanced typography
- [Fontspec documentation](https://ctan.org/pkg/fontspec) -- Font configuration

## Troubleshooting

### "Font not found" error
Ensure fonts are installed (see FONTS.md) and compile with LuaLaTeX.

### Overfull hbox warnings
The style has good defaults, but very long words may cause issues. Use:
```latex
\emergencystretch=2em  % Increase if needed
```

### Want different margins?
Override after loading the package:
```latex
\usepackage{doc-butterick}
\geometry{left=1in,right=1in}  % Adjust margins
```

### Combine with other packages
Load doc-butterick first, then add other packages:
```latex
\usepackage{doc-butterick}
\usepackage{doc-tables}      % Enhanced tables
\usepackage{doc-math}        % Math shortcuts
```
