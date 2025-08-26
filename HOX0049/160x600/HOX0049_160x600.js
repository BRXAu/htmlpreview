/*© Big Red Communications Group Pty Ltd 2025. All Rights Reserved.
You may not copy, reproduce or communicate any of the contents of this file without the permission of the copyright owner.*/

if(document.addEventListener) {
 	window.addEventListener( "load", allDocIsReady, false )
} else {
 	window.attachEvent('onload', allDocIsReady);
}

function swapCta() {
	TweenLite.to("#btn_cta", 0.25, {backgroundColor: "#FFDE4D", scaleX:0.95, ease:Power2.easeOut});
}

function swapCtaBack() {
	TweenLite.to("#btn_cta", 0.25, {backgroundColor: "#FFD000", scaleX:1, ease:Power2.easeIn});
}

function allDocIsReady() {

	//listeners
	document.getElementById('btn_cta').addEventListener('mouseover', swapCta, false);
	document.getElementById('btn_cta').addEventListener('mouseout', swapCtaBack, false);	

	var theTimeline = new TimelineLite();
	var loopCount = 1;

	TweenLite.set('#the_blind', {opacity:0, display:'none'});

	
	//Frame 1
	theTimeline.add(new TweenLite.from('#copy1_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy2', 0.5, {y:-62, ease:Power2.easeOut}));

  	theTimeline.add(new TweenLite.fromTo("#graph", 2, {drawSVG: "0% 0%"}, {drawSVG: "0% 100%", ease:Linear.easeNone}), "-=1");	
  	theTimeline.add(new TweenLite.from('#graph_mask', 0.8, {height:"0px"}));

	//Frame 2
  	theTimeline.add(new TweenLite.to('#graphSVG, #graph_mask', 0.8, {filter:"blur(2px)"}), "+=0.5")
	theTimeline.add(new TweenLite.from("#imgPhone", 0.5, {y:-5, opacity:0, ease:Back.easeOut}))

	//Frame 3
	theTimeline.add(new TweenLite.to('#copy1_mask, #copy2_mask', 0.5, {opacity:0}), "+=0.5");	
	theTimeline.add(new TweenLite.from('#copy3_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy4', 0.5, {y:-61, ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#btn_cta, #cta_label', 0.5, {opacity:0}));
	
	console.log('t ' + theTimeline.duration())

	function pause() {
		theTimeline.pause();
	}


	function checkLoop() {
		if (loopCount > 1 ) {
			theTimeline.stop();

		} else {
			loopCount++;
		}
	}

	function restartTimeline() {
		theTimeline.restart();
	}
}
