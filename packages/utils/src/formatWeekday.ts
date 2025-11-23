import { DateTime } from 'luxon'

export default function (date: DateTime, isLong: boolean = true, locale?: string): string {
    return date.setLocale(locale ?? navigator.language ?? "en").toLocaleString({
        weekday: isLong ? "long" : "short",
    });
}
