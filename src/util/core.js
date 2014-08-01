/**
 * d.version = "1.0";
 * d.name = "dweiqi";
 * d.copyright = "shuosuo@163.com";
 **/

(function() {
var d = window.d = window.d || {};
})();

(function(d) {

d.G = {
	stage: {
		width: 600,
		height: 600
	},
	grid: {
        num: 19,
        cellSize: 30,       //cellSize=Math.floor(d.G.stage.width/(d.G.grid.num+1));
        gridSize: 540,      //gridSize=cellSize*(d.G.grid.num-1);
        left: 30,           //left=(d.G.stage.width-gridSize)/2;
        top: 30             //top=(d.G.stage.width-gridSize)/2;
    }
};

d.getPosByPoint = function(x, y) {
    var left, top;
    var gridAttr = d.G.grid;
    left = gridAttr.left + x*gridAttr.cellSize;
    top = gridAttr.top + y*gridAttr.cellSize;
    return {
        "left": left, 
        "top": top
    }
};

d.getPointByPos = function(offsetX, offsetY) {
    var gridAttr = d.G.grid;
    if(offsetX<gridAttr.left-gridAttr.cellSize/2
        ||offsetY<gridAttr.top-gridAttr.cellSize/2
        ||offsetX>gridAttr.left+gridAttr.gridSize+gridAttr.cellSize/2
        ||offsetY>gridAttr.top+gridAttr.gridSize+gridAttr.cellSize/2)
    {
        return null;
    }

    var pointX = Math.round((offsetX - gridAttr.left)/gridAttr.cellSize);
    var pointY = Math.round((offsetY - gridAttr.top)/gridAttr.cellSize);
    return {"x": pointX, "y": pointY};
}

})(window.d||{});
