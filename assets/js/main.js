function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomChoice(items) {
	return items[randomInt(0, items.length-1)]
}

shown = []

function nextChoice(items) {
	if (shown.length == items.length*2) {
		return randomChoice(items);
	}
	shown.push(items[shown.length % items.length]);
	return shown[shown.length - 1]
}

var PIXEL_SIZE = 25

function makeCloud() {
	var w = 8,
		h = 5,
		maxr = Math.sqrt(w*w + h*h),
		density = .4
		
	var cloud = document.createElement('div')
	cloud.className = 'cloud'
	for (var x=-w; x<=w; x++) {
		for (var y=-h; y<=h; y++) {
			r = Math.sqrt(x*x + y*y)
			if (r/maxr < Math.pow(Math.random(), density)) {
				var puff = document.createElement('div')
				puff.className = 'puff'
				puff.style.left = (x + w) * PIXEL_SIZE + 'px'
				puff.style.top = (y + h) * PIXEL_SIZE + 'px'
				cloud.appendChild(puff)
			}
		}
	}
	return cloud
}

clouds = []

function randomPosition(max) {
	return Math.round(randomInt(-400, max)/PIXEL_SIZE)*PIXEL_SIZE
}

function addCloud(randomLeft) {
	var cloudiness = .4

	if (Math.random() < cloudiness) {
		newCloud = {
			x: randomLeft ? randomPosition(document.documentElement.clientWidth) : -400,
			el: makeCloud()
		}

		newCloud.el.style.top = randomPosition(document.documentElement.clientHeight) + 'px'
		newCloud.el.style.left = newCloud.x + 'px'
		document.body.appendChild(newCloud.el)
		clouds.push(newCloud)
	}
}

function animateClouds() {
	var speed = 25

	addCloud()

	var newClouds = []
	for (var i=0; i<clouds.length; i++) {
		var cloud = clouds[i]
		cloud.x += speed

		if (cloud.x > document.documentElement.clientWidth) {
			document.body.removeChild(cloud.el)
		} else {
			cloud.el.style.left = cloud.x + 'px'
			newClouds.push(cloud)
		}
	}
	
	clouds = newClouds
}

function changeMessage(msg) {
	var msgEl = document.getElementById('message')
	msgEl.innerHTML = msg || nextChoice(messages)
}

function startMessages() {
	try {
		if (window.sessionStorage) {
			var times
			if (sessionStorage.times) {
				times = ++sessionStorage.times
			} else {
				times = sessionStorage.times = 0
			}
			var msg = 'you have refreshed this page '+times+' time'+(times != 1 ? 's' : '')+'.'
			messages.push(msg)
		}
	} catch (e) {}

	setInterval(function() { changeMessage() }, 9*1000)
}

messages = [
	'time actually is going slower right now.',
	'wanna play? check out <a href="https://m6c7l.github.io/yase/">yase</a> and try to get more than 1500 points!',
	'there may be more information about me <a href="https://cosa.th-luebeck.de/en/users/constapel">here</a>.',
	'go check out what\'s new at <a href="https://www.thingiverse.com/whoopsie/designs">thingiverse</a>.',
	'imagination is more important than knowledge. - albert einstein',
]

function start() {
	if (arguments.callee.ran) { return; }
	arguments.callee.ran = true

	startMessages()
	setInterval(animateClouds, 2*1000)

	for (n=0; n<50; n++) {
		addCloud(true)
	}
}
