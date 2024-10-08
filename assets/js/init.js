jQuery(document).ready(function () {
	"use strict";
	edrea_tm_picker();
	edrea_tm_modalbox();
	edrea_tm_page_transition();
	edrea_tm_trigger_menu();
	edrea_tm_about_popup();
	edrea_tm_portfolio_popup();
	edrea_tm_news_popup();
	edrea_tm_cursor();
	edrea_tm_imgtosvg();
	edrea_tm_popup();
	edrea_tm_data_images();
	edrea_tm_contact_form();
	hashtag();
	edrea_tm_swiper();
	edrea_tm_headline();
	edrea_tm_location();
	edrea_tm_color_switcher();
	edrea_tm_cursor_switcher();
	edrea_tm_switcher_opener();
	jQuery(window).load('body', function () {
		edrea_tm_my_load();
	});
});

function edrea_tm_picker() {
	"use strict";
	if (jQuery('.edrea_tm_settings').length) {
		var list = jQuery('.edrea_tm_settings .colors li a');
		list.each(function () {
			jQuery(this).css({
				backgroundColor: jQuery(this).data('color')
			});
		});
		list.on('click', function () {
			var element = jQuery(this);
			var color = element.data('color');
			jQuery(':root').css('--pink-color', color);
			return false;
		});
	}
}

function edrea_tm_my_progress() {
	"use strict";
	jQuery('.progress_inner').each(function () {
		var progress = jQuery(this);
		var pValue = parseInt(progress.data('value'), 10);
		var pColor = progress.data('color');
		var pBarWrap = progress.find('.bar');
		var pBar = progress.find('.bar_in');
		pBar.css({
			width: pValue + '%',
			backgroundColor: pColor
		});
		setTimeout(function () {
			pBarWrap.addClass('open');
		});
	});
}

function edrea_tm_circular_progress() {
	"use strict";
	var circVal = 110;
	var colorSchemes = jQuery(':root').css('--pink-color');
	jQuery('.circular_progress_bar .myCircle').each(function () {
		var element = jQuery(this);
		element.append('<span class="number"></span>');
		var value = element.data('value');
		element.circleProgress({
			size: circVal,
			value: 0,
			animation: {
				duration: 1400
			},
			thickness: 2,
			fill: colorSchemes,
			emptyFill: 'rgba(0,0,0,0)',
			startAngle: -Math.PI / 2
		}).on('circle-animation-progress', function (event, progress, stepValue) {
			element.find('.number').text(parseInt(stepValue.toFixed(2) * 100) + '%');
		});
		element.circleProgress('value', 1.0);
		setTimeout(function () {
			element.circleProgress('value', value);
		}, 1400);
	});
}

function edrea_tm_modalbox() {
	"use strict";
	jQuery('.edrea_tm_all_wrap').prepend('<div class="edrea_tm_modalbox"><div class="box_inner"><div class="close"><a href="#"><i class="icon-cancel"></i></a></div><div class="description_wrap"></div></div></div>')
}

function edrea_tm_page_transition() {
	"use strict";
	var section = jQuery('.edrea_tm_section');
	var allLi = jQuery('.transition_link li');
	var button = jQuery('.transition_link a');
	var wrapper = jQuery('.edrea_tm_all_wrap');
	var enter = wrapper.data('enter');
	var exit = wrapper.data('exit');

	button.on('click', function () {
		var element = jQuery(this);
		var href = element.attr('href');
		var fragment = href.split('#')[1]; // Extract the fragment part
		console.log('Clicked href:', href);
		console.log('Fragment:', fragment);
		if (element.parent().hasClass('edrea_tm_button')) {
			jQuery('.menu .transition_link a[href="' + href + '"]').trigger('click');
			hashtag();
			return false;
		}
		var sectionID = jQuery('#' + fragment); // Use the fragment to find the section
		console.log('Section ID:', sectionID);
		var parent = element.closest('li');
		if (!parent.hasClass('active')) {
			allLi.removeClass('active');
			wrapper.find(section).removeClass('animated ' + enter);
			if (wrapper.hasClass('opened')) {
				wrapper.find(section).addClass('animated ' + exit);
			}
			parent.addClass('active');
			wrapper.addClass('opened');
			jQuery(section).addClass('hidden'); // Hide all sections
			jQuery(sectionID).removeClass('hidden').addClass('animated ' + enter); // Show the target section
			console.log('Activated section:', sectionID);
			// Change drawing mode based on active section
			// if (fragment === 'about') {
			// 	window.setDrawingMode('POINTS');
			// } else {
			// 	window.setDrawingMode('LINE_STRIP');
			// }
		}
		return false;
	});

	// Ensure the correct section is visible on page load
	allLi.each(function () {
		var element = jQuery(this);
		if (element.hasClass('active')) {
			var href = element.find('a').attr('href');
			var fragment = href.split('#')[1]; // Extract the fragment part
			var sectionID = jQuery('#' + fragment); // Use the fragment to find the section
			jQuery(sectionID).removeClass('hidden').addClass('animated ' + enter);
			console.log('Initial active section:', sectionID);
		}
	});
}

function edrea_tm_trigger_menu() {
	"use strict";
	var hamburger = jQuery('.edrea_tm_topbar .trigger .hamburger');
	var mobileMenu = jQuery('.edrea_tm_mobile_menu');
	var mobileMenuList = jQuery('.edrea_tm_mobile_menu ul li a');
	hamburger.on('click', function () {
		var element = jQuery(this);
		if (element.hasClass('is-active')) {
			element.removeClass('is-active');
			mobileMenu.removeClass('opened');
		} else {
			element.addClass('is-active');
			mobileMenu.addClass('opened');
		}
		return false;
	});
	mobileMenuList.on('click', function () {
		jQuery('.edrea_tm_topbar .trigger .hamburger').removeClass('is-active');
		mobileMenu.removeClass('opened');
		return false;
	});
}

function edrea_tm_about_popup() {
	"use strict";
	var button = jQuery('.edrea_tm_about .edrea_tm_button a');
	var close = jQuery('.edrea_tm_modalbox .close');
	var modalBox = jQuery('.edrea_tm_modalbox');
	var hiddenContent = jQuery('.edrea_tm_hidden_content').html();
	button.on('click', function () {
		modalBox.addClass('opened');
		modalBox.find('.description_wrap').html(hiddenContent);
		edrea_tm_data_images();
		edrea_tm_my_progress();
		edrea_tm_circular_progress();
		edrea_tm_mycarousel();
		edrea_tm_location();
	});
	close.on('click', function () {
		modalBox.removeClass('opened');
		modalBox.find('.description_wrap').html('');
	});
}

function edrea_tm_portfolio_popup() {
    "use strict";
    var modalBox = jQuery('.edrea_tm_modalbox');
    var button = jQuery('.edrea_tm_portfolio .portfolio_popup');
    var closePopup = modalBox.find('.close');
    button.off().on('click', function () {
        var element = jQuery(this);
        var parent = element.closest('.list_inner');
        var content = parent.find('.edrea_tm_hidden_content').html();
        var image = parent.find('.image .main').data('img-url');
        var title = parent.find('.details h3').text();
        var category = parent.find('.details span').html();
        modalBox.addClass('opened');
        modalBox.find('.description_wrap').html(content);
        modalBox.find('.portfolio_popup_details').prepend('<div class="top_image gallery_zoom"><a class="zoom" href="' + image + '"><img src="assets/img/thumbs/4-2.jpg" alt="" /><div class="main" data-img-url="' + image + '"></div></a></div>');
        modalBox.find('.portfolio_popup_details .top_image').after('<div class="portfolio_main_title"><h3>' + title + '</h3><span><a href="#">' + category + '</a></span><div>');
        edrea_tm_data_images();
        edrea_tm_popup(); // Initialize the popup functionality
        return false;
    });
    closePopup.on('click', function () {
        modalBox.removeClass('opened');
        modalBox.find('.description_wrap').html('');
        return false;
    });
}

function edrea_tm_news_popup() {
	"use strict";
	var modalBox = jQuery('.edrea_tm_modalbox');
	var button = jQuery('.edrea_tm_news .news_popup,.edrea_tm_news .news_list h3 a');
	var closePopup = modalBox.find('.close');
	button.off().on('click', function () {
		var element = jQuery(this);
		var parent = element.closest('.list_inner');
		var content = parent.find('.edrea_tm_hidden_content').html();
		var image = parent.find('.image .main').data('img-url');
		var title = parent.find('.details h3 a').text();
		var category = parent.find('.details span').html();
		modalBox.addClass('opened');
		modalBox.find('.description_wrap').html(content);
		modalBox.find('.news_popup_details').prepend('<div class="top_image"><img src="assets/img/thumbs/4-2.jpg" alt="" /><div class="main" data-img-url="' + image + '"></div></div>');
		modalBox.find('.news_popup_details .top_image').after('<div class="news_main_title"><h3>' + title + '</h3><span>' + category + '</span><div>');
		edrea_tm_data_images();
		return false;
	});
	closePopup.on('click', function () {
		modalBox.removeClass('opened');
		modalBox.find('.description_wrap').html('');
		return false;
	});
}

function edrea_tm_preloader() {
	"use strict";
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	var preloader = $('#preloader');
	if (!isMobile) {
		setTimeout(function () {
			preloader.addClass('preloaded');
		}, 800);
		setTimeout(function () {
			preloader.remove();
		}, 2000);
	} else {
		preloader.remove();
	}
}

function edrea_tm_my_load() {
	"use strict";
	var speed = 500;
	setTimeout(function () {
		edrea_tm_preloader();
	}, speed);
}

function edrea_tm_cursor() {
	"use strict";
	var myCursor = jQuery('.mouse-cursor');
	if (myCursor.length) {
		if ($("body")) {
			const e = document.querySelector(".cursor-inner"),
				t = document.querySelector(".cursor-outer");
			let n, i = 0,
				o = !1;
			window.onmousemove = function (s) {
				o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
			}, $("body").on("mouseenter", "a,.edrea_tm_topbar .trigger, .cursor-pointer", function () {
				e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
			}), $("body").on("mouseleave", "a,.edrea_tm_topbar .trigger, .cursor-pointer", function () {
				$(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
			}), e.style.visibility = "visible", t.style.visibility = "visible"
		}
	}
};

function edrea_tm_imgtosvg() {
	"use strict";
	jQuery('img.svg').each(function () {
		var jQueryimg = jQuery(this);
		var imgClass = jQueryimg.attr('class');
		var imgURL = jQueryimg.attr('src');
		jQuery.get(imgURL, function (data) {
			var jQuerysvg = jQuery(data).find('svg');
			if (typeof imgClass !== 'undefined') {
				jQuerysvg = jQuerysvg.attr('class', imgClass + ' replaced-svg');
			}
			jQuerysvg = jQuerysvg.removeAttr('xmlns:a');
			jQueryimg.replaceWith(jQuerysvg);
		}, 'xml');
	});
}

function edrea_tm_popup() {
	"use strict";
	jQuery('.gallery_zoom').each(function () {
		jQuery(this).magnificPopup({
			delegate: 'a.zoom',
			type: 'image',
			gallery: {
				enabled: true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
	});
	jQuery('.popup-youtube, .popup-vimeo').each(function () {
		jQuery(this).magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	});
	jQuery('.soundcloude_link').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
		},
	});
}

function edrea_tm_data_images() {
	"use strict";
	var data = jQuery('*[data-img-url]');
	data.each(function () {
		var element = jQuery(this);
		var url = element.data('img-url');
		element.css({
			backgroundImage: 'url(' + url + ')'
		});
	});
}

function edrea_tm_contact_form() {
	"use strict";
	jQuery(".contact_form #send_message").on('click', function () {
		var name = jQuery(".contact_form #name").val();
		var email = jQuery(".contact_form #email").val();
		var message = jQuery(".contact_form #message").val();
		var subject = jQuery(".contact_form #subject").val();
		var success = jQuery(".contact_form .returnmessage").data('success');
		jQuery(".contact_form .returnmessage").empty();
		if (name === '' || email === '' || message === '') {
			jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
		} else {
			jQuery.post("modal/contact.php", {
				ajax_name: name,
				ajax_email: email,
				ajax_message: message,
				ajax_subject: subject
			}, function (data) {
				jQuery(".contact_form .returnmessage").append(data);
				if (data === "") {
					jQuery("#contact_form")[0].reset();
				}
			});
		}
		return false;
	});
}

function edrea_tm_mycarousel() {
	"use strict";
	var carousel = jQuery('.edrea_tm_modalbox .owl-carousel');
	carousel.owlCarousel({
		loop: true,
		items: 1,
		lazyLoad: false,
		margin: 0,
		autoplay: true,
		autoplayTimeout: 7000,
		dots: false,
		nav: false,
		navSpeed: false,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 1
			}
		}
	});
}

function hashtag() {
	"use strict";
	var ccc = $('.edrea_tm_header .menu .ccc');
	var element = $('.edrea_tm_header .menu .active a');
	$('.edrea_tm_header .menu a').on('mouseenter', function () {
		var e = $(this);
		currentLink(ccc, e);
	});
	$('.edrea_tm_header .menu').on('mouseleave', function () {
		element = $('.edrea_tm_header .menu .active a');
		currentLink(ccc, element);
		element.parent().siblings().removeClass('mleave');
	});
	currentLink(ccc, element);
}

function currentLink(ccc, e) {
	"use strict";
	if (!e.length) {
		return false;
	}
	var left = e.offset().left;
	var width = e.outerWidth();
	var menuleft = $('.edrea_tm_header .menu').offset().left;
	e.parent().removeClass('mleave');
	e.parent().siblings().addClass('mleave');
	ccc.css({
		left: (left - menuleft) + 'px',
		width: width + 'px'
	});
}

function edrea_tm_swiper() {
	"use strict";
	$('.swiper-section').each(function () {
		var element = $(this);
		var container = element.find('.swiper-container');
		var mySwiper = new Swiper(container, {
			loop: false,
			slidesPerView: 1,
			spaceBetween: 0,
			loopAdditionalSlides: 1,
			autoplay: {
				delay: 6000,
			},
			navigation: {
				nextEl: '.my_next',
				prevEl: '.my_prev',
			},
			pagination: {
				el: '.edrea_tm_swiper_progress',
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					var scale, translateX;
					var progressDOM = container.find('.edrea_tm_swiper_progress');
					if (progressDOM.hasClass('fill')) {
						translateX = '0px';
						scale = parseInt((current / total) * 100) / 100;
					} else {
						scale = parseInt((1 / total) * 100) / 100;
						translateX = (current - 1) * parseInt((100 / total) * 100) / 100 + 'px';
					}
					progressDOM.find('.all span').css({
						transform: 'translate3d(' + translateX + ',0px,0px) scaleX(' + scale + ') scaleY(1)'
					});
					if (current < 10) {
						current = '0' + current;
					}
					if (total < 10) {
						total = '0' + total;
					}
					progressDOM.find('.current').html(current);
					progressDOM.find('.total').html(total);
				}
			},
			breakpoints: {
				700: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 30,
				}
			}
		});
	});
	edrea_tm_imgtosvg();
}

function edrea_tm_location() {
	"use strict";
	var button = jQuery('.href_location');
	button.on('click', function () {
		var element = jQuery(this);
		var address = element.text();
		address = address.replace(/\ /g, '+');
		var text = 'https://maps.google.com?q=';
		window.open(text + address);
		return false;
	});
}

function edrea_tm_color_switcher() {
	"use strict";
	var list = jQuery('.edrea_tm_settings .colors li a');
	list.on('click', function () {
		var element = jQuery(this);
		var elval = element.attr('class');
		element.closest('.edrea_tm_all_wrap').attr('data-color', '' + elval + '');
		return false;
	});
}

function edrea_tm_cursor_switcher() {
	"use strict";
	var wrapper = jQuery('.edrea_tm_all_wrap');
	var button = jQuery('.edrea_tm_settings .cursor li a');
	var show = jQuery('.edrea_tm_settings .cursor li a.show');
	var hide = jQuery('.edrea_tm_settings .cursor li a.hide');
	button.on('click', function () {
		var element = jQuery(this);
		if (!element.hasClass('showme')) {
			button.removeClass('showme');
			element.addClass('showme');
		}
		return false;
	});
	show.on('click', function () {
		wrapper.attr('data-magic-cursor', '')
	});
	hide.on('click', function () {
		wrapper.attr('data-magic-cursor', 'hide')
	});
}

function edrea_tm_switcher_opener() {
	"use strict";
	var settings = jQuery('.edrea_tm_settings');
	var button = settings.find('.link');
	button.on('click', function () {
		var element = jQuery(this);
		if (element.hasClass('opened')) {
			element.removeClass('opened');
			element.closest('.edrea_tm_settings').removeClass('opened');
		} else {
			element.addClass('opened');
			element.closest('.edrea_tm_settings').addClass('opened');
		}
		return false;
	});
}

document.addEventListener("DOMContentLoaded", function() {
    var contactLinks = document.querySelectorAll('a[href="#contact"]');
    
    contactLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            switchToPoints();
        });
    });
});
