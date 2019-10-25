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
            let  summary = body.daily.data[0].summary;
            let temperature = `It is currently ${body.currently.temperature} degrees outside.`;
            let precipitation = `${body.currently.precipProbability}% possibility of rain.`;
            let temperatureMin = `The minimum temperature of the day is ${body.daily.data[0].temperatureMin} degrees.`;
            let temperatureMax = `The maximum temperature of the day is ${body.daily.data[0].temperatureMax} degrees.`;
            callback(undefined, {
                summary,
                temperature,
                precipitation,
                temperatureMin,
                temperatureMax
            })
        }
    })
}

module.exports = forecast;