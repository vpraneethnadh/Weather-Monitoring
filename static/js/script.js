document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const city = document.getElementById('cityInput').value;

    // Fetch the weather data for the entered city
    fetch(`/weather/${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(weatherData => {
            console.log('Weather data fetched:', weatherData); // Debugging log

            // Update result container
            document.getElementById('weatherHeader').textContent = `Weather in ${city}`;
            document.getElementById('temperature').textContent = `Temperature: ${weatherData.temp} °C`;
            document.getElementById('humidity').textContent = `Humidity: ${weatherData.humidity}%`;
            document.getElementById('windSpeed').textContent = `Wind Speed: ${weatherData.wind_speed} m/s`;
            document.getElementById('description').textContent = `Description: ${weatherData.description}`;

            // Set Google Maps iframe
            const mapSrc = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(city)}&key=XXXXXXXXXXXXXXXXXXXXXXX`; // Replace with your API Key
            document.getElementById('map').innerHTML = `<iframe src="${mapSrc}" width="600" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('result').innerHTML = `<p>Error: City not found.</p>`;
        });
});


document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const city = document.getElementById('cityInput').value;

    // Fetch the weather data for the entered city
    fetch(`/weather/${city}`)  // Use backticks for template literals
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(weatherData => {
            console.log('Weather data fetched:', weatherData); // Debugging log

            // Show the result container once data is fetched
            document.getElementById('result').style.display = 'block';

            // Set the weather information
            document.getElementById('weatherHeader').textContent = `Weather in ${city}`;
            document.getElementById('temperature').textContent = `${weatherData.temp} °C`;
            document.getElementById('feelsLike').textContent = `${weatherData.feels_like} °C`;
            document.getElementById('pressure').textContent = `${weatherData.pressure} hPa`;
            document.getElementById('humidity').textContent = `${weatherData.humidity}%`;
            document.getElementById('visibility').textContent = `${weatherData.visibility} km`;
            document.getElementById('clouds').textContent = `${weatherData.clouds}%`;
            document.getElementById('sunrise').textContent = new Date(weatherData.sunrise * 1000).toLocaleTimeString();
            document.getElementById('sunset').textContent = new Date(weatherData.sunset * 1000).toLocaleTimeString();
            document.getElementById('windSpeed').textContent = `${weatherData.wind_speed} m/s`;
            document.getElementById('description').textContent = weatherData.description;

            // Initialize Google Maps
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 10,
                center: { lat: weatherData.coord.lat, lng: weatherData.coord.lon },
            });
            new google.maps.Marker({
                position: { lat: weatherData.coord.lat, lng: weatherData.coord.lon },
                map: map,
            });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('result').innerHTML = `<p>Error: City not found.</p>`;  // Correct the use of template literals
        });
});
