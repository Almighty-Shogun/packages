import { DateTime } from 'luxon'
import type { OpenMeteoResponse } from './types'

type WeatherTemperature = {
    current: number;
    min: number;
    max: number;
};

export type WeatherItem = {
    time: string;
    temperature: WeatherTemperature;
    weatherCode: number;
    icon: string;
};

export type Weather = {
    current: WeatherItem;
    today: WeatherItem & {
        sunrise: string;
        sunset: string;
    };
    hours: WeatherItem[];
};

type WeatherIcon = [day: string, night: string];
export type WeatherCode = keyof typeof weatherCodeMap;
export type WeatherCodes = Record<WeatherCode, WeatherIcon>;

const weatherCodeMap: Record<string, WeatherIcon> = {
    // 0 = Clear sky
    0: ["images/weather-icons/clear-day", "images/weather-icons/clear-night"],

    // 1 = Mainly clear, 2 = Partly cloudy, 3 = Overcast
    1: ["images/weather-icons/partly-cloudy-day", "images/weather-icons/partly-cloudy-night"],
    2: ["images/weather-icons/partly-cloudy-day", "images/weather-icons/partly-cloudy-night"],
    3: ["images/weather-icons/overcast-day", "images/weather-icons/overcast-night"],

    // 45 = Fog, 48 = Depositing rime fog
    45: ["images/weather-icons/fog-day", "images/weather-icons/fod-night"],
    48: ["images/weather-icons/overcast-day-fog", "images/weather-icons/overcast-night-fog"],

    // 51 = Light drizzle, 53 = Moderate drizzle, 55 = Heavy drizzle
    51: ["images/weather-icons/partly-cloudy-day-drizzle", "images/weather-icons/partly-cloudy-night-drizzle"],
    53: ["images/weather-icons/overcast-day-drizzle", "images/weather-icons/overcast-night-drizzle"],
    55: ["images/weather-icons/extreme-day-drizzle", "images/weather-icons/extreme-night-drizzle"],

    // 56 = Light freezing drizzle, 57 = Heavy freezing drizzle
    56: ["images/weather-icons/partly-cloudy-day-sleet", "images/weather-icons/partly-cloudy-night-sleet"],
    57: ["images/weather-icons/extreme-day-sleet", "images/weather-icons/extreme-night-sleet"],

    // 61 = Light rain, 63 = Moderate rain, 65 = Heavy rain
    61: ["images/weather-icons/partly-cloudy-day-rain", "images/weather-icons/partly-cloudy-night-rain"],
    63: ["images/weather-icons/overcast-day-rain", "images/weather-icons/overcast-night-rain"],
    65: ["images/weather-icons/extreme-day-rain", "images/weather-icons/extreme-night-rain"],

    // 66 = Light freezing rain, 67 = Heavy freezing rain
    66: ["images/weather-icons/partly-cloudy-day-sleet", "images/weather-icons/partly-cloudy-night-sleet"],
    67: ["images/weather-icons/extreme-day-sleet", "images/weather-icons/extreme-night-sleet"],

    // 71 = Light snow, 73 = Moderate snow, 75 = Heavy snow
    71: ["images/weather-icons/partly-cloudy-day-snow", "images/weather-icons/partly-cloudy-night-snow"],
    73: ["images/weather-icons/overcast-day-snow", "images/weather-icons/overcast-night-snow"],
    75: ["images/weather-icons/extreme-day-snow", "images/weather-icons/extreme-night-snow"],

    // 77 Snow grains
    77: ["images/weather-icons/partly-cloudy-day-snow", "images/weather-icons/partly-cloudy-night-snow"],

    // 80 = Light rain showers, 81 = Moderate rain showers, 82 = Heavy rain showers
    80: ["images/weather-icons/partly-cloudy-day-rain", "images/weather-icons/partly-cloudy-night-rain"],
    81: ["images/weather-icons/overcast-day-rain", "images/weather-icons/overcast-night-rain"],
    82: ["images/weather-icons/extreme-day-rain", "images/weather-icons/extreme-night-rain"],

    // 85 = Light snow showers, 86 = Heavy snow showers
    85: ["images/weather-icons/partly-cloudy-day-snow", "images/weather-icons/partly-cloudy-night-snow"],
    86: ["images/weather-icons/extreme-day-snow", "images/weather-icons/extreme-night-snow"],

    // 95 = Light and moderate thunderstorms, 96 = Light thunderstorms with hail, 99 = Heavy thunderstorms with hail
    95: ["images/weather-icons/thunderstorms-day", "images/weather-icons/thunderstorms-night"],
    96: ["images/weather-icons/thunderstorms-day", "images/weather-icons/thunderstorms-night"],
    99: ["images/weather-icons/thunderstorms-day-extreme", "images/weather-icons/thunderstorms-night-extreme"]
}

const weatherCodes: WeatherCodes = weatherCodeMap as WeatherCodes;

export async function callOpenMeteo(latitude: number, longitude: number): Promise<OpenMeteoResponse> {
    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        forecast_days: "1",
        timezone: "Europe/Amsterdam",
        current: "weather_code,temperature_2m,temperature_2m_max,temperature_2m_min",
        daily: "temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset",
        hourly: "weather_code,temperature_2m,temperature_2m_max,temperature_2m_min"
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

    return await response.json();
}

export function getWeatherIcon(code: number, timeStrings: string[]): string {
    const weatherCode = code.toString() as WeatherCode;

    const currentTime = DateTime.fromISO(timeStrings[0]);
    const sunriseTime = DateTime.fromISO(timeStrings[1]);
    const sunsetTime = DateTime.fromISO(timeStrings[2]);

    const isDayTime = currentTime >= sunriseTime && currentTime < sunsetTime;

    const weatherIcon = weatherCodes[weatherCode];

    if (!weatherIcon) {
        console.log(`[Weather] Unknown weather code ${weatherCode}`);

        return "images/weather-icons/not-available";
    }

    const [day, night] = weatherIcon;

    return isDayTime ? day : night;
}
