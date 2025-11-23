export type OpenMeteoResponse = {
    current: {
        time: string;
        weather_code: number;
        temperature_2m: number;
        temperature_2m_min: number;
        temperature_2m_max: number;
    };
    hourly: {
        time: string[];
        weather_code: number[];
        temperature_2m: number[];
        temperature_2m_min: number[];
        temperature_2m_max: number[];
    };
    daily: {
        time: string[];
        sunrise: string[];
        sunset: string[];
        weather_code: number[];
        temperature_2m_min: number[];
        temperature_2m_max: number[];
    }
};
