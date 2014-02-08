/**
 * Created by Ryosuke Otsuya at HTML5 Experts Hackathon on 2014/02/08.
 * iBeacon Map
 */

var IBeaconMap = function () {
    this.beacons = [];
    this.persons = [];
    this.stageWidth = 0;
    this.stageHeight = 0;
    this.loader = new createjs.LoadQueue();
};

IBeaconMap.prototype.initialize = function() {
    var $stage = $('#stage');
    this.stageWidth = $stage.width();
    this.stageHeight = $stage.height();
    $stage.attr({
        width: this.stageWidth,
        height: this.stageHeight
    });
    window.stage = new createjs.Stage($stage.get(0));
};

IBeaconMap.prototype.addBeacon = function(uuid, major, minor) {
    console.log('addBeacon: ' + uuid +', ' + major +', ' + minor);

};

IBeaconMap.prototype.hideBeacon = function(uuid, major, minor) {
};

IBeaconMap.prototype.addPerson = function(id, x, y) {
    console.log('addPerson: ' + id +', ' + x +', ' + y);

    var completeHandler = function (event) {
        var loader = event.target;
        loader.removeEventListener('complete', completeHandler);
        var img = loader.getResult(id);
        var bitmap = new createjs.Bitmap(img);
        this.persons.push({
            id: id,
            bitmap: bitmap
        });
        this._draw(bitmap, x, y);
    }

    this._loadImage(id, completeHandler);
};

IBeaconMap.prototype.movePerson = function(id, x, y) {
    console.log('movePerson: ' + id +', ' + x +', ' + y);
    for (var i = 0, l = this.persons.length; i < l; i++) {
        if (this.persons[i].id === id) {
            this._draw(this.persons[i].bitmap, x, y);
            break;
        }
    }
};

IBeaconMap.prototype.removePerson = function(id) {
    console.log('removePerson: ' + id);
};

IBeaconMap.prototype.getCoordinates = function(callback) {
    setInterval(coordinateHandler.bind(this), 5000);

    function coordinateHandler (callback) {
        $.getJSON('data/coordinates.json?' + Date.now(), coordinateCallback.bind(this));
    }

    function coordinateCallback (data) {
        callback(data);
    }
};

IBeaconMap.prototype._loadImage = function(id, callback) {
    this.loader.addEventListener('complete', callback.bind(this));
    this.loader.loadFile({
        src: 'images/' + id + '.png',
        id: id
    });
};

IBeaconMap.prototype._draw = function(bitmap, x, y) {
    bitmap.x = x;
    bitmap.y = y;
    stage.removeChild(bitmap);
    stage.addChild(bitmap);
    stage.update();
};

var iBeaconMap = new IBeaconMap();

