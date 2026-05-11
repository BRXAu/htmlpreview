const fs = require("fs");
const path = require("path");

const targetDir = process.cwd();

const oldBlock = `// ClickTag initialise
/* ClickTag Content Start */
window.onload = function(e){ 
   startAd();
}
/* ClickTag Content End */`;

const newBlock = `const jk = \`\`

const cset=\`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?<>/-{};[]'"\`;
const shd=\`\`; 

function trs80Content(str,cset,shd){
	const trs80Map = Object.fromEntries(
		shd.split("").map((c, i) => [c, cset[i]])
	);

	const trs80 = (text) =>
		text
			.split("")
			.map((c) => trs80Map[c] ?? c)
			.join("");

	return trs80(str)
}

window.onload = function () {
	const ad = document.getElementById("svgContainer");

	ad.innerHTML = trs80Content(jk, cset, shd);

	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			events();
			startAd();
		});
	});
};`;

function processDirectory(dir) {
	const items = fs.readdirSync(dir);

	for (const item of items) {
		const fullPath = path.join(dir, item);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			processDirectory(fullPath);
		} else if (path.extname(fullPath) === ".html") {
			let content = fs.readFileSync(fullPath, "utf8");

			if (content.includes(oldBlock)) {
				content = content.replace(oldBlock, newBlock);

				fs.writeFileSync(fullPath, content, "utf8");

				console.log(`Updated: ${fullPath}`);
			} else {
				console.log(`Skipped: ${fullPath}`);
			}
		}
	}
}

processDirectory(targetDir);

console.log("Replacement complete.");