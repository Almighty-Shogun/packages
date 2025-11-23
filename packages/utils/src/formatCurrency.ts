export default function (value: number, currency?: string, locale?: string): string {
    return new Intl.NumberFormat(locale ?? navigator.language ?? "en", {
        style: "currency",
        currency: currency ?? "EUR",
        currencyDisplay: "symbol",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    }).format(value);
}
