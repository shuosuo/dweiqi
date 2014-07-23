(function(d) {

d.Chess = function(id) {
	var chess = this;
	chess.gridAttr = d.getGridAttr();
	//rawDataMap: The raw data of a chess game, to record every step chess, format as [stepData, stepData, ...]
	//stepData: to record every step, format as { key: value, key: value, ... }
	//key: format as /[0-18]~[0-18]/, e.g. '3~8', first number is x position, second number is y position 
	//value: format as [player, stepNumber]
	chess.rawDataMap = [];
	chess.currentStep = {};
	chess.currentPlayer = 0;   //0: black, 1: white

	var elem = document.createElement("div");
	elem.style.width = d.G.stage.width+"px";
	elem.style.height = d.G.stage.height+"px";
	document.getElementById(id).appendChild(elem);
	
	//chess.board = createBoard();
	chess.battle = createBattlespace();
	d.bind(chess.battle.elem, 'click', function(event, target) {
        clickHandler(event, target, chess)
    });

	function createBoard() {
		var canvas = new d.Canvas(elem);
		canvas.setStyle({"position":"absolute"});
		var board = new d.Board();
		canvas.addChild(board);
		return board;
	}

	function createBattlespace() {
		var canvas = new d.Canvas(elem);
		canvas.setStyle({"position":"absolute"});
		return canvas;
	}

	function clickHandler(event, target, chess) {
        var point = chess.getPoint(event.offsetX, event.offsetY);
        if(!point) return;
        var chessman = chess.getChessman(point);
        if(chessman) return;
        chess.move(point);
    }
};

d.Chess.prototype = {
	getPoint: function(offsetX, offsetY) {
		var gridAttr = this.gridAttr;
		if(offsetX<gridAttr.left
			||offsetY<gridAttr.top
			||offsetX>gridAttr.left+gridAttr.gridSize
			||offsetY>gridAttr.top+gridAttr.gridSize)
		{
			return null;
		}

		var pointX = Math.round((offsetX - gridAttr.left)/gridAttr.cellSize);
		var pointY = Math.round((offsetY - gridAttr.top)/gridAttr.cellSize);
		return {"x": pointX, "y": pointY};
	},
	getChessman: function(point) {
		var key = point.x + '~' + point.y;
		return this.currentStep[key];
	},
	move: function(point) {
		var key = point.x + '~' + point.y;
		this.currentStep = d.extend({}, this.currentStep);
		this.rawDataMap.push(this.currentStep);
		this.currentStep[key] = [this.currentPlayer, this.rawDataMap.length];
		this.currentPlayer = this.currentPlayer==0?1:0;
		var pos = d.getPosByPoint(point.x, point.y, this.gridAttr);
		var chessman = new d.Chessman({
			"left": pos.left,
			"top": pos.top,
			"player": this.currentPlayer==0?1:0,
			"stepnum": this.rawDataMap.length
		});
		this.battle.addChild(chessman);
	}
};

})(window.d||{});
