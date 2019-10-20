const request = require("request");
const chalk = require("chalk")

const geoPosition = (locationName, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(locationName) + ".json?access_token=pk.eyJ1IjoiY3lwcmlhbmZ1c2kiLCJhIjoiY2sxa2hybDl1MjNuNDNocW02aHE2cmczeCJ9.FX3FU806Wo1Dj2X_psuDKw&limit=1";
    request({url, json: true}, (err, {body}) => {
        if(err) {
            callback(chalk.red.inverse("Unable to connect to location services!"), undefined);
        } else if(body.message) {
            callback(chalk.red.inverse(`Bad input! Service location ${body.message}`), undefined);
        } else {
            const longitude = body.features[0].center[0]; 
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            callback(undefined, {
                longitude,
                latitude,
                location
            });
        }
    })
}

module.exports = geoPosition;