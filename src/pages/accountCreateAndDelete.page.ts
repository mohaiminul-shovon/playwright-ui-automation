import { Page, Locator } from "playwright";

export class AccountCreateAndDeletePage{
    private readonly page: Page;
    private readonly accountCreatedText: Locator;
    private readonly accountDeleteText: Locator;
    private readonly continueLink: Locator;
    constructor(page: Page){
        this.page = page;
        this.accountCreatedText = this.page.getByText('Account Created!');
        this.accountDeleteText = this.page.getByText('Account Deleted!');
        this.continueLink = this.page.getByRole('link', {name: 'Continue'});
    }
    async getAccountCreatedText(): Promise<Locator>{
        return this.accountCreatedText;
    }
    async getAccountDeleteText(): Promise<Locator>{
        return this.accountDeleteText;
    }
    async clickContinueLink(): Promise<void>{
        await this.continueLink.click();
    }
}