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
	theTimeline.add(new TweenLite.fromTo('#copy1_mask', 0.5, {width:'0px'}, {width:'235px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.fromTo('#copy2', 0.5, {y:-62}, {y:0, ease:Power2.easeOut}));

	theTimeline.add(new TweenLite.fromTo("#graph", 2, {drawSVG: "100% 100%"}, {drawSVG: "100% 0%", ease:Linear.easeNone}), "-=1"); 
	theTimeline.add(new TweenLite.fromTo('#graph_mask', 0.6, {width:"0px"}, {width:"30%", ease:Linear.easeNone}), "<-0.1");
	theTimeline.add(new TweenLite.to('#graph_mask', 0.6, {width:"60%", ease:Linear.easeNone}), "<+0.5");
	theTimeline.add(new TweenLite.to('#graph_mask', 0.9, {width:"105%", ease:Linear.easeNone}), "<+0.6");  	

	//Frame 2
  	theTimeline.add(new TweenLite.to('#graphSVG, #graph_mask', 0.5, {filter:"blur(2px)"}))
	theTimeline.add(new TweenLite.fromTo("#imgPhone", 0.5, {x:300}, {x:0, ease:Back.easeOut}), "-=0.25")

	//Frame 3
	theTimeline.add(new TweenLite.to('#copy1_mask, #copy2_mask', 0.5, {opacity:0}), "+=0.5");	
	theTimeline.add(new TweenLite.from('#copy3_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy4', 0.5, {y:-61, ease:Power2.easeOut}));

	theTimeline.add(new TweenLite.fromTo("#copy5, #btn_cta, #cta_label", 0.5, {opacity:0}, {opacity:1}), "+=1");
	//theTimeline.add(new TweenLite.from('#btn_cta, #cta_label', 0.5, {opacity:0})); //, onComplete:checkLoop

	//loop
	//theTimeline.add(new TweenLite.to('#copy3_mask, #copy4, #btn_cta, #imgPhone, #graphSVG, #graph_mask', 0.5, {opacity:0, onComplete:restartTimeline}), "+=1");
	
	console.log('t ' + theTimeline.duration())

	function pause() {
		theTimeline.pause();
	}


	function checkLoop() {
		if (loopCount > 1 ) {
			theTimeline.pause();

		} else {
			loopCount++;
		}
	}

	function restartTimeline() {
		theTimeline.restart();
	}
}
