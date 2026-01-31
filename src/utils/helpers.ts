export function waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve();
            }
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            reject(new Error(`Element with selector "${selector}" not found within ${timeout}ms`));
        }, timeout);
    });
}

export function formatDate(date: Date, format: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}