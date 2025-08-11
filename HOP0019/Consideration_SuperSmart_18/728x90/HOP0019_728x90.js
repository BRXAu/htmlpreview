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
	var arrowTimeline = new TimelineLite();
	var clockTimeline = new TimelineLite();
	var loopCount = 1;

	TweenLite.set('#the_blind', {opacity:0, display:'none'});

	//Frame 1
	theTimeline.add(new TweenLite.from('#copy1_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy2', 0.5, {y:-50, ease:Power2.easeOut}));

	arrowTimeline.add(new TweenLite.fromTo('#timeArrow', 1.5, {rotation:-191}, {rotation:0, ease:Power2.easeOut}));
	arrowTimeline.add(new TweenLite.fromTo('#time2, #time1', 1.5, {rotation:-151}, {rotation:0, ease:Power2.easeOut}), "-=1.5");
	clockTimeline.add(new TweenLite.fromTo('#bigHand', 1.5, {rotation:-430}, {rotation:0, ease:Power2.easeOut}));
	clockTimeline.add(new TweenLite.fromTo('#smallHand', 1.5, {rotation:-330}, {rotation:0, ease:Power2.easeOut}), "-=1.5");	

	//Frame 2
	theTimeline.add(new TweenLite.to('#copy1_mask, #copy2_mask, .clock', 0.5, {opacity:0}), "+=2");

	theTimeline.add(new TweenLite.from('#copy3_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy4', 0.5, {y:-49, ease:Power2.easeOut}));

	theTimeline.add(new TweenLite.from("#laptop", 0.5, {opacity:0}), "-=1");
	theTimeline.add(new TweenLite.to("#laptopHead", 0.45, {width:"51px", height:"36px", clipPath:"polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", ease:Linear.easeNone}))
	theTimeline.add(new TweenLite.fromTo("#laptopScreen", 0.45, {
		width:"48px", height:"18px", x:-1, y:14, clipPath:"polygon(0px 93.338%, 100% 93.338%, 98.0141% 100%, 3.9718% 100%)"
	}, 
	{width:"45px", height:"29px", x:0, y:0, clipPath:"polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", ease:Linear.easeNone}), "-=0.45")

	theTimeline.add(new TweenLite.to('#copy3_mask, #copy4_mask', 0.5, {opacity:0}), "+=2");
	theTimeline.add(new TweenLite.from("#icon", 0.5, {scale:0, ease:Back.easeOut.config(5)}), "-=0.95");

	//Frame 3
	theTimeline.add(new TweenLite.from('#copy5_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy6', 0.5, {y:-76, ease:Power2.easeOut}));

	theTimeline.add(new TweenMax.to('#copy5_mask, #copy6_mask, #laptop, #icon', 0.5, {opacity:0}), "+=2.3");

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
