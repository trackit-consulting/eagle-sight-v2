var Helper = function () { };
Helper.prototype.generateUUID = function () {
    var d = new Date().getTime();

    var uuid = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

Helper.prototype.midPadLeft = function (mid) {
    mid = mid.toString();
    while (mid.length < 6) {
        mid = ' ' + mid;
    }
    return mid;
};

exports.Helper = new Helper();