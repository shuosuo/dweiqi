(function(d) {

d.Chess = function(id) {
	var chess = this;
	//recordDataMap: The record data of a chess game, to record every step chess, format as [stepData, stepData, ...]
	//stepData: to record every step, format as [{ key: value, key: value, ... }]
	//key: format as /[0-18]~[0-18]/, e.g. '3~8', first number is x position, second number is y position 
	//value: format as [player, stepNumber]
	chess.recordDataMap = [];
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
        var oppositeDeadArr = chess.findDead(point, true);
    	if(oppositeDeadArr.length>0) {
    		chess.move(point);
        	chess.remove(oppositeDeadArr);
        }
        else {
        	var deadArr = chess.findDead(point);
	        if(deadArr.length==0) {
	        	chess.move(point);
	        }
	        else {
	        	return;
	        }
        }
        chess.record();
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
		this.currentStep[key] = [this.currentPlayer, this.recordDataMap.length];
		this.currentPlayer = this.currentPlayer==0?1:0;
		var pos = d.getPosByPoint(point.x, point.y);
		var chessman = new d.Chessman({
			"left": pos.left,
			"top": pos.top,
			"player": this.currentPlayer==0?1:0,
			"stepnum": this.recordDataMap.length
		});
		this.battle.addChild(chessman);
	},
	remove: function(arr) {
		var chess = this;
		chess.currentStep = d.extend({}, chess.currentStep);
		if(arr instanceof Array) {
			for(var i=0; i<arr.length; i++) {
				clear(arr[i]);
			}
		}
		else {
			clear(arr);
		}

		function clear(point) {
			var key = point.x + '~' + point.y;
			chess.currentStep[key] = null;
			delete chess.currentStep[key];
			chess.battle.removeChild(point);
		}
	},
	record: function(step) {
		this.recordDataMap.push(this.currentStep);
	},
	findDead: function(point, opposite) {
		var resultArr = [];
		var infectedArr = [];
		var waitArr = [];
		var checkPlayer = opposite?(this.currentPlayer==0?1:0):this.currentPlayer;
		var haveSpace = false;
		var step;
		var findStep = {};
		findStep[point.x+'~'+point.y] = [this.currentPlayer, -1];
		if(!opposite)
		{
			step = d.extend({}, findStep, this.currentStep);
			step[point.x+'~'+point.y]&&(step[point.x+'~'+point.y][2]=true);
			waitArr.push(point);
			infect();
			if(!haveSpace) {
				resultArr = infectedArr;
			}
		}
		else {
			var aroundArr = around(point);
			for(var i=0; i<aroundArr.length; i++) {
				step = d.extend({}, findStep, this.currentStep);
				var key = aroundArr[i].x+'~'+aroundArr[i].y;
				if(step[key]&&step[key][0]==checkPlayer) {
					infectedArr = [];
					haveSpace = false;
					waitArr = [];
					step[aroundArr[i].x+'~'+aroundArr[i].y]&&(step[aroundArr[i].x+'~'+aroundArr[i].y][2]=true);
					waitArr.push(aroundArr[i]);
					infect();
					if(!haveSpace) {
						resultArr = resultArr.concat(infectedArr);
					}
				}
			}
		}
		
		function infect() {
			if(waitArr.length==0) {
				return;
			}
			var po = waitArr.shift();
			var stepTemp = step[po.x+'~'+po.y];
			var tempArr = around(po);
			for(var i=0; i<tempArr.length; i++) {
				var key = tempArr[i].x+'~'+tempArr[i].y;
				if(step[key]) {
					if(step[key][0]==checkPlayer&&!step[key][2])
					{
						step[key][2] = true;
						waitArr.push(tempArr[i]);
					}
				}
				else {
					haveSpace = true;
					break;
				}
			}
			if(!haveSpace) {
				infectedArr.push(po);
				infect();
			}
		}
		function around(po) {
			var arr = [];
			var x = po.x;
			var y = po.y;
			if(y-1>=0) {
				arr.push({x:x, y:y-1});
			}
			if(x+1<d.G.grid.num) {
				arr.push({x:x+1, y:y});
			}
			if(y+1<d.G.grid.num) {
				arr.push({x:x, y:y+1});
			}
			if(x-1>=0) {
				arr.push({x:x-1, y:y});
			}
			return arr;
		}
		
		return resultArr;
	}
};

})(window.d||{});
