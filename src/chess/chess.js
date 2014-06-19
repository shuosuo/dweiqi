(function(d) {

d.Chess = function(id) {
	var elem = document.createElement("div");
	elem.style.width = d.G.stage.width+"px";
	elem.style.height = d.G.stage.height+"px";
	document.getElementById(id).appendChild(elem);
	
	//this.board = createBoard();
	createBattlespace();
	
	
	function createBoard() {
		var canvas = new d.Canvas(elem);
		canvas.setStyle({"position":"absolute"});
		var board = new d.Board();
		canvas.addChild(board);
		//return board;
	}
	
	function createBattlespace() {
		var canvas = new d.Canvas(elem);
		canvas.setStyle({"position":"absolute"});
		
	}
};

d.Chess.prototype = {
	
};

})(window.d||{});
