import {
  setStoredCities,
  setStoredOptions,
  getStoredCities,
  getStoredOptions,
} from "../utils/storage";

import { fetchWeather } from "../utils/api";

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({ tempScale: "metric", homeCity: "" });

  chrome.contextMenus.create({
    id: "addCity",
    title: "Add city to weather extention",
    contexts: ["selection"],
  });

  chrome.alarms.create({
    periodInMinutes: 60,
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  getStoredCities().then((cities) => {
    const updatedCities = [...cities, event.selectionText];
    setStoredCities(updatedCities);
  });
});

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if (!options.homeCity) {
      return;
    }
    fetchWeather(options.homeCity, options.tempScale)
      .then((data) => {
        const temp = Math.round(data.main.temp);
        const symbol = options.tempScale === "metric" ? "°C" : "°F";
        chrome.action.setBadgeText({ text: `${temp}${symbol}` });
      })
      .catch(() => {
        chrome.action.setBadgeText({ text: "!" });
      });
  });
});
