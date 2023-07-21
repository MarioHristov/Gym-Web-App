// Initialize and add the map
let map;
async function initMap() {
  const position = { lat: 42.696841694587164, lng: 23.322252636031003 };
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered at the specified position
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "799f6f599c3e668f",
    mapTypeControl: false,
  });

  var places = [
    {
      name: 'Peyo Yavorov',
      location: { lat: 42.68278750291583, lng: 23.350396375915142 },
    },
    {
      name: 'Dry River',
      location: { lat: 42.701081250579165, lng: 23.36557027757022 },
    },
    {
      name: 'NDK',
      location: { lat: 42.68412930782499, lng: 23.318854729718357 },
    },
    {
      name: 'Mladost',
      location: { lat: 42.639709071835725, lng: 23.377762195472606 },
    },
    {
      name: 'Lulin',
      location: { lat: 42.71478630398142, lng: 23.257888714983995 },
    },
    {
      name: 'Manastirski Livadi',
      location: { lat: 42.65893681426455, lng: 23.285673009828947 },
    },
    // Add more places as needed
  ];

  // Create a cluster marker representing the number of locations
  var clusterMarker = new google.maps.Marker({
    position: position,
    map: map,
    icon: {
      url: '/GymWebApp/gym_web_app_photos/cluster1.png'
    },
    visible: map.getZoom() <= 8
  });

  // Listen for the zoom_changed event
  google.maps.event.addListener(map, 'zoom_changed', function () {
    var zoomLevel = map.getZoom();

    if (zoomLevel <= 8) {
      clusterMarker.setVisible(true);
      places.forEach(function (place) {
        place.marker.setVisible(false);
      });
    } else {
      clusterMarker.setVisible(false);
      places.forEach(function (place) {
        place.marker.setVisible(true);
      });
    }
  });
  clusterMarker.addListener('click', function () {
    map.setZoom(12);
    map.setCenter(position);
  });
  places.forEach(function (place) {
    var marker = new google.maps.Marker({
      position: place.location,
      map: map,
      icon: '/GymWebApp/gym_web_app_photos/marker.png'
    });
    var infoWindow = new google.maps.InfoWindow({
      content: `<div class='card'>${place.name}</div>`,
      maxWidth: '250px'
    });

    marker.addListener("mouseover", function () {
      infoWindow.open(map, marker);
    });

    marker.addListener("mouseout", function () {
      infoWindow.close();
    });

    marker.addListener('click', function () {
      window.location.href = '/GymWebApp/html_pages/locations/' + place.name.replace(/\s/g, "")+ '.html';
    });

    // Store the marker reference in the place object
    place.marker = marker;
  });
}
