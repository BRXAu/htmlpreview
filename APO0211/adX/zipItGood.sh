#!/bin/bash

# Create a zip folder if it doesn't exist
mkdir -p zip

# Loop through all directories
for dir in */; do
  # Remove all main.js.LICENSE.txt files recursively inside the directory
  find "$dir" -type f -name "main.js.LICENSE.txt" -exec rm -f {} \;

  # Zip the directory excluding hidden files
  zip -r "zip/${dir%/}.zip" "$dir" -x "*/.*"
done