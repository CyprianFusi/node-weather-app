const path = require("path");
const express = require('express');
const hbs = require("hbs");
const chalk = require("chalk");
const geoPosition = require("./utils/geoposition");
const forecast = require("./utils/forecast");


const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views paths
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

//Define routes: route page
app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Binati",
        image: "weather.png",
        style: "style.css"
    })
})

//Define routes: about page
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About us",
        name: "Binati",
        image: "weather.png",
        style: "style.css"
    });
})

//Define routes: help page
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Info",
        helpText: "This page is under construction...",
        name: "Binati",
        image: "weather.png",
        style: "style.css"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
       return res.send({
            error: "No address was provided. Please provide an address."
        })
    }

    geoPosition(req.query.address, (err, {longitude, latitude, location} = {}) => {
        if(err) {
            return res.send({err});
        }

        forecast(latitude, longitude, (err, {summary, temperature, precipitation, temperatureMin, temperatureMax}) => {
            if(err) {
                return res.send({err});
            }
            let address = req.query.address;
            let now = new Date();
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let today = days[now.getDay()] + ", " + now.getDate() + "-" + months[now.getMonth()] + "-" + now.getFullYear();
            res.send({
                today,
                address,
                location,
                summary,
                temperature,
                precipitation,
                temperatureMin,
                temperatureMax
            });
        });

    });
   
});

//Define routes: 404 page
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: 404,
        errorText: "Error: Help article not found", 
        name: "Binati",
        style: "style.css"
    });
});

//Define routes: 404 page
app.get("*", (req, res) => {
    res.render("404", {
        title: 404,
        errorText: "Error: Page not found!",
        name: "Binati"
    })
})
//start the server
app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});