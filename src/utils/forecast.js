const request = require("request");
const chalk = require("chalk");

const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/ce27bce300fdb2229885664523990f3a/" + encodeURIComponent(lat) + "," + encodeURIComponent(long) + "?units=si&lang=en";
    request({url, json: true}, (err, {body}) => {
        if(err) {
           callback( chalk.red.inverse("Unable to connect to weather service!"), undefined);
        } else if(body.error) {
            callback(chalk.red.inverse("Unable to find location!"), undefined);
        } else {
            const  summary = body.daily.data[0].summary;
            const temperature = `It is currently ${body.currently.temperature} degrees outside.`;
            const precipitation = `${body.currently.precipProbability}% possibility of rain.`;
            callback(undefined, {
                summary,
                temperature,
                precipitation
            })
        }
    })
}

module.exports = forecast;