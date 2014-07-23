(function() {
var d = window.d = window.d || {};
d.version = "1.0";
d.name = "dweiqi";
d.copyright = "shuosuo@163.com";
})();

(function(d) {

d.G = {
	stage: {
		width: 600,
		height: 600
	},
	gridNum: 19
};

d.getGridAttr = function() {
    var left, top, cellSize, gridSize;
    cellSize = Math.floor(d.G.stage.width/(d.G.gridNum+1));
    gridSize = cellSize*(d.G.gridNum-1);
    left = top = (d.G.stage.width-gridSize)/2;
    return {
        "left": left,
        "top" : top,
        "cellSize" : cellSize,
        "gridSize" : gridSize
    }
};
d.getPosByPoint = function(x, y, gridAttr) {
    var left, top;
    left = gridAttr.left + x*gridAttr.cellSize;
    top = gridAttr.top + y*gridAttr.cellSize;
    return {
        "left": left, 
        "top": top
    }
};

})(window.d||{});
