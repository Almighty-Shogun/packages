export default function (locale?: string): string {
    return locale ?? document.documentElement.lang ?? "en";
}
