// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.


window.onload = function() {
	var demo = document.getElementById("demo");
	var x = "HelloWorld";
	var y = "GoodbyWorld";
	var next = (1 == 1)? x:y;
	//window.alert(next);
	demo.innerHTML = (next);
	initialize();
}

var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 18});
var marker, pos;
var geocoder = new google.maps.Geocoder();



function initialize() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(pos);
			codeLatLng();
		}, function() {handleNoGeolocation(true);} 
		);
	} else {handleNoGeolocation(false);}
}

function handleNoGeolocation(errorFlag) {
	var content = (errorFlag) ? 'Error: The Geolocation service failed.': 'Error: Your browser doesn\'t support geolocation.';
	var options = {
		map: map,
		position: new google.maps.LatLng(60, 105),
		content: content
	};
	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}

function codeLatLng() {  
	
	geocoder.geocode({'location': pos}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				marker = new google.maps.Marker({
					position: pos,
					map: map
				});
				var infowindow = new google.maps.InfoWindow({content:(results[0].formatted_address)});
				/*infowindow.setContent( 	'Latitude: ' + position.coords.latitude
						+'<br />Longitude: ' + position.coords.longitude
						+'<br />' +	results[0].formatted_address);
					
				*/
				
				google.maps.event.addListener(marker, 'click', function() {
					map.setCenter(marker.getPosition());
					infowindow.open(map, marker);
				});
	
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
}

google.maps.event.addDomListener(window, 'load', initialize);
