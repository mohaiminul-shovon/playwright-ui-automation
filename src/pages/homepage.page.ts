import { Page, Locator } from "playwright";
import { NavigationPanel } from "../components/navigationPanal";

export class HomePage{
    readonly page: Page;
    constructor(page: Page){
        this.page = page;
    }
    async navigateToHomePage(): Promise<void>{
        await this.page.goto('https://automationexercise.com/');
    }
    async getNavPanel(): Promise<NavigationPanel>{
        return new NavigationPanel(this.page);
    }
    async getLoggedInUser(): Promise<Locator>{
        const navbarComponent = (await this.getNavPanel()).getNavElement("Logged in as");
        return navbarComponent;
    }
    async clickOnDeleteAccount(): Promise<void>{
        const navbarComponent = await (await this.getNavPanel()).getNavElement("Delete Account");
        await navbarComponent.click();
    }
}