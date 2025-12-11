import { DateTime } from 'luxon'

export default function (date: DateTime|string|null): DateTime {
    return !date ? DateTime.now() : typeof date === "string" ? DateTime.fromISO(date) : date;
}
