async function runAIUpdate(styles) {
    const prompt = document.getElementById("aiPrompt").value;

    let jsonString = JSON.stringify({
      model: "llama3",
      prompt: `You are controlling animation CSS variables.  the variables are: ${styles} The user will describe visual changes. Output ONLY revised CSS variable values based on USER request. No explanations. No preamble.  Display entire css variables including ones not changed. No line breaks!. User request: ${prompt}`
    })

    const response = await fetch("http://localhost:3001/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonString

    });

    const result = await response.text();
    styles == JSON.parse(result).output.trim();
    updateCSSValues(cssObj,styles);
}


function updateCSSValues (cssObj,styles){

  let cssValues = styles.replace(/\`/g,"")
        
  const cssObject = Object.fromEntries(
    cssValues
    .trim()
    .split(/\n/) // split by line
    .map(line => line.trim().replace(/^--/, '').replace(/;$/, '')) // remove -- and ;
    .map(line => {
    const [key, value] = line.split(/:\s*/); // split by :
      return [key, value];
    })
  );
  

  for (const key in cssObj) {
    const [v1, v2] = cssObj[key];
    const el = document.getElementById(key);
    el.value =  cssObject[v1] || "";
  }

}