Array.prototype.containsPattern = function(pattern) {
    // if we don't return a pattern, result is false
    if (pattern == null) {
        return false;
    }
    // if we have an empty or null array, return false
    if (this.length == 0 || this == null) {
        return false;
    }
    // if this isn't an array, return false
    if (!(this instanceof Array)) {
        return false;
    }
    //loop through the values to see if we get a match. checkMe is a boolean that is true if match returns
    // something, but by default
    var checkMe = false;

    for (var i=0; i<this.length; i++) {
        var newString = new String(this[i]);
        if (newString.search(pattern) != -1) {
            checkMe = true;
            break;
        }
    }

    return checkMe;
}
