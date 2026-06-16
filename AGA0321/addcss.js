const fs = require('fs');
const path = require('path');

const css = `
<style>

#point01, #point02, #plus {
  opacity: 0;
}

#point01 {
  animation: showIt 0.4s forwards;
  animation-delay: 0.5s;
}

#plus {
  animation: showIt 0.4s forwards;
  animation-delay: 1s;
}

#point02 {
  animation: showIt 0.4s forwards;
  animation-delay: 1.5s;
}

@keyframes showIt {
  to {
    opacity: 1;
  }
}

</style>
`;

const files = fs.readdirSync('.');

files.forEach(file => {

  if (
    fs.statSync(file).isFile() &&
    file.includes('-opt.svg')
  ) {

    const svg = fs.readFileSync(file, 'utf8');

    const updatedSvg = svg.includes('<svg')
  ? svg
      .replace(/<\?xml[^>]*\?>\s*/i, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(
        /<svg\b[^>]*viewBox="0 0 (\d+) (\d+)"[^>]*>/i,
        (_, width, height) =>
          `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">`
      )
      .replace(
        /<svg([^>]*)>/i,
        `<svg$1>${css}`
      )
  : svg;

    const outputFile = file.replace(
      /-opt\.svg$/i,
      '-animate.svg'
    );

    fs.writeFileSync(
      outputFile,
      updatedSvg,
      'utf8'
    );

    console.log(`Created ${outputFile}`);
  }
});