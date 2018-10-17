from flask import Flask, jsonify, request, abort, make_response, send_file
import os
import requests
import json
import datetime
import itertools
from timezonefinder import TimezoneFinder
import pendulum
from iso3166 import countries
import requests_cache
from credentials import API_KEY

API_URL = "https://api.openweathermap.org/data/2.5/forecast"

app = Flask(__name__)
requests_cache.install_cache('req_cache', backend='sqlite', expire_after=3600)

tf = TimezoneFinder()

def get_data():
    if not request.args.get('name'):
        abort(make_response(jsonify(msg="Please input a city."), 400))

    payload = {"q": request.args.get('name'), "APPID": API_KEY, "units": "metric" }
    r = requests.get(API_URL, params=payload)
    res = r.json()

    if res["cod"] != "200":
        err = res["message"]
        return jsonify({'error': err})

    city_data = res["city"]
    weather_list = res["list"]

    data = []

    for item in weather_list:
        if item["weather"][0]["icon"] == "01d":
            city_lat = city_data["coord"]["lat"]
            city_lon = city_data["coord"]["lon"]
            city_tz = tf.timezone_at(lng=city_lon, lat=city_lat)
            
            local_date = pendulum.from_timestamp(item["dt"], tz=city_tz)
            local_day = local_date.format("YYYY-MM-DD")
            local_hours = local_date.format("HH:mm")
            temp = str(round(item["main"]["temp"])).zfill(2)
            wind = item["wind"]
            wind_speed_kmh = str(round(wind["speed"] * 3.6)).zfill(2)

            my_dict = {
                "date": local_date,
                "day": local_day,
                "hour": local_hours,
                "temp": temp,
                "wind_speed": wind_speed_kmh,
            }

            data.append(my_dict)

    grouped_data = [list(g) for k, g in itertools.groupby(data, key=lambda d: d["date"].date())]

    city_info = {
        "name": city_data["name"],
        "country": countries.get(city_data["country"]).name
    }

    return jsonify({'days': grouped_data, 'city_data': city_info})

@app.route("/")
def main():
    index_path = os.path.join(app.static_folder, 'index.html')
    return send_file(index_path)

@app.route('/api/city', methods=['GET'])
def get_city_weather():
    return get_data()

# Everything not declared before (not a Flask route / API endpoint)...
@app.route('/<path:path>')
def route_frontend(path):
    # ...could be a static file needed by the front end that
    # doesn't use the `static` path (like in `<script src="bundle.js">`)
    file_path = os.path.join(app.static_folder, path)
    if os.path.isfile(file_path):
        return send_file(file_path)
    # ...or should be handled by the SPA's "router" in front end
    else:
        index_path = os.path.join(app.static_folder, 'index.html')
        return send_file(index_path)

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=80)
