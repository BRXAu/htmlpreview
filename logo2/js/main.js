
const cssObj = {
  't1-duration':['--text-01-duration', '1.1s'],
  't1-start':['--text-01-start', '0.7s'],
  't1-step':['--text-01-step', '0.0s'],
  't1-offset':['--text-01-offset-distance', 'translateX(126px)'],
  't2-duration':['--text-02-duration', '1.2s'],
  't2-start':['--text-02-start', '1.15s'],
  't2-step':['--text-02-step', '0.0s'],
  't2-offset':['--text-02-offset-distance', 'translateX(-120px)'],
  'easing':['--text-easing', 'cubic-bezier(0, 1, 1, 1)']
}


let styles = '';
for (const key in cssObj) {
  const [v1, v2] = cssObj[key];
  styles += `${v1}: ${v2}\n`;
}

const svgEl = () => document.getElementById('logoSvg');

function setVarOnSvg(name, value) {
        const s = svgEl();
        if (!s) return;
        s.style.setProperty(name, value);
      }


function copyInlineSvg() {
  const s = svgEl();
  if (!s) return;
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(s);

  console.log('insert styles noW!!!')
  console.log(styles)
  console.log(document.styleSheets[2])
  console.log(document.styleSheets[0].cssRules)


  navigator.clipboard.writeText(source).then(() => {
    downloadBtn.textContent = 'Copied';
    setTimeout(()=> downloadBtn.textContent = 'Copy inline SVG', 1200);
  }).catch(()=> {
    alert('Could not copy SVG. You can view source and copy manually.');
  });
}


function restartAnimations() {
  const s = svgEl();
  if (!s) return;
  const clone = s.cloneNode(true);
  // preserve inline variable overrides
  for (let i = 0; i < s.style.length; i++) {
    const prop = s.style[i];
    clone.style.setProperty(prop, s.style.getPropertyValue(prop));
  }
  s.parentNode.replaceChild(clone, s);
  setTimeout(updateLiveVars, 40);
}


function applyAll(cssObj) {
  for (const key in cssObj) {
    const [v1, v2] = cssObj[key];
    const el = document.getElementById(key);
    setVarOnSvg(v1, el.value || v2);
  }

  updateLiveVars();
}

function updateLiveVars() {
  const liveVarsPre = document.getElementById('liveVars');
  const s = svgEl();
  if (!s) { liveVarsPre.textContent = '(svg not found)'; return; }
  const cs = window.getComputedStyle(s);

  let out =[];
  for (const key in cssObj) {
    const [v1, v2] = cssObj[key];
    out.push(`${v1}: ${cs.getPropertyValue(v1) || ''}`)
  }

  liveVarsPre.textContent = out.join('\\n');
}


function resetDefaults(cssObj) {
  for (const key in cssObj) {
    const [v1, v2] = cssObj[key];
    const el = document.getElementById(key);
    el.value = v2;
  }
  const s = svgEl();
  if (s) s.style.cssText = '';
  updateLiveVars();
}

