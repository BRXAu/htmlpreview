Project: HOX0043 – preloader animation
Author: BRX
Date: 10 Feb 2026

Description
SVG preloader animation built with GSAP. Designed for landing pages and rich media units.

Dependencies
- GSAP v3+
  Example CDN:
  https://s0.2mdn.net/ads/studio/cached_libs/gsap_3.13_min.js

Setup
1. Include GSAP in the page <head>
2. Include preloader.js before closing </body>
4. Call startCustomSVGLoader() or allow auto init

Code
- /js/preloader.js
  Contains animation logic and loader initialisation

Sample
- samplePage.html
  Demonstrates example implementation and markup structure.
  Notes for testing in browser Inspector:
    • Disable cache in Network tab
    • Disable throttling (or set to desired network speed) to properly observe animation timing
