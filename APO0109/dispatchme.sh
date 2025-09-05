#!/bin/bash

# Create dispatch folder if it doesn't exist
mkdir -p dispatch

# Loop through all .html files in current folder
for file in *.html; do
  [ -e "$file" ] || continue
  
  # Compress into a zip archive inside dispatch folder
  zip "dispatch/${file%.html}.zip" "$file"
done

echo "Zip complete. Dispatch folder armed against the Anti-Monitor."
