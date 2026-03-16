import { pathToFileURL } from "url";
import fs from "fs";
// allow us to read and write data in the file
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const DATA_DIR = path.join(import.meta.dirname, "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const WEATHER_FILE = path.join(DATA_DIR, "weather.json");
const LOG_FILE = path.join(DATA_DIR, "weather_log.csv");

export async function fetchWeather() {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = process.env.CITY || "London";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    const nowUTC = new Date().toISOString();
    data._last_updated_utc = nowUTC;
    fs.writeFileSync(WEATHER_FILE, JSON.stringify(data, null, 2));

    const header = "timestamp,city,temperature,description\n";
    if (!fs.existsSync(LOG_FILE)) {
      fs.writeFileSync(LOG_FILE, header);
    } else {
      const firstLine = fs.readFileSync(LOG_FILE, "utf8").split("\n")[0];
      if (firstLine !== "timestamp,city,temperature,description") {
        fs.writeFileSync(LOG_FILE, header + fs.readFileSync(LOG_FILE, "utf-8"));
      }
    }
    //append the csv file when we fetch the data from the api
    const logEntry = `${nowUTC}, ${city}, ${data.main.temp}, ${data.weather[0].description}\n`;
    fs.appendFileSync(LOG_FILE, logEntry);
    console.log(`Weather data updated for ${city} at ${nowUTC}`);
  } catch (err) {
    console.log("Error fetching weather:", err);
  }
}
//if node is present in the folder where my project is then fetch the weather api

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  fetchWeather();
}
