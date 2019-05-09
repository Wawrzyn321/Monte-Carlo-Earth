const apiKeys = require('../config/api-keys');
const fetch = require('node-fetch');

function buildGeocodingRequestUrl(point)
{
    const apiKey = apiKeys.geocodingApiKey;
    const lat = point.latitude;
    const lon = point.longitude;
    return `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;
}

async function getLocation(latitude, longitude) {
    const url = buildGeocodingRequestUrl({latitude, longitude});
    
    const response = await fetch(url);
    const json = await response.json();
    let location = json.results[0].components.country;
    if (location == null) {
        location = 'Somewhere on the water';
    }
    return location;
}

module.exports = { getLocation };
