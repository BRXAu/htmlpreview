document.getElementById("runAi").addEventListener("click", async () => {
  const prompt = document.getElementById("aiPrompt").value;

  const jsonString = JSON.stringify({
    model: "llama3",
    prompt: `You are controlling animation CSS variables. The variables are: ${styles} The user will describe visual changes. Output revised CSS values. No explanations. User: ${prompt}`
  });

  const response = await fetch("http://localhost:3001/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonString
  });

  const result = await response.text();
  let cssValues = JSON.parse(result).output.trim();
  styles = cssValues;

  // parse into inputs here...
});
