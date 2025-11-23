export default function (value: number, locale?: string): string {
    return new Intl.NumberFormat(locale ?? navigator.language ?? "en", {
        style: "percent",
        maximumFractionDigits: 1,
        minimumFractionDigits: 0
    }).format(value);
}
