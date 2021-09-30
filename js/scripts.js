// TODO: ↓↓↓ remove this script ↓↓↓
// Current menu item highlithing
$(function () {
	var location = window.location.href;
	var cur_url = location.split('/').pop();

	$('.top-nav li, .mobile-top-nav li, .footer-nav li').each(function () {
		var link = $(this).find('a').attr('href');

		// console.log(link);

		if (cur_url == '') {
			cur_url = 'index.html';
		}

		if (cur_url == link)
		{
			$(this).addClass('current-menu-item');
			$(this).parents('li').addClass('current-menu-parent');
		}
	});
});


document.addEventListener('DOMContentLoaded', function(){
	// TODO: remove
	$('.new-single-post-section .default-block, .single-header-section').click(function(){
		$(this).toggleClass('beige');
	});

	const isRTL = $('html').attr('dir') == 'rtl';
	const isMobile = $(window).width() < 992;

	if (isRTL) {
		$('.wpcf7').attr('dir','rtl');
	} else{
		$('.wpcf7').attr('dir','ltr');
	}

	function is_touch_device() {
		try {
			document.createEvent("TouchEvent");
			return true;
		} catch (e) {
			return false;
		}
	}

	if(is_touch_device()){
		$('body').addClass('touch');
	} else{
		$('body').addClass('no-touch');
	}

	$(document).on('keyup', function(e){
		if (e.keyCode == 83) {
			$('body').toggleClass('with-overlay');
		}
	});

	const toggleAccordion = (el) => {
		let closeText = 'Show less';
		let openText = 'Show more';

		let btn = $(el).find('> .ac-header > .ac-opener');

		$(el).find('> .ac-content').stop().slideToggle(300);
		$(el).toggleClass('opened');

		if ( $(el).find('.slick-slider').length > 0 ) {
			$(el).find('.slick-slider').slick('setPosition');
		}

		if ( btn.attr('aria-expanded') == 'false' ) {
			btn.attr({
				'aria-expanded': 'true',
				'aria-label': closeText
			});
		} else{
			btn.attr({
				'aria-expanded': 'false',
				'aria-label': openText
			});
		}
	}

	$('.accordion, .js-accordion').each(function(i, el){
		$(el).find('> .ac-header, > .ac-header > .ac-opener').click(function(e){
			e.preventDefault();
			e.stopPropagation();

			toggleAccordion( $(el) );
		});

		if ($(el).hasClass('opened-on-load')) {
			$(el).find('.ac-header').trigger('click');
		}
	});

	if ($(window).width() < 992) {
		$('.mobile-accordion, .js-mobile-accordion').each(function(i, el){
			$(el).find('> .ac-header, > .ac-header > .ac-opener').click(function(e){
				e.preventDefault();
				e.stopPropagation();

				toggleAccordion( $(el) );
			});

			if ($(el).hasClass('opened-on-load')) {
				$(el).find('.ac-header').trigger('click');
			}
		});
	}

	$(window).scroll(function(){
		if ($(window).scrollTop() + $(window).height() > $('.footer').offset().top) {
			$('.sticky-socials').addClass('white-bg');
		} else{
			$('.sticky-socials').removeClass('white-bg');
		}
	});

	$('.audio-block').each(function(i, el){
		const audio = $(el).find('audio')[0];
		let isPlaying = false;

		$(el).find('.playpause-btn').click(function(e){
			e.preventDefault();

			if (!isPlaying) {
				$(el).addClass('playing');
				audio.play();
				isPlaying = true;
			} else{
				$(el).removeClass('playing');
				audio.pause();
				isPlaying = false;
			}
		});
	});

	$('blockquote .show-more-btn').click(function(e){
		e.preventDefault();

		const el = $(this).closest('blockquote');

		$(el).find('.block-hidden-content').slideDown(300);
		$(el).find('.block-footer').slideUp(300);
	});

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41"><path d="M24.2 20.3L0 40.5V0l24.2 20.3z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Next"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41"><path d="M0 20.3L24.2 0v40.5L0 20.2z"/></svg></button>'
	}

	let arrowsButtonsMobile = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 31"><path d="M13 15.5L0 31V0l13 15.5z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Next"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 31"><path d="M0 15.5L13 31V0L0 15.5z"/></svg></button>'
	}

	$('.media-card .card-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		arrows: true,
		...arrowsButtons,
		dots: false,
		rtl: isRTL
	});

	if ($(window).width() < 992) {
		$('.news-grid').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			arrows: true,
			...arrowsButtonsMobile,
			dots: false,
			rtl: isRTL
		});
	}

	$('.testimonials-scope').each(function(i, cmp){
		const slider = $(cmp).find('.testimonials-slider');

		slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$(cmp).find('[data-slide="' + (nextSlide + 1) + '"]').addClass('active').siblings().removeClass('active');
		});

		slider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			arrows: true,
			...arrowsButtons,
			dots: false,
			rtl: isRTL,
			appendArrows: $(cmp).find('.slider-arrows'),
			adaptiveHeight: true
		});

		$(cmp).find('.slider-nav-btn').click(function(e){
			e.preventDefault();

			slider.slick('slickGoTo', $(this).data('slide') - 1);
			$(this).addClass('active').siblings().removeClass('active');
		});
	});

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let offset = 0;

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 80
		}, 500);
	});


	// Page Nav Highlighting
	// Cache selectors
	let topMenu = $('.top-nav ul');

	if ($(window).width() < 992) {
		topMenu = $('.mobile-top-nav ul')
	}

	let lastId,
		topMenuHeight = 0,
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function() {
			if ($(this).attr("href")[0] == '#') {
				var item = $($(this).attr("href"));
				if (item.length) {
					return item;
				}
			}
		});

		console.log(scrollItems);

	// Bind to scroll
	$(window).scroll(function() {
		let fromTop = $(this).scrollTop() + $(window).height() * 0.5;

		let cur = scrollItems.map(function() {
			if ($(this).offset().top < fromTop){
				// if ($(this).offset().top + $(this).outerHeight() > $(window).scrollTop() + $(window).height()) {
				return this;
				// }
			}
		});

		cur = cur[cur.length - 1];
		let id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			menuItems.removeClass("active");
			menuItems.filter("[href='#" + id + "']").addClass("active");
		}
	});
	


	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$('.menu-opener').toggleClass('active');
		$('.mobile-top-nav').toggleClass('opened');
		$('.header').toggleClass('nav-opened');
	});

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 100
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	}


	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);

	// Modals
	$('.modal').css('display','block');

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close, .js-modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		if ($(this).data('modal-tab') != undefined) {
			goToTab($(this).data('modal-tab'));
		}

		showModal( $(this).data('modal') );
	});

	// Video
	$('.video-block:not([data-video-modal])').on('click', function () {
		$(this).addClass('playing');
		$(this).find('.block-overlay').fadeOut(300);

		let videoId = $(this).find('.play-btn').data('video-id');

		if (!videoId) {
			videoId = $(this).data('video-id');
		}

		if (videoId == undefined) {
			$(this).find('video')[0].play();
		} else{
			let videoType = $(this).data('video-type') ? $(this).data('video-type').toLowerCase() : 'youtube';

			if (videoType == 'youtube') {
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"></div>');
				createVideo(videoId, videoId);
			} else if(videoType == 'vimeo'){
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"><iframe allow="autoplay" class="video-iframe" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=0&app_id=122963"></div>');
			}
		}
	});

	$('[data-video-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-modal');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('youtube').append('<div class="video-iframe" id="'+videoId+'"></div>');
			createVideo(videoId, videoId);
		} else if(videoType == 'vimeo'){
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('vimeo').html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
		}

		hideModal('.modal');

		showModal( "#video-modal" );
	});

	var player;
	function createVideo(videoBlockId, videoId) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				'autohide': 1,
				'showinfo' : 0,
				'rel': 0,
				'loop': 1,
				'playsinline': 1,
				'fs': 1,
				'allowsInlineMediaPlayback': true
			},
			events: {
				'onReady': function (e) {
					// e.target.mute();
					// if ($(window).width() > 991) {
						setTimeout(function(){
							e.target.playVideo();
						}, 200);
					// }
				}
			}
		});
	}
});

function getScrollWidth(){
	// create element with scroll
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;

	div.remove();

	return scrollWidth;
}

let bodyScrolled = 0;
function showModal(modal){
	$(modal).addClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body').addClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', getScrollWidth());
}

function hideModal(modal){
	$(modal).removeClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body').removeClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', 0);
}