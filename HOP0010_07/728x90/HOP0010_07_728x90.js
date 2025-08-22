/*© Big Red Communications Group Pty Ltd 2023. All Rights Reserved.
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

	const logos = document.querySelectorAll(".logo_canstar");
	TweenLite.set(logos, {x:-728})	

	//Frame 1
	theTimeline.add(new TweenLite.from('#copy1_f1_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy2_f1', 0.5, {y:-23, ease:Power2.easeOut}));

	//Frame 2
	theTimeline.add(new TweenLite.from('#imgGoalposts', 0.5, {opacity:0}), "+=0.8");
	theTimeline.add(new TweenLite.from('#imgBall', 0.8, {scale:0, ease:Power0.easeIn, onStart:ballSpins}))	
	theTimeline.add(new TweenLite.to('#imgBall', 1, {scale:2, y:-10, ease:Power0.easeOut}), "-=0.15")		

	//Frame 3
	theTimeline.add(new TweenLite.to('#f1, #copy1_f1_mask, #copy2_f1_mask', 0.5, {opacity:0}), "+=1");
		//Roll in Canstar logos
		logos.forEach(function(logos, i) {
			var angle = Math.random() * -360 - 380;
			TweenLite.fromTo(logos, 2, {
				x:-805, rotation: angle
			}, 
			{
				x:0, rotation:0, ease:Power1.easeOut, delay:5
			}, i =+ 0.1)
		})

	theTimeline.add(new TweenLite.from('#copy1_f2_mask', 0.5, {width:'0px', ease:Power2.easeOut}), "+=1");
	theTimeline.add(new TweenLite.from('#copy2_f2', 0.5, {y:-23, ease:Power2.easeOut}));

	theTimeline.add(new TweenLite.to("#copy1_f2_mask, #copy2_f2_mask, .logo_canstar", 0.5, {opacity:0}), "+=2")

	//Frame 4
	// theTimeline.add(new TweenLite.from('#copy4', 0.5, {opacity:0}));
	theTimeline.add(new TweenLite.from('#copy2_2_mask', 0.5, {width:'0px', opacity:0, ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy3_2', 0.5, {y:-21, ease:Power2.easeOut}), "-=0.2");	
	theTimeline.add(new TweenLite.from('#copy6', 0.5, {opacity:0, y:-5, ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#logo_canstar_large', 0.5, {opacity:0, y:-5, ease:Back.easeOut}));
	theTimeline.add(new TweenLite.from('#btn_cta, #cta_label', 0.5, {opacity:0}));

	console.log('t ' + theTimeline.duration())

	function pause() {
		theTimeline.stop();
	}

	function ballSpins() {
		TweenLite.to('#imgBall', 4, {rotation:1250, ease:Linear.easeNone})
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
