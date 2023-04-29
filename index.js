// JS link test
console.log("Silly")

// ==========================================================================================
// ==========================================================================================
// ==========================================================================================
// Set up Leaflet API / Map Init

const mymap = {

    coordinates: [],
    businesses: [],
    map: {},
    markers: {},

    buildMap() {
        this.map = L.map('map', {
            center: this.coordinates,
            zoom: 11,
        });
            
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

        const marker = L.marker(this.coordinates)
        marker.addTo(this.map).bindPopup("<p1><b>You are here</b><br></p1>").openPopup
    },

    addMarkers() {
        for (let i = 0; i < this.businesses.length; i++) {
            this.markers = L.marker([this.businesses[i].lat, this.businesses[i].long])
            .bindPopup("<p1>" + this.businesses[i].name + "</p1>").addTo(this.map)
        }
    }
}

async function getFoursquare(business) {
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: "fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8="
        }
    }
    let limit = 5
    let lat = myMap.coordinates[0]
    let lon = myMap.coordinates[1]
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
    let data = await response.text()
    let parsedData = JSON.parse(data)
    let businesses  = parsedData.results
    return businesses
}


// ==========================================================================================
// ==========================================================================================
// ==========================================================================================
// Obtain User Location

async function getLocation() {

  if (navigator.geolocation) {
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude;
    console.log(latitude, longitude)
    return [latitude, longitude]
  }

}

getLocation()


// ==========================================================================================
// ==========================================================================================
// ==========================================================================================

// Set up Foursquare API







// add user location

L.marker([51.505, -0.09]).addTo(map);

// get selected location from the user

// add selected information to map