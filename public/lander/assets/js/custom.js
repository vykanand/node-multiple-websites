$(document).ready(function(e) {
    //feature block js start
      $(".feature-list-block li").hover(function(){
      	  var index = $(this).index();
      	  $('.feature-img-block2 .feature-img').removeClass('active');
      	  $('.feature-img-block1 .feature-img').removeClass('active');
      	  $('.feature-img-block1 .feature-img').eq(index).addClass('active');
      });
       $(".extra-feature-list li").hover(function(){
      	  var index = $(this).index();
      	  $('.feature-img-block1 .feature-img').removeClass('active');
      	  $('.feature-img-block2 .feature-img').removeClass('active');
      	  $('.feature-img-block2 .feature-img').eq(index).addClass('active');
      });
    //feature block js end
     //product tab js start
     $('.product-tab-link li').click(function(){
     	$('.product-tab-link li').removeClass('active');
     	var index = $(this).index();
     	$(this).addClass('active');
     	$('.product-tab-content').removeClass('active');
     	$('.product-tab-content').eq(index).addClass('active');
     });
    //product tab js end
    //FAQ accordian js start
    $('.faq-accordian-list a').click(function(){
    	$(this).parent('li').siblings().find('a').removeClass('active');
    	$(this).toggleClass('active');
    	$(this).parent('li').siblings().find('.faq-accordian-text').slideUp(400);
    	$(this).next('.faq-accordian-text').slideToggle(400);
    });
    //FAQ accordian js end
	var parallax = function(id, val) {
		if ($(window).scrollTop() > id.offset().top - $(window).height() && $(window).scrollTop() < id.offset().top + id.outerHeight()) {
			var px = parseInt($(window).scrollTop() - (id.offset().top - $(window).height()));
			px *= -val;
			id.css({
				'background-position' : 'center ' + px + 'px'
			})
		}
	}

	$(window).load(function() {
		if ($('.parallax').length) {
			$('.parallax').each(function() {
				parallax($(this), 0.1);
			})
		}
	})
	$(window).scroll(function() {
		if ($('.parallax').length) {
			$('.parallax').each(function() {
				parallax($(this), 0.1);
			})
		}
	});
	// if($(window).width() > 1024){
	// $('.navigation li').hover(function(){
	// $(this).children('ul').stop().fadeIn();
	// },function(){
	// $(this).children('ul').stop().fadeOut();
	// });
	// $('.navigation li li:first-child').hover(function(){
	// $(this).parent('ul').addClass('arrow')
	//
	// },function(){
	// $(this).parent('ul').removeClass('arrow')
	// });
	// }

	$('.navigation li').mouseenter(function() {
		if ($(window).width() > 1024) {
			$(this).children('ul').stop().fadeIn();
		}
	});
	$('.navigation li').mouseleave(function() {
		if ($(window).width() > 1024) {
			$(this).children('ul').stop().fadeOut();
		}
	});
	$('.navigation li li:first-child').mouseenter(function() {
		if ($(window).width() > 1024) {
			$(this).parent('ul').addClass('arrow')
		}

	});
	$('.navigation li li:first-child').mouseleave(function() {
		if ($(window).width() > 1024) {
			$(this).parent('ul').removeClass('arrow')
		}
	});

	$(window).scroll(function() {
		if (55 < $(window).scrollTop()) {
			$('header').addClass("fixed-header");
			// $('.new-header').addClass("fixed-new-header");

		} else {
			$('header').removeClass("fixed-header");
		}
		if ($('body').hasClass('home')) {
			if ($('.home-project__clip').length) {
				if ($(window).scrollTop() >= ($('.home-project__clip').offset().top - 90)) {

					$('.first-slide .home-project__phone').addClass('fixed-slide');
					$('.best-heating').addClass('best-heating_pos');
				}

				if ($(window).scrollTop() < ($('.home-project__clip').offset().top - 90)) {
					$('.fixed-slide').removeClass('fixed-slide')
					$('.best-heating_pos').removeClass('best-heating_pos').removeClass('best-heating_pos_ab');
				}

				if ($(window).scrollTop() > $('.quality-work').offset().top - $(window).height()) {
					$('.last-slide .home-project__phone').addClass('relative');
					$('.best-heating').addClass('best-heating_pos').removeClass('best-heating_pos_ab');

				} else {
					$('.last-slide .home-project__phone').removeClass('relative');

				}
				if ($(window).scrollTop() > $('.quality-work').offset().top - ($(window).height() / 1.4)) {

					$('.best-heating').removeClass('best-heating_pos').addClass('best-heating_pos_ab')
				}
			}

		}

	});

	$("#modal-launcher, #modal-background, #modal-close").click(function() {
		$("body, #modal-content, #modal-background").toggleClass("active");
	});

	/****************************Parellex**********************************/

	var winwidth = 0;
	/* hero-section ...........................*/

	winwidth = $(window).width();
	$(window).resize(function() {

		winwidth = $(window).width();
	})

	$('.explore-hero-screens a').click(function() {

		$('.flipper , .flexslider').toggleClass('swap');
	});

	$('.nav--home-projects a').click(function(e) {
		//e.preventDefault();
		var child = $(this).index();
		$('html,body').animate({
			scrollTop : $($('.home-project:nth-child(' + (child + 1) + ')')).offset().top
		}, 500);
	});

	$(window).scroll(function() {

		/* Workflow ..........................*/

		if ($(window).width() > 1024) {
			if ($('.workflow').length) {
				if ($(window).scrollTop() > $('.workflow').offset().top - 450) {
					$('.workflow-block:nth-child(1) > img').addClass('rotated').removeClass('unrotated').animate({
						//	'transform' : 'rotate(-6deg)'
					}, 500, function() {

						$('.workflow .workflow-block:nth-child(2)').animate({
							'margin-left' : '-22.5%',
							'opacity' : 1
						}, 500, function() {

							$('.workflow-block:nth-child(2) > img').addClass('rotated').animate({
								//	'transform' : 'rotate(-6deg)'
							}, 150, function() {

								$('.workflow-block:nth-child(1) > img').css({
									//		'transform' : 'rotate(0deg)',
									//	'transition' : 'transform  1.5s'
								});
								$('.workflow-block:nth-child(2) > img').css({
									//		'transform' : 'rotate(0deg)',
									//		'transition' : 'transform  1.5s'
								});

								$('.workflow-block:nth-child(3)').css({
									'display' : 'block'
								});
								$('.workflow-block:nth-child(3)').animate({
									'margin-left' : '-28%',
									'opacity' : 1
								}, 150)
								$('.workflow-block:nth-child(3) > img').css({
									//		'transform' : 'rotate(0deg)',
									//	'transition' : 'transform  1.5s'
								});
							});
						});

					});
				}
			}
		}
		/* environment ..........................*/

		if ($('.environment').length) {
			if ($(window).scrollTop() > $('.environment').offset().top - 450) {
				if ($(window).width() >= 1025) {
				}
				$('.environment .env-image').addClass('development');
			}
		}
		if ($('.Interactive-life').length) {
			if ($(window).scrollTop() > $('.Interactive-life').offset().top - 450) {
				if ($(window).width() >= 1025) {
				}
				$('.Interactive-life').addClass('active');
			}

		}
		if ($('.design-steps').length) {
			if ($(window).scrollTop() > $('.step1').offset().top - 450) {
				if ($(window).width() >= 1025) {
				}
				$('.step1').addClass('active');
			}
			if ($(window).scrollTop() > $('.step2').offset().top - 150) {
				if ($(window).width() >= 1025) {
				}
				$('.step2').addClass('active');
			}
			if ($(window).scrollTop() > $('.step3').offset().top - 500) {
				if ($(window).width() >= 1025) {
				}
				$('.step3').addClass('active');
			}

			if ($(window).scrollTop() > $('.step4').offset().top - 150) {
				console.log("move4")
				//console.log($('.step1').offset().top - 450)
				if ($(window).width() >= 1025) {
				}
				$('.step4').addClass('active');
			}
			if ($(window).scrollTop() > $('.step5').offset().top - 500) {
				console.log("move5")
				if ($(window).width() >= 1025) {
				}
				$('.step5').addClass('active');
			}
			if ($(window).scrollTop() > $('.step6').offset().top - 150) {
				console.log("move6")
				if ($(window).width() >= 1025) {
				}
				$('.step6').addClass('active');
			}

			if ($(window).scrollTop() > $('.step7').offset().top - 500) {
				console.log("move7")
				if ($(window).width() >= 1025) {
				}
				$('.step7').addClass('active');
			}

		}
		if ($('.design-calculation').length) {
			if ($(window).scrollTop() > $('.design-calculation').offset().top - 200) {
				if ($(window).width() >= 1025) {
				}
				$('.design-calculation').addClass('active');
			}
			$('.design-calculation').appear(function() {
				alert(1)
				$('.design-calculation').addClass('active');
			}, {
				//accY : -200
			})
		}

		if ($('#cbp-so-scroller').length) {
			if ($(window).scrollTop() >= $('#cbp-so-scroller').offset().top - ($(window).height() - 190 )) {
				$('#cbp-so-scroller').addClass('activeState')
			}
		}

		/* bestheating ..........................*/

		var scrolltop = $(window).scrollTop();
		$('.nav--home-projects  > a.blockActive').removeClass('blockActive');
		if ($('.environment').length) {
			if (scrolltop > $('.home-project:nth-child(1)').offset().top - 60 && scrolltop < $('.home-project:nth-child(2)').offset().top - 100) {
				$('.nav--home-projects  a:nth-child(1)').addClass('blockActive');
			} else if (scrolltop > $('.home-project:nth-child(2)').offset().top - 100 && scrolltop < $('.home-project:nth-child(3)').offset().top - 100) {
				$('.nav--home-projects a:nth-child(2)').addClass('blockActive');
			} else if (scrolltop > $('.home-project:nth-child(3)').offset().top - 100 && scrolltop < $('.home-project:nth-child(4)').offset().top - 100) {
				$('.nav--home-projects  a:nth-child(3)').addClass('blockActive');
			} else if (scrolltop > $('.home-project:nth-child(4)').offset().top - 100 && scrolltop < $('.home-project:nth-child(5)').offset().top - 100) {
				$('.nav--home-projects  a:nth-child(4)').addClass('blockActive');
			} else if (scrolltop > $('.home-project:nth-child(5)').offset().top - 100 && scrolltop < $('.home-project:nth-child(6)').offset().top - 100) {
				$('.nav--home-projects a:nth-child(5)').addClass('blockActive');
			} else if (scrolltop > $('.home-project:nth-child(6)').offset().top - 100) {
				$('.nav--home-projects  a:nth-child(6)').addClass('blockActive');
			}
		}
	});

	/* Sliders ...........................*/
	if ($('#slicon-slider').length) {
		$('#slicon-slider').bxSlider({
			mode : 'fade',
			controls : false,
			auto : true
		});
	}

	if ($('#blog-slider').length) {
		$('#blog-slider').bxSlider({
			slideWidth : 400,
			minSlides : 1,
			maxSlides : 8,
			moveSlides : 1,
			pager : false,
			auto : true,
			speed : 1500,
			pause : 8000
		});

		$('#blog-slider > li').hover(function(e) {

			var window_wid = $(window).width();
			var wid = $('#blog-slider > li').width();
			var currentX = e.clientX;

			var lastimagediff = window_wid % wid;

			if (window_wid - currentX <= lastimagediff) {

				$('.bx-viewport').addClass('full-shadow')
			}

			if (currentX < wid) {
				$('.bx-viewport').addClass('full-shadow1')

			}

		}, function() {

			$('.bx-viewport').removeClass('full-shadow')
			$('.bx-viewport').removeClass('full-shadow1')

		})
	}
	if ($('#story-slider').length) {
		$('#story-slider').bxSlider({
			mode : 'fade',
			auto : true,
			pager : false
		});
	}

	if ($('#design-slider').length) {
		$('#design-slider').slick({
			centerMode : true,
			centerPadding : '60px',
			slidesToShow : 5,
			autoplay : true,
			swipe : false,
			swipeToSlide : false,
			touchMove : false,
			touchThreshold : 0,
			responsive : [{
				breakpoint : 1024,
				settings : {

					centerMode : true,
					centerPadding : '40px',
					slidesToShow : 3
				}
			}, {
				breakpoint : 767,
				settings : {
					centerMode : true,
					centerPadding : '40px',
					slidesToShow : 3
				}
			}]
		});
	}

	/* Testimonial Section ...........................*/
	if ($('.testimonial-content').length) {
		$('.testimonial-content').slick({
			slidesToShow : 1,
			slidesToScroll : 1,
			fade : true,
			arrows : false,
			swipe : false,
			swipeToSlide : false,
			touchMove : false,
			touchThreshold : 0,
			asNavFor : '.testimonial-navigation'
		});
	}
	if ($('.testimonial-navigation').length) {
		$('.testimonial-navigation').slick({
			slidesToShow : 4,
			slidesToScroll : 1,
			vertical : true,
			verticalSwiping : true,
			infinite : true,
			asNavFor : '.testimonial-content',
			centerMode : false,
			swipeToSlide : true,
			focusOnSelect : true,
			arrows : false,
			swipe : false,
			swipeToSlide : false,
			touchMove : false,
			touchThreshold : 0,
			autoplay : !0,
			autoplaySpeed : 5000,
			responsive : [{
				breakpoint : 767,
				settings : {
					vertical : false,
					verticalSwiping : false,
					centerMode : true,
					slidesToShow : 2
				}
			}, {
				breakpoint : 480,
				settings : {
					vertical : false,
					verticalSwiping : false,
					centerMode : true,
					slidesToShow : 2
				}
			}]
		});
	}
	/* Menu Section ...........................*/

	$('.mobile-menu').click(function() {
		$(this).toggleClass('open-menu');
		//$('.navigation').slideToggle('slow');

		if ($('body').hasClass('show-nav')) {
			$('body').removeClass('show-nav');
		} else {
			$('body').addClass('show-nav');
		}

	});

	$('.navigation li .caret').click(function() {
		if ($(window).width() <= 1024) {
			$(this).toggleClass('active')
			$(this).siblings('ul').slideToggle('slow');
			$(this).parent('li').siblings('li').children('ul').slideUp('slow');
			$(this).parent('li').siblings('li').children('.caret').removeClass('active');
		} else {

		}
	})
	$('.filter-content > div').first().fadeIn(0);
	$('.filter-area li a').click(function(e) {
		e.preventDefault()
		$(this).parent('li').siblings('li').removeClass('active')
		$(this).parent('li').addClass('active');
		$('.filter-content > div').removeClass('active');
		$($(this).attr('href')).addClass('active');
		$('.filter-content > div').fadeOut(200);
		$($(this).attr('href')).fadeIn(200);

	})
	if ($('#subscribe-form').length) {
		$('#subscribe-form').validate({
			rules : {
				subscribeEmail : {
					required : true,
					email : true
				},
			},
			messages : {
				subscribeEmail : {
					required : "This field is required.",
					email : "<i class='icon-wrong'> </i> Wrong email",
				}
			}
		});
	}
	if ($('#message-form').length) {
		$.validator.setDefaults({
			submitHandler : function(form) {
				if (form.id == "message-form") {
					$('.thanks').fadeIn()
				}

			}
		});
		$('#message-form').validate({
			rules : {
				Email : {
					required : true,
					email : true
				},
				fullName : {
					required : true,
				},
				phoneNo : {
					required : true,
					number : true
				},
				Enquiry : {
					required : true,
				}
			},
			messages : {
				Email : {
					required : "This field is required.",
					email : "<i class='icon-wrong'> </i> Wrong email",
				}
			}
		});
	}
	if ($('#reply-form').length) {
		$('#reply-form').validate({
			rules : {
				replyEmail : {
					required : true,
					email : true
				},
				userName : {
					required : true,
				},
				website : {
					required : true,
					url : true
				}
			},
			messages : {
				replyEmail : {
					required : "This field is required.",
					email : "<i class='icon-wrong'> </i> Wrong email",
				}
			}
		});
	}

	$('.subscribe-form .form-field').focus(function() {
		$(this).parents('.subscribe-form').addClass('active');
	})
	$('.subscribe-form .form-field').blur(function() {
		$(this).parents('.subscribe-form').removeClass('active');
	})
	if ($('.progress-first').length) {
		$('.progress-first').circleProgress({
			value : 0.5,
			fill : {
				gradient : ['#42ab47', '#42ab47'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
			},
			startAngle : -1.5,
			emptyFill : 'rgba(0, 0, 0, 0)',
			size : 175.0,
			thickness : 10,

		});
	}
	if ($('.second').length) {
		$('.second').circleProgress({
			value : 0.25,
			fill : {
				gradient : ['#42ab47', '#42ab47'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
			},
			startAngle : -1.5,
			emptyFill : 'rgba(0, 0, 0, 0)',
			size : 175.0,
			thickness : 10,

		});
	}
	if ($('.third').length) {
		$('.third').circleProgress({
			value : 1.0,
			fill : {
				gradient : ['#42ab47', '#42ab47'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
			},
			startAngle : -1.5,
			emptyFill : 'rgba(0, 0, 0, 0)',
			size : 175.0,
			thickness : 10,

		});
	}

	$('.icon-chat').on('click', function() {
		$('#habla_expanded_div').css('display', 'block');
	})

	$('.ufix-light').on('click', function() {
		//$('.ufix-box').show(500);
		$('.ufix-box ').addClass('show');
	});

	$('	.light-close ').on('click', function() {
		//$('.ufix-box').hide(500);
		$('.ufix-box ').removeClass('show');
	})

	$('.photo-light').on('click', function() {
		//$('.ufix-box').show(500);
		$('.photo-box ').addClass('show');
	});

	$('	.photo-close ').on('click', function() {
		//$('.ufix-box').hide(500);
		$('.photo-box ').removeClass('show');
	})
});
$('.footer-links').append('<div class="overlay-wrapper"> </div>');
$('.popup-btn').click(function() {
	$(this).next().fadeIn();
	$('.overlay-wrapper').fadeIn()
});
$('.close-btn').click(function() {
	$(this).parent('div').fadeOut();
	$('.overlay-wrapper').fadeOut()
})
// 6-4-17 start here
function randomFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function displayRandomJob() {
	var r = randomFromTo(1, $('div.newjobz').length);
	$('div.newjobz').hide().eq(r - 1).show();
}


$(document).ready(function() {
	displayRandomJob();
	$('#jobchanger').click(function() {
		displayRandomJob();
	});
});

// 24-4-17
$(document).ready(function() {
	$('.header-phone-menu').click(function(e) {
		
		e.stopPropagation()
		$(this).toggleClass('menu-open-block');
		$(".new-navigation").find(".dropdown1").removeClass("active");
		$(".new-navigation").find(".dropdown2").removeClass("active");
		//$('.navigation').slideToggle('slow');

		if ($('.new-header').hasClass('new-nav-show')) {
			
			$('.new-header').removeClass('new-nav-show');
		} else {
			$('.new-header').addClass('new-nav-show');
		}

	});

 $('.wrapper').click(function(e){
 	
 	// alert()
 	if(e.target){
 		
 	
 	var nav=$(e.target).parents('.new-navigation')[0]
 	
	 if(nav==undefined){
	 	
	 	$('.new-header').removeClass('new-nav-show');
	 	$('.main-menu ul').removeClass('active');
	$('.header-phone-menu').removeClass('menu-open-block');
	 }
		}
		 })
		 	 
	$(".hat-icon").click(function() {

		$(this).addClass("x-block");
		$(".new-image-hat").addClass("x-small-hat");
		$(".show-hide-block").show();
		$(".bottom-bg-black").show();
		$(".notes-icon").hide();
		$(".incog-intro").hide();
		$(".olark-launch-button").addClass("opacity_intro");
	});

	$(document).on("click", ".bottom-bg-black", function() {
		$(".block_info .show-hide-block").hide();
		$(this).hide();
		$(".notes-icon").show();
		$(".hat-icon").removeClass("x-block");
		$(".new-image-hat").removeClass("x-small-hat");
		$(".incog-intro").show();
		$(".olark-launch-button").removeClass("opacity_intro");
	});

	$('.main-menu li').click(function() {

		$(this).find(".dropdown1").addClass("active");
		
	})


	$('.expertise_info ul li').click(function() {

		$(this).find(".dropdown2").addClass("active");
	})

	$(document).on("click", ".main-menu li > ul  li.back_info", function() {
		$(this).closest('.active').removeClass("active");
	});


//23-5-17


});

//28-4-17
$(window).scroll(function() {
	if (55 < $(window).scrollTop()) {
		$('.new-header').addClass("fixed-new-header");

	} else {
		$('.new-header').removeClass("fixed-new-header");
	}
    var scrl = $(window).scrollTop();    
    if(scrl > 0){
    	// $(".show-hide-logo").hide();
	    $('.top-logo').addClass("main-logo");
	    $(".show-hide-logo").addClass("scrl-top");
    }
    else{
    	 // $(".show-hide-logo").show();
	     $('.top-logo').removeClass("main-logo");
	     $(".show-hide-logo").removeClass("scrl-top");
    }
	
});

//29-6-17
$(document).ready(function(){
    $(".overlay-wrapper").click(function(){
        $(this).fadeOut(500);
         $('.glob-style').fadeOut(500);
    });
});
