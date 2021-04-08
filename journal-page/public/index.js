/*jshint esversion:6*/

const $ = require('jquery');
const anime = require('animejs');

$(function() {
	anime({
		targets: '.scroll-down-container i',
		duration: 500,
		top: ['-5px', '5px'],
		easing: 'easeInOutQuad',
		direction: 'alternate',
		loop: true,
	});
	anime({
		targets: '.scroll-down-container',
		bottom: ['-20%', '10%'],
		opacity: ['0%', '100%'],
		easing: 'easeOutBack',
		delay: 1000,
		duration: 800
	});
	anime({
		targets: '.enter-title span',
		top: ['-50vh', '0vh'],
		easing: 'easeInOutCubic',
		delay: anime.stagger(100, {easing: 'easeInSine'})
	});
	anime({
		targets: '.subtitle',
		opacity: ['0%', '100%'],
		duration: 1000,
		easing: 'easeOutElastic',
		delay: 1000
	});

	$(document).on("scroll", enterPage);
	$("#categories").on('click', toggleShowCategories);
});

function enterPage() {
	if ( $(document).scrollTop() > 0 ) {
		$(document).off('scroll', enterPage);
		$(document).scrollTop(0);
		anime({
			targets: ['.scroll-down-container', '.subtitle'],
			duration: 1400,
			opacity: ['100%', '0%'],
		});
		anime({
			targets: '.enter-page',
			duration: 1400,
			height: '0vh',
			easing: 'cubicBezier(0.34, 1.56, 0.64, 1)'
		});
		anime({
			targets: '.enter-title',
			duration: 1400,
			top: '0px',
			opacity: ['100%', '0%'],
			easing: 'easeOutExpo'
		});
		anime({
			targets: 'nav',
			duration: 1000,
			top: ['-10%', '0%'],
			opacity: ['0%', '100%'],
			easing: 'easeOutExpo',
			delay: 400,
		});
	}

}

var categoriesShown = false;
function toggleShowCategories() {
	let right = [];
	if ( !categoriesShown )
		right = ['-50%', '2%'];
	else
		right = ['2%','-50%'];

	anime({
		targets: '.categories',
		right: right,
		duration: 2000,
	});
	categoriesShown = !categoriesShown;
} 
