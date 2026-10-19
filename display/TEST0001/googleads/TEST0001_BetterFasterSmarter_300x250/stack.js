/* 3D layer-stack intro (TEST0001). Each banner sets window.STACK with three
   states for its size, then banner.js plays this before the copy:

     0.0 - 0.8s  face-on, filling the banner, slow push in
     0.8 - 2.4s  turns side-on and the layers spread apart in depth
     2.4 - 3.2s  the media panel shrinks to its end-frame slot

   STACK = {
     full:  { w, h }                    media panel at the start (the whole banner)
     end:   { w, h, r }                 media panel in the end frame, r = corner radius
     start: { scale, x, y }             stack face-on
     fan:   { scale, x, y, ry, rx, gap, dx, dy }  stack spread: rotation, depth gap and offset per layer
     final: { scale, x, y }             stack in the end frame
   } */
(function () {
  window.bannerIntro = function () {
    var C = window.STACK;
    var media = document.getElementById("media");
    var zoom = document.getElementById("zoom");
    var stack = document.getElementById("stack");
    var layers = [].slice.call(stack.querySelectorAll(".layer"));
    var glass = stack.querySelectorAll(".glass");
    var mid = (layers.length - 1) / 2;

    gsap.set(media, { width: C.full.w, height: C.full.h, borderBottomRightRadius: 0 });
    gsap.set(zoom, { x: C.start.x, y: C.start.y, scale: C.start.scale });
    gsap.set(stack, { rotationY: 0, rotationX: 0 });
    gsap.set(layers, { x: 0, y: 0, z: 0 });

    var tl = gsap.timeline();
    tl.to(zoom, { scale: C.start.scale * 1.04, duration: 0.8, ease: "none" }, 0);

    tl.to(zoom, { scale: C.fan.scale, x: C.fan.x, y: C.fan.y, duration: 1.6, ease: "power2.inOut" }, 0.8);
    tl.to(stack, { rotationY: C.fan.ry, rotationX: C.fan.rx, duration: 1.6, ease: "power2.inOut" }, 0.8);
    tl.to(layers, { z: function (i) { return (i - mid) * C.fan.gap; },
                    x: function (i) { return (i - mid) * C.fan.dx; },
                    y: function (i) { return (i - mid) * C.fan.dy; },
                    duration: 1.6, ease: "power2.inOut" }, 0.8);
    tl.fromTo(glass, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power1.out" }, 1.0);

    tl.to(media, { width: C.end.w, height: C.end.h, borderBottomRightRadius: C.end.r,
                   duration: 0.8, ease: "power3.inOut" }, 2.4);
    tl.to(zoom, { scale: C.final.scale, x: C.final.x, y: C.final.y, duration: 0.8, ease: "power3.inOut" }, 2.4);

    return { timeline: tl, framesAt: 2.9 };
  };
})();
