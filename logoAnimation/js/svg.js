function setVarOnSvg(name, value) {
  const s = svgEl();
  if (!s) return;
  s.style.setProperty(name, value);
}

function updateLiveVars() {
  const s = svgEl();
  if (!s) {
    liveVarsPre.textContent = '(svg not found)';
    return;
  }
  const cs = window.getComputedStyle(s);
  const out = [
    `--text-01-duration: ${cs.getPropertyValue('--text-01-duration')}`,
    `--text-01-start: ${cs.getPropertyValue('--text-01-start')}`,
    `--text-01-step: ${cs.getPropertyValue('--text-01-step')}`,
    `--text-01-offset-distance: ${cs.getPropertyValue('--text-01-offset-distance')}`,
    `--text-02-duration: ${cs.getPropertyValue('--text-02-duration')}`,
    `--text-02-start: ${cs.getPropertyValue('--text-02-start')}`,
    `--text-02-step: ${cs.getPropertyValue('--text-02-step')}`,
    `--text-02-offset-distance: ${cs.getPropertyValue('--text-02-offset-distance')}`,
    `--text-easing: ${cs.getPropertyValue('--text-easing')}`
  ];
  liveVarsPre.textContent = out.join('\n');
}

function restartAnimations() {
  const s = svgEl();
  if (!s) return;
  const clone = s.cloneNode(true);
  for (let i = 0; i < s.style.length; i++) {
    const prop = s.style[i];
    clone.style.setProperty(prop, s.style.getPropertyValue(prop));
  }
  s.parentNode.replaceChild(clone, s);
  setTimeout(updateLiveVars, 40);
}

function applyAll() {
  setVarOnSvg('--text-01-duration', t1Duration.value || defaults['--text-01-duration']);
  setVarOnSvg('--text-01-start', t1Start.value || defaults['--text-01-start']);
  setVarOnSvg('--text-01-step', t1Step.value || defaults['--text-01-step']);
  setVarOnSvg('--text-01-offset-distance', t1Offset.value || defaults['--text-01-offset-distance']);

  setVarOnSvg('--text-02-duration', t2Duration.value || defaults['--text-02-duration']);
  setVarOnSvg('--text-02-start', t2Start.value || defaults['--text-02-start']);
  setVarOnSvg('--text-02-step', t2Step.value || defaults['--text-02-step']);
  setVarOnSvg('--text-02-offset-distance', t2Offset.value || defaults['--text-02-offset-distance']);

  setVarOnSvg('--text-easing', easingInput.value || defaults['--text-easing']);

  updateLiveVars();
}

function resetDefaults() {
  t1Duration.value = defaults['--text-01-duration'];
  t1Start.value = defaults['--text-01-start'];
  t1Step.value = defaults['--text-01-step'];
  t1Offset.value = defaults['--text-01-offset-distance'];

  t2Duration.value = defaults['--text-02-duration'];
  t2Start.value = defaults['--text-02-start'];
  t2Step.value = defaults['--text-02-step'];
  t2Offset.value = defaults['--text-02-offset-distance'];

  easingInput.value = defaults['--text-easing'];

  const s = svgEl();
  if (s) s.style.cssText = '';

  updateLiveVars();
}
