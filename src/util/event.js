(function(d) {
d.bind = function(elem, type, handler) {
    if(document.addEventListener)
    {
        elem.addEventListener(type, function(event) {
            handler(event, elem);
        },false);
    }
    else
    {
        elem.attachEvent('on'+type, function(event) {
            handler(event, elem);
        });
    }
};
})(window.d||{});