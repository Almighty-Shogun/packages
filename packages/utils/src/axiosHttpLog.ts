type AxiosData = {
    status: number;
    url: string;
    message: string;
}

export default function (name: string, data: AxiosData, isRejected: boolean): void {
    const logMethod = isRejected ? console.error : console.info;

    logMethod(`${name}: [HTTP ${data.status}] ${data.url}${data.message}`);
}
