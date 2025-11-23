import { DateTime } from 'luxon'

export default function (date: DateTime): string {
    return date.toLocaleString({
        hour: "2-digit",
        minute: "2-digit"
    });
}
