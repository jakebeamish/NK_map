const places = [
    {
        name: "Almondbury Action",
        type: "test",
        link: `<a target="_blank" rel="noopener noreferrer" href='https://www.facebook.com/almondburyaction/'>facebook.com/almondburyaction</a>`,
        // Coordinates from Wikipedia/GeoHack: https://en.wikipedia.org/wiki/Almondbury
        coords: {
            lat: 53.634361,
            lon: -1.7489
        }
    },
    {
        name: "Almondbury Bank Woodland Preservation Group",
        type: "test",
        // Coordinates from Huddersfield Exposed: https://huddersfield.exposed/wiki/Radical_Forest,_Almondbury_Bank
        coords: {
            lat: 53.640983,
            lon: -1.756310
        }
    },
    {
        name: "Batley Cemetery Support Group",
        type: "test",
        // Coordinates from https://www.cwgc.org/visit-us/find-cemeteries-memorials/cemetery-details/2040143/batley-cemetery/
        coords: {
            lat: 53.71539,
            lon: -1.64174
        }
    },
    {
        name: "Birkenshaw Village Association",
        type: "test",
        coords: {
            lat:53.74615,
            lon: -1.6932,
        }
    },
    {
        name: "Birstall In Bloom",
        type: "test",
        coords: {
            lat: 53.732,
            lon: -1.66
        }
    },
    {
        name: "Briestfield History and Community Group",
        type: "test",
        // Coordinates copied from Google Maps - approximate point
        coords: {
            lat: 53.65296655126167,
            lon: -1.6500426694387018
        }
    },
    {
        name: "Brighouse High School Allotment",
        type: "allotment",
        coords: {
            lat: 53.713334,
            lon: -1.796253
        }
    },
    {
        name: "Brockholes Green Spaces",
        type: "Park",
        coords: {
            lat: 53.597,
            lon: -1.7698
        }
    }
]


var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
});

var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
});

var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'jpg'
});


const NKMembersTest = L.layerGroup();
const parks = L.layerGroup();
const allotments = L.layerGroup();

for (let place of places) {
    let popupText = `${place.name}<br>${place.link ?? ""}`;
    const marker = L.marker([place.coords.lat, place.coords.lon], {
        icon: redIcon
    })
        .bindPopup(popupText)
        .openPopup();
if (place.type == "test") {
    marker.setIcon(greenIcon)
    marker.addTo(NKMembersTest)
} else if (place.type == "Park") {
    marker.setIcon(violetIcon)
    marker.addTo(parks)
} else if (place.type == "allotment") {
    marker.setIcon(orangeIcon)
    marker.addTo(allotments)

}
}


var map = L.map('map', {
    // Coordinates set manually to centre the map so that all place markers are visible...
    center: [53.61, -1.70],
    zoom: 11,
    // Select default base layer and overlay layerGroup
    layers: [osmHOT, NKMembersTest]
});

// List of base maps for GUI
var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "Stadia_AlidadeSmooth": Stadia_AlidadeSmooth,
    Stadia_AlidadeSatellite
};

// List of layerGroups for GUI
var overlays = {
    "Parks": parks,
    "Allotments": allotments,
    "All members test": NKMembersTest
};

var layerControl = L.control.layers(baseMaps, overlays).addTo(map);

