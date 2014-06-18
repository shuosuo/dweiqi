/**
 *  d.ready(wait)
 *  @wait registe document ready callback function
 */
(function(d) {
var waitList = [];
var bound = false;
d.ready = function(wait) {
    waitList.push(wait);
    bindReady();
};

function bindReady() {     
    if(bound) return;     
    bound = true;
    
    // Mozilla, Opera ,webkit
    if(document.addEventListener) 
    {
        document.addEventListener( "DOMContentLoaded", function(){
            document.removeEventListener( "DOMContentLoaded", arguments.callee, false);
            exWait();
        }, false);
    }
    else  //IE 
    {       
        (function(){     
            try {
                document.documentElement.doScroll("left");
            } catch( error ) {
                setTimeout( arguments.callee, 0);
                return;
            }
            exWait();
        })();
    }
}

function exWait() {
    if(waitList instanceof Array)
    {
        while(waitList.length>0)
        {
            var _callback = waitList.shift();
            _callback();
        }
    }
}
})(window.d||{});