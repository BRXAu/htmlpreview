#!/bin/bash

mkdir -p zip

for dir in */; do
  zip -r "zip/${dir%/}.zip" "$dir" -x "*/.*"
done