#!/bin/bash

# If a folder path is provided as argument, use it; otherwise default to current directory
if [ -n "$1" ]; then
    if [[ "$1" = /* ]]; then
        base_dir="$1"
    else
        base_dir="$(pwd)/$1"
    fi
else
    base_dir="$(pwd)"
fi

# Move into the chosen directory
cd "$base_dir" || { echo "Folder not found: $base_dir"; exit 1; }

# Create output folder
output_dir="_despatch"
mkdir -p "$output_dir"

# Loop through subfolders and zip each (skip folders starting with _)
for dir in */; do
    dirname=$(basename "$dir")

    # Skip folders starting with _
    if [[ "$dirname" == _* ]]; then
        continue
    fi

    zipname="${dirname}.zip"

    # Create zip inside _despatch
    zip -r "${output_dir}/${zipname}" "$dir"
done