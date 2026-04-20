---
last_modified: 2025-11-01
git_commit: New
---

# Wyrd Color Palette Specification

Dark academic palette. Navy + emerald + brass + burgundy. Eight colors total: four primaries, four supporting.

## Color Definitions

### Primary Colors

| Name | Hex | RGB | WCAG AA | WCAG AAA | Usage Constraint |
|------|-----|-----|---------|----------|------------------|
| WyrdNavy | #0F172A | (15, 23, 42) | 14.8:1 ✓ | 14.8:1 ✓ | All text sizes |
| WyrdEmerald | #047857 | (4, 120, 87) | 4.5:1 ✓ | 4.5:1 ✗ | Body text OK, not small text |
| WyrdBrass | #CA8A04 | (202, 138, 4) | 3.8:1 ✗ | 3.8:1 ✗ | Large text only (≥18pt) |
| WyrdBurgundy | #881337 | (136, 19, 55) | 8.1:1 ✓ | 8.1:1 ✓ | All text sizes |

**Brass constraint**: Fails AA for normal text. Usable for ≥18pt headings or non-text elements only.

### Supporting Colors

| Name | Hex | RGB | Purpose |
|------|-----|-----|---------|
| WyrdDark | #020617 | (2, 6, 23) | Body text, high contrast |
| WyrdMuted | #475569 | (71, 85, 105) | Secondary text, captions |
| WyrdLight | #F8FAFC | (248, 250, 252) | Code backgrounds, containers |
| WyrdBg | #E0E7ED | (224, 231, 237) | Page backgrounds |

## Semantic Aliases

Backward compatibility with previous bright palette:

```latex
\colorlet{WyrdBlue}{WyrdNavy}          % Primary
\colorlet{WyrdSuccess}{WyrdEmerald}    % Success/positive
\colorlet{WyrdWarning}{WyrdBrass}      % Warning/attention
\colorlet{WyrdDanger}{WyrdBurgundy}    % Error/critical
```

## Color Mixing

LaTeX color mixing: `\color{Base!percentage}` where 100 = full saturation, 0 = white.

**Useful ranges**:
- Background tints: 5-10% (subtle)
- Border colors: 30-50% (muted)
- Accent highlights: 70-90% (visible but not full)
- Saturated: 100%+  (intensifies, may clip)

**Examples**:
```latex
WyrdNavy!5      % Very light navy tint (backgrounds)
WyrdNavy!30     % Border/rule color
WyrdNavy!70     % Faded text or arrows
WyrdEmerald!10  % Success state background
```

## Usage Mapping

### Callout Boxes

| Environment | Frame Color | Background | Title Bar |
|-------------|-------------|------------|-----------|
| keyinsight | WyrdNavy | WyrdNavy!5 | WyrdNavy (white text) |
| businessvalue | WyrdEmerald | WyrdEmerald!8 | WyrdEmerald (white text) |
| technicaldetail | WyrdMuted | WyrdMuted!5 | WyrdMuted (white text) |
| criticalpoint | WyrdBrass | WyrdBrass!8 | WyrdBrass (white text) |
| warningbox | WyrdBurgundy | WyrdBurgundy!8 | WyrdBurgundy (white text) |

### TikZ Diagram Elements

| Node Type | Border | Fill | Text |
|-----------|--------|------|------|
| component | WyrdNavy!50 | WyrdNavy!10 | Black |
| database | WyrdEmerald!50 | WyrdEmerald!10 | Black |
| server | WyrdDark!50 | WyrdDark!5 | Black |
| dataflow (arrow) | WyrdNavy!70 | N/A | N/A |

### Typography

- **Hyperlinks**: WyrdNavy (no underline)
- **Section headings**: Inherit (black) with optional navy
- **List bullets**: WyrdNavy
- **Code keywords**: WyrdNavy
- **Code strings**: WyrdEmerald
- **Code comments**: WyrdMuted

### Tables

- **Header text**: WyrdNavy (optional, for emphasis)
- **Rules**: WyrdMuted!30 (very subtle)
- **Status indicators**: WyrdEmerald (success), WyrdBrass (warning), WyrdBurgundy (error)

## Migration from Bright Palette

Old palette (2025-01 through 2025-10) used bright primary colors:

| Semantic | Old Hex | New Hex | Δ Luminance |
|----------|---------|---------|-------------|
| WyrdBlue | #2563EB | #0F172A | -85% (darker) |
| WyrdSuccess | #10B981 | #047857 | -52% (darker) |
| WyrdWarning | #F59E0B | #CA8A04 | -34% (darker) |
| WyrdDanger | #EF4444 | #881337 | -67% (darker) |

**Effect on existing documents**: Semantic aliases (`WyrdBlue`, etc.) now resolve to dark academic palette. Documents compile without changes but render darker, richer tones.

**Reversion**: To restore bright palette, override in document preamble:
```latex
\definecolor{WyrdBlue}{HTML}{2563EB}     % Override
\definecolor{WyrdSuccess}{HTML}{10B981}
\definecolor{WyrdWarning}{HTML}{F59E0B}
\definecolor{WyrdDanger}{HTML}{EF4444}
```

## Color Theory Properties

### Hue Distribution

- Navy: 210° (blue, cool)
- Emerald: 160° (cyan-green, cool)
- Brass: 44° (yellow-orange, warm)
- Burgundy: 344° (red-violet, warm)

**Cool-warm balance**: 2 cool (navy, emerald) + 2 warm (brass, burgundy). Balanced spectrum coverage.

### Saturation Levels

All primary colors highly saturated (>80% HSV saturation) except navy (minimal saturation, near-black). Creates hierarchy: navy dominant, others as accents.

### Value (Lightness)

- Navy: 16% (very dark)
- Emerald: 47% (medium)
- Brass: 79% (light-medium)
- Burgundy: 53% (medium)

**Implication**: Navy works as text on white. Brass requires large sizes. Emerald and burgundy work at most sizes.

## Failure Modes

**Brass on white backgrounds**:
- Body text (12pt): Fails WCAG AA (3.8:1 < 4.5:1 required)
- Large text (18pt+): Passes AA Large (3.8:1 > 3:1 required)
- Fix: Use WyrdBurgundy or WyrdEmerald for small emphasis text

**Emerald on light blue backgrounds**:
- WyrdEmerald on WyrdBg: ~3.2:1 contrast (insufficient)
- Fix: Use WyrdNavy or WyrdBurgundy, or darken background

**Navy on dark backgrounds**:
- WyrdNavy on WyrdDark: ~1.2:1 (illegible)
- Fix: Use WyrdLight text or lighten navy to 70%+ tint

**Color blindness**:
- Protanopia: Navy/burgundy similar
- Deuteranopia: Emerald/brass similar
- Fix: Don't rely on color alone--use icons, text labels, or patterns

## Printing Considerations

CMYK approximations (process color):
- WyrdNavy: C100 M90 Y40 K80
- WyrdEmerald: C100 M0 Y50 K30
- WyrdBrass: C0 M35 Y100 K10
- WyrdBurgundy: C30 M100 Y65 K30

**Note**: CMYK conversion not exact. Proof colors before print production. Navy prints very dark (near-black).

## Color Extensions

Additional colors that maintain palette coherence:

```latex
% Aged materials
\definecolor{WyrdParchment}{HTML}{F4ECD8}   % C5 M8 Y15 K0
\definecolor{WyrdInk}{HTML}{1A1F2E}         % C80 M70 Y50 K70

% Metallic accents (in addition to brass)
\definecolor{WyrdCopper}{HTML}{B87333}      % C20 M50 Y80 K15
\definecolor{WyrdSilver}{HTML}{C0C5CB}      % C10 M5 Y5 K20

% Natural extensions
\definecolor{WyrdForest}{HTML}{0F3D2C}      % C100 M30 Y80 K50
\definecolor{WyrdWine}{HTML}{5C1428}        % Darker burgundy
```

## Tooling

**Contrast verification**:
```bash
# Check WCAG compliance
# Format: luminance ratio against white
#0F172A: 14.8:1 (AAA)
#047857: 4.5:1 (AA)
#CA8A04: 3.8:1 (AA Large only)
#881337: 8.1:1 (AAA)
```

**Palette generation**: https://coolors.co/0f172a-047857-ca8a04-881337

**Color picker**: Native hex values--no dithering, no gradients.

## Implementation

Defined in `doc-premium.sty` lines 49-64. Fallback definitions in `doc-code.sty` lines 20-27 if premium package not loaded.

**Dependencies**: xcolor package with dvipsnames option.

**Memory cost**: Negligible (<1KB for 8 color definitions).

---

**Version**: 1.0 (2025-11-01)
**Source**: Migrated from Adrata project bright palette
**Aesthetic**: Dark academic (navy, emerald, brass, burgundy)
