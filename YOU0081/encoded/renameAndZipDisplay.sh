# Loop through subfolders and zip each
for dir in *.html; do
    dirname="${dir%.html}"
    zipname="_despatch/${dirname}.zip"
    zip -r "$zipname" "$dir"
done
