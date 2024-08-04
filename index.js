import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const baseUrl = "http://api.weatherapi.com/v1/forecast.json"; // Base URL of the API
const apiKey = "7a967b891a5a448fa84120527240208"; // Your API key
const location = "Mumbai"; // Location for the weather query

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Sunny,Partly-Cloudy,Cloudy,Fog,Rainy,Sleet,Snowy,Thunderstorm,Drizzle
const weatherCategories = {
    "Sunny": "Sunny",
    "Clear": "Sunny",


    "Partly cloudy": "Partly-Cloudy",
    "Partly Cloudy": "Partly-Cloudy",



    "Cloudy": "Cloudy",
    "Overcast": "Cloudy",


    
    "Mist": "Fog",
    "Fog": "Fog",
    "Freezing fog": "Fog",
    

    
    "Patchy rain possible": "Rainy",
    "Light rain": "Rainy",
    "Moderate rain": "Rainy",
    "Heavy rain": "Rainy",
    "Light freezing rain": "Rainy",
    "Heavy freezing rain": "Rainy",
    "Light rain shower": "Rainy",
"Moderate or heavy rain shower": "Rainy",
"Torrential rain shower": "Rainy",


    "Light sleet": "Sleet",
    "Moderate or heavy sleet": "Sleet",
    "Light sleet showers": "Sleet",
"Moderate or heavy sleet showers": "Sleet",


    "Light snow": "Snowy",
    "Moderate snow": "Snowy",
    "Heavy snow": "Snowy",
    "Ice pellets": "Snowy",
    "Light snow showers": "Snowy",
"Moderate or heavy snow showers": "Snowy",
"Light showers of ice pellets": "Snowy",
"Moderate or heavy showers of ice pellets": "Snowy",
"Blowing snow": "Snowy",
"Blizzard": "Snowy",
    
  
    "Patchy light rain with thunder": "Thunderstorm",
    "Moderate or heavy rain with thunder": "Thunderstorm",
    "Patchy light snow with thunder": "Thunderstorm",
    "Moderate or heavy snow with thunder": "Thunderstorm",
    
    "Patchy rain nearby":"Drizzle",
    "Patchy light drizzle": "Drizzle",
    "Light drizzle": "Drizzle",
    "Freezing drizzle": "Drizzle",
    "Heavy freezing drizzle": "Drizzle",
    "Patchy freezing drizzle possible": "Drizzle"
};


  

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/weather", async (req, res) => {
  const city = req.body.location;
  // console.log(city);

  try {
    const response = await axios.get(baseUrl, {
      params: {
        key: apiKey,
        q: city,
        days: 10,
        aqi: "yes",
        alerts: "yes",
        //   current_fields: "temp_c,is_day,wind_kph,wind_degree,wind_dir,feelslike_c,uv,air_quality",
        //   day_fields: "maxtemp_c,mintemp_c,avgtemp_c,daily_will_it_rain,daily_chance_of_rain,condition",
        //   hour_fields: "time,temp_c,condition",
      },
    });

    const data = response.data;

    console.log(data.current.condition.text);
    // console.log( weatherCategories[data.current.condition.text]);
    
    res.render("index.ejs", {
      data: data,
      category: weatherCategories[data.current.condition.text],
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Error fetching weather data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
