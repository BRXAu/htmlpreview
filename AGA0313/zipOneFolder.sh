#!/bin/bash

# Require a folder argument
if [ -z "$1" ]; then
    echo "Usage: $0 <folder-path>"
    exit 1
fi

# Resolve to absolute path
if [[ "$1" = /* ]]; then
    target_dir="$1"
else
    target_dir="$(pwd)/$1"
fi

# Check it exists
if [ ! -d "$target_dir" ]; then
    echo "Folder not found: $target_dir"
    exit 1
fi

# Get just the folder name
dirname=$(basename "$target_dir")

# Zip into current directory (where command is run)
zip -r "${dirname}.zip" "$target_dir" \
    -x "*.DS_Store" \
    -x "**/.DS_Store" \
    -x "*.AppleDouble" \
    -x "*.LSOverride" \
    -x "Icon?" \
    -x "._*" \
    -x "*/main.js.LICENSE.txt"

    #sh zipOneFolder.sh AGA0313_SME__10k_Display_160x600