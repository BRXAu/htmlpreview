/*© Big Red Communications Group Pty Ltd 2025. All Rights Reserved.
You may not copy, reproduce or communicate any of the contents of this file without the permission of the copyright owner.*/
if(document.addEventListener) {
 	window.addEventListener( "load", allDocIsReady, false )
} else {
 	window.attachEvent('onload', allDocIsReady);
}

function swapCta(evt){
	document.getElementById(evt.target.id).src = "btn_cta_hover.svg";
}
function swapCtaBack(evt){
	document.getElementById(evt.target.id).src = "btn_cta.svg";
}

function showTerms() {
	let showPanel = false;
	const termsPanel = document.getElementById("terms_panel");
	TweenLite.to(termsPanel,0.4,{y:-100,ease: Power2.easeOut});
	showPanel = true;
}

function hideTerms() {
	let hidePanel = false;
	const termsPanel = document.getElementById("terms_panel");
	TweenLite.to(termsPanel,0.4,{y:0,ease: Power2.easeOut});
	hidePanel = true;
}

function allDocIsReady() {

	//listeners
	termsButton = document.getElementById('copyDisclaimer');
	termsPanel = document.getElementById('terms_panel');
	termsButton.addEventListener('click', showTerms, false);
	termsPanel.addEventListener('click', hideTerms, false);

	document.getElementById('btn_cta').addEventListener('mouseover', swapCta, false);
	document.getElementById('btn_cta').addEventListener('mouseout', swapCtaBack, false);

	var theTimeline = new TimelineLite();
	var loopCount = 1;


	TweenLite.set('#the_blind', {opacity:0, display:'none'});

	// Frame 1
	theTimeline.add(new TweenLite.from('#copy1', 0.5, {y:10, opacity:0, ease:Power1.easeOut}));
	theTimeline.add(new TweenLite.to('#copy1', 0.5, {opacity: 0, delay:3.5}));

	// Frame 2
	theTimeline.add(new TweenLite.from('#copy2', 0.5, {y:10, opacity:0, ease:Power1.easeOut}));
	theTimeline.add(new TweenLite.to('#copy2', 0.5, {opacity: 0, delay:2.5}));

	// Frame 3
	theTimeline.add(new TweenLite.from('#copy3', 0.5, {y:10, opacity:0, ease:Power1.easeOut}));

	function pause() {
		theTimeline.stop();
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
