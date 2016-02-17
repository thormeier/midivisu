function VisuApp(fps, runTimePerCircle, canvasId) {
    this.fps = fps;
    this.canvas = new Canvas(canvasId);
    this.runTimePerCircle = runTimePerCircle;
}
VisuApp.prototype.run = function () {
    // combining request anim frame with timeout
    // gets really slow at some point
    // have yet to try other variations
    var self = this;

    // render fn
    function render() {

        // set a timeout for your manual fps
        self.timeout = setTimeout( function() {
            // call render fn whenever browser feels like it
            requestAnimationFrame(render);
        }, 1000 / self.fps)

        // tick tock
        self.tick();
    }
    // call for first time
    render();
};
VisuApp.prototype.fancy = function () {
    function render () {
      requestAnimationFrame(render.bind(this));
      this.tick();
    }

    render.call(this);
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
    var fadePercentage = (100 / (this.fps * this.runTimePerCircle)),
        i = 0,
        n = this.canvas.shapes.length;

    for (i; i < n; i++) {
        this.canvas.shapes[i].moveHorizontal(-10);
        this.canvas.shapes[i].fade(fadePercentage);
    }
};
