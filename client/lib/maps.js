gmaps = {     // map object
        
    map: null,
          // google markers objects
        markers: [],
          // google lat lng objects
        latLngs: [],
          // our formatted marker data objects
        markerData: [],
          // add a marker given our formatted marker data object
        addMarker: function(marker) {        
        var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);        
        var gMarker = new google.maps.Marker({            
            position: gLatLng,
                        map: this.map,
                        title: marker.title,
                        animation: google.maps.Animation.DROP       
        });        
        this.latLngs.push(gLatLng);        
        this.markers.push(gMarker);        
        this.markerData.push(marker);        
        return gMarker;    
    	},
    	addLine: function() {
        var flightPlanCoordinates = [
            // new google.maps.LatLng(55.8647539,37.5679775),
            // new google.maps.LatLng(55.8649345,37.5696512),
            // new google.maps.LatLng(55.8641398,37.5704237),
            // new google.maps.LatLng(55.8647539,37.5679775)
            new google.maps.LatLng(55.805862, 37.584139),
            new google.maps.LatLng(55.806169, 37.586317),
            new google.maps.LatLng(55.805186, 37.586553),
            new google.maps.LatLng(55.805017, 37.584364), 
            new google.maps.LatLng(55.805862, 37.584139),

        ];
        flightPath = new google.maps.Polygon({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(this.map);
    	},
    	existInPolygon: function(lat,long){
            var coordinate = new google.maps.LatLng(lat,long); 
    	   return flightPath.containsLatLng(coordinate);
    	},
          // calculate and move the bound box based on our markers
        calcBounds: function() {        
        var bounds = new google.maps.LatLngBounds();        
        for (var i = 0, latLngLength = this.latLngs.length; i < latLngLength; i++) {            
            bounds.extend(this.latLngs[i]);        
        }        
        this.map.fitBounds(bounds);    
    	},
          // check if a marker already exists
        markerExists: function(key, val) {        
        _.each(this.markers, function(storedMarker) {            
            if (storedMarker[key] == val)                 return true;        
        });        
        return false;    
    	},
          // intialize the map
        initialize: function(lat, long) {        
        console.log("[+] Intializing Google Maps...");        
        var mapOptions = {            
            zoom: 18,
                        center: new google.maps.LatLng(lat, long),
                        mapTypeId: google.maps.MapTypeId.HYBRID        
        };         
        this.map = new google.maps.Map( document.getElementById('map-canvas'),  mapOptions );          // global flag saying we intialized already
                
        Session.set('map', true);    
    }
}