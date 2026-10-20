/* HOP0098 FY27 Member Services App | shared banner logic
   Type motion matches the HOP0098 core set on AdXelerator Review
   (BRX Hostplus template 1.24.3), measured frame by frame:
   - Headline: every line but the last wipes on left to right together
     (0.45s, power2.out). The last line drops into place from behind a
     mask, one line height (0.5s in, 0.5s, power2.out).
   - Subhead fades in where it sits (0.87s in, 0.45s, power2.out).
   - F1: phone fades in (0.5s, power1.out) while rising 15px and zooming
     from 94% to full size (1s, power2.out). F1 copy starts fading out
     4.9s after the frame starts.
   - F1 out: copy and phone fade out (0.5s, sine.inOut).
   - F2: badges fade in (0.4s, power1.out); copy as above.
     Holds and ends on F2. No loop.
   - Logo, CTA, "That's a plus" and short terms stay on screen throughout.
   - "Click for terms" opens the full terms panel (F3) and pauses the ad. */
(function () {
  var WIPE_DURATION = 0.45;
  var DROP_DELAY = 0.5;
  var DROP_DURATION = 0.5;
  var SUB_DELAY = 0.87;
  var SUB_DURATION = 0.45;
  var TYPE_EASE = "power2.out";
  var F1_OUT_AT = 4.9;
  var FRAME_OUT = 0.5;
  // Wipe clip, with room above and below so glyphs outside the trimmed
  // line box aren't cut.
  var WIPE_FROM = "inset(-25% 100% -25% 0%)";
  var WIPE_TO = "inset(-25% 0% -25% 0%)";
  var PHONE_RISE = 15;
  var PHONE_START_SCALE = 0.94;
  var PHONE_MOVE_DURATION = 1;

  var stage = document.getElementById("stage");
  var panel = document.getElementById("terms-panel");
  var timeline;

  // Google Ads App campaigns: exits must go through ExitApi.exit().
  function exit() {
    if (window.ExitApi && typeof window.ExitApi.exit === "function") {
      window.ExitApi.exit();
    } else {
      console.log("[preview] ExitApi.exit() would fire here");
    }
  }

  // Scale the artboard to fit the full-screen slot, keeping its proportions.
  function fit() {
    var w = stage.offsetWidth;
    var h = stage.offsetHeight;
    // clientWidth/Height is the visible area; innerWidth can over-report
    // in some WebViews and zoomed browsers.
    var root = document.documentElement;
    var vw = root.clientWidth || window.innerWidth;
    var vh = root.clientHeight || window.innerHeight;
    var scale = Math.min(vw / w, vh / h);
    stage.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
  }

  // The last headline line drops in from behind a mask: the line clips its
  // overflow and its text moves inside it. Done once, before the timeline.
  function prepareDrop(copy) {
    var lines = copy.querySelectorAll(".headline .line");
    var last = lines[lines.length - 1];
    if (!last || lines.length < 2) return null;
    var inner = document.createElement("span");
    inner.className = "line-drop";
    while (last.firstChild) inner.appendChild(last.firstChild);
    last.appendChild(inner);
    last.style.overflow = "hidden";
    inner.style.display = "block";
    return inner;
  }

  // Headline and subhead in, as on the Hostplus template.
  function typeIn(tl, copySel, position) {
    var copy = document.querySelector(copySel);
    var lines = [].slice.call(copy.querySelectorAll(".headline .line"));
    var drop = copy.querySelector(".line-drop");
    var wipe = drop ? lines.slice(0, -1) : lines;
    tl.fromTo(wipe, { clipPath: WIPE_FROM }, { clipPath: WIPE_TO, duration: WIPE_DURATION, ease: TYPE_EASE, stagger: 0.01 }, position);
    if (drop) {
      tl.fromTo(drop, { yPercent: -100 }, { yPercent: 0, duration: DROP_DURATION, ease: TYPE_EASE }, position + "+=" + DROP_DELAY);
    }
    tl.fromTo(copy.querySelectorAll(".sub .line"), { autoAlpha: 0 },
      { autoAlpha: 1, duration: SUB_DURATION, ease: TYPE_EASE }, position + "+=" + SUB_DELAY);
  }

  function build() {
    var tl = gsap.timeline({ paused: true });

    // F1 in
    tl.fromTo("#f1-phone", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, 0);
    tl.fromTo("#f1-phone",
      { y: PHONE_RISE, scale: PHONE_START_SCALE },
      { y: 0, scale: 1, duration: PHONE_MOVE_DURATION, ease: "power2.out" }, 0);
    tl.addLabel("f1In", 0);
    typeIn(tl, "#f1-copy", "f1In");

    // F1 out
    tl.addLabel("f1Out", F1_OUT_AT);
    tl.to(["#f1-copy", "#f1-phone"], { autoAlpha: 0, duration: FRAME_OUT, ease: "sine.inOut" }, "f1Out");

    // F2 in
    tl.addLabel("f2In", F1_OUT_AT + FRAME_OUT);
    tl.set("#f2", { autoAlpha: 1 }, "f2In");
    tl.fromTo("#f2 .badge", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, "f2In");
    typeIn(tl, "#f2-copy", "f2In");

    return tl;
  }

  function openTerms(e) {
    e.preventDefault();
    e.stopPropagation();
    if (timeline) timeline.pause();
    gsap.to(panel, { autoAlpha: 1, duration: 0.3, ease: "power1.out" });
  }

  function closeTerms(e) {
    e.preventDefault();
    e.stopPropagation();
    gsap.to(panel, {
      autoAlpha: 0, duration: 0.3, ease: "power1.in",
      onComplete: function () { if (timeline && timeline.progress() < 1) timeline.resume(); }
    });
  }

  function init() {
    fit();
    window.addEventListener("resize", fit);

    stage.addEventListener("click", exit);
    var termButtons = document.querySelectorAll(".terms-btn");
    for (var i = 0; i < termButtons.length; i++) termButtons[i].addEventListener("click", openTerms);
    document.getElementById("terms-close").addEventListener("click", closeTerms);
    panel.addEventListener("click", function (e) { e.stopPropagation(); });

    prepareDrop(document.getElementById("f1-copy"));
    prepareDrop(document.getElementById("f2-copy"));
    timeline = build();
    gsap.set(stage, { autoAlpha: 1 });
    timeline.play();
  }

  // Start once the Effra fonts are ready so the copy doesn't jump.
  function ready() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(init, init);
    } else {
      init();
    }
  }

  if (document.readyState === "complete") {
    ready();
  } else {
    window.addEventListener("load", ready);
  }
})();
