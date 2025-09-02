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
	TweenLite.to(termsPanel,0.4,{y:-250,ease: Power2.easeOut});
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
	const calendarBoxes = gsap.utils.toArray('.block');

	TweenLite.set('#the_blind', {opacity:0, display:'none'});


	//Frame 2
	theTimeline.add(new TweenLite.from('#copy3_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy4', 0.5, {y:-49, ease:Power2.easeOut}));

	//animate calendar boxes
	calendarBoxes.forEach((calendarBox, i) => {
		TweenLite.to(calendarBox, 0.15, {fill:"#FFD000", delay: i * 0.2, ease:Linear.easeNone, 
		onComplete: () => {
			TweenLite.to(calendarBoxes[i - 1], {
				fill: '#4C6888',
				ease:Power2.easeOut,
			});
		}});
	});


	theTimeline.add(new TweenLite.to('#copy3_mask, #copy4_mask, #calendar', 0.5, {opacity:0}), "+=2.3");

	//Frame 3
	theTimeline.add(new TweenLite.from('#copy5_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy6', 0.5, {y:-76, ease:Power2.easeOut}));

	theTimeline.add(new TweenLite.from("#rightTalkingBubble", 0.5, {opacity:0, scale:0, ease:Back.easeOut}), "-=0.5");
	theTimeline.add(new TweenLite.from("#leftTalkingBubble", 0.5, {opacity:0, scale:0, ease:Back.easeOut}), "-=0.8");	

	theTimeline.add(new TweenMax.to('#copy5_mask, #copy6_mask, #leftTalkingBubble, #rightTalkingBubble', 0.5, {opacity:0}), "+=2");

	//Frame 4
	theTimeline.add(new TweenLite.from('#copy7_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy8', 0.5, {y:-32, ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy9', 0.5, {opacity:0}));

	theTimeline.add(new TweenLite.from("#checkbox", 0.5, {opacity:0}), "-=1.1");	
  	theTimeline.add(new TweenLite.fromTo("#tick", 0.7, {drawSVG: "100% 100%"}, {drawSVG: "0% 100%", ease:Back.easeIn.config(0.50)}), "-=0.95");

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
