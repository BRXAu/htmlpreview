const fs = require("fs");
const path = require("path");
const { minify } = require("html-minifier-terser");

async function minifyHtmlFiles(dir) {
	const items = fs.readdirSync(dir);

	for (const item of items) {
		const fullPath = path.join(dir, item);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			await minifyHtmlFiles(fullPath);
		} else if (path.extname(fullPath) === ".html") {
			const html = fs.readFileSync(fullPath, "utf8");

			const minified = await minify(html, {
				collapseWhitespace: true,
				conservativeCollapse: true,
				removeComments: true,
				minifyCSS: true,
				minifyJS: {
					compress: true,
					mangle: {
						reserved: ["clickTag", "startAd", "events"]
					}
				}
			});

			fs.writeFileSync(fullPath, minified, "utf8");

			console.log(`Minified: ${fullPath}`);
		}
	}
}

minifyHtmlFiles(process.cwd());