#!/bin/bash
# review-pdf.sh - Convert PDF to images for visual review
#
# Usage: ./review-pdf.sh <path-to-pdf> [dpi]
#
# This script converts a PDF to PNG images for visual analysis
# of layout issues like orphaned headers, widows, and bad page breaks.

set -e

PDF_PATH="$1"
DPI="${2:-150}"
REVIEW_DIR="/tmp/pdf-review"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

usage() {
    echo "Usage: $0 <path-to-pdf> [dpi]"
    echo ""
    echo "Arguments:"
    echo "  path-to-pdf  Path to the PDF file to review"
    echo "  dpi          Resolution for images (default: 150)"
    echo ""
    echo "Examples:"
    echo "  $0 document.pdf"
    echo "  $0 document.pdf 200"
    exit 1
}

if [ -z "$PDF_PATH" ]; then
    usage
fi

if [ ! -f "$PDF_PATH" ]; then
    echo -e "${RED}Error: PDF file not found: $PDF_PATH${NC}"
    exit 1
fi

# Check for pdftoppm
if ! command -v pdftoppm &> /dev/null; then
    echo -e "${RED}Error: pdftoppm not found${NC}"
    echo "Install with:"
    echo "  Ubuntu/Debian: sudo apt-get install poppler-utils"
    echo "  macOS: brew install poppler"
    exit 1
fi

# Clean and create review directory
echo -e "${YELLOW}Preparing review directory...${NC}"
rm -rf "$REVIEW_DIR"
mkdir -p "$REVIEW_DIR"

# Convert PDF to images
echo -e "${YELLOW}Converting PDF to images at ${DPI} DPI...${NC}"
pdftoppm -png -r "$DPI" "$PDF_PATH" "$REVIEW_DIR/page"

# Count pages
PAGE_COUNT=$(ls "$REVIEW_DIR"/*.png 2>/dev/null | wc -l)

echo -e "${GREEN}Success!${NC}"
echo ""
echo "Converted $PAGE_COUNT pages to: $REVIEW_DIR/"
echo ""
echo "To review pages in Claude Code, use:"
echo "  Read /tmp/pdf-review/page-01.png"
echo "  Read /tmp/pdf-review/page-02.png"
echo "  ..."
echo ""
echo "Or review specific pages:"
for i in $(seq -f "%02g" 1 $PAGE_COUNT); do
    echo "  Read /tmp/pdf-review/page-$i.png"
done
echo ""
echo "To clean up when done:"
echo "  rm -rf /tmp/pdf-review"
