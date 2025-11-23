import { DateTime } from 'luxon'

export default function (date: DateTime, locale?: string): string {
    return date.setLocale(locale ?? navigator.language ?? "en").toLocaleString({
        day: "numeric",
        weekday: "long",
        month: "long"
    });
}
