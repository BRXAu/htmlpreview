#!/bin/bash

#!/bin/bash

# Loop through all .html files
for file in *.html; do
  # Skip if no HTML files found
  [ -e "$file" ] || continue
  
  # Use sed to remove data-name="*.jpg"
  sed -i.bak 's/ data-name="[^"]*\.jpg"//g' "$file"
  
  # Optional: remove backup file if not needed
  rm -f "${file}.bak"
done

echo "Removed all data-name attributes referencing .jpg files."


# Create _dispatch folder if it doesn't exist
mkdir -p _dispatch

# Loop through all .html files in the current directory
for file in *.html; do
  # Skip if no HTML files found
  [ -e "$file" ] || continue
  
  # Get filename without extension
  base="${file%.html}"
  
  # Create zip archive in _dispatch folder
  zip -j "_dispatch/${base}.zip" "$file"
done

echo "All HTML files zipped and placed in _dispatch/"
