const applyBtn = document.getElementById('applyAll');
const restartBtn = document.getElementById('restartBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetDefaults');
const askAiBtn = document.getElementById('runAi');

// attach events
applyBtn.addEventListener('click', () => {
  applyAll(cssObj);
  restartAnimations();
});

restartBtn.addEventListener('click', restartAnimations);

downloadBtn.addEventListener('click', copyInlineSvg);

resetBtn.addEventListener('click', () => {
  resetDefaults(cssObj);
  restartAnimations();
});

askAiBtn.addEventListener("click", async () => {
  styles = await runAIUpdate(styles);
});