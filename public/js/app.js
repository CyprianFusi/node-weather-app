const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");
const msgThree = document.querySelector("#msg-3");
const msgFour = document.querySelector("#msg-4");
const msgFive = document.querySelector("#msg-5");
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

    const forecast = fetch("http://localhost:3000/weather?address=" + location);
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
            errorMsg.textContent = "";
        }
    });
})
    
})

