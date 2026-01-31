export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async navigateTo() {
        await this.page.goto('https://example.com/home');
    }

    async getTitle() {
        return await this.page.title();
    }

    async clickElement(selector) {
        await this.page.click(selector);
    }

    async isElementVisible(selector) {
        return await this.page.isVisible(selector);
    }
}