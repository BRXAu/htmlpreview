/**
 * Globals.
 */
var tl;
var bgtl;
var loops = 0;

var sources = {
  logo: 'logo.svg',
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
  tl = new TimelineLite({
    onComplete: restart
  });

  var time = .9;

  e("banner-hover").addEventListener('mouseover', onMouseOver);
  e("banner-hover").addEventListener('mouseout', onMouseOut);
  //----Frame1------//
  // In
  disappear("copy1-cont", time, { width: "+=309", ease: Sine.easeOut }, "f1", false);
  
  appear("terms", time, { opacity: 0, y: "+=10", ease: Quint.easeOut}, "f1+=1");

  appear("copy2", time, { opacity: 0, y: "-=82", ease: Quint.easeOut }, "f1+=.5");
  appear("copy3-cont", time, { opacity: 0, y: "-=30", ease: Quint.easeOut }, "f1+=1");
  appear("copy3-1", time, { opacity:0, ease: Quint.easeOut }, "f1+=1");
  
  appear("cta-cont", time/2, { opacity: 0, y:"-=5", ease: Sine.easeOut, onComplete: loopCheck }, "f1+=1.35");
  
  disappear("cta-cont",time,{opacity:0,ease:Quint.easeOut},"f1Out+=1.5", false);

  disappear("copy1-cont",time,{opacity:0,ease:Quint.easeOut},"f1Out+=1.5", false);
  disappear("copy2",time,{opacity:0,ease:Quint.easeOut},"f1Out+=1.5");
  disappear("copy3-cont",time,{opacity:0,ease:Quint.easeOut},"f1Out+=1.5");
  disappear("terms",time,{opacity:0,ease:Quint.easeOut},"f1Out+=1.5");


}


/**
 * For animating assets at the start of each frame.
 */
function appear(name, time, specs, label) {
  specs.onStart = show;
  specs.onStartParams = [name];

  tl.from("#" + name, time, specs, label);
}

function onMouseOver() {
  TweenLite.to("#cta-bg", 0.25, { backgroundColor: "#FFDE4D", scaleX:0.95, ease: Power2.easeOut });
}
function onMouseOut() {
  TweenLite.to("#cta-bg", 0.25, { backgroundColor: "#FFD000", scaleX:1, ease: Power2.easeOut });
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


