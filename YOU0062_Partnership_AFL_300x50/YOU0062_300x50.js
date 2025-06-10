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

function allDocIsReady() {

	//listeners
	document.getElementById('btn_cta').addEventListener('mouseover', swapCta, false);
	document.getElementById('btn_cta').addEventListener('mouseout', swapCtaBack, false);

	var theTimeline = new TimelineLite();
	var loopCount = 1;


	TweenLite.set('#the_blind', {opacity:0, display:'none'});

	// Frame 1
	theTimeline.add(new TweenLite.from('#copy1', 0.5, {y:-5, opacity:0, ease:Power2.easeOut}));

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
