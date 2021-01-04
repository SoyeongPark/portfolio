$(document).ready(function(){
	
/* 체크박스 디자인 */
	if( $('input[type=checkbox].id_check').length ) $("input[type=checkbox].id_check").customizeCRInput();
	if( $('input[type=radio].id_check').length ) $('input[type=radio].id_check').customizeCRInput();

/* 이미지맵 */
	if( $('img[usemap]').length ) $('img[usemap]').rwdImageMaps();

/* 썸네일 이미지 비율 */
	if( $('.imgLiquidFill').length ) $(".imgLiquidFill").imgLiquid({fill:true});

/* 탑버튼 */
	if( $("#body_top").length ) $("#body_top").hide();

	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#body_top').fadeIn();
		} else {
			$('#body_top').fadeOut();
		}
	});

	// scroll body to 0px on click
	 $('#body_top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
});


/* input checkbox customizing */
$.fn.customizeCRInput = function(options) {
	var options = $.extend({
		checked_class : "checked"
	}, options);
	return this.each(function(){
		var input = $(this);
		var is_checked = input.is(":checked");
		var type = input.attr("type");
		var id = input.attr("id");
		var label = $("label[for="+id+"]");

		//페이지 로딩 시 input 상태에 따라 label 변경
		if( is_checked ){
			type = input.attr("type");
			id = input.attr("id");
			label = $("label[for="+id+"]");

			if (type == "checkbox") {
				if ( is_checked ) {
					label.addClass(options.checked_class);
				} else {
					label.removeClass(options.checked_class);
				}
			} else if (type == "radio") {
				$("input[type=radio][name='"+input.attr("name")+"']").each(function(idx){
					$("label[for='"+$(this).attr("id")+"']").removeClass(options.checked_class);
				});
				label.addClass(options.checked_class);
			}
		}

		//클릭 시
		input.on("change",function(){
			is_checked = input.is(":checked");
			type = input.attr("type");
			id = input.attr("id");
			label = $("label[for="+id+"]");
			if (type == "checkbox") {
				if ( is_checked ) {
					label.addClass(options.checked_class);
				} else {
					label.removeClass(options.checked_class);
				}
			} else if (type == "radio") {
				$("input[type=radio][name='"+input.attr("name")+"']").each(function(idx){
					$("label[for='"+$(this).attr("id")+"']").removeClass(options.checked_class);
				});
				label.addClass(options.checked_class);
			}
		});
	});
};

// 부드러운 스크롤
function scroll_to_anchor(anchor_id,speed) {
	if( !speed ) var speed = 'slow';
	var a_tag = $("#"+anchor_id);
	if(a_tag.length > 0){
		$('html, body').animate({
			scrollTop: a_tag.offset().top
		}, speed);
	}
}

/* 스크롤 시 효과  */
var scrollEffect = function(n){
	var tarPos = n ? n : .8;
	var winPos = $(window).scrollTop();
	var winHeight = $(window).height();

	if( $('[data-effect]').length ){
		$('[data-effect]').each(function(){
			if( $(this).attr('data-effect') != 'show' ){
				if( (winPos + winHeight*tarPos) > $(this).offset().top ){
					$(this).attr('data-effect','show');
				}
			}
		});
	}
}

/* 쿠키 포함된 레이어 팝업 */
function popCookie(layerId){
	var cookieId = layerId;
	var closeBt = '#'+cookieId+' .bt_close';

	if( $.cookie(cookieId) != '1' ) layerPopId(cookieId);
	$(document).on('click',closeBt,function(){
		if( $(this).attr('data-cookie') ) {
			var ckD = parseInt( $(this).attr('data-cookie') );
			$.cookie(cookieId,'1',{expires: ckD});
		}
		layerPopClose();
	});
}

//레이어 팝업 실행 - with id
function layerPopId(layerId, boxPosition){
	
	if(layerId=="device_Layer"){
		//초기화
		$('#device_Layer .contbox').removeClass('on');
		$('#device_Layer .contbox').eq(0).addClass('on');
		$('#deviceLayer_device').val('');
		$('#deviceLayer_device_idx').val('');  
		//인증번호창
		$('#device_Layer .num').css('display','none');
		$('.btn_phone_send').text('인증번호 발송');
		$('.btn_email_send').text('인증번호 발송');
		
		// 텍스트 바꾸기
		$('#device_Layer #device_tit span').text("PC / 모바일(web) 등록정보");
	}
	
	if ( !boxPosition ) boxPosition = 'absolute';
	/* set size of popup box */
	var winHeight = $(window).height();
	var popHeight = $('.wrap_layer_popup#'+layerId).height();

	/* top position of popup box */
	if ( winHeight > popHeight ){ //컨텐츠 height가 window보다 작은 경우
		if (boxPosition == 'absolute')	var positionTop = (winHeight-popHeight)/2 + $(window).scrollTop() +'px';
		else var positionTop =	(winHeight-popHeight)/2 +'px';
	} else { //컨텐츠 height가 window보다 큰 경우
		if (boxPosition == 'absolute') var positionTop = $(window).scrollTop() + 20 +'px';
		else var positionTop = 20 +'px';
	}
	/* left position of popup box */
	$('.wrap_layer_popup#'+layerId).css({
		'position' : boxPosition,
		'top' : positionTop
	});
	$('<div class="layer_popup_bg"></div>').appendTo('body').fadeIn('fast');
	$('.wrap_layer_popup#'+layerId).fadeIn(function(){
		$('.wrap_layer_popup#'+layerId).css('display','block');
	});

	//이미지맵 설정
	if( $('#'+layerId).find('img[usemap]') ) {
		$('img[usemap]').rwdImageMaps();
	}
}
// 레이어팝업 닫기
function layerPopClose(){
	$('.layer_popup_bg, .wrap_layer_popup').fadeOut('fast',function(){
		$('.layer_popup_bg').remove();
	});
}

// bxslider 포함된 레이어 팝업창 열기
function layerPopSl(layerId, slideId, boxPosition){ //페이지에서 bxslider 선언된 함수를 변수화 하여 slideId 로 전달
	layerPopId(layerId, boxPosition);
	slideId.reloadSlider();
}
// bxslider 포함된 레이어 팝업창 닫기
function layerSlClose(slideId){
	$('.wrap_layer_popup').fadeOut();
	$('.layer_popup_bg').fadeOut(function(){
		$(this).remove();
	});
	slideId.destroySlider();
}

/* 풀페이지 레이어 팝업 실행 */
function layerPage(layerId){
	$('#siwon_wrap').hide();
	$('.page_layer_popup#'+layerId).fadeIn(function(){
		$('.page_layer_popup#'+layerId).css('display','block');
	});
}
function layerPageClose(){
	$('#siwon_wrap').show();
	$('.page_layer_popup').hide();
}


/* 영상 팝업 재생 */
function playVideo(sno){
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	var videoSrc = "";
	
	$.ajax({url:"./?p=free_act",
			type:"POST",
			dataType: "json",
			data:{sno:sno,m:"getVodurl"},
			async:false,
			success : function(data){
					videoSrc = data.src;
			}
	});
	
	var flag_play = false; // 경고를 위한 메세지

	if(!flag_play) {
		var res = confirm("동영상은 무료이나\n이동통신망(3G/LTE 등)으로\n접속시 데이터 통화료가\n발생할 수 있습니다.");
		if(res) {
			flag_play = true;
		} else {
			return false;
		}
	}

	var videoTag = "<video src='"+videoSrc+"' id='v' type='video/mp4' controls></video>";

	$('<div class="pop_movie" id="video_pop"><div class="popvideo_box">'+videoTag+'</div>	<a href="javascript:closeVideo()" class="close_layer">닫기</a></div>').appendTo('body');

	$('.pop_movie').fadeIn('fast');
	
	video = document.getElementById("v");
	video.load();
	video.webkitEnterFullScreen();
	$('video')[0].play();
	//본창 스크롤 안되게
	$("body").bind('touchmove', function(e){e.preventDefault()});
}


/* 레이어 팝업 닫기(영상) */
function closeVideo(){
	$('.pop_movie').fadeOut('fast',function(){
		$(this).remove();
	});
	$('body').unbind('touchmove');
}

//유튜브 영상재생(공통)
var playYoutubeComm = function(src){
	var flag_play = false; // 경고를 위한 메세지
	if(!flag_play) {
		var res = confirm("동영상은 무료이나\n이동통신망(3G/LTE 등)으로\n접속시 데이터 통화료가\n발생할 수 있습니다.");
		if(res) {
			flag_play = true;
		} else {
			return false;
		}
	}
	if( flag_play ){

		var serviceUrl = 'https://www.youtube.com';
		var src = src.toString();
		var setting = playSrc = '';

		if(src.indexOf('?')==-1) setting = '?autoplay=1&rel=0&modestbranding=1';
		if(src.indexOf('/embed/')==-1) serviceUrl = serviceUrl + '/embed/';

		playSrc = serviceUrl + src + setting;

		$('<div class="pop_movie" id="youtube_pop"><div class="popvideo_box"><iframe width="100%" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </div><a href="javascript:closeVideo()" class="close_layer">닫기</a></div>').appendTo('body');
		$('#youtube_pop .popvideo_box iframe').attr({'src':playSrc});
		$('#youtube_pop').show();

		return;
	}
}
