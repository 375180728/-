var leftarrow = document.querySelector('.leftarrow');
var rightarrow = document.querySelector('.rightarrow');
var banner = document.querySelector('.banner');
var main = document.querySelector('.main');
var buttons = document.querySelector('.buttons').getElementsByTagName('span');
var index = 1; //定义图片的初始位置
var timer;

function animate(offset) {
	//点击按钮切换图片
	var _left = parseInt(banner.style.left) + offset;
	var time = 300;
	var interval = 10;
	var speed = offset / (time / interval)
	var go = function() {
		//渐变动画效果 
		if ((speed < 0 && parseInt(banner.style.left) > _left) || (speed > 0 && parseInt(banner.style.left) < 0)) {
			banner.style.left = parseInt(banner.style.left) + speed + 'px';
			window.t = setTimeout(go, interval)
		} else {
			window.clearTimeout(window.t);
			window.t = null;
			banner.style.left = _left + 'px';
			if (_left > -400) {
				banner.style.left = -2000 + 'px';
			}

			if (_left < -2000) {
				banner.style.left = -400 + 'px';
			}
		}
	}
	go();
}

function autobanner() {
	//自动轮播
	timer = setInterval(function() {
		right()
	}, 4000)
}

function stop() {
	//停止自动轮播
	clearInterval(timer)
}

rightarrow.addEventListener("click", right);

function right() {
	if (window.t) {
		return;
	}
	//点击箭头向右切换图片
	if (index == 5) {
		index = 1;
	} else {
		index++;
	}

	showbuttons();
	animate(-400);

}


leftarrow.addEventListener("click", left);

function left() {
	if (window.t) {
		return;
	}
	//点击箭头向左切换图片
	if (index == 1) {
		index = 5;
	} else {
		index -= 1;
	}
	showbuttons();
	animate(+400);
}

var showbuttons = function() {
	//亮起圆点
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].className == 'on') {
			buttons[i].className = '';
		}
		buttons[index - 1].className = 'on';
	}
}

for (var i = 0; i < buttons.length; i++) {
	var a = function() {
		//点击圆点按钮切换至相应图片
		if (this.className == 'on') {
			return
		}
		var myindex = parseInt(this.getAttribute('index'));
		var offset = (myindex - index) * (-400);
		animate(offset);
		index = myindex;
		showbuttons();
	}

	buttons[i].addEventListener("click", a)
	main.onmouseover = stop;
	main.onmouseout = autobanner;
}