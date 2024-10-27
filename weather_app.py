import requests
from flask import Flask, jsonify, render_template

app = Flask(__name__)

API_KEY = '6e75668b3fa82bc8e3848ad4c729d5b6'  # Replace with your actual API key
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

# Route to serve the homepage (index.html)
@app.route('/')
def index():
    return render_template('index.html')

# Route to return weather data for a specific city as JSON
@app.route('/weather/<city>', methods=['GET'])
def get_weather_data(city):
    params = {
        'q': city,
        'appid': API_KEY,
        'units': 'metric'  # Use metric units for temperature in Celsius
    }
    
    response = requests.get(BASE_URL, params=params)

    if response.status_code == 200:
        data = response.json()
        weather_info = {
            "temp": data['main']['temp'],
            "feels_like": data['main']['feels_like'],  # Feels like temperature
            "pressure": data['main']['pressure'],      # Atmospheric pressure
            "humidity": data['main']['humidity'],       # Humidity percentage
            "visibility": data['visibility'] / 1000,   # Visibility in kilometers
            "clouds": data['clouds']['all'],            # Cloud coverage percentage
            "sunrise": data['sys']['sunrise'],          # Sunrise time
            "sunset": data['sys']['sunset'],            # Sunset time
            "wind_speed": data['wind']['speed'],        # Wind speed
            "description": data['weather'][0]['description'],  # Weather description
            "coord": data['coord']                       # Coordinates (latitude and longitude)
        }
        return jsonify(weather_info)
    else:
        return jsonify({"error": "City not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
