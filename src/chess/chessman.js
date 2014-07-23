(function(d) {

d.Chessman = function(options) {
    this.options = options;
    this.fillColor = options.player==0?'#000000':'#ffffff'
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
    }
};

})(window.d||{});