function VisuApp(fps, runTimePerCircle, canvasId) {
    this.fps = fps;
    this.canvas = new Canvas(canvasId);
    this.runTimePerCircle = runTimePerCircle;
}
VisuApp.prototype.run = function () {
    var self = this;

    this.interval = setInterval(function () {
        self.tick();
    }, (1000 / this.fps));
};
VisuApp.prototype.stop = function () {
    clearInterval(this.interval);
};
VisuApp.prototype.tick = function () {
    this.canvas.empty();
    this.moveAll();
    this.canvas.gc();
    this.canvas.draw();
};
VisuApp.prototype.addCircle = function (color, radius, top) {
    this.canvas.addCircle(new Circle(color, radius, this.canvas.getStartPoint(radius), top));
};
VisuApp.prototype.moveAll = function () {
    var fadePercentage = (100 / (this.fps * this.runTimePerCircle));

    for (var i = 0; i < this.canvas.shapes.length; i++) {
        this.canvas.shapes[i].moveHorizontal(-10);
        this.canvas.shapes[i].fade(fadePercentage);
    }
};
