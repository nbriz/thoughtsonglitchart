// Math helpers 
Math.norm = function(value, min, max) {
	return (value - min) / (max - min);
};

Math.lerp = function(norm, min, max) {
	return (max - min) * norm + min;
};

Math.map = function(value, sourceMin, sourceMax, destMin, destMax) {
	return Math.lerp(Math.norm(value, sourceMin, sourceMax), destMin, destMax);
};

// Array helpers
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

// browser detect >> via: http://stackoverflow.com/a/2401861
navigator.browserInfo= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return { 'browser': M[0], 'version': M[1] };
})();