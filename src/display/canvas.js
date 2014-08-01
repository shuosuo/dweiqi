(function(d) {
d.Canvas = function(target) {
    var canvas = this.elem = document.createElement("canvas");
    canvas.width = d.G.stage.width;
    canvas.height = d.G.stage.height;
    var container = typeof target==="string"?document.getElementById(target):target;
    container.appendChild(canvas);
    //if(window.attachEvent&&navigator.userAgent.indexOf("Opera")===-1){
    if(lteie8===true) {
        this.elem = window.G_vmlCanvasManager.initElement(canvas);
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
    removeChild: function(point) {
        var child = this.getChildByPoint(point);
        this.childList = d.grepArray(this.childList, child);
        child.remove();
    },
    getChildByPoint: function(point) {
        for(var i=0; i<this.childList.length; i++) {
            if(this.childList[i] instanceof d.Chessman&&
                this.childList[i].point.x==point.x&&
                this.childList[i].point.y==point.y)
            {
                return this.childList[i];
            }
        }
    },
    getContext: function(type) {
    	var ctx = this.elem.getContext(type||"2d");
    	return ctx;
    },
    setStyle: function(styles) {
    	for(var key in styles)
    	{
    		this.elem.style[key] = styles[key];
    	}
    }
};
})(window.d||{});