# Pinpoint Digital Color Palette

Screen-optimized dark palette derived from getpinpoint.dev. Electric blue accent on near-black, designed for full-color digital display with no print considerations.

## Color Definitions

### Core Brand

| Name | Hex | RGB | Source |
|------|-----|-----|--------|
| PinBlack | #0A0A0F | (10, 10, 15) | CSS --background, tailwind pinpoint-black |
| PinCard | #111827 | (17, 24, 39) | CSS --card, tailwind pinpoint-card |
| PinSurface | #1A1F2E | (26, 31, 46) | Glass morphism fill layer |
| PinNavy | #1E3A5F | (30, 58, 95) | Tailwind pinpoint-navy |
| PinBlue | #3482EF | (52, 130, 239) | Tailwind pinpoint-blue (primary accent) |
| PinBlueDeep | #2563EB | (37, 99, 235) | Tailwind pinpoint-blue-deep (buttons) |

### Text Hierarchy

| Name | Hex | Contrast vs PinBlack | Usage |
|------|-----|---------------------|-------|
| PinTextBright | #F0F4F8 | ~15.8:1 (AAA) | Headings, emphasis |
| PinText | #E2E8F0 | ~13.2:1 (AAA) | Body text |
| PinTextMuted | #94A3B8 | ~6.8:1 (AA) | Captions, metadata |
| PinTextDim | #64748B | ~4.1:1 (AA Large) | Timestamps, disabled |

### Status / Semantic

| Name | Hex | Contrast vs PinBlack | Usage |
|------|-----|---------------------|-------|
| PinSuccess | #10B981 | ~7.2:1 (AA) | Positive, complete |
| PinWarning | #F59E0B | ~9.8:1 (AAA) | Caution, pending |
| PinDanger | #EF4444 | ~5.3:1 (AA) | Error, destructive |

### Borders and Structure

| Name | Hex | Purpose |
|------|-----|---------|
| PinBorder | #1F2937 | Default border, rules |
| PinBorderLight | #374151 | Emphasized borders, active states |

## Color Mixing (LaTeX)

Dark backgrounds require higher base percentages for tinted elements to remain visible.

**Callout box fills** (tinted against PinBlack):
```latex
PinBlue!6!PinBlack     % Subtle blue tint fill
PinSuccess!5!PinBlack  % Green tint fill
PinWarning!5!PinBlack  % Amber tint fill
PinDanger!5!PinBlack   % Red tint fill
```

**Borders and rules**:
```latex
PinBlue!50     % Active border
PinBlue!30     % Header rule
PinBlue!20     % Subtle accent line
PinBlue!5      % Circuit grid lines
```

**Glow effects**:
```latex
PinBlue, opacity=0.03  % Large glow radius
PinBlue!14             % Pulse node fill
PinBlue!10             % Flow trace stroke
```

## Relationship to doc-premium.sty

The digital palette replaces the dark academic palette (navy, emerald, brass, burgundy) for screen-first documents. Backward-compatible semantic aliases map to the closest digital equivalents:

| doc-premium Name | Digital Mapping |
|-----------------|-----------------|
| DocBlue / DocNavy | PinBlue / PinNavy |
| DocEmerald / DocSuccess | PinSuccess |
| DocBrass / DocWarning | PinWarning |
| DocBurgundy / DocDanger | PinDanger |
| DocDark | PinBlack |
| DocMuted | PinTextMuted |
| DocLight | PinCard |
| DocBg | PinBlack |

## Website Source Mapping

These colors trace directly to the Tailwind config and CSS custom properties.

**tailwind.config.ts**:
```
pinpoint-black: '#0a0a0f'
pinpoint-navy:  '#1e3a5f'
pinpoint-blue:  '#3482ef'
pinpoint-blue-deep: '#2563eb'
pinpoint-card:  '#111827'
```

**globals.css (HSL)**:
```
--background: 240 23% 3%     → PinBlack
--foreground: 210 40% 98%    → PinTextBright
--card: 220 26% 11%          → PinCard
--primary: 215 85% 57%       → PinBlue
--muted-foreground: 215 20% 65% → PinTextMuted
--border: 213 27% 21%        → PinBorder
```

## Accessibility

All body text (PinText on PinBlack) exceeds WCAG AAA requirements at 13.2:1 contrast. Muted text meets AA at 6.8:1. PinTextDim at 4.1:1 should only be used for decorative or supplementary content at 14pt or larger.

Status colors all pass AA against PinBlack, making them safe for inline text, callout borders, and icon fills.

---

**Version**: 1.0 (2026-03-01)
**Aesthetic**: Dark digital (electric blue accent, near-black background)
**Compiler**: Any (colors are compiler-independent)
