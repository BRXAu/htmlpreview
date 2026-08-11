const fs = require('fs')
const { execSync } = require('child_process')

const sourceMjml = 'edm.mjml'
const darkMjml = 'edm-dark.mjml'

const outputHtml = 'edm.html'
const darkOutputHtml = 'edm-dark.html'

const noImages = 'edm-no-images.html'


// Add the six exact search/replacement pairs here.
const replacements = [
  {
    search: '/* start css dark-mode */ /*',
    replace: '/* start css dark-mode */'
  },
  {
    search: '*/ /* end css dark-mode */',
    replace: '/* end css dark-mode */'
  },
  {
    search: '<!-- Start colour scheme dark --><!--',
    replace: '<!-- Start colour scheme dark -->'
  },
  {
    search: '--><!-- End colour scheme dark -->',
    replace: '<!-- End colour scheme dark -->'
  },
  {
    search: '<!-- Start colour scheme default -->',
    replace: '<!-- Start colour scheme default --><!--'
  },
  {
    search: '<!-- End colour scheme default -->',
    replace: '--><!-- End colour scheme default -->'
  }
]

try {
  console.log('Compiling standard MJML...')

  execSync(`npx mjml ${sourceMjml} -o ${outputHtml}`, {
    stdio: 'inherit'
  })

  console.log('Copying MJML source...')

  fs.copyFileSync(sourceMjml, darkMjml)

  console.log('Applying dark-mode replacements...')

  let darkContent = fs.readFileSync(darkMjml, 'utf8')

  for (const { search, replace } of replacements) {
    darkContent = darkContent.split(search).join(replace)
  }

  fs.writeFileSync(darkMjml, darkContent)

  console.log('Compiling dark-mode MJML...')

  execSync(`npx mjml ${darkMjml} -o ${darkOutputHtml}`, {
    stdio: 'inherit'
  })

  fs.copyFileSync(outputHtml, noImages)

  let noImageContent = fs.readFileSync(noImages, 'utf8')

  noImageContent = noImageContent
  .replace(/\.jpg\b/gi, '_no-image.jpg')
  .replace(/\.png\b/gi, '_no-image.png')


  fs.writeFileSync(noImages, noImageContent)



  console.log('Done.')
  console.log(`Created: ${outputHtml}`)
  console.log(`Created: ${darkOutputHtml}`)
} catch (error) {
  console.error('Build failed.')
  process.exit(1)
}