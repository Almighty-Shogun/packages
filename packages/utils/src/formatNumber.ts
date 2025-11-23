export default function (value: number, decimals: number = 2, locale?: string): string {
    return new Intl.NumberFormat(locale ?? navigator.language ?? "en", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    }).format(value);
}
