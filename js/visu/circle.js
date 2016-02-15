function Circle(color, radius, centerX, centerY) {
    this.color = color;
    this.radius = radius;
    this.centerX = centerX;
    this.centerY = centerY;
}
Circle.prototype.fade = function (percentage) {
    this.color.fade(percentage);
};
Circle.prototype.moveHorizontal = function (pixel) {
    this.centerX += pixel;
};
Circle.prototype.isVisible = function () {
    return this.color.alpha > 0;
};