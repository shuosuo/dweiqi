(function(d) {

d.Chess = function(id) {
	var chess = this;
	//rawDataMap: The raw data of a chess game, to record every step chess, format as [stepData, stepData, ...]
	//stepData: to record every step, format as [{ key: value, key: value, ... }]
	//key: format as /[0-18]~[0-18]/, e.g. '3~8', first number is x position, second number is y position 
	//value: format as [player, stepNumber]
	chess.rawDataMap = [];
	chess.currentStep = {};
	chess.currentPlayer = 0;   //0: black, 1: white

	var elem = document.createElement("div");
	elem.style.width = d.G.stage.width+"px";
	elem.style.height = d.G.stage.height+"px";
	document.getElementById(id).appendChild(elem);
	
	chess.board = createBoard();
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
        var point = d.getPointByPos(event.offsetX, event.offsetY);
        if(!point) return;
        if(point.x<0||point.x>=d.G.grid.num||point.y<0||point.y>=d.G.grid.num) return;
        //check is has chessman on point
        var chessman = chess.getChessman(point);
        if(chessman) return;
        //when new point put a chessman, find new dead picess
        var deadArr = chess.findDead(point);
        if(deadArr.length==0) {
        	chess.move(point);
        	return;
        }
        if(chess.currentStep[deadArr[0].x+'~'+deadArr[0].y][0]==chess.currentPlayer) {
        	return;
        }
        else {
        	chess.remove(deadArr);
        	chess.move(point);
        }
    }
};

d.Chess.prototype = {
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
		var pos = d.getPosByPoint(point.x, point.y);
		var chessman = new d.Chessman({
			"left": pos.left,
			"top": pos.top,
			"player": this.currentPlayer==0?1:0,
			"stepnum": this.rawDataMap.length
		});
		this.battle.addChild(chessman);
	},
	remove: function(arr) {
		var chess = this;
		if(arr instanceof Array) {
			for(var i=0; i<arr.length; i++) {
				clear(arr[i]);
			}
		}
		else {
			clear(arr);
		}

		function clear(point) {
			var chessman = chess.getChessman(point);
			chessman = null;
			delete chessman;
			chess.battle.removeChild(point);
		}
	},
	findDead: function(point) {
		var infectedArrB = [];
		var infectedArrW = [];
		var waitArr = [];
		waitArr.push(point);
		var findStep = {};
		findStep[point.x+'~'+point.y] = [this.currentPlayer, 0];
		var step = d.extend({}, findStep, this.currentStep);

		var channelB = true;
		var channelW = true;

		infect();
		function infect() {
			if(waitArr.length==0) {
				return;
			}
			if(!channelB&&!channelW)
			{
				return;
			}
			var po = waitArr.shift();
			var stepTemp = step[po.x+'~'+po.y];
			if (stepTemp[2]) {
				infect();
				return;
			}
			stepTemp[2] = true;
			//white exited and current point is white, or black exited and current point is black
			if((!channelW&&stepTemp[0]==1)||(!channelB&&stepTemp[0]==0)) {
				infect();
				return;
			}
			var x = po.x;
			var y = po.y;
			var t  = y-1>=0  ?  {x:x, y:y-1}  :  null;
			var r  = x+1>=0  ?  {x:x+1, y:y}  :  null;
			var b  = y+1>=0  ?  {x:x, y:y+1}  :  null;
			var l  = x-1>=0  ?  {x:x-1, y:y}  :  null;
			var tempArr = [t, r, b, l];
			var haveSpace = false;
			for(var i=0; i<tempArr.length; i++) {
				if(tempArr[i]&&step[tempArr[i].x+'~'+tempArr[i].y]) {
					if(!step[tempArr[i].x+'~'+tempArr[i].y][2])
					{
						waitArr.push(tempArr[i]);
					}
				}
				else if(tempArr[i]) {
					if(stepTemp[0]==0) {
						channelB = false;
					}
					else {
						channelW = false;
					}
					haveSpace = true;
					//break;
				}
			}
			if(!haveSpace) {
				if(stepTemp[0]==0) {
					infectedArrB.push(po);
				}
				else {
					infectedArrW.push(po);
				}
				infect();
				return;
			}
			else if(channelB||channelW) {
				infect();
				return;
			}
		}
		if(!channelB&&!channelW) {
			return [];
		}
		else if(channelB&&channelW) {
			return this.currentPlayer==0?infectedArrW:infectedArrB;
		}
		else if(channelB) {
			return infectedArrB;
		}
		else {
			return infectedArrW;
		}
	}
};

})(window.d||{});
