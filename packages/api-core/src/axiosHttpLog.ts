type AxiosData = {
    method: string;
    status: number;
    url: string;
    message: string|null;
}

export default function (name: string, data: AxiosData, isRejected: boolean): void {
    const logMethod = isRejected ? console.error : console.info;

    logMethod(`${name}: [HTTP ${data.method} ${data.status}] ${data.url} -> ${data.message}`);
}
