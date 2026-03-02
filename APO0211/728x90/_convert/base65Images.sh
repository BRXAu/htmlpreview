#!/bin/bash

for svg in *.svg; do
  [ -e "$svg" ] || continue

  while grep -qE 'href="[^"]+\.(png|jpg|jpeg)"' "$svg"; do
    img=$(grep -oE 'href="[^"]+\.(png|jpg|jpeg)"' "$svg" | head -n1 | cut -d'"' -f2)

    case "$img" in
      *.png) mime="image/png" ;;
      *.jpg|*.jpeg) mime="image/jpeg" ;;
    esac

    base64_data=$(base64 "$img" | tr -d '\n')

    sed -i '' "0,/href=\"$img\"/s|href=\"$img\"|href=\"data:$mime;base64,$base64_data\"|" "$svg"
  done

done

echo "Done."