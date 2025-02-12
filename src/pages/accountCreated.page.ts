import { Page, Locator } from "playwright";

export class AccountCreatedPage{
    private readonly page: Page;
    private readonly accountCreatedText: Locator;
    private readonly continueLink: Locator;
    constructor(page: Page){
        this.page = page;
        this.accountCreatedText = this.page.getByText('Account Created!');
        this.continueLink = this.page.getByRole('link', {name: 'Continue'});
    }
    async getAccountCreatedText(): Promise<Locator>{
        return this.accountCreatedText;
    }
    async clickContinueLink(): Promise<void>{
        await this.continueLink.click();
    }
}