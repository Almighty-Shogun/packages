import { DateTime } from 'luxon'
import { callOpenMeteo, getWeatherIcon, type Weather } from './internal/weather'

export default async function (latitude: number, longitude: number): Promise<Weather> {
    const { current, daily, hourly } = await callOpenMeteo(latitude, longitude);

    return {
        current: {
            time: current.time,
            temperature: {
                current: current.temperature_2m,
                min: current.temperature_2m_min,
                max: current.temperature_2m_max
            },
            weatherCode: current.weather_code,
            icon: getWeatherIcon(current.weather_code, [current.time, daily.sunrise[0], daily.sunset[0]])
        },
        today: {
            time: daily.time[0],
            temperature: {
                current: current.temperature_2m,
                min: daily.temperature_2m_min[0],
                max: daily.temperature_2m_max[0]
            },
            weatherCode: daily.weather_code[0],
            icon: getWeatherIcon(daily.weather_code[0], [daily.time[0], daily.sunrise[0], daily.sunset[0]]),
            sunrise: daily.sunrise[0],
            sunset: daily.sunset[0]
        },
        hours: hourly.time.map((time: string, index: number) => ({
            time,
            temperature: {
                current: hourly.temperature_2m[index],
                min: hourly.temperature_2m_min[index],
                max: hourly.temperature_2m_max[index]
            },
            weatherCode: hourly.weather_code[index],
            icon: getWeatherIcon(hourly.weather_code[index], [time, daily.sunrise[0], daily.sunset[0]])
        })).filter(hour => DateTime.fromISO(hour.time) >= DateTime.fromISO(current.time).startOf("hour"))
    };
}
