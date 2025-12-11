import disableZoom from './disableZoom'
import useDarkTheme from './useDarkTheme'

type ApplicationConfig = {
    locale?: string;
    isDarkTheme?: boolean;
    isZoomDisabled?: boolean;
}

export default function (config: ApplicationConfig): void {
    document.documentElement.setAttribute("lang", config.locale ?? "en");

    useDarkTheme(config.isDarkTheme ?? false);

    if (config.isZoomDisabled) {
        disableZoom();
    }
}
