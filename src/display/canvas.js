(function(d) {
d.Canvas = function(target) {
    var canvas = this.canvas = document.createElement("canvas");
    canvas.width = d.G.stage.width;
    canvas.height = d.G.stage.height;
    var container = typeof target==="string"?document.getElementById(target):target;
    container.appendChild(canvas);
    if(window.attachEvent&&navigator.userAgent.indexOf("Opera")===-1){
        this.canvas = window.G_vmlCanvasManager.initElement(canvas);
    }
};
d.Canvas.prototype = {
	childList: [],
    addChild: function(child) {
    	this.childList.push(child);
    	child.parent = this;
    	child.ctx = this.getContext();
    	child.draw();
    },
    getContext: function(type) {
    	var ctx = this.canvas.getContext(type||"2d");
    	return ctx;
    },
    setStyle: function(styles) {
    	for(var key in styles)
    	{
    		this.canvas.style[key] = styles[key];
    	}
    }
};
})(window.d||{});