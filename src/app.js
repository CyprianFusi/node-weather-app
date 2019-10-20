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
        name: "Binati"
    })
})

//Define routes: about page
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About us",
        name: "Binati"
    });
})

//Define routes: help page
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Info",
        helpText: "Please provide your telephone number including country code.",
        name: "Binati"
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

        forecast(latitude, longitude, (err, {summary, temperature, precipitation}) => {
            if(err) {
                return res.send({err});
            }
            const address = req.query.address;
            const now = new Date();
            const today = now.getDate() + "-" + parseInt(now.getMonth() + 1) + "-" + now.getFullYear();
            res.send({
                today,
                address,
                location,
                summary,
                temperature,
                precipitation
            })
        })

    })
   
})

//Define routes: 404 page
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: 404,
        errorText: "Error: Help article not found", 
        name: "Binati"
    })
})

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
    console.log(`Server is up on ${port}`)
})