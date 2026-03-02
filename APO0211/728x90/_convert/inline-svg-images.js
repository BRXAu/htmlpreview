const fs = require("fs");
const path = require("path");

const folder = process.cwd();

const mimeTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const svgFiles = fs.readdirSync(folder).filter(f => f.endsWith(".svg"));

svgFiles.forEach(svgFile => {
  const svgPath = path.join(folder, svgFile);
  let content = fs.readFileSync(svgPath, "utf8");

  const imageRegex = /<image[^>]+href="([^"]+\.(png|jpg|jpeg))"[^>]*>/gi;

  content = content.replace(imageRegex, (match, imgPath) => {
    const fullImagePath = path.join(folder, imgPath);

    if (!fs.existsSync(fullImagePath)) {
      console.log(`Image not found: ${imgPath}`);
      return match;
    }

    const ext = path.extname(imgPath).toLowerCase();
    const mime = mimeTypes[ext];

    const imageBuffer = fs.readFileSync(fullImagePath);
    const base64 = imageBuffer.toString("base64");

    const dataUri = `data:${mime};base64,${base64}`;

    return match.replace(imgPath, dataUri);
  });

  fs.writeFileSync(svgPath, content, "utf8");
  console.log(`Processed: ${svgFile}`);
});

console.log("All SVG files updated.");