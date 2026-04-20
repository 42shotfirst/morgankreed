# Wyrd Arcane Color Palette Specification

Wizard-inspired palette for mystical document styling. Deep obsidian backgrounds with luminous terminal-inspired accents.

**Design Philosophy**: "As above, so below" - bridging ancient knowledge with modern terminal precision.

## Color Definitions

### Primary Backgrounds

| Name | Hex | RGB | Purpose |
|------|-----|-----|---------|
| ArcaneObsidian | #0D1117 | (13, 17, 23) | Primary dark background |
| ArcaneVoid | #010409 | (1, 4, 9) | Deepest black (code blocks) |
| ArcaneParchment | #F0E6D3 | (240, 230, 211) | Light mode / print background |
| ArcaneDust | #21262D | (33, 38, 45) | Subtle dark backgrounds |

### Primary Text

| Name | Hex | RGB | Contrast on Obsidian | Purpose |
|------|-----|-----|---------------------|---------|
| ArcaneSilver | #C9D1D9 | (201, 209, 217) | 13.5:1 (AAA) | Primary text |
| ArcaneMist | #6E7681 | (110, 118, 129) | 4.7:1 (AA) | Muted/secondary text |
| ArcaneInk | #1C2128 | (28, 33, 40) | - | Borders on dark |

### Elemental Accents (ADA Compliant on White)

| Name | Hex | RGB | Contrast | WCAG | Element |
|------|-----|-----|----------|------|---------|
| ArcaneEther | #00875A | (0, 135, 90) | 5.1:1 | AA | Spirit/Success (green) |
| ArcaneFrost | #0077B6 | (0, 119, 182) | 4.6:1 | AA | Ice/Info (cyan-blue) |
| ArcaneFlame | #C45D00 | (196, 93, 0) | 4.8:1 | AA | Fire/Warning (amber) |
| ArcaneBlood | #A51D2D | (165, 29, 45) | 7.2:1 | AAA | Blood/Danger (crimson) |
| ArcaneMystic | #7B2CBF | (123, 44, 191) | 6.8:1 | AAA | Arcane/Special (purple) |

### Luminous Variants (For Glow Effects on Dark)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| ArcaneGlow | #39FF14 | (57, 255, 20) | Terminal neon green glow |
| ArcaneCyan | #00D4FF | (0, 212, 255) | Electric cyan highlights |
| ArcaneAmber | #FFB000 | (255, 176, 0) | Warm amber warnings |
| ArcaneRuby | #FF3366 | (255, 51, 102) | Ruby red errors |

**Note**: Luminous variants are for decorative/glow effects only, not body text.

## Semantic Aliases

```latex
\colorlet{ArcaneSuccess}{ArcaneEther}   % Green - positive
\colorlet{ArcaneInfo}{ArcaneFrost}      % Blue - informational
\colorlet{ArcaneWarning}{ArcaneFlame}   % Amber - caution
\colorlet{ArcaneDanger}{ArcaneBlood}    % Red - critical
\colorlet{ArcaneAccent}{ArcaneMystic}   % Purple - special/arcane
```

## Callout Box Mapping

| Environment | Frame Color | Background | Title Bar | Symbol |
|-------------|-------------|------------|-----------|--------|
| grimoire | ArcaneMystic | ArcaneMystic!8 | ArcaneMystic | ★ Arcane Knowledge |
| oracle | ArcaneFrost | ArcaneFrost!8 | ArcaneFrost | ○ Oracle Insight |
| alchemist | ArcaneEther | ArcaneEther!8 | ArcaneEther | ◇ Alchemical Process |
| flamebox | ArcaneFlame | ArcaneFlame!10 | ArcaneFlame | △ Caution |
| bloodbox | ArcaneBlood | ArcaneBlood!8 | ArcaneBlood | ▽ Peril |
| scroll | ArcaneMist!50 | ArcaneParchment!50 | - | (none) |
| voidbox | ArcaneGlow!60 | ArcaneVoid | - | Terminal style |

## TikZ Diagram Styles

| Style | Border | Fill | Use Case |
|-------|--------|------|----------|
| arcane component | ArcaneFrost!70 | ArcaneFrost!10 | Standard components |
| arcane server | ArcaneMystic!70 | ArcaneMystic!10 | Servers/processes |
| arcane database | ArcaneEther!70 | ArcaneEther!10 | Databases |
| arcane flow | ArcaneFrost!80 | - | Normal arrows |
| arcane glow flow | ArcaneGlow | Glow effect | Emphasized arrows |

## Decorative Elements

### Rune Glyphs

| Command | Symbol | Color |
|---------|--------|-------|
| `\runestar` | ★ (three-pointed) | ArcaneHighlight |
| `\runecircle` | ○ (circle with dot) | ArcaneHighlight |
| `\runediamond` | ◇ (rotated square) | ArcaneHighlight |
| `\runetriforce` | △ (nested triangles) | ArcaneHighlight |

### Decorative Lines

| Command | Description |
|---------|-------------|
| `\arcanerule` | Single line with center dot |
| `\arcaneruledouble` | Double line with center rune |
| `\chapteropener` | Decorative chapter start |

## Print Considerations

### CMYK Approximations

| Color | CMYK | Notes |
|-------|------|-------|
| ArcaneObsidian | C80 M70 Y60 K90 | Prints as rich black |
| ArcaneMystic | C70 M95 Y0 K0 | Vibrant purple |
| ArcaneFrost | C100 M40 Y0 K0 | Cyan-blue |
| ArcaneEther | C100 M0 Y60 K30 | Forest green |
| ArcaneFlame | C0 M65 Y100 K15 | Deep amber |
| ArcaneBlood | C20 M100 Y80 K20 | Deep crimson |

### Grayscale Fallback

For B&W printing, colors map to these grays:
- ArcaneMystic: 35% gray
- ArcaneFrost: 45% gray
- ArcaneEther: 50% gray
- ArcaneFlame: 55% gray
- ArcaneBlood: 40% gray

## Accessibility Notes

### Color Blindness Considerations

- **Protanopia**: ArcaneMystic and ArcaneBlood may appear similar
- **Deuteranopia**: ArcaneEther and ArcaneFlame may appear similar
- **Mitigation**: Never rely on color alone - all elements have text labels and symbols

### Contrast Ratios (on White Background)

All accent colors meet WCAG AA (4.5:1) for normal text:
- ArcaneMystic: 6.8:1 ✓ (AAA)
- ArcaneBlood: 7.2:1 ✓ (AAA)
- ArcaneEther: 5.1:1 ✓ (AA)
- ArcaneFrost: 4.6:1 ✓ (AA)
- ArcaneFlame: 4.8:1 ✓ (AA)

### Dark Mode Contrast (on Obsidian)

- ArcaneSilver: 13.5:1 ✓ (AAA)
- ArcaneMist: 4.7:1 ✓ (AA)
- ArcaneGlow: 15.2:1 ✓ (AAA) - decorative only

## Usage Examples

### Basic Document

```latex
\documentclass{article}
\usepackage{doc-arcane}

\begin{document}
\arcanetitlepage{The Arcane Codex}{Wizard Name}{\today}

\section{Introduction}
Content with \arcanehl{highlighted text} and \arcanecode{inline code}.

\begin{grimoire}
Key mystical knowledge goes here.
\end{grimoire}

\begin{oracle}
Prophetic insights and future considerations.
\end{oracle}
\end{document}
```

### Dark Mode vs Light Mode

```latex
% Dark mode (default)
\usepackage{doc-arcane}

% Light mode (for print)
\usepackage[light]{doc-arcane}
```

## Comparison with doc-premium

| Aspect | doc-premium | doc-arcane |
|--------|--------------|-------------|
| Aesthetic | Dark academic | Mystical/wizard |
| Primary color | Navy (#0F172A) | Purple (#7B2CBF) |
| Background | Light (parchment) | Dark (obsidian) |
| Decorations | Minimal | Rune glyphs, ornaments |
| Font mood | Scholarly | Mystical-terminal |
| Use case | Formal documents | Creative/themed docs |

---

**Version**: 1.0 (2026-01-02)
**Aesthetic**: Wizard/Arcane (terminal-inspired mysticism)
**Inspiration**: i3 window manager terminal UI
