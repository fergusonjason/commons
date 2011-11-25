Array.prototype.unique = function(b) {
    var a = [], i, l = this.length;
    for (i = 0; i < l; i++) {
        if (a.indexOf(this[i], 0, b) < 0) {
            a.push(this[i]);
        }
    }
    return a;
};
