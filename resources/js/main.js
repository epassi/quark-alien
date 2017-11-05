var Main = function() {
	var RUN_TIMER = 1000; //ms

	var _alien = {};
	var _zapZone = {};
	var _ruler = {};
	var _alienIsMoving = false;
	var _alienIsFiring = false;
	var _runTimer = {};

	function init() {
		_alien = new Alien(".alien");
		_zapZone = new ZapZone(".zap-zone");
		_ruler = new Ruler(".ruler");

		$(document).keydown(onKeyDown);
		$(document).keyup(onKeyUp);
	}

	function onKeyDown(event) {
		switch (event.which) {
			case KeyCode.ARROW_LEFT:
				_alien.direction(Alien.Direction.LEFT);
				_ruler.runLeft();
				if (!_alienIsMoving) {
					_alien.walk();
					_alienIsMoving = true;
					_runTimer = setTimeout(function() {
						_alien.run();
					}, RUN_TIMER);
				}
				break;
			case KeyCode.ARROW_RIGHT:
				_alien.direction(Alien.Direction.RIGHT);
				_ruler.runRight();
				if (!_alienIsMoving) {
					_alien.walk();
					_alienIsMoving = true;
					_runTimer = setTimeout(function() {
						_alien.run();
					}, RUN_TIMER);
				}
				break;
			case KeyCode.ARROW_UP:
				// if (!_alienIsMoving) {
					_alien.jump();
					// _alienIsMoving = true;
				// }
				break;
			case KeyCode.SPACE:
				if (!_alienIsFiring) {
					_alien.fire();
					_zapZone.draw();
					_alienIsFiring = true;
				}
				break;
		}
	}

	function onKeyUp(event) {
		switch (event.which) {
			case KeyCode.ARROW_LEFT:
				if (_alienIsMoving) {
					_alien.stand();
					_alienIsMoving = false;
				}
				clearTimeout(_runTimer);
				break;
			case KeyCode.ARROW_RIGHT:
				if (_alienIsMoving) {
					_alien.stand();
					_alienIsMoving = false;
					// _ruler.stop();
				}
				clearTimeout(_runTimer);
				break;
			case KeyCode.ARROW_UP:
				_alien.stand();
				break;
			case KeyCode.SPACE:
				_zapZone.clear();
				_alien.stand();
				_alienIsFiring = false;
				break;
		}
	}

	return {
		init:init
	};
}();

Main.init();