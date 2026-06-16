mkdir -p _zip

for file in *.html; do
    [ -f "$file" ] || continue

    filename="${file%.html}"
    zipname="_zip/${filename}.zip"

    zip "$zipname" "$file"
done