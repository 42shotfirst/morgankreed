---
last_modified: 2025-11-01
git_commit: New
---

# Wyrd LaTeX Premium Fonts

Professional fonts for beautiful LaTeX documents. These fonts are required for `doc-premium.sty`.

## Required Fonts

### 1. Source Serif 4 (Main Text Font)
Beautiful serif font for body text and headings.

- **Google Fonts**: https://fonts.google.com/specimen/Source+Serif+4
- **Adobe Fonts**: https://fonts.adobe.com/fonts/source-serif
- **GitHub**: https://github.com/adobe-fonts/source-serif
- **Weights Needed**: Regular, Italic, Bold, Bold Italic
- **Format**: OTF or TTF

### 2. IBM Plex Sans (Sans-serif Font)
Clean sans-serif for headers, captions, and UI elements.

- **Google Fonts**: https://fonts.google.com/specimen/IBM+Plex+Sans
- **IBM GitHub**: https://github.com/IBM/plex/releases/latest
- **Weights Needed**: Regular, Medium, Bold, Italic, Bold Italic
- **Format**: OTF or TTF

### 3. JetBrains Mono (Monospace Font)
Modern monospace font with excellent code readability.

- **Official Site**: https://www.jetbrains.com/lp/mono/
- **Google Fonts**: https://fonts.google.com/specimen/JetBrains+Mono
- **GitHub**: https://github.com/JetBrains/JetBrainsMono/releases/latest
- **Weights Needed**: Regular, Bold, Italic, Bold Italic
- **Format**: OTF or TTF

### 4. TeX Gyre Termes Math (Mathematical Font)
Professional mathematical symbols and equations.

- **Included with**: TeX Live distribution
- **Manual Download**: http://www.gust.org.pl/projects/e-foundry/tex-gyre/math
- **Used for**: Mathematical equations and symbols
- **Note**: Usually auto-installed with LaTeX

## Quick Installation

### macOS (via Homebrew)
```bash
brew tap homebrew/cask-fonts
brew install font-source-serif
brew install font-ibm-plex-sans
brew install font-jetbrains-mono
```

### Ubuntu/Debian
```bash
# Available in repositories (may be older versions)
sudo apt install fonts-source-serif-pro
sudo apt install fonts-ibm-plex

# JetBrains Mono - manual download recommended
# Download from: https://www.jetbrains.com/lp/mono/
# Then: sudo mkdir -p /usr/share/fonts/truetype/jetbrains
#       sudo cp *.ttf /usr/share/fonts/truetype/jetbrains/
#       sudo fc-cache -f -v
```

### Arch Linux
```bash
sudo pacman -S adobe-source-serif-fonts
sudo pacman -S ttf-ibm-plex
yay -S ttf-jetbrains-mono
```

### Manual Installation (All Platforms)

1. **Download fonts** from links above
2. **Install system-wide** (not user-only):
   - **Linux**: Copy to `/usr/share/fonts/truetype/` or `~/.local/share/fonts/`
   - **macOS**: Use Font Book or copy to `/Library/Fonts/`
   - **Windows**: Right-click font files → Install for all users
3. **Clear font cache**:
   ```bash
   # Linux
   fc-cache -f -v

   # macOS
   atsutil databases -remove
   ```
4. **Verify installation**:
   ```bash
   fc-list | grep -i "source\|ibm\|jetbrains"
   ```

## Verification

After installation, these commands should return font paths:

```bash
# Check Source Serif
fc-list | grep -i "source serif"

# Check IBM Plex
fc-list | grep -i "ibm plex"

# Check JetBrains Mono
fc-list | grep -i "jetbrains"

# Check TeX Gyre (usually pre-installed)
fc-list | grep -i "tex gyre"
```

## Font Usage

When you use `\usepackage{doc-premium}`, fonts are automatically configured:

- **Source Serif 4**: Body text, headings, all main content
- **IBM Plex Sans**: Headers, footers, captions, table headers, callout titles
- **JetBrains Mono**: Code listings, file paths, technical specifications
- **TeX Gyre Termes Math**: Mathematical equations, formulas, symbols

## Using Without Premium Fonts

If you don't have premium fonts installed, create a basic style instead:

```latex
% Use standard LaTeX fonts
\documentclass{article}
\usepackage{lmodern}  % Latin Modern fonts
\usepackage{doc-tables}  % Still use table styles
\usepackage{doc-math}    % Still use math macros
\usepackage{doc-code}    % Still use code styles
```

Or create a fallback preamble:

```latex
% Fallback fonts (no fontspec required)
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage{lmodern}
\usepackage{inconsolata}  % Monospace alternative

% Then use other Wyrd packages
\usepackage{doc-tables}
\usepackage{doc-math}
\usepackage{doc-code}
```

## Troubleshooting

### "Font not found" Error

**Problem:** LaTeX can't find the fonts even after installation.

**Solution:**
1. Verify fonts are installed system-wide (not just user)
2. Clear font cache: `fc-cache -f -v`
3. Restart your editor/IDE
4. Check compilation with LuaLaTeX (not PDFLaTeX):
   ```bash
   lualatex main.tex
   ```

### Compilation Hangs

**Problem:** Compilation takes forever or hangs.

**Solution:**
- First compilation with fontspec can be slow
- Subsequent compilations are fast
- Use `make draft` for faster iteration

### Wrong Font Displayed

**Problem:** Document uses different fonts than expected.

**Solution:**
1. Ensure using LuaLaTeX: `LATEX_COMPILER = lualatex` in Makefile
2. Check font names exactly match:
   ```bash
   fc-list | grep "Source Serif"
   # Should show: Source Serif 4
   ```
3. Clear LaTeX cache: `make clean`

### PDF Looks Different

**Problem:** PDF appearance differs from expected.

**Solution:**
- Fonts must be exactly "Source Serif 4", "IBM Plex Sans", "JetBrains Mono"
- Version numbers matter (Source Serif 4, not 3)
- Check weights installed (Regular, Bold, Italic, Bold Italic)

## Font Licensing

All fonts are **free and open source**:

- **Source Serif 4**: SIL Open Font License 1.1
- **IBM Plex Sans**: SIL Open Font License 1.1
- **JetBrains Mono**: SIL Open Font License 1.1
- **TeX Gyre**: GUST Font License

Safe for commercial and personal use.

## Alternative Font Combinations

If premium fonts aren't available, good alternatives:

### Classic Academic
```latex
\setmainfont{TeX Gyre Termes}  % Times-like
\setsansfont{TeX Gyre Heros}   % Helvetica-like
\setmonofont{TeX Gyre Cursor}  % Courier-like
```

### Modern Professional
```latex
\setmainfont{Libertinus Serif}
\setsansfont{Fira Sans}
\setmonofont{Fira Mono}
```

### Google Fonts Alternative
```latex
\setmainfont{Noto Serif}
\setsansfont{Noto Sans}
\setmonofont{Noto Sans Mono}
```

## Resources

- **Font Testing**: https://www.fontspace.com/
- **LaTeX Font Catalogue**: https://tug.org/FontCatalogue/
- **Google Fonts**: https://fonts.google.com/
- **Font Squirrel**: https://www.fontsquirrel.com/

---

**Questions?** See [STYLES.md](STYLES.md) for usage examples and [../README.md](../README.md) for build system documentation.
