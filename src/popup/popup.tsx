import React, { useState, useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import { Box, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import "fontsource-roboto";
import { createRoot } from "react-dom/client";
import "./popup.css";
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";

function App() {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleAddCity = () => {
    if (newCity === "") {
      return;
    }

    const updatedCities = [...cities, newCity];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setNewCity("");
    });
  };

  const handleDeleteCity = (index: number) => {
    const updatedCities = cities.filter((_, i) => i !== index);
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleToggleTempScale = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };
    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });
  };

  if (!options) {
    return null;
  }

  return (
    <Box mx="8px" my="16px">
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            marginRight: "8px",
            width: "230px",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleAddCity}
          style={{ padding: "8px", marginRight: "8px", borderRadius: "5px" }}
        >
          ➕
        </button>
        <button
          onClick={() => handleToggleTempScale()}
          style={{
            padding: "8px",
            marginRight: "8px",
            fontSize: "10px",
            borderRadius: "5px",
          }}
        >
          {options.tempScale === "metric" ? "🌡️ °C" : "🌡️ °F"}
        </button>
      </div>

      {options.homeCity != "" && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}

      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          tempScale={options.tempScale}
          onDelete={() => handleDeleteCity(index)}
        />
      ))}
      <Box height={16} />
    </Box>
  );
}

const root = document.createElement("div");
document.body.appendChild(root);

const rootElement = createRoot(root);
rootElement.render(<App />);

export default App;
