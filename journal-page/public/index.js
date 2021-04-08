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
		top: ['-80vh', '0vh'],
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
	manageCategoriesMenu();
	manageNavBar();
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
			duration: 1000,
			height: '0vh',
			easing: 'easeOutQuad'
		});
		anime({
			targets: '.enter-title',
			duration: 1100,
			top: '0px',
			opacity: ['100%', '0%'],
			easing: 'easeOutExpo'
		});
		anime({
			targets: 'nav',
			duration: 200,
			top: ['-10%', '0%'],
			opacity: ['0%', '100%'],
			easing: 'easeOutExpo',
			delay: 400,
		});

		setTimeout(function() {
			$(".enter-page").remove();
		}, 1400);
	}
}

var mantainShown = true;
function manageCategoriesMenu() {
	$("#categories-link").on("mouseover", function() {
		if ( mantainShown ) {
			toggleCategoriesMenu();
		}
		mantainShown = true;
	});
	$('.hover-wraper').on('mouseover', function() {
		mantainShown = true;
	});
	$(".hover-wraper, #categories-link").on("mouseout", function() {
		mantainShown = false;
		setTimeout(function(){
			if ( !mantainShown )
				toggleCategoriesMenu();
		}, 100);
	});
}

function toggleCategoriesMenu() {
	if ( mantainShown ) {
		$('.category-icon').css({opacity: '0%'});
		$(".hover-wraper").addClass("slide");
		$('#categories-link').addClass("text-shadow");
		anime({
			targets: '.category-wraper a',
			right: ['-50%', '0%'],
			easing: 'cubicBezier(0.075, 0.820, 0.720, 1.020)',
			duration: 300,
			delay: anime.stagger(80, {easing: 'easeInSine'})
		});
		anime({
			targets: '.category-icon',
			opacity: ['0%', '100%'],
			easing: 'cubicBezier(0.075, 0.820, 0.720, 1.020)',
			duration: 300,
			delay: anime.stagger(80, {start: 400, easing: 'easeInSine'})
		});

	} else {
		$('#categories-link').removeClass("text-shadow");
		$(".hover-wraper").removeClass("slide");
		mantainShown = true;
	}
}

function manageNavBar() {
	var currentOffset = 0;
	$(document).on('scroll', function() {
		if ( $(document).scrollTop() > currentOffset )
			$('nav').css({top: '-10vh', opacity: '0%'});
		else
			$('nav').css({top: '0vh', opacity: '100%'});

		currentOffset = $(document).scrollTop();

		if ( $(document).scrollTop() < 10 ) {
			$('nav, .categories-container').css('background-color', '');
			$('.right-nav-link span, .title, .categories-container, .categories-container a').css('color', 'rgb(29, 29, 29)');
			$('.hover-wraper').css({'padding-top': '', width: '100%'});
			$('.category-wraper').css('margin', '0');
			$('.categories-container-arrow').css('visibility', 'hidden');
			document.body.style.setProperty('--shwc',"#d4d4d4");
		} else {
			$('nav, .categories-container').css("background-color", "#252525");
			$('.right-nav-link span, .title, .categories-container, .categories-container a').css('color', '#f6f5f5');
			$('.hover-wraper').css({'padding-top': '5vh', width: '200%'});
			$('.category-wraper').css('margin', '0 15%');
			$('.categories-container-arrow').css('visibility', 'visible');
			document.body.style.setProperty('--shwc',"#4b4b4b");
		}
			
	});
}
