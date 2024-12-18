import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
  colors,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { fetchWeather, OpenWeatherTempScale, WeatherData } from "../utils/api";

const WeatherCardContainer = ({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete?: () => void;
}) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card
        style={{
          background: "#fee9d7",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <CardContent>{children}</CardContent>
        {onDelete && (
          <button
            style={{
              backgroundColor: "#e2434b",
              marginLeft: "20px",
              marginBottom: "20px",
              padding: "2px",
              color: "white",
              borderRadius: "5px",
            }}
            onClick={onDelete}
          >
            <DeleteIcon />
          </button>
        )}
      </Card>
    </Box>
  );
};

type weatherCardState = "loading" | "error" | "ready";

const WeatherCard = ({
  city,
  onDelete,
  tempScale,
}: {
  city: string;
  onDelete?: () => void;
  tempScale: OpenWeatherTempScale;
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cardState, setCardState] = useState<weatherCardState>("loading");

  useEffect(() => {
    fetchWeather(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((error) => setCardState("error"));
  }, [city, tempScale]);

  if (cardState === "error" || cardState === "loading") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          {cardState === "error"
            ? "Error: Could not retrieve wether data for this city"
            : "Loading..."}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          {weatherData.name}
        </Typography>
        <Typography
          variant="body1"
          style={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          {Math.round(weatherData.main.temp)}°{" "}
          {tempScale === "metric" ? "C" : "F"}
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="subtitle1" style={{ fontSize: "0.875rem" }}>
          {weatherData.weather[0].description}
        </Typography>
        <Typography variant="subtitle1" style={{ fontSize: "0.875rem" }}>
          H: {weatherData.main.temp_max}° L: {weatherData.main.temp_min}°
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" style={{ fontSize: "0.875rem" }}>
          Feels Like: {Math.round(weatherData.main.feels_like)}°
        </Typography>
        <Typography variant="body1" style={{ fontSize: "0.875rem" }}>
          Humidity: {weatherData.main.humidity}%{" "}
        </Typography>
      </div>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
