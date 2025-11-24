// -----------------------------
      // Bezier visualiser implementation
      // -----------------------------
      const canvas = document.getElementById('bezierCanvas');
      const ctx = canvas.getContext('2d');
      const c1El = document.getElementById('c1');
      const c2El = document.getElementById('c2');
      const applyVisualBtn = document.getElementById('applyVisual');

      // control points in normalized space (0..1)
      // default correspond to cubic-bezier(0,1,1,1)
      let cp1 = { x: 0.0, y: 1.0 };
      let cp2 = { x: 1.0, y: 1.0 };

      // pixel positions derived from cp*
      function cpToPx(cp) {
        // pad inside canvas so handles are visible
        const pad = 8;
        const w = canvas.width - pad * 2;
        const h = canvas.height - pad * 2;
        return {
          x: pad + cp.x * w,
          y: pad + (1 - cp.y) * h
        };
      }
      function pxToCp(px) {
        const pad = 8;
        const w = canvas.width - pad * 2;
        const h = canvas.height - pad * 2;
        let nx = (px.x - pad) / w;
        let ny = 1 - ((px.y - pad) / h);
        nx = Math.min(1, Math.max(0, nx));
        ny = Math.min(1, Math.max(0, ny));
        return { x: nx, y: ny };
      }

      // draw function
      function drawBezierPreview() {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // axes
        ctx.strokeStyle = '#e6e6e6';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // baseline
        ctx.moveTo(8, canvas.height - 8);
        ctx.lineTo(canvas.width - 8, canvas.height - 8);
        ctx.stroke();

        // grid minor
        ctx.strokeStyle = '#f5f5f5';
        for (let i = 1; i < 4; i++) {
          let gx = 8 + i * (canvas.width - 16) / 4;
          ctx.beginPath();
          ctx.moveTo(gx, 8);
          ctx.lineTo(gx, canvas.height - 8);
          ctx.stroke();
        }

        // compute handle pixels
        const p0 = { x: 8, y: canvas.height - 8 };
        const p3 = { x: canvas.width - 8, y: 8 };
        const h1 = cpToPx(cp1);
        const h2 = cpToPx(cp2);

        // draw bezier curve (sample)
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0a66c2';
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        const steps = 120;
        for (let t = 0; t <= 1; t += 1/steps) {
          const x = cubicBezier(t, 0, cp1.x, cp2.x, 1);
          const y = cubicBezier(t, 0, cp1.y, cp2.y, 1);
          const px = 8 + x * (canvas.width - 16);
          const py = 8 + (1 - y) * (canvas.height - 16);
          ctx.lineTo(px, py);
        }
        ctx.stroke();

        // draw control lines
        ctx.strokeStyle = '#c7d6e6';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(h1.x, h1.y);
        ctx.lineTo(h2.x, h2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.stroke();

        // draw handles
        drawHandle(h1);
        drawHandle(h2);

        // update text labels
        c1El.textContent = `${cp1.x.toFixed(3)}, ${cp1.y.toFixed(3)}`;
        c2El.textContent = `${cp2.x.toFixed(3)}, ${cp2.y.toFixed(3)}`;
      }

      function drawHandle(p) {
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#0a66c2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // cubic bezier helper (coordinate)
      function cubicBezier(t, a, b, c, d) {
        // returns value at t for cubic bezier defined by points a,b,c,d
        const mt = 1 - t;
        return (mt*mt*mt*a) + (3*mt*mt*t*b) + (3*mt*t*t*c) + (t*t*t*d);
      }

      // set cp from easing string like cubic-bezier(x1, y1, x2, y2)
      function parseEasingToCP(easingStr) {
        const m = easingStr.match(/cubic-bezier\s*\(\s*([^)]+)\)/i);
        if (!m) return null;
        const parts = m[1].split(',').map(p => parseFloat(p.trim()));
        if (parts.length !== 4 || parts.some(isNaN)) return null;
        return { cp1: { x: parts[0], y: parts[1] }, cp2: { x: parts[2], y: parts[3] } };
      }

      function cpToEasingString(cp1v, cp2v) {
        return `cubic-bezier(${cp1v.x.toFixed(3)}, ${cp1v.y.toFixed(3)}, ${cp2v.x.toFixed(3)}, ${cp2v.y.toFixed(3)})`;
      }

      // initialise from input
      function hydrateVisualiserFromInput() {
        const parsed = parseEasingToCP(easingInput.value.trim());
        if (parsed) {
          cp1 = { x: parsed.cp1.x, y: parsed.cp1.y };
          cp2 = { x: parsed.cp2.x, y: parsed.cp2.y };
        } else {
          // fallback keep defaults
        }
        drawBezierPreview();
      }

      // allow dragging
      let dragging = null;
      function getMousePos(evt) {
        const rect = canvas.getBoundingClientRect();
        return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
      }

      canvas.addEventListener('mousedown', (e) => {
        const pos = getMousePos(e);
        const h1 = cpToPx(cp1);
        const h2 = cpToPx(cp2);
        if (distance(pos, h1) < 12) { dragging = 'cp1'; return; }
        if (distance(pos, h2) < 12) { dragging = 'cp2'; return; }
      });
      window.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        const pos = getMousePos(e);
        const cp = pxToCp(pos);
        if (dragging === 'cp1') { cp1 = cp; }
        if (dragging === 'cp2') { cp2 = cp; }
        // update easing input live
        easingInput.value = cpToEasingString(cp1, cp2);
        // apply directly into svg var for live preview and restart animations
        setVarOnSvg('--text-easing', easingInput.value);
        restartAnimations();
        drawBezierPreview();
      });
      window.addEventListener('mouseup', () => { dragging = null; });

      // touch support
      canvas.addEventListener('touchstart', (ev) => {
        const t = ev.touches[0];
        const pos = getMousePos(t);
        const h1 = cpToPx(cp1);
        const h2 = cpToPx(cp2);
        if (distance(pos, h1) < 16) { dragging = 'cp1'; ev.preventDefault(); return; }
        if (distance(pos, h2) < 16) { dragging = 'cp2'; ev.preventDefault(); return; }
      }, {passive:false});
      window.addEventListener('touchmove', (ev) => {
        if (!dragging) return;
        const t = ev.touches[0];
        const pos = getMousePos(t);
        const cp = pxToCp(pos);
        if (dragging === 'cp1') { cp1 = cp; }
        if (dragging === 'cp2') { cp2 = cp; }
        easingInput.value = cpToEasingString(cp1, cp2);
        setVarOnSvg('--text-easing', easingInput.value);
        restartAnimations();
        drawBezierPreview();
        ev.preventDefault();
      }, {passive:false});
      window.addEventListener('touchend', () => { dragging = null; });

      function distance(p1, p2) {
        return Math.hypot(p1.x - p2.x, p1.y - p2.y);
      }

      // update when editing input directly
      easingInput.addEventListener('input', () => {
        const parsed = parseEasingToCP(easingInput.value.trim());
        if (parsed) {
          cp1 = { x: parsed.cp1.x, y: parsed.cp1.y };
          cp2 = { x: parsed.cp2.x, y: parsed.cp2.y };
          // apply easing to svg live
          setVarOnSvg('--text-easing', easingInput.value);
          restartAnimations();
        }
        drawBezierPreview();
      });

      // apply visual button to push easing to svg, restart
      applyVisualBtn.addEventListener('click', () => {
        setVarOnSvg('--text-easing', easingInput.value);
        restartAnimations();
        updateLiveVars();
      });

      // initial draw: try to parse existing easing input
      hydrateVisualiserFromInput();