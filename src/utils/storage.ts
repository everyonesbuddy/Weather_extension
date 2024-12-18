import { OpenWeatherTempScale } from "./api";

export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  homeCity?: string;
  tempScale: OpenWeatherTempScale;
}

export type LocalStorageKey = keyof LocalStorage;

export function setStoredCities(cities: string[]): Promise<void> {
  return new Promise((resolve) => {
    const data: LocalStorage = { cities };
    chrome.storage.local.set(data, () => {
      resolve();
    });
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKey[] = ["cities"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (data: LocalStorage) => {
      resolve(data.cities || []);
    });
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = { options };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKey[] = ["options"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (data: LocalStorage) => {
      resolve(data.options || { tempScale: "metric" });
    });
  });
}
