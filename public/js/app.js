const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");
const msgThree = document.querySelector("#msg-3");
const msgFour = document.querySelector("#msg-4");
const msgFive = document.querySelector("#msg-5");
const msgSix = document.querySelector("#msg-6");
const msgSeven = document.querySelector("#msg-7");
const errorMsg = document.querySelector("#error");

weatherForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const location = search.value;
    search.value = "";

    msgOne.textContent = "Loading...";
    msgTwo.textContent = "";
    msgThree.textContent = "";
    msgFour.textContent = "";
    msgFive.textContent = "";
    msgSix.textContent = "";
    msgSeven.textContent = "";

    const forecast = fetch("/weather?address=" + location);
    forecast.then((res) => {
    res.json().then((data) => {
        if(data.error) {
            errorMsg.textContent = "Error: " + data.error;
            msgOne.textContent = "";
        } else {
            msgOne.textContent = "Date: " + data.today;
            msgTwo.textContent = "Location: " + data.location;
            msgThree.textContent = "Summary: " + data.summary;
            msgFour.textContent = "Temperature: " + data.temperature;
            msgFive.textContent = "Precipitation: " + data.precipitation;
            msgSix.textContent = "Today's Low: " + data.temperatureMin;
            msgSeven.textContent = "Today's High: " + data.temperatureMax;
            errorMsg.textContent = "";
        }
    });
})
    
})

