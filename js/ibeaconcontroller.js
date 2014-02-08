var IBeaconController = function() {
    this.beacons = [];
};

IBeaconController.prototype.initialize = function() {
    iBeaconClient.getBeacons(this.getBeaconsHandler);
    iBeaconMap.getCoordinates(this.getCoordinatesHandler);
};

IBeaconController.prototype.getBeaconsHandler = function(data) {
    for (var i = 0, l = data.length; i < l; i++) {

    }
};

IBeaconController.prototype.getCoordinatesHandler = function(data) {
    this.beacons = data;
};

var iBeaconController = new IBeaconController();
iBeaconController.initialize();