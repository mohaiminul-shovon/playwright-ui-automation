import { Page, Locator } from "playwright";

export class NavigationPanel{
    readonly page: Page;
    readonly navElement;
    constructor(page: Page){
        this.page = page;

    }
    async getNavHeader(): Promise<Locator>{
        return this.page.getByRole('link', { name: 'Website for automation' });
    }
    async getNavElement(elementName: string): Promise<Locator>{
        return this.page.getByRole('link', { name: elementName });
    }
}