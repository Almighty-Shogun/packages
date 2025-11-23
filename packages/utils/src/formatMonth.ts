import { DateTime } from 'luxon'

export default function (date: DateTime, isLong: boolean = true, locale?: string): string {
    return date.setLocale(locale ?? navigator.language ?? "en").toLocaleString({
        month: isLong ? "long" : "short",
    });
}
