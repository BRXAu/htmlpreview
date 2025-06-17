#!/bin/bash

# Create _despatch folder if it doesn't exist
mkdir -p _despatch

# Loop through all directories starting with 'you'
for dir in YOU*/ ; do
  # Check if it's actually a directory
  if [ -d "$dir" ]; then
    # Remove trailing slash for zip filename
    folder_name="${dir%/}"
    # Zip the folder and move the zip to _despatch
    zip -r "_despatch/${folder_name}.zip" "$folder_name"
  fi
done
