const OPEN_WEATHER_API_KEY = "e9504a3afd32c53cea6054764357a026";

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
}

export type OpenWeatherTempScale = "metric" | "imperial";

export const fetchWeather = async (
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data: WeatherData = await response.json();
  return data;
};
