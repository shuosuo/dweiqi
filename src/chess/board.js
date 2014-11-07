(function(d) {

d.Board = function() {
	this.ctx = null;
	this.parent = null;
};

d.Board.prototype = {
	draw: function() {
		var options = {
			strokeWidth: 3,
			strokeColor: "#000000",
			fillColor: "#cc6633"
		};
		var ctx = this.ctx;
		//background
		ctx.beginPath();
		ctx.fillStyle = options.fillColor;
		ctx.fillRect(0, 0, d.G.stage.width, d.G.stage.height);
		ctx.lineWidth = options.strokeWidth;
		ctx.strokeStyle = options.strokeColor;
		ctx.strokeRect(0,0,d.G.stage.width, d.G.stage.height);
		ctx.closePath();
		ctx.fill();
		//grid
		var gridAttr, cellSize, gridWidth, gridHeight, gridX, gridY;
		gridAttr = d.G.grid;
		cellSize = gridAttr.cellSize;
		gridWidth = gridHeight = gridAttr.gridSize;
		gridX = gridAttr.left;
		gridY = gridAttr.top;
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#000000";
		for(var i=0; i<gridAttr.num; i++)
		{
			ctx.beginPath();
			ctx.moveTo(cellSize*i+gridX, gridY);
			ctx.lineTo(cellSize*i+gridX, gridY+gridHeight);
			ctx.moveTo(gridX, gridY+cellSize*i);
			ctx.lineTo(gridX+gridWidth, gridY+cellSize*i);
			ctx.closePath();
			ctx.stroke();
		}
		//star
		ctx.beginPath();
		ctx.fillStyle = "#000000";
		ctx.moveTo(gridX+cellSize*3, gridY+cellSize*3);
		ctx.arc(gridX+cellSize*3, gridY+cellSize*3, 3, 0, Math.PI*2, true);
		ctx.moveTo(gridX+cellSize*9, gridY+cellSize*3);
		ctx.arc(gridX+cellSize*9, gridY+cellSize*3, 3, 0, Math.PI*2, true);
		ctx.moveTo(gridX+cellSize*15, gridY+cellSize*3);
		ctx.arc(gridX+cellSize*15, gridY+cellSize*3, 3, 0, Math.PI*2, true);
		ctx.moveTo(gridX+cellSize*3, gridY+cellSize*9);
		ctx.arc(gridX+cellSize*3, gridY+cellSize*9, 3, 0, Math.PI*2, true);
		ctx.moveTo(gridX+cellSize*9, gridY+cellSize*9);
		ctx.arc(gridX+cellSize*9, gridY+cellSize*9, 3, 0, Math.PI*2, true);
		ctx.moveTo(gridX+cellSize*15, gridY+cellSize*9);
		ctx.arc(gridX+cellSize*15, gridY+cellSize*9, 3, 0, Math.PI*2, true);
		ctx.moveTo(gridX+cellSize*3, gridY+cellSize*15);
		ctx.arc(gridX+cellSize*3, gridY+cellSize*15, 3, 0, Math.PI*2, true);
		ctx.moveTo(gridX+cellSize*9, gridY+cellSize*15);
		ctx.arc(gridX+cellSize*9, gridY+cellSize*15, 3, 0, Math.PI*2, true);
		ctx.moveTo(gridX+cellSize*15, gridY+cellSize*15);
		ctx.arc(gridX+cellSize*15, gridY+cellSize*15, 3, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}
};

})(window.d||{});
