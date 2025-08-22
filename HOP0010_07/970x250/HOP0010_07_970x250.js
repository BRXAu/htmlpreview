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

	TweenLite.set('#the_blind', {opacity:0, display:'none'});

	const logos = document.querySelectorAll(".logo_canstar");
	TweenLite.set(logos, {x:-805})

	//Frame 1
	theTimeline.add(new TweenLite.from('#copy1_f1_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy2_f1', 0.5, {y:-80, ease:Power2.easeOut}));

	//Frame 2
	theTimeline.add(new TweenLite.from('#imgGoalposts', 0.5, {opacity:0}), "+=0.5");
	theTimeline.add(new TweenLite.from('#imgBall', 0.8, {scale:0, ease:Power0.easeIn, onStart:ballSpins}))	
	theTimeline.add(new TweenLite.to('#imgBall', 1, {scale:2, y:-28, ease:Power0.easeOut}), "-=0.15")	

	theTimeline.add(new TweenLite.to('#copy1_f1_mask, #copy2_f1_mask, #f1', 0.5, {opacity:0, onStart:rollInAwards}), "+=0.3")

	//Frame 3
	theTimeline.add(new TweenLite.from('#copy1_f2_mask', 0.5, {width:'0px', ease:Power2.easeOut}), "+=1.5");
	theTimeline.add(new TweenLite.from('#copy2_f2', 0.5, {y:-36, ease:Power2.easeOut}));

	theTimeline.add(new TweenLite.to('#copy1_f2_mask, #copy2_f2_mask, .logo_canstar', 0.5, {opacity:0}), "+=1.5")

	//Frame 4
	theTimeline.add(new TweenLite.from('#copy2_mask', 0.5, {width:'0px', ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#copy3', 0.5, {y:-77, ease:Power2.easeOut, delay:-0.2}));
	theTimeline.add(new TweenLite.from('#copy5', 0.5, {opacity:0, y:-5, ease:Power2.easeOut}));
	theTimeline.add(new TweenLite.from('#logo_canstar_large', 0.5, {opacity:0, y:-5, ease:Back.easeOut}));

	console.log('t ' + theTimeline.duration())

	function pause() {
		theTimeline.stop();
	}

	function ballSpins() {
		TweenLite.to('#imgBall', 4, {rotation:1250, ease:Linear.easeNone})
	}

	function rollInAwards() {
		//Roll in Canstar logos
		logos.forEach(function(logos, i) {
			var angle = Math.random() * -360 - 380;

			const isFirstRow = i >= 4;
			const rowIndex = isFirstRow ? i - 4 : i;
				
			const paddingX = rowIndex * -19;

			const baseDelay = 0.5;
			const delayOffset = isFirstRow ? 0 : 0.05;
			const staggerDelay = rowIndex * 0.02;

			TweenLite.fromTo(logos, 2, {
				x:-805, rotation: angle
			}, 
			{
				x:0, rotation:0, ease:Power1.easeOut, delay: baseDelay + delayOffset + staggerDelay
			}, i =+ 0.1)
		})
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
