/* BRX display banner runtime.
   Turns the markup into a GSAP timeline. See references/motion.md.

   Frames:  .frame elements, played in document order. data-hold = seconds
            to hold once the frame is in (default 3). The last frame stays
            on screen unless the stage has data-loops > 1.
   In:      .line          slides in from the left, line by line
            [data-anim]    fade | rise-zoom | slide-up
                           (data-duration, data-delay override timing)
   Out:     the frame's children fade out, except [data-keep].
   Terms:   [data-terms-open] opens [data-terms-panel] and pauses;
            [data-terms-close] closes it and resumes.
   Exit:    any click on the stage, outside the terms controls and panel.
            How it exits comes from window.BANNER_CONFIG, written by
            build.py for the platform: ExitApi.exit() or window.open(clickTag).

   Exposes window.bannerTimeline, window.bannerComplete (true once the last
   loop has finished) and window.bannerTiming {start, end} in ms from
   performance.now(), excluding time paused on the terms panel. The tests
   use all three. */
(function () {
  // BRX default motion, signed off on HOP0098. Change here when a
  // reference build differs, and note it in the README.
  var LINE_DURATION = 0.5;
  var LINE_OVERLAP = 0.68;
  var LINE_STAGGER = LINE_DURATION * (1 - LINE_OVERLAP);
  var SLIDE_DISTANCE = -20;
  var LINE_EASE = "power1.out";
  var DEFAULT_HOLD = 3;
  var FRAME_OUT = 0.5;
  var FRAME_OUT_EASE = "power1.in";

  var ANIMS = {
    "fade": { from: { autoAlpha: 0 }, to: { autoAlpha: 1 }, duration: 0.5, ease: "power1.out" },
    "rise-zoom": { from: { autoAlpha: 0, y: 15, scale: 0.94 }, to: { autoAlpha: 1, y: 0, scale: 1 }, duration: 1, ease: "power2.out" },
    "slide-up": { from: { autoAlpha: 0, y: 20 }, to: { autoAlpha: 1, y: 0 }, duration: 0.6, ease: "power2.out" }
  };

  var config = window.BANNER_CONFIG || {};
  var stage = document.getElementById("stage");
  var panel = document.querySelector("[data-terms-panel]");
  var frames = [].slice.call(stage.querySelectorAll(".frame"));
  var loops = Math.max(1, parseInt(stage.getAttribute("data-loops") || "1", 10));
  var loopsPlayed = 0;
  var timeline;

  var pausedMs = 0;
  var pausedAt = null;

  window.bannerComplete = false;
  window.bannerTiming = { start: null, end: null };

  function exit() {
    if (config.exit === "exitapi") {
      if (window.ExitApi && typeof window.ExitApi.exit === "function") {
        window.ExitApi.exit();
      } else {
        console.log("[preview] ExitApi.exit() would fire here");
      }
      return;
    }
    window.open(window[config.clickVar || "clickTag"], "_blank");
  }

  // Scale the artboard to the slot. Full-screen formats (App campaigns)
  // scale up as well as down; standard slots never scale up.
  // clientWidth/Height is the visible area; innerWidth can over-report in
  // some WebViews and zoomed browsers.
  function fit() {
    var root = document.documentElement;
    var vw = root.clientWidth || window.innerWidth;
    var vh = root.clientHeight || window.innerHeight;
    var scale = Math.min(vw / stage.offsetWidth, vh / stage.offsetHeight);
    if (!config.fullscreen) scale = Math.min(1, scale);
    stage.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
  }

  function num(el, attr, fallback) {
    var v = parseFloat(el.getAttribute(attr));
    return isNaN(v) ? fallback : v;
  }

  function frameIn(frame) {
    var tl = gsap.timeline();
    [].forEach.call(frame.querySelectorAll("[data-anim]"), function (el) {
      var a = ANIMS[el.getAttribute("data-anim")] || ANIMS.fade;
      var to = {};
      for (var k in a.to) to[k] = a.to[k];
      to.duration = num(el, "data-duration", a.duration);
      to.ease = a.ease;
      tl.fromTo(el, a.from, to, num(el, "data-delay", 0));
    });
    var lines = frame.querySelectorAll(".line");
    if (lines.length) {
      tl.fromTo(lines,
        { x: SLIDE_DISTANCE, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: LINE_DURATION, ease: LINE_EASE, stagger: LINE_STAGGER },
        num(frame, "data-lines-delay", 0));
    }
    return tl;
  }

  function frameOutTargets(frame) {
    return [].filter.call(frame.children, function (c) { return !c.hasAttribute("data-keep"); });
  }

  // Optional intro (TEST0001): window.bannerIntro() returns
  // { timeline, framesAt }. The intro plays from 0 and the first frame
  // starts at framesAt seconds, so the copy can overlap the intro's end.
  function build() {
    var tl = gsap.timeline({ paused: true, onComplete: onLoopEnd });
    var intro = typeof window.bannerIntro === "function" ? window.bannerIntro() : null;
    if (intro) tl.add(intro.timeline, 0);
    var firstAt = intro ? intro.framesAt : 0;
    frames.forEach(function (frame, i) {
      if (i > 0) tl.set(frame, { autoAlpha: 1 });
      tl.add(frameIn(frame), i === 0 ? firstAt : ">");
      tl.to({}, { duration: num(frame, "data-hold", DEFAULT_HOLD) });
      if (i < frames.length - 1) {
        tl.to(frameOutTargets(frame), { autoAlpha: 0, duration: FRAME_OUT, ease: FRAME_OUT_EASE });
        tl.set(frame, { autoAlpha: 0 });
      }
    });
    return tl;
  }

  function resetFrames() {
    frames.forEach(function (frame, i) {
      gsap.set(frame.children, { clearProps: "opacity,visibility" });
      gsap.set(frame, { autoAlpha: i === 0 ? 1 : 0 });
    });
  }

  function onLoopEnd() {
    loopsPlayed++;
    if (loopsPlayed >= loops) {
      window.bannerTiming.end = performance.now() - pausedMs;
      window.bannerComplete = true;
      return;
    }
    var last = frames[frames.length - 1];
    gsap.to(frameOutTargets(last), {
      autoAlpha: 0, duration: FRAME_OUT, ease: FRAME_OUT_EASE,
      onComplete: function () { resetFrames(); timeline.restart(); }
    });
  }

  function openTerms(e) {
    e.preventDefault();
    e.stopPropagation();
    if (timeline && !timeline.paused()) { timeline.pause(); pausedAt = performance.now(); }
    gsap.to(panel, { autoAlpha: 1, duration: 0.3, ease: "power1.out" });
  }

  function closeTerms(e) {
    e.preventDefault();
    e.stopPropagation();
    gsap.to(panel, {
      autoAlpha: 0, duration: 0.3, ease: "power1.in",
      onComplete: function () {
        if (pausedAt !== null) { pausedMs += performance.now() - pausedAt; pausedAt = null; }
        if (timeline && timeline.progress() < 1) timeline.resume();
      }
    });
  }

  function init() {
    fit();
    window.addEventListener("resize", fit);
    stage.addEventListener("click", exit);
    [].forEach.call(document.querySelectorAll("[data-terms-open]"), function (el) { el.addEventListener("click", openTerms); });
    [].forEach.call(document.querySelectorAll("[data-terms-close]"), function (el) { el.addEventListener("click", closeTerms); });
    if (panel) panel.addEventListener("click", function (e) { e.stopPropagation(); });

    timeline = build();
    window.bannerTimeline = timeline;
    gsap.set(stage, { autoAlpha: 1 });
    window.bannerTiming.start = performance.now();
    timeline.play();
  }

  // Start once fonts are ready so copy doesn't jump.
  function ready() {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(init, init);
    else init();
  }

  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready);
})();
