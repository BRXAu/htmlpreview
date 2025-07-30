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
	var loopCount = 1;

	TweenLite.set('#the_blind', {opacity:0, display:'none'});

	//Frame 1
	theTimeline.add(new TweenLite.from('#copy1_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy2', 0.5, {y:-50, ease:Power2.easeOut}));

	theTimeline.add(new TweenMax.to('#f1_head', 0.5, {rotation:10, yoyo:true, repeat:5}), "-=0.5")

	theTimeline.add(new TweenLite.to('#copy1_mask, #copy2_mask, #f1_head, #f1_neck', 0.5, {opacity:0}));

	//Frame 2
	theTimeline.add(new TweenLite.from('#copy3_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy4', 0.5, {y:-49, ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from("#f2_neck, #headElem_f2", 0.5, {opacity:0, onStart:playCogs}), "-=1.1");

	theTimeline.add(new TweenMax.to('#f2_head', 0.5, {rotation:10, yoyo:true, repeat:5}), "-=0.5")	

	theTimeline.add(new TweenLite.to('#copy3_mask, #copy4_mask, #headElem_f2, #f2_neck', 0.5, {opacity:0}));

	//Frame 3
	theTimeline.add(new TweenLite.from('#copy5_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy6', 0.5, {y:-76, ease:Power2.easeOut}));

	theTimeline.add(new TweenLite.from("#f3_head, #f3_mic", 0.5, {opacity:0}), "-=1.1");

	theTimeline.add(new TweenLite.fromTo("#f3_mic", 0.5, {y:0}, {y:-2, ease:Power2.easeInOut}));
	theTimeline.add(new TweenLite.to("#f3_mic", 0.5, {y:2, ease:Power2.easeInOut}), "+=0.5");
	theTimeline.add(new TweenLite.to("#f3_mic", 0.5, {y:0, ease:Power2.easeInOut}));	


	theTimeline.add(new TweenMax.to('#copy5_mask, #copy6_mask, #f3_head, #f3_mic', 0.5, {opacity:0}));

	//Frame 4
	theTimeline.add(new TweenLite.from('#copy7_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy8', 0.5, {y:-32, ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy9', 0.5, {opacity:0}));

	theTimeline.add(new TweenLite.from("#checkbox", 0.5, {opacity:0}), "-=1.1");	
  	theTimeline.add(new TweenLite.fromTo("#tick", 0.7, {drawSVG: "100% 100%"}, {drawSVG: "0% 100%", ease:Back.easeIn.config(0.50)}), "-=0.95");

  	console.log("t " + theTimeline.duration())

	function playCogs() {
		TweenLite.to('#f2_cog_1', 4, {rotation:-100, ease:Linear.easeNone})
		TweenLite.to('#f2_cog_2', 4, {rotation:100, ease:Linear.easeNone})
	}

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
