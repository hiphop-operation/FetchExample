// make variables for the html elements

const fetchButton = document.getElementById("fetchButton");
// const urlTextBox = document.getElementById("urlTextBox");
const dataResultArea = document.getElementById("mainResults");
const latitudeReadout = document.getElementById("latitudeReadout");
const longitudeReadout = document.getElementById("longitudeReadout");
const currentWind = document.getElementById("currentWind");
const currentTemp = document.getElementById("currentTemp")



async function fetchWeatherData(latitude, longitude) {
    try {
        // Construct the API URL with the dynamic latitude and longitude
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
        
        // Send a GET request to the API
        const response = await fetch(apiUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Convert the response to JSON
        const data = await response.json();

        // Extract current weather data
        const currentTemperature = data.current.temperature_2m;
        const currentWindSpeed = data.current.wind_speed_10m;

           // Update the DOM with the current temperature
           currentTemp.textContent = `Current Temperature: ${currentTemperature}°C`;
           currentWind.textContent = `Wind Speed: ${currentWindSpeed}`;

           // Log the extracted data (or handle it as needed)
           console.log("Current Temperature:", currentTemperature);
           console.log("Current Wind Speed:", currentWindSpeed);
   
       } catch (error) {
           // Handle errors
           console.error("Failed to fetch weather data:", error);
       }
    }
    
    const myClickHandler = function(event) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Update the latitude and longitude readouts
            latitudeReadout.textContent = `Latitude: ${latitude}`;
            longitudeReadout.textContent = `Longitude: ${longitude}`;
            
            // Fetch the weather data using the current position
            fetchWeatherData(latitude, longitude);
        });
}

fetchButton.addEventListener('click', myClickHandler);


