var slideNum;
window.onload = function(){
	//窗口大小改变时改变图片高度
	$(window).resize(function(){
		$(".slide").height($(".slide").width()*0.56);
	});

	$(".slide").height($(".slide").width()*0.56);
	slideNum = $(".slide .img").length;

	var foo = {
		slideNum:$(".slide .img").length,
		ifAuto:false,	//是否自动切换
		autoTime:1000,	//轮播间隔时间
		ifCanTouch:function(){	//判断是否支持touch事件
			return ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch
		},
		touch:function(){
			var that = this;
			var start = 0 ,end = 0;
			var slide = document.getElementById("slide");
			slide.addEventListener("touchstart",touchStart,false);
			slide.addEventListener("touchmove",touchMove,false);
			slide.addEventListener("touchend",touchEnd,false);
			function touchStart(event){
				var touch = event.targetTouches[0];
				start = touch.pageX;
			}
			function touchMove(event){
				var touch = event.targetTouches[0];
				end = touch.pageX - start;
			}
			function touchEnd(event){
				if(end < -10){
					left(that.slideNum);
				}else if(end > 10){
					right(that.slideNum);
				}
			}
		},
		loadImg:function(num){
			for(var i=0;i<num;i++){
				$(".slide .img:eq("+i+")").attr("data-slide-imgId",i);
			}
			if(num ===1){
				for(var i=0;i<num;i++){
					$(".slide .img:eq("+i+")").addClass("img3");
				}
			}
			if(num === 2){
				for(var i=0;i<num;i++){
					$(".slide .img:eq("+i+")").addClass("img"+(i+3));
				}
			}
			if(num === 3){
				for(var i=0;i<num;i++){
					$(".slide .img:eq("+i+")").addClass("img"+(i+2));
				}
			}
			if(num >3 && num <6){
				for(var i=0;i<num;i++){
					$(".slide .img:eq("+i+")").addClass("img"+(i+1));
				}
			}
			if(num>=6){
				for(var i=0;i<num;i++){
					if(i<5){
						$(".slide .img:eq("+i+")").addClass("img"+(i+1));
					}else{
						$(".slide .img:eq("+i+")").addClass("img5");
					}
				}
			}
		},
		loadButton:function(num){
			if(num){
				var html ="";
				for(var i=1;i<=num;i++){
					html += "<span data-slide-bt='"+i+"' onclick=buttonClick('"+i+"')></span>";
				}
				$(".slide-bt").html(html);
				$(".slide-bt").css("margin-left","-"+num*17+"px");
				$(".slide-bt").css("width",num*34+"px");
				onButton();
			}
		},
		autoPlay:function(){
			var that = this;
			setInterval(function(){
				left(that.slideNum);
			},that.autoTime);
		},
		init:function(){
			if(this.ifCanTouch){
				this.touch();
			}
			if(this.ifAuto){
				this.autoPlay();
			}
			this.loadImg(this.slideNum);
			this.loadButton(this.slideNum);
			imgClick();
		}
	};
	foo.init();
};

function left(num){
	var fy = new Array();
	for(var i=0;i<num;i++){
		fy[i] = $(".slide .img[data-slide-imgId="+i+"]").attr("class");
	}
	for(var i=0;i<num;i++){
		if(i === 0){
			$(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[num-1]);
		}else{
			$(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[i-1]);
		}
	}
	imgClick();
	onButton();
}

function right(num){
	var fy = new Array();
	for(var i=0;i<num;i++){
		fy[i] = $(".slide .img[data-slide-imgId="+i+"]").attr("class");
	}
	for(var i=0;i<num;i++){
		if(i === num-1){
			$(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[0]);
		}else{
			$(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[i+1]);
		}
	}
	imgClick();
	onButton();
}

function onButton(){
	var slideList = parseInt($(".slide .img3").attr("data-slide-imgId")) + 1;
	$(".slide-bt span").removeClass("on");
	$(".slide-bt span[data-slide-bt="+slideList+"]").addClass("on");

}

function imgClick(){
	$(".slide .img").removeAttr("onclick");
	$(".slide .img2").attr("onclick","right(slideNum)");
	$(".slide .img4").attr("onclick","left(slideNum)");
}
function buttonClick(i){
	var x = i - (parseInt($(".slide .img3").attr("data-slide-imgId")) + 1);
	if(x >0){
		for(var i=0;i<x;i++){
			left(slideNum);
		}
	}
	if(x<0){
		x = (-x);
		for(var i=0;i<x;i++){
			right(slideNum);
		}
	}
	onButton();
}