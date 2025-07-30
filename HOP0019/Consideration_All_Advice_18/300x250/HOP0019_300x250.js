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
	  TweenLite.to("#cta_arrow, #cta_arrow_hover", 0.25, { x:5, ease: Power2.easeOut });
	  TweenLite.to("#cta_label_hover, #cta_arrow_hover", 0.25, { opacity:1, ease: Power2.easeOut });
	  TweenLite.to("#cta_label", 0.25, { opacity:0, ease: Power2.easeOut });	
}

function swapCtaBack() {
	  TweenLite.to("#cta_arrow, #cta_arrow_hover", 0.25, { x: 0, ease: Power2.easeOut });
	  TweenLite.to("#cta_label_hover, #cta_arrow_hover", 0.25, { opacity:0, ease: Power2.easeOut });
	  TweenLite.to("#cta_label", 0.25, { opacity:1, ease: Power2.easeOut });	
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
	var handTimeline = new TimelineLite();
	var loopCount = 1;

	TweenLite.set('#the_blind', {opacity:0, display:'none'});

	//Frame 1
	theTimeline.add(new TweenLite.from('#copy1_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy2', 0.5, {y:-50, ease:Power2.easeOut}));

	theTimeline.add(new TweenLite.to('#copy1_mask, #copy2_mask', 0.5, {opacity:0}), "+=2");

	//Frame 2
	theTimeline.add(new TweenLite.from('#copy3_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy4', 0.5, {y:-49, ease:Power2.easeOut}));

	handTimeline.add(new TweenLite.to('.throw', 0.15, {rotation:-5, y:-5, transformOrigin:"bottom right", ease:Back.easeIn.config(5)}), "+=2.9")
	handTimeline.add(new TweenLite.to('.throw', 0.15, {rotation:-15, y:-15, transformOrigin:"50% 100%", ease:Linear.easeNone}));
	handTimeline.add(new TweenLite.to('#dollarSign', 0.15, {scale:1.20, y:-20}));
	handTimeline.add(new TweenLite.to('.throw', 0.35, {rotation:0, y:0, transformOrigin:"bottom right", ease:Back.easeOut.config(5)}));
	handTimeline.add(new TweenLite.to('#dollarSign', 0.15, {x:3, y:6}), "-=0.15");	

	theTimeline.add(new TweenLite.to('#copy3_mask, #copy4_mask, .throw', 0.5, {opacity:0}), "+=2.5");

	//Frame 3
	theTimeline.add(new TweenLite.from('#copy5_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy6', 0.5, {y:-76, ease:Power2.easeOut}));

	theTimeline.add(new TweenLite.from("#laptop", 0.5, {opacity:0}), "-=1");
	theTimeline.add(new TweenLite.from("#icon", 0.5, {opacity:0}));

	theTimeline.add(new TweenMax.to('#copy5_mask, #copy6_mask, #laptop, #icon', 0.5, {opacity:0}), "+=2");

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
