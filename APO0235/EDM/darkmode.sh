#!/bin/bash

# CSS text exactly as you want it
CSS_BLOCK='body {
background: #000000!important;

}

table,


p {
color: #FFFFFF!important;
}

div {
color: #FFFFFF!important;
}

a {
color: #FFFFFF!important;
}

td:not(.no-dark-mode) {
/* styles here */
color: #FFFFFF!important;
}'

replace_marker() {
  local input="$1"
  local output="$2"

  cp "$input" "$output"

  # Replace the marker in place
  perl -0777 -pe "s|/\*darkmodestyles\*/|$CSS_BLOCK|" "$output" > tmp && mv tmp "$output"
}

replace_marker "edm.html" "edm-dark.html"
replace_marker "edm02.html" "edm02-dark.html"