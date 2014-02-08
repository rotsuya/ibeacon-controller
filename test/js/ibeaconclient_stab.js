var iBeaconClient = {
    getBeacons: function(callback) {
        setInterval(function() {
            $.getJSON('data/beacons.json?' + Date.now(), function(data) {
                callback(data);
            });
        }, 417.5);
    }
};