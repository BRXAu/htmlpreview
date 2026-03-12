#!/bin/bash

for dir in */; do
  zip -r "${dir%/}.zip" "$dir" -x "*/.*"
done