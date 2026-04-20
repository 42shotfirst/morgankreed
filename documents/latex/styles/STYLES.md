---
last_modified: 2025-11-01
git_commit: New
---

# Wyrd LaTeX Style Packages

Modular .sty packages extracted from Adrata project. Four independent components--load what you need.

## Package Dependency Map

```
doc-premium.sty → fontspec (LuaLaTeX/XeLaTeX required)
                 → tcolorbox, tikz, hyperref, fancyhdr
                 → Defines: 8 colors, 7 callout boxes, TikZ styles

doc-tables.sty  → booktabs, colortbl, siunitx
                 → Defines: 3 environments, 3 column types
                 → Works with pdflatex

doc-math.sty    → amsmath, amsthm, bm
                 → Defines: 50+ command shortcuts
                 → Works with pdflatex

doc-code.sty    → listings, xcolor
                 → Defines: 7 language styles, 2 inline commands
                 → Works with pdflatex
```

## doc-premium.sty

**Compiler constraint**: Requires LuaLaTeX or XeLaTeX for fontspec. PDFLaTeX fails.

**Font dependencies**: Source Serif 4, IBM Plex Sans, JetBrains Mono, TeX Gyre Termes Math. System must provide these fonts--see FONTS.md for installation. Missing fonts cause compilation failure.

### Color Definitions

Dark academic palette. Direct colors plus semantic aliases for backward compatibility.

```latex
% Direct colors (preferred)
WyrdNavy      #0F172A   % Primary brand
WyrdEmerald   #047857   % Success states
WyrdBrass     #CA8A04   % Warnings
WyrdBurgundy  #881337   % Errors
WyrdDark      #020617   % Text emphasis
WyrdMuted     #475569   % Secondary text
WyrdLight     #F8FAFC   % Backgrounds
WyrdBg        #E0E7ED   % Page tint

% Semantic aliases (map to above)
WyrdBlue      → WyrdNavy
WyrdSuccess   → WyrdEmerald
WyrdWarning   → WyrdBrass
WyrdDanger    → WyrdBurgundy
```

**Contrast ratios** (against white):
- Navy: 14.8:1 (AAA)
- Emerald: 4.5:1 (AA)
- Brass: 3.8:1 (AA Large only)
- Burgundy: 8.1:1 (AAA)

Brass fails small text accessibility. Don't use for body text.

### Callout Boxes (tcolorbox)

Seven environments. Each maps to color + default title. Override title with optional parameter.

```latex
\begin{keyinsight}[Custom Title]
Content. Renders with navy frame, 5% navy background, white title bar.
\end{keyinsight}

\begin{businessvalue}      % Emerald theme
\begin{technicaldetail}    % Muted gray theme
\begin{criticalpoint}      % Brass theme
\begin{warningbox}         % Burgundy theme
\begin{callout}            % Light gray, no colored title bar
\begin{notebox}            % Minimal styling, no title
```

**Box styling parameters** (all environments):
- Left rule: 3pt colored
- Padding: 8pt top/bottom, 12pt left/right
- Font: Sans-serif bold title, body inherits
- Breakable across pages

**Failure mode**: Missing tcolorbox package crashes compilation. No graceful degradation.

### TikZ Styles

Pre-configured node and arrow styles for system diagrams.

```latex
\node[component] {API};      % Rectangle, navy border, 10% fill
\node[database] {DB};        % Cylinder, emerald theme
\node[server] {Worker};      % Rectangle, dark theme
\draw[dataflow] (a) -- (b);  % Arrow, 70% navy, thick
```

**Positioning**: Requires tikz positioning library. Load explicitly if using relative positioning (above=of, etc).

### Typography

- Line spacing: 1.08 (microtype protrusion + expansion enabled)
- Paragraph indent: 0pt
- Paragraph skip: 6pt ±3pt glue
- List item bullets: Colored navy
- Hyperlinks: Navy, no border

### Headers/Footers (fancyhdr)

- Header left: Document title (from `\@title`)
- Header right: Section name (`\leftmark`)
- Footer center: Page number
- Rule: 0.5pt, 30% navy

Override by redefining `\fancyhead` after loading package.

## doc-tables.sty

**No compiler constraints**. Works with pdflatex, lualatex, xelatex.

### Standard Environments

Pre-configured column widths and spacing.

```latex
\begin{wyrdtab2}[Caption]
\textbf{Property} & \textbf{Value} \\
\midrule
Latency & 170ms \\
\end{wyrdtab2}

% Column spec: p{4cm} p{8cm}
% Row height: 1.6× base
% Caption: Above table
% Position: H (float.sty)
```

**Available environments**:
- `wyrdtab2`: 4cm + 8cm columns (property-value pairs)
- `wyrdtab3`: 3.5cm + 5.5cm + 5cm columns (component-tech-purpose)
- `wyrdtab{spec}`: Custom column specification
- `wyrdtabwide{spec}`: Full `\textwidth` with automatic spacing

**Backward compatibility**: Environments `adratatab`, `adratatab2`, `adratatab3` alias to wyrd equivalents.

### Custom Column Types

```latex
L{width}  % Left-aligned, fixed width
C{width}  % Center-aligned, fixed width
R{width}  % Right-aligned, fixed width

% Example
\begin{wyrdtab}[Caption]{L{3cm}C{4cm}R{3cm}}
```

**Numeric columns** (siunitx):
```latex
S[table-format=3.2]  % 3 digits before decimal, 2 after
```

Default format: 3.2 with comma group separator.

### Failure Modes

- Missing `\midrule` between header and body: Renders but looks wrong
- Caption with special chars: Wrap in `\protect`
- Table wider than text width: Overflows margin, no warning

## doc-math.sty

**No compiler constraints**. Adds 50+ command shortcuts. Zero overhead if commands unused.

### Number Sets

```latex
\R   % ℝ
\N   % ℕ
\Z   % ℤ
\Q   % ℚ
\C   % ℂ
```

### Probability

```latex
\E[X]           % 𝔼[X]
\Prob(A)        % ℙ(A)
\E[X \given Y]  % 𝔼[X | Y]
X \indep Y      % X ⊥⊥ Y
\var(X)         % Var(X)
\cov(X,Y)       % Cov(X,Y)
```

### Vectors and Matrices

```latex
\vect{x}              % Bold vector
\mat{A}               % Bold matrix
\norm{\vect{x}}       % ‖x‖
\abs{x}               % |x|
\inner{\vect{x}}{\vect{y}}  % ⟨x, y⟩
```

### Operators

```latex
\argmax_{x} f(x)
\argmin_{x} f(x)
\sign(x)
\rank(\mat{A})
\trace(\mat{A})
\diag(\vect{x})
```

### Machine Learning

```latex
\loss         % ℒ (loss function)
\risk         % ℛ (risk)
\hypothesis   % ℋ (hypothesis space)
\dataset      % 𝒟 (dataset)
```

### Graph Theory

```latex
\graph        % 𝒢
\nodes        % 𝒱
\edges        % ℰ
\neighbors    % 𝒩
```

### Neural Networks

```latex
\features     % x
\hidden       % h
\attention    % a
\layer        % ℓ
\sigmoid      % σ
\softmax
\layernorm    % LN
```

### Reinforcement Learning

```latex
\policy       % π
\state        % s
\action       % a
\reward       % r
\horizon      % H
\discount     % γ
\valuefn      % V
\qfn          % Q
```

**Command conflicts**: If another package defines same command, last definition wins. Load doc-math after domain-specific packages to override.

## doc-code.sty

**No compiler constraints**. Configures listings package with color scheme.

### Base Configuration

```latex
% Applied to all code blocks
basicstyle=\ttfamily\small
keywordstyle=\color{WyrdBlue}\bfseries    % Navy keywords
commentstyle=\color{WyrdMuted}\itshape    % Gray comments
stringstyle=\color{WyrdSuccess}           % Emerald strings
backgroundcolor=\color{WyrdLight}
frame=single, frameround=tttt
numbers=left, numberstyle=\tiny\color{WyrdMuted}
```

### Language Styles

Pre-configured for:
- Python (async/await, self, cls)
- JavaScript (const, let, async, await, import, from)
- Java (var, record, sealed)
- SQL (SERIAL, JSONB, UUID, TIMESTAMP)
- Bash (sudo, apt, brew, docker)
- JSON (string highlighting)
- YAML (key coloring)

**Override per-listing**:
```latex
\begin{lstlisting}[language=Python, numbers=none, frame=none]
# Custom styling
\end{lstlisting}
```

### Custom Environments

```latex
\begin{wyrdcode}[Caption]{Language}
code here
\end{wyrdcode}

\wyrdcodefile[Caption]{Language}{path/to/file.ext}
```

**Inline code**:
```latex
\code{text}           % Monospace, no background
\codeline{text}       % Monospace, light gray background
```

### Failure Modes

- Undefined language: Falls back to plain text, no error
- Special chars in code (%, $, &): Escape with backslash or use `\lstinline[breaklines]{}`
- Unicode in code: Requires fontspec (LuaLaTeX)

## Loading Strategy

### Minimal (pdflatex compatible)

```latex
\usepackage{doc-tables}
\usepackage{doc-math}
\usepackage{doc-code}
% Skip doc-premium if no premium fonts
```

### Full Stack (LuaLaTeX required)

```latex
\usepackage{doc-premium}  % Load first (defines colors)
\usepackage{doc-tables}
\usepackage{doc-math}
\usepackage{doc-code}
```

**Load order matters**: doc-code checks if WyrdBlue exists. If undefined, defines fallback colors. Load doc-premium first to use consistent palette.

## Integration with Build System

Unified build system sets `TEXINPUTS=../../styles:` automatically. Manual compilation requires:

```bash
export TEXINPUTS=./path/to/styles:
lualatex main.tex
```

**Verification**:
```bash
kpsewhich doc-premium.sty  # Should return path
```

Returns nothing → TEXINPUTS wrong or styles not in search path.

## Migration from Adrata

Old constructs still work:

```latex
\begin{adratatab3}      → \begin{wyrdtab3}
\textcolor{AdrataBlue}  → \textcolor{WyrdBlue}
```

Color values changed (bright blue → navy), but semantic meaning preserved. Documents compile without modification but render with new palette.

## Constraints and Failure Modes

**doc-premium.sty**:
- Requires LuaLaTeX/XeLaTeX (fontspec dependency)
- Requires system fonts installed
- First compilation slow (font cache building)
- Incompatible with `\usepackage[T1]{fontenc}`

**doc-tables.sty**:
- Requires booktabs (table rules)
- `\midrule` mandatory between header/body
- Float positioning [H] requires float package

**doc-math.sty**:
- Command name collisions possible
- No equation numbering changes (use AMS defaults)

**doc-code.sty**:
- listings package doesn't handle all Unicode
- Line numbers reset per environment
- Long lines: Set `breaklines=true` or overflow margin

## Resources

- Color specifications: [COLOR_PALETTE.md](COLOR_PALETTE.md)
- Font installation: [FONTS.md](FONTS.md)
- Build system: [../README.md](../README.md)
- Working implementation: [../projects/example-project/](../projects/example-project/)

---

**Source**: Extracted from legacy/orchestrator-java/src/main/resources/db/migration/adrata/ project preamble.tex and macros.tex (2025-11-01).
