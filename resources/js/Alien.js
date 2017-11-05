function Alien(id) {
	this._id = id;
	this._direction = Alien.Direction.RIGHT;
	this._mode = Alien.Mode.STANDING;

	// Animation
	this._animation = null;
	// this._isAnimating = false;
	this._frameBaseSize = 10; //rem, multiple of 10
	// this._numFrames = 12; 
	// this._frameRate = 20; //fps
	// this._duration = this._numFrames / this._frameRate; //seconds

	this.stand();
}

Alien.Direction = {
	LEFT: "left",
	RIGHT: "right"
};

Alien.Mode = {
	STANDING: "standing",
	WALKING: "walking",
	RUNNING: "running",
	JUMPING: "jumping",
	FIRING: "firing"
};


Alien.prototype.direction = function(direction) {
	if (direction === undefined) {
		return this._direction;
	}

	this._direction = direction;

	if (this._direction === Alien.Direction.LEFT) {
		$(this._id).addClass(Alien.Direction.LEFT).removeClass(Alien.Direction.RIGHT);
		// $(this._id).css("transform", "translateY(0) scaleX(-1)");
	} else {
		$(this._id).addClass(Alien.Direction.RIGHT).removeClass(Alien.Direction.LEFT);
		// $(this._id).css("transform", "translateY(0) scaleX(1)");
	}
};

Alien.prototype.mode = function(mode) {
	if (mode === undefined) {
		return this._mode;
	}

	var startFrame = 0;
	var endFrame = 0;
	var frameRate = 20; //fps
	var repeat = -1;

	this._mode = mode;
	switch (this._mode) {
		case Alien.Mode.STANDING:
			startFrame = 0;
			endFrame = 0;
			frameRate = 1; //fps
			repeat = -1;
			break;
		case Alien.Mode.WALKING:
			startFrame = 0;
			endFrame = 12;
			frameRate = 20; //fps
			repeat = -1;
			break;
		case Alien.Mode.RUNNING:
			startFrame = 0;
			endFrame = 12;
			frameRate = 50; //fps
			repeat = -1;
			break;
		case Alien.Mode.JUMPING:
			startFrame = 3;
			endFrame = 3;
			frameRate = 20; //fps
			repeat = 0;
			break;
		case Alien.Mode.FIRING:
			startFrame = 0;
			endFrame = 19;
			frameRate = 60; //fps
			repeat = 0;
			break;
	}

	var numFrames = endFrame - startFrame;
	var duration = numFrames / frameRate; //seconds
	var startPosition = -1 * this._frameBaseSize * startFrame;
	var endPosition = -1 * this._frameBaseSize * (startFrame + numFrames);

	console.log("numFrames = " + numFrames);
	console.log("startPosition = " + startPosition);
	console.log("endPosition = " + endPosition);
	console.log("");

	if (this._animation) {
		this._animation.kill();
	}

	this._animation = TweenMax.fromTo(
		$(this._id + " .jump-layer"),
		duration,
		{
			css:{ backgroundPosition:startPosition + "rem" }
		},
		{
			css:{ backgroundPosition:endPosition + "rem" }, 
			ease:SteppedEase.config(numFrames),
			repeat: repeat
		}
	);

};

Alien.prototype.stand = function() {
	this.mode(Alien.Mode.STANDING);
};

Alien.prototype.walk = function() {
	this.mode(Alien.Mode.WALKING);
};

Alien.prototype.run = function() {
	this.mode(Alien.Mode.RUNNING);
};

Alien.prototype.jump = function() {
	this.mode(Alien.Mode.JUMPING);

	var id = this._id + " .jump-layer";
	var endTransform = "translateY(-20.0rem) ";
	var startTransform = "translateY(0rem) ";

	var timeline = new TimelineMax({align:"sequence"});
	var jump = TweenMax.to($(id), 0.2, {css:{transform:endTransform}, ease:Power1.easeOut});
	var fall = TweenMax.to($(id), 1, {css:{transform:startTransform}, ease:Bounce.easeOut});
	timeline.add(jump);
	timeline.add(fall);

};

Alien.prototype.fire = function() {
	this.mode(Alien.Mode.FIRING);
};