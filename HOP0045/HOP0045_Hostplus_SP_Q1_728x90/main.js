/**
 * Globals.
 */
var tl;
var bgtl;
var loops = 0;

var sources = {
  copy31: 'copy1.svg',
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
  disappear("copy1-cont", time, { width: "+=345", ease: Sine.easeOut }, "f1", false);
  appear("terms", time, { opacity: 0, y: "+=10", ease: Quint.easeOut}, "f1");
  
  appear("copy2", time, { opacity: 0, y: "-=120", ease: Quint.easeOut }, "f1+=.5");

  disappear("copy1", time, { opacity: 0, y:"-=5", ease: Quint.easeOut }, "f1Out+=1.5", false);
  disappear("copy2-cont", time, { opacity: 0, y:"-=5", ease: Quint.easeOut }, "f1Out+=1.5", false);

  disappear("copy1-cont", time, { width: "0", ease: Sine.easeOut }, "f2", false);
  appear("copy3-cont", time, { opacity: 0, y: "0", ease: Quint.easeOut }, "f2");
  //appear("copy3-1", time, { y: "-=110", ease: Quint.easeOut }, "f2");
  appear("cta-cont", time / 2, { opacity: 0, y: "-=5", ease: Sine.easeOut, onComplete:loopCheck  }, "f2+=.75");

  disappear("copy3-cont", time, { opacity: 0, ease: Quint.easeOut }, "f2Out+=1.5");
  //disappear("copy3-1", time, { opacity: 0, ease: Quint.easeOut }, "f2Out+=1.5");
  disappear("cta-cont", time / 2, { opacity: 0, y: "-=5", ease: Sine.easeOut }, "f2Out+=1.5",false);
 

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
  TweenLite.to("#cta-white", 0.25, { opacity: 1, ease: Power2.easeOut });
  
  TweenLite.to("#cta1", 0.25, { opacity:0, ease: Power2.easeOut });
  TweenLite.to("#cta2", 0.25, { opacity:1, ease: Power2.easeOut });

  TweenLite.to("#cta1-arrow", 0.25, { opacity:0, x: +5, ease: Power2.easeOut });
  TweenLite.to("#cta2-arrow", 0.25, { opacity:1, x: +5, ease: Power2.easeOut });
}
function onMouseOut() {
  TweenLite.to("#cta-white", 0.25, { opacity: 0, ease: Power2.easeOut });
 
  TweenLite.to("#cta1", 0.25, { opacity:1, ease: Power2.easeOut });
  TweenLite.to("#cta2", 0.25, { opacity:0, ease: Power2.easeOut });

  TweenLite.to("#cta1-arrow", 0.25, { opacity:1, x: 0, ease: Power2.easeOut });
  TweenLite.to("#cta2-arrow", 0.25, { opacity:0, x: 0, ease: Power2.easeOut });
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

    TweenLite.to("#copy3-cont", 1, { opacity: 0, ease: Quint.easeOut,delay:1.5 });
    TweenLite.to("#copy3-1", 1, { opacity: 0, ease: Quint.easeOut,delay:1.5});
    TweenLite.to("#copy1-cont",1,{width:0,ease:Quint.easeOut,delay:1.5})
    TweenLite.to("#copy2",1,{y:"-=120",ease:Quint.easeOut,delay:1.5})
    TweenLite.to("#copy1",1,{y:"+=5",ease:Quint.easeOut,delay:1.5})    

    TweenLite.to("#copy1-cont", 1, { width: "+=450", ease: Sine.easeOut,delay:2.5 });
    TweenLite.to("#copy1",1,{opacity:1,ease:Quint.easeOut,delay:2.25})    
    TweenLite.to("#copy2",1,{opacity:1,y:"+=125",ease:Quint.easeOut,delay:3})   
    TweenLite.to("#copy2-cont",0,{opacity:1,ease:Quint.easeOut,delay:2.5})   

  } else {
    disappear("terms", 1, { opacity: 0,  ease: Quint.easeOut}, "f2Out+=1.5");
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


