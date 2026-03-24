const fs = require('fs');
const path = require('path');
const { imageSize } = require('image-size');

const inputFolder = './_output';   // folder with _jpeg.jpg and _mask.jpg
const outputFolder = './_output';     // folder to save SVGs

if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);

const files = fs.readdirSync(inputFolder);

// pick only _jpeg.jpg files
const jpegFiles = files.filter(f => f.endsWith('_jpeg.jpg'));

jpegFiles.forEach(jpegFile => {
    const baseName = jpegFile.replace('_jpeg.jpg', '');
    const maskFile = `${baseName}_mask.jpg`;

    // skip if mask not found
    if (!files.includes(maskFile)) return;

    // const jpegPath = path.join(inputFolder, jpegFile);
    // const maskPath = path.join(inputFolder, maskFile);

    const jpegPath = path.join(inputFolder, jpegFile);
    const maskPath = path.join(inputFolder, maskFile);

    // read files as buffers
    const jpegBuffer = fs.readFileSync(jpegPath);
    const maskBuffer = fs.readFileSync(maskPath);

    // get dimensions from main image
    const dimensions = imageSize(jpegBuffer);
    const width = dimensions.width / 2;
    const height = dimensions.height / 2;

    const svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
      <mask id="mask1">
        <image href="${maskFile}" width="${width}" height="${height}"/>
      </mask>
  </defs>

  <g id="image01">
    <image href="${jpegFile}" width="${width}" height="${height}" mask="url(#mask1)"/>
  </g>
</svg>`;

    const svgPath = path.join(outputFolder, `${baseName}.svg`);
    fs.writeFileSync(svgPath, svgContent);
    console.log(`Generated SVG: ${svgPath}`);
});

console.log('SVG generation complete.');