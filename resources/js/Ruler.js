function Ruler(id) {
	this._id = id;
	this._position = 0;
}

Ruler.prototype.runLeft = function() {
	this._position += 15;
	$(this._id).css("background-position", this._position + "px");
};

Ruler.prototype.runRight = function() {
	this._position -= 15;
	$(this._id).css("background-position", this._position + "px");
};