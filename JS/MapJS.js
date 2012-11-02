var map;
var mcdLat = 39.395031;
var mcdLng = -76.776999;
var mcdLatLng = new google.maps.LatLng(mcdLat,mcdLng);
var campusSWBound = new google.maps.LatLng(39.390571,-76.782846);
var campusNEBound = new google.maps.LatLng(39.401448,-76.766238);
var campusBounds = new google.maps.LatLngBounds(campusSWBound,campusNEBound);

google.maps.event.addDomListener(window, 'load', initialize);

var centerTo = mcdLatLng;

function initialize() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) 
            {
                var currentLat = position.coords.latitude;
                var currentLng = position.coords.longitude;
                var currentPos = new google.maps.LatLng(currentLat, currentLng);

                if((currentLat > 39.390571) && (currentLat < 39.401448)){
                    if ((currentLng > -76.782846) && (currentLng < -76.766238)){
                        var infowindow = new google.maps.InfoWindow({
                            map: map,
                            position: currentPos,
                            content: 'Current Location.'
                        });
                        centerTo = currentPos;
                    }
                }
            });
    }

    var mapOptions = {
        zoom: 16,
        center: centerTo,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        minZoom: 16,
        keyboardShortcuts: false,
        streetViewControl: false
    }; 
    map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);

    var markerOptions = {
        position: new google.maps.LatLng(39.394683, -76.776999),
        title: 'Allan Building',
        /*icon: 'http://staff.4j.lane.edu/~james/jamessite/images/turtle9.jpg',
        animation: google.maps.Animation.BOUNCE*/
        map: map
    };
    var marker = new google.maps.Marker(markerOptions);

    var swMarkerOptions = {
        position: campusSWBound,
        title: 'Campus SW Boundary',
        map: map
    }
    var neMarkerOptions = {
        position: campusNEBound,
        title: 'Campus NE Boundary',
        map: map
    }
    var neMarker = new google.maps.Marker(neMarkerOptions);
    var swMarker = new google.maps.Marker(swMarkerOptions);

    google.maps.event.addListener(map,'center_changed',function(){
        checkBounds()
        });
}

function checkBounds() {    
    if(!campusBounds.contains(map.getCenter())) {
        var currentLng = map.getCenter().lng();
        var currentLat = map.getCenter().lat();

        if (campusBounds.getSouthWest().lng() > currentLng){
            currentLng = campusBounds.getSouthWest().lng();
        }
        else if (campusBounds.getNorthEast().lng() < currentLng){
            currentLng = campusBounds.getNorthEast().lng();
        }
        if (campusBounds.getNorthEast().lat() < currentLat){
            currentLat = campusBounds.getNorthEast().lat();
        }
        else if (campusBounds.getSouthWest().lat() > currentLat){
            currentLat = campusBounds.getSouthWest().lat();
        }
        map.panTo(new google.maps.LatLng(currentLat,currentLng));
    }
}


