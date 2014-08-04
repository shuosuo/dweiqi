(function(d) {

d.Chessman = function(options) {
    this.options = options;
    this.fillColor = options.player==0?'#cccccc':'#eeeeee';
    this.point = d.getPointByPos(this.options.left, this.options.top);
};

d.Chessman.prototype = {
    draw: function() {
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.fillColor;
        ctx.moveTo(this.options.left, this.options.top);
        ctx.arc(this.options.left, this.options.top, d.G.grid.cellSize/2, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    },
    remove: function() {
        var ctx = this.ctx;
        ctx.clearRect(this.options.left-d.G.grid.cellSize/2, this.options.top-d.G.grid.cellSize/2, d.G.grid.cellSize, d.G.grid.cellSize);
    }
};

})(window.d||{});