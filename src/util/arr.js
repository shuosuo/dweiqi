(function(d) {
d.grepArray = function(arr, item) {
    var newArr = [];
    for(var i=0; i<arr.length; i++) {
        if(arr[i]!=item) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
};
})(window.d||{});