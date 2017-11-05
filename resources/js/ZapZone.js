function ZapZone(id) {
	this._id = id;
	this._svg = new Snap(id);
	this._delay = {};
	this._drawingInterval = {};
}

ZapZone.DELAY = 500; // ms
ZapZone.INTERVAL = 25; // ms

ZapZone.prototype.draw = function() {
	var self = this;

	var rect = {};
	var hue = 0;
	var stroke = 5; // px
	var width = 0;
	var height = 0;
	var targetWidth = $(self._id).width();
	var targetHeight = $(self._id).height();
	var aspectRatio = targetWidth / targetHeight;
	var start = {
		x: targetWidth/2,
		y: targetHeight/2
	};

	self._delay = setTimeout(function() {
		self._drawingInterval = setInterval(function() {
			if (width >= targetWidth) {
				clearInterval(self._drawingInterval);
				console.log("done");
			}

			rect = self._svg.rect(start.x, start.y, width, height);
			rect.attr({
				fill: "none",
				stroke: "hsb(" + hue + ", 1, 1)",
				strokeWidth: stroke
			});

			hue += 0.01;
			width += stroke*2;
			height += stroke*2;
			start.x -= stroke;
			start.y -= stroke;
			// width += stroke*2*aspectRatio;
			// height += stroke*2;
			// start.x -= stroke*aspectRatio;
			// start.y -= stroke;

		}, ZapZone.INTERVAL);
	}, ZapZone.DELAY);

};

ZapZone.prototype.clear = function() {
	clearInterval(this._drawingInterval);
	clearTimeout(this._delay);
	this._svg.clear();
};