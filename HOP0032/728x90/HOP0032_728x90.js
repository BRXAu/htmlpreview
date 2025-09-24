/*© Big Red Communications Group Pty Ltd 2025. All Rights Reserved.
You may not copy, reproduce or communicate any of the contents of this file without the permission of the copyright owner.*/

if(document.addEventListener) {
 	window.addEventListener( "load", allDocIsReady, false )
} else {
 	window.attachEvent('onload', allDocIsReady);
}

function showTerms() {
	let showPanel = false;
	const termsPanel = document.getElementById("terms_panel");
	TweenLite.to(termsPanel,0.4,{y:-90,ease: Power2.easeOut});
	showPanel = true;
}

function hideTerms() {
	let hidePanel = false;
	const termsPanel = document.getElementById("terms_panel");
	TweenLite.to(termsPanel,0.4,{y:0,ease: Power2.easeOut});
	hidePanel = true;
}

function swapCta() {
	TweenLite.to("#btn_cta", 0.25, {backgroundColor: "#FFDE4D", scaleX:0.95, ease:Power2.easeOut});
}

function swapCtaBack() {
	TweenLite.to("#btn_cta", 0.25, {backgroundColor: "#FFD000", scaleX:1, ease:Power2.easeIn});
}

function allDocIsReady() {

	//listeners
	termsButton = document.getElementById('copy_terms');
	termsPanel = document.getElementById('terms_panel');
	termsButton.addEventListener('click', showTerms, false);
	termsPanel.addEventListener('click', hideTerms, false);

	document.getElementById('btn_cta').addEventListener('mouseover', swapCta, false);
	document.getElementById('btn_cta').addEventListener('mouseout', swapCtaBack, false);	

	var theTimeline = new TimelineLite();
	var loopCount = 1;

	TweenLite.set('#the_blind', {opacity:0, display:'none'});


	theTimeline.add(new TweenLite.from('#logo_finder, #dropShadow', 0.5, {scale:0, ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.fromTo('#imgShine', 1.8, {x:129, y:0}, {x:-149, y:0}));
	theTimeline.add(new TweenLite.from('#imgSparkle', 0.5, {opacity:0}), "-=0.25")

	theTimeline.add(new TweenLite.to('.f1', 0.15, {scaleX:0.05, transformOrigin: '50px 0px'}), "+=0.5")
	theTimeline.add(new TweenLite.to('.f1', 0.13, {scaleX:-1, transformOrigin: '50px 0px'}))
	theTimeline.add(new TweenLite.to('.f1', 0.13, {scaleX:1, transformOrigin: '50px 0px'}))
	theTimeline.add(new TweenLite.to('.f1', 0.13, {scaleX:-1, transformOrigin: '50px 0px'}))
	theTimeline.add(new TweenLite.to('.f1', 0.13, {scaleX:1, transformOrigin: '50px 0px'}))

	//Frame 2
	theTimeline.add(new TweenLite.from('#copy3_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy4', 0.5, {y:-71, ease:Power2.easeOut}));

	//Frame 4
	theTimeline.add(new TweenLite.from('#copy9', 0.5, {opacity:0}));
	theTimeline.add(new TweenLite.from('#btn_cta', 0.5, {opacity:0}));

  	console.log("t " + theTimeline.duration())

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
