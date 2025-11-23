import { DateTime } from 'luxon'

export default function (date: DateTime, locale?: string): string {
    return date.setLocale(locale ?? navigator.language ?? "en").toLocaleString({
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}
