/**
 * Globals.
 */
var tl;
var bgtl;
var loops = 0;

var sources = {
  "copy1-1-1": 'copy1-1-1.png',
};

function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  for (var src in sources) {
    numImages++;
  }
  for (var src in sources) {
    images[src] = new Image();
    images[src].onload = function () {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

/**
 * Init.
 */
function init() {
  loadImages(sources, startAnimation);
}

function startAnimation() {
  tl = new TimelineLite();

  var time = .9;

  e("banner-hover").addEventListener('mouseover', onMouseOver);
  e("banner-hover").addEventListener('mouseout', onMouseOut);
  //----Frame1------//
  // In

  appear("copy1-3-1", .25, { opacity: 0, y: "-100", ease: Quint.easeOut }, "f1");
  appear("copy1-3-2", .25, { opacity: 0, y: "-100", ease: Quint.easeOut, onComplete: shake1 }, "f1");

  // appear("copy1-2-1", .25, { opacity: 0, y: "-70", ease: "back.out(1.9)" }, "f1+=.5");
  // appear("copy1-2-2", .25, { opacity: 0, y: "-70", ease: "back.out(1.9)", onComplete: shake2 }, "f1+=.5");

  appear("copy1-1-1", .25, { opacity: 0, y: "-80", ease: "back.out(1.8)" }, "f1+=.5");
  appear("copy1-1-2", .25, { opacity: 0, y: "-80", ease: "back.out(1.8)" }, "f1+=.5");
  appear("copy1-1-3", .25, { opacity: 0, y: "-80", ease: "back.out(1.8)" }, "f1+=.5");

  disappear("crack-1-cont1", .5, { height:18, ease: Quad.easeOut}, "f1+=.8", false);
  disappear("crack-1-cont2", .5, { height:18, ease: Quad.easeOut }, "f1+=.8", false);
  disappear("crack-1-cont3", .5, { height:18, ease: Quad.easeOut }, "f1+=.8", false);
  // disappear("crack-2-cont1", .5, { height:26, ease: Quad.easeOut }, "f1+=1.35", false);
  // disappear("crack-2-cont2", .5, { height:26, ease: Quad.easeOut }, "f1+=1.35", false);
  disappear("crack-3-cont1", .55, { height:14, ease: Quad.easeOut }, "f1+=1.15", false);
  disappear("crack-3-cont2", .55, { height:14, ease: Quad.easeOut }, "f1+=1.15", false);


  disappear("copy1-3-1-cont", 1.25, {  rotationZ: 30, ease: Cubic.easeInOut }, "f1Out+=.5", false);
  disappear("copy1-3-1-cont", 1.25, {  y:"+=250", ease: Quad.easeInOut }, "f1Out+=.55", false);
  disappear("copy1-3-2-cont", 1.25, {  rotationZ: -30, ease: Cubic.easeInOut }, "f1Out+=.5");
  disappear("copy1-3-2-cont", 1.25, {  y:"+=250", ease: Quad.easeInOut }, "f1Out+=.55")

  // disappear("copy1-2-1-cont", 1.5, {  rotationZ: 40, x:"-=40", ease: Cubic.easeInOut }, "f1Out+=.6");
  // disappear("copy1-2-1-cont", 1.25, {  y:"+=250", ease: Quad.easeInOut }, "f1Out+=.65", false);
  // disappear("copy1-2-2-cont", 1.5, {  rotationZ: -45, x:"+=40", ease: Cubic.easeInOut }, "f1Out+=.65");
  // disappear("copy1-2-2-cont", 1.25, {  y:"+=250", ease: Quad.easeInOut }, "f1Out+=.7", false)

  disappear("copy1-1-1-cont", 1.25, {  y:"+=250", ease: Quad.easeInOut }, "f1Out+=.75");
  disappear("copy1-1-1-cont", 1.25, {  rotationZ: 25, x:"-=40",  ease: Cubic.easeInOut }, "f1Out+=.8");
  disappear("copy1-1-2-cont", 1.25, {  y:"+=250", ease: Quad.easeInOut }, "f1Out+=.75");
  disappear("copy1-1-2-cont", 1.25, {  rotationZ: -35, x:"+=30", ease: Cubic.easeInOut }, "f1Out+=.75");
  disappear("copy1-1-3-cont", 1.25, {  y:"+=250", ease: Quad.easeInOut }, "f1Out+=.8");
  disappear("copy1-1-3-cont", 1.25, {  rotationZ: -30, x:"+=40", ease: Cubic.easeInOut }, "f1Out+=.85");


  appear("copy2-1", time, { opacity: 0, y: "-=10", ease: Quint.easeOut }, "f2");
  appear("copy2-2", time, { opacity: 0, y: "-=50", ease: Quint.easeOut }, "f2+=.25");

  disappear("copy2-1", .8, { y: "-=24", ease: Quint.easeOut }, "f2Out+=.5", false);
  disappear("copy2-2-cont", .8, { y: "-=24", ease: Quint.easeOut }, "f2Out+=.5", false);

  //appear("copy4-1", time, { opacity: 0, y: "-=30", ease: Quint.easeOut }, "f3-=.5");
  appear("copy4-1-2", time, { opacity: 0, y: "-=30", ease: Quint.easeOut }, "f3-=.5");

  appear("copy4-2", time, { y: "-=30", ease: Quint.easeOut }, "f3-=.5");
  appear("banner-hover", time, { opacity: 0, y: "-=30", ease: Quint.easeOut }, "f3");
  

  appear("terms", time, { opacity: 0, y: "+=10", ease: Quint.easeOut }, "f3-=.5");

  appear("cta1", time, { opacity: 0, ease: Quint.easeOut }, "f3+=.5");
  appear("cta1-arrow", time, { opacity: 0, ease: Quint.easeOut, onComplete: appearHover }, "f3+=.5");


}

function shake1() {
  gsap.to("#copy1-3", 0.05, { delay: 0.4, y: "+=3", yoyo: true, repeat: 1 });
  gsap.to("#copy1-3", 0.08, { delay: 0.53, x: "+=1.5", yoyo: true, repeat: 3 });
  gsap.to("#copy1-3", 0.08, { delay: 0.53, x: "-=1.5", yoyo: true, repeat: 3 });
}

function shake2() {
  gsap.to("#copy1-1", 0.05,{delay: 0.4, y:"+=3", yoyo:true, repeat:1});
  gsap.to("#copy1-1", 0.08,{delay: 0.4, x:"+=1.5", yoyo:true, repeat:3});
  gsap.to("#copy1-1", 0.08,{delay: 0.4, x:"-=1.5", yoyo:true, repeat:3});
  gsap.to("#copy1-2", 0.05,{delay: 0.4, y:"+=3", yoyo:true, repeat:1});
  gsap.to("#copy1-2", 0.08,{delay: 0.42, x:"-=1.5", yoyo:true, repeat:3});
  gsap.to("#copy1-2", 0.08,{delay: 0.42, x:"+=1.5", yoyo:true, repeat:3});
  gsap.to("#copy1-3", 0.05,{delay: 0.4, y:"+=3", yoyo:true, repeat:1});
  gsap.to("#copy1-3", 0.08,{delay: 0.43, x:"+=1.5", yoyo:true, repeat:3});
  gsap.to("#copy1-3", 0.08,{delay: 0.43, x:"-=1.5", yoyo:true, repeat:3});
}

/**
 * For animating assets at the start of each frame.
 */
function appear(name, time, specs, label) {
  specs.onStart = show;
  specs.onStartParams = [name];

  tl.from("#" + name, time, specs, label);
}

function appearHover(){
  TweenLite.to("#cta2", 0.1, { display:'block' });
  TweenLite.to("#cta2-arrow", 0.1, { display:'block' });
}

function onMouseOver() {
  TweenLite.to("#cta1-arrow", 0.25, { x: +5, ease: Power2.easeOut });
  TweenLite.to("#cta2-arrow", 0.25, { x: +5, ease: Power2.easeOut });
  TweenLite.to("#cta2", 0.25, { opacity:1, ease: Power2.easeOut });
  TweenLite.to("#cta1", 0.25, { opacity:0, ease: Power2.easeOut });

  TweenLite.to("#cta2-arrow", 0.25, { opacity:1, ease: Power2.easeOut });

  //TweenLite.to("#copy4-1", 0.25, { opacity: 0, ease: Power2.easeOut });

  TweenLite.to("#copy4-2", 0.25, { opacity: 1, ease: Power2.easeOut });
}
function onMouseOut() {
  TweenLite.to("#cta1-arrow", 0.25, { x: 0, ease: Power2.easeOut });
  TweenLite.to("#cta2-arrow", 0.25, { x: 0, ease: Power2.easeOut });
  TweenLite.to("#cta2", 0.25, { opacity:0, ease: Power2.easeOut });
  TweenLite.to("#cta2-arrow", 0.25, { opacity:0, ease: Power2.easeOut });
  TweenLite.to("#cta1", 0.25, { opacity:1, ease: Power2.easeOut });
  //TweenLite.to("#copy4-1", 0.25, { opacity: 1, ease: Power2.easeOut });

  TweenLite.to("#copy4-2", 0.25, { opacity: 0, ease: Power2.easeOut });

}

/**
 * For animating assets at the end of each frame.
 */
function disappear(name, time, specs, label, hideOnComplete) {
  hideOnComplete = (hideOnComplete == undefined) ? true : hideOnComplete;
  if (hideOnComplete) {
    specs.onComplete = hide;
    specs.onCompleteParams = [name];
  }

  tl.to("#" + name, time, specs, label);
}

/**
 * Show an element with display block.
 */
function show(name) {
  e(name).style.display = "block";
}

/**
 * Hide an element with display none.
 */
function hide(name) {
  e(name).style.display = "none";
}

/**
 * Check loops. If we've reached the loop limit, clear our TimelineLite object.
 * Otherwise, simply increment the loops and let TimelineLite restart.
 */
function loopCheck() {
  if (loops >= 1) {
    tl.clear();

  }
  loops++;
}

/**
 * Start over all the animations as part of our TimelineLite object.
 */
function restart() {
  tl.restart();


}

/**
 * Shorthand to grab an element.
 */
var e = getElement = function (name) {
  return document.getElementById(name);
};


