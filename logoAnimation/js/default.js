const t1Duration = document.getElementById('t1-duration');
const t1Start = document.getElementById('t1-start');
const t1Step = document.getElementById('t1-step');
const t1Offset = document.getElementById('t1-offset');

const t2Duration = document.getElementById('t2-duration');
const t2Start = document.getElementById('t2-start');
const t2Step = document.getElementById('t2-step');
const t2Offset = document.getElementById('t2-offset');

const easingInput = document.getElementById('easing');

let styles = `--text-01-duration: 1.1s\n--text-01-start: 0.7s\n--text-01-step: 0.0s\n--text-01-offset-distance: translateX(416px)\n--text-02-duration: 1.2s\n--text-02-start: 1.15s\n--text-02-step: 0.0s\n--text-02-offset-distance: translateX(-380px)\n--text-easing: cubic-bezier(0, 1, 1, 1)`

// default map
const defaults = {
'--text-01-duration': '1.1s',
'--text-01-start': '0.7s',
'--text-01-step': '0.0s',
'--text-01-offset-distance': 'translateX(416px)',
'--text-02-duration': '1.2s',
'--text-02-start': '1.15s',
'--text-02-step': '0.0s',
'--text-02-offset-distance': 'translateX(-380px)',
'--text-easing': 'cubic-bezier(0, 1, 1, 1)'
};

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

function updateLiveVars() {
  const s = svgEl();
  if (!s) { liveVarsPre.textContent = '(svg not found)'; return; }
  const cs = window.getComputedStyle(s);
  const out = [
    `--text-01-duration: ${cs.getPropertyValue('--text-01-duration') || ''}`,
    `--text-01-start: ${cs.getPropertyValue('--text-01-start') || ''}`,
    `--text-01-step: ${cs.getPropertyValue('--text-01-step') || ''}`,
    `--text-01-offset-distance: ${cs.getPropertyValue('--text-01-offset-distance') || ''}`,
    `--text-02-duration: ${cs.getPropertyValue('--text-02-duration') || ''}`,
    `--text-02-start: ${cs.getPropertyValue('--text-02-start') || ''}`,
    `--text-02-step: ${cs.getPropertyValue('--text-02-step') || ''}`,
    `--text-02-offset-distance: ${cs.getPropertyValue('--text-02-offset-distance') || ''}`,
    `--text-easing: ${cs.getPropertyValue('--text-easing') || ''}`
  ];
  liveVarsPre.textContent = out.join('\\n');
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