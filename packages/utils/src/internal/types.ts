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

export type TranslateExists = (key: string) => boolean;
export type Translate = (key: string, params?: Record<string, unknown> | (string | number)[]) => string;

export type Route = {
    name: string|symbol|undefined;
};

export type I18n = {
    t: Translate;
    $t: Translate;
    te: TranslateExists;
    $te: TranslateExists;
};
