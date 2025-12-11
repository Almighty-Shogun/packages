import { DateTime } from 'luxon'
import getCorrectDateTime from './internal/getCorrectDateTime'

export default function (date: DateTime|string|null): boolean {
    const dateTime = getCorrectDateTime(date);

    return dateTime.toMillis() < DateTime.now().toMillis();
}
