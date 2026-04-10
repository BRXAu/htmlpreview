#!/bin/bash

# If a folder path is provided as argument, use it; otherwise default to current directory
if [ -n "$1" ]; then
    # If it's an absolute path
    if [[ "$1" = /* ]]; then
        base_dir="$1"
    else
        # Treat as relative path
        base_dir="$(pwd)/$1"
    fi
else
    base_dir="$(pwd)"
fi

# Move into the chosen directory
cd "$base_dir" || { echo "Folder not found: $base_dir"; exit 1; }

# Parent folder name
parent=$(basename "$base_dir")

# Loop through subfolders and zip each
for dir in */; do
    dirname=$(basename "$dir")
    zipname="${dirname}.zip"
    zip -r "$zipname" "$dir"
done
