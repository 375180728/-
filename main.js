var leftarrow = document.querySelector('.leftarrow');
var rightarrow = document.querySelector('.rightarrow');
var banner = document.querySelector('.banner');
var main = document.querySelector('.main');
var buttons = document.querySelector('.buttons').getElementsByTagName('span');
var index = 1;
var timer;

function animate(offset) {
	var _left = parseInt(banner.style.left) + offset;
	var time = 300;
	var interval = 10;
	var speed = offset / (time / interval)
	var go = function() {
		if ((speed < 0 && parseInt(banner.style.left) > _left) || (speed > 0 && parseInt(banner.style.left) < 0)) {
			banner.style.left = parseInt(banner.style.left) + speed + 'px';
			setTimeout(go, interval)
		} else {
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
	timer = setInterval(function() {
		right()
	}, 4000)
}

function stop() {
	clearInterval(timer)
}

rightarrow.addEventListener("click", right);

function right() {
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
	if (index == 1) {
		index = 5;
	} else {
		index -= 1;
	}
	showbuttons();
	animate(+400);
}

var showbuttons = function() {
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].className == 'on') {
			buttons[i].className = '';
		}
		buttons[index - 1].className = 'on';
	}
}

for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", a)
	var a = function() {
		if (this.className == 'on') {
			return
		}
		var myindex = parseInt(this.getAttribute('index'));
		var offset = (myindex - index) * (-400);
		animate(offset);
		index = myindex;
		showbuttons();
	}

	main.onmouseover = stop;
	main.onmouseout = autobanner;
}