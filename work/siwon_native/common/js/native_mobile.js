$(document).ready(function(){
	/* document 높이 -> aside 반영 */
	var winH = $(window).height();
	$('#siwon_aside, #siwon_alert').css('height',winH+'px');
	window.addEventListener("resize", () => {
		winH = window.innerHeight
		$('#siwon_aside, #siwon_alert').css('height',winH+'px');
	});

	/* header 높이 - document 여백 반영 */
	if( $('.snb').length ) $('#siwon_header').addClass('has_snb');
	var headerH = $('#siwon_header').outerHeight();
	$('#siwon_container').css('padding-top',headerH+'px');
	$('#siwon_header').addClass('stick');

	/* 스크롤 시 GNB 고정 */
	var didScroll; 
	var lastScrollTop = 0; 
	var delta = 5; 
	var $header = $('#siwon_header');
	var navbarHeight = $header.outerHeight(); 
	$(window).scroll(function(event){ 
		didScroll = true; 
	}); 
	setInterval(function() { 
		if (didScroll) { 
			hasScrolled(); 
			didScroll = false; 
		}
	}, 250); 
	function hasScrolled() { 
		var st = $(this).scrollTop(); 

		// Make sure they scroll more than delta 
		if(Math.abs(lastScrollTop - st) <= delta) return; 

		// If they scrolled down and are past the navbar, add class .nav-up. 
		// This is necessary so you never see what is "behind" the navbar. 
		if (st > lastScrollTop && st > navbarHeight){ 
			// Scroll Down 
			if( $(window).scrollTop() > headerH ) {
				if( !$header.hasClass('fixed') )
					$header.addClass('fixed');
				if( $header.hasClass('showall') )
					$header.removeClass('showall');
			}
		} 
		else { 
			// Scroll Up 
			if( $(window).scrollTop() > headerH ) {
				if( !$header.hasClass('showall') )
					$header.addClass('showall');
			} 
			else {
				if( $header.hasClass('fixed') )
					$header.removeClass('fixed');
				if( $header.hasClass('showall') )
					$header.removeClass('showall');
			}
		} 
		lastScrollTop = st; 
	}

	var scrollPosY;
	/* aside 열기/닫기 */
	$('.bt_aside').on('click',function(){
		scrollPosY = $(window).scrollTop();
		$('.bt_aside, #siwon_aside').addClass('on');
		$('body').addClass('scroll_lock');
		$("#siwon_wrap").css("top",-scrollPosY);
	});
	$('.bt_aside_close').on('click',function(){
		$('.bt_aside, #siwon_aside').removeClass('on');
		$('body').removeClass('scroll_lock');
		scrollPosY = $(window).scrollTop(scrollPosY);
		$("#siwon_wrap").css("top",0);

		if( $('.aside_menu .menu_tit.on').length ){
			setTimeout(function(){
				$('.aside_menu .menu_tit.on').next('.sub').slideUp();
				$('.aside_menu .menu_tit.on').removeClass('on');
			},500);
		}
	});

	/* 알림창 열기/닫기 */
	$('.bt_alert').on('click',function(){
		scrollPosY = $(window).scrollTop();
		$('#siwon_alert').addClass('on');
		$('body').addClass('scroll_lock');
		$("#siwon_wrap").css("top",-scrollPosY);
	});
	$('.bt_alert_close').on('click',function(){
		$('#siwon_alert').removeClass('on');
		$('body').removeClass('scroll_lock');
		scrollPosY = $(window).scrollTop(scrollPosY);
		$("#siwon_wrap").css("top",0);
	});


	/* snb_sl */
	if( $('.snb').length ){
		var snbSl = new Swiper('.snb.swiper-container', {
			freeMode : true,
			slidesPerView : 'auto',
		})
	}
	/* aside submenu */
	$(document).on('click','#siwon_aside .menu_tit',function(){
		var $this = $(this)
		if( !$this.hasClass('on') ){
			if( $('.menu_tit.on').length ){
				$('.menu_tit.on').removeClass('on').next('.sub').slideUp();
			}

			$this.addClass('on');
			$this.next('.sub').slideDown();
		}
		else {
			$this.removeClass('on');
			$this.next('.sub').slideUp();
		}
	});

	/* PC 버전 버튼 */
	$("#PC").on("click",function(){
		location.href = "/?pc=1";
	});	

	/* 슬라이드 팝업 닫기 (배경클릭 시) */
	if( $('#pop_slide').length ){
		$('#pop_slide').before().on('click',function(){
			closePopSlide();
		});
	}

	/* 탭 공통 리뉴얼(전사 동일하게) */
	if( $('div[id^="tmenu_comm"]').length ){
		$('.tmenu li:first-child', this).addClass('on');
		$('.tcon> li', this).not('li:first-child').css({ 'display': 'none' });
	}
	$('div[id^="tmenu_comm"] .tmenu li').not('li.off').click(function(){
		thisWraptmenu = $(this).parent().parent();
		idx = $(this).index();
		if( !$(this).hasClass('on') ){
			$('.tmenu li', thisWraptmenu).removeClass('on');
			$(this).addClass('on');
			$('.tcon> li', thisWraptmenu).hide();
			$('.tcon> li', thisWraptmenu).eq(idx).show();
		}
	});
}); // $(document).ready


/* 슬라이드 팝업 */
function popSlide(tar){
	var $pop = $('.pop_slide#'+tar);
	$pop.addClass('on');
	$pop.find('.pop_box').slideDown();
}
// 슬라이드 팝업 닫기
function closePopSlide(){
	$('.pop_slide').removeClass('on');
	$('.pop_slide').find('.pop_box').slideUp();
}