applyBtn.addEventListener('click', () => {
  applyAll();
  restartAnimations();
});

restartBtn.addEventListener('click', restartAnimations);
downloadBtn.addEventListener('click', copyInlineSvg);
resetBtn.addEventListener('click', () => {
  resetDefaults();
  restartAnimations();
});

updateLiveVars();   // do a first update
