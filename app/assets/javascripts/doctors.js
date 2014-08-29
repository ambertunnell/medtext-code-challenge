var map;
var addresses = [];
var addressLatlngs = [];
var distanceArray = [];
var markersArray = [];

$(function () {

    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(40.761581, -73.984938),
            zoom: 10
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
        fetchAllDoctors();
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    function fetchAllDoctors() {
        $.ajax({
            type: "GET",
            url: "/doctors/all",
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    addresses.push(response[i].name + ": " + response[i].address + " " + response[i].city + " " + response[i].state + " " + response[i].zipcode);
                }
                placeAllMarkers();
            }
        });
    }

    function placeAllMarkers() {
        for (var i = 0; i < addresses.length; i++) {
            var request = {
                query: addresses[i]
            };

            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);

            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var place = results[0];
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    var myLatlng = new google.maps.LatLng(latitude, longitude);
                    addressLatlngs.push(myLatlng);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: myLatlng
                    });
                    markersArray.push(marker);
                }
            }
        }
    }



$(document).on("submit", ".find-doctor", function(event){
        event.preventDefault();
        console.log("I was clicked!");

        $('.display-doctors').empty();

        var input = $('.address-input').val();

        var request = {
            query: input
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);

        var inputLatlng;

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var place = results[0];
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                inputLatlng = new google.maps.LatLng(latitude, longitude);

                for (var i = 0; i < addressLatlngs.length; i++) {
                    calcRoute(inputLatlng, addressLatlngs[i], i);
                }
            }
        }


        function calcRoute(start, end, index) {
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };
            var directionsService = new google.maps.DirectionsService();

            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var distanceMiles = result.routes[0].legs[0].distance.text;
                    var distanceValue = result.routes[0].legs[0].distance.value;
                    distanceArray.push([parseInt(distanceValue), distanceMiles, index]);
                }
                if (distanceArray.length == addresses.length) {
                    displayDoctors();
                }
            });

        }

        function displayDoctors() {
            distanceArray.sort(function (a, b) {
                return a[0] - b[0];
            });

            distances = [];
            indexes = [];
            distanceMiles = [];

            for (var i = 0; i < distanceArray.length; i++) {
                distances.push(distanceArray[i][0]);
                distanceMiles.push(distanceArray[i][1]);
                indexes.push(distanceArray[i][2]);
            }

            clearMarkers();

            var fiveAddresses = [];

            for (var i = 0; i < 5; i++) {
                console.log(fiveAddresses);
               if (fiveAddresses.contains(addresses[indexes[i]]) == nil) {
                    fiveAddresses.push(addresses[indexes[i]]);
                    $('.display-doctors').append("<li>" + addresses[indexes[i]] + " is <strong>" + distanceMiles[i] + "</strong> away.</li>");
                    markersArray[indexes[i]].setMap(map);
                }
            }

        }
    });

function clearMarkers() {
  setAllMap(null);
}

function setAllMap(map) {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(map);
  }
}


});