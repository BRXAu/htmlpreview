#!/bin/bash

SOURCE="edm.html"
DEST="edm-dark.html"

# Copy the original file
cp "$SOURCE" "$DEST"

# Dark-mode CSS to insert
DARK_CSS='body {filter: invert(1) hue-rotate(180deg); background: #000;} img {filter: invert(1) hue-rotate(180deg); }'

# Use awk to insert CSS after the first <style> tag
awk -v css="$DARK_CSS" '
  {print}
  !done && /<style>/ {
    print css
    done=1
  }
' "$DEST" > "${DEST}.tmp" && mv "${DEST}.tmp" "$DEST"

echo "Created $DEST with dark-mode CSS."
