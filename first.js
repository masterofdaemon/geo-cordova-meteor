if (Meteor.isClient) {
    // counter starts at 0
      Template.map.destroyed = function() {
        Session.set('map', false);
    };

}

if (Meteor.isServer) {
    Meteor.startup(function() {

        Meteor.methods({
            test: function(res) {
                console.log(res);
                return 'yes';
            }
        });

        Meteor.onConnection(function(res) {
            console.log('connect', res.clientAddress);
        })
    });
}

if (Meteor.isCordova) {
    var success = function(position) {
        gmaps.initialize(position.coords.latitude, position.coords.longitude);
        gmaps.addLine();
    };

    var watchSucces = function(position) {


        var objMarker = {
            id: '1',
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            title: 'test title'
        };
        gmaps.addMarker(objMarker);
        if (gmaps.existInPolygon(position.coords.latitude,position.coords.longitude)===true)
        alert('you are there!!!');
    };

    var onError = function(err){
        console.log(err);
    } 

    Meteor.startup(function() {
        navigator.geolocation.getCurrentPosition(success);
        navigator.geolocation.watchPosition(watchSucces,onError,{enableHighAccuracy: true,timeOut:10000});

    });

}