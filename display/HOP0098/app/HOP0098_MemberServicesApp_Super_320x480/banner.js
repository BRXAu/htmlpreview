/* HOP0098 FY27 Member Services App | shared banner logic
   Motion follows the approved 970x250 core build:
   - F1: phone fades in (0.5s, power1.out) while rising 15px and zooming
     from 94% to full size (1s, power2.out). Copy slides in line by line
     from 20px left (0.5s each, lines overlap by 68%). Holds 3s.
   - F1 out: copy and phone fade out (0.5s, power1.in).
   - F2: badges fade in (0.4s, power1.out), copy slides in line by line.
     Holds and ends on F2. No loop.
   - Logo, CTA, "That's a plus" and short terms stay on screen throughout.
   - "Click for terms" opens the full terms panel (F3) and pauses the ad. */
(function () {
  var LINE_DURATION = 0.5;
  var LINE_STAGGER = LINE_DURATION * (1 - 0.68);
  var SLIDE_DISTANCE = -20;
  var F1_HOLD = 3;
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

  function slideLines(tl, lines, position) {
    tl.fromTo(lines,
      { x: SLIDE_DISTANCE, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: LINE_DURATION, ease: "power1.out", stagger: LINE_STAGGER },
      position);
  }

  function build() {
    var tl = gsap.timeline({ paused: true });

    // F1 in
    tl.fromTo("#f1-phone", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, 0);
    tl.fromTo("#f1-phone",
      { y: PHONE_RISE, scale: PHONE_START_SCALE },
      { y: 0, scale: 1, duration: PHONE_MOVE_DURATION, ease: "power2.out" }, 0);
    slideLines(tl, "#f1-copy .line", 0);
    tl.to({}, { duration: F1_HOLD });

    // F1 out
    tl.addLabel("f1Out");
    tl.to(["#f1-copy", "#f1-phone"], { autoAlpha: 0, duration: 0.5, ease: "power1.in" }, "f1Out");

    // F2 in
    tl.addLabel("f2In");
    tl.set("#f2", { autoAlpha: 1 }, "f2In");
    tl.fromTo("#f2 .badge", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, "f2In");
    slideLines(tl, "#f2-copy .line", "f2In");

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
