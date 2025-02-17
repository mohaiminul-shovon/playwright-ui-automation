import { Locator, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class SignupAndLoginPage {
    private readonly page: Page;
    private readonly loginEmailAddressField: Locator;
    private readonly loginPasswordField: Locator;
    private readonly loginBtn: Locator;
    private readonly signupUsernameField: Locator;
    private readonly signupEmailField: Locator;
    private readonly signupBtn: Locator;
    private readonly loginText: Locator;
    private readonly signupText: Locator;
    constructor(page: Page) {
        this.page = page;
        this.loginEmailAddressField = this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.loginPasswordField = this.page.getByRole('textbox', { name: 'Password' });
        this.signupUsernameField = this.page.getByRole('textbox', { name: 'Name' })
        this.signupEmailField = this.page.locator('form').filter({hasText: 'Signup'}).getByRole('textbox',{name: 'Email'});
        this.loginBtn = this.page.getByRole('button', { name: 'Login' });
        this.signupBtn = this.page.getByRole('button', { name: 'Signup' });
        this.loginText = this.page.getByRole('heading', { name: 'Login to your account' });
        this.signupText = this.page.getByRole('heading', {name: 'New User Signup!'});

    }
    // Navigation
    async navigateToSignupPage(): Promise<void> {
        await this.page.goto('https://automationexercise.com/signup');
    }

    // Page actions
    async fillSignupInfo(): Promise<void> {
        await this.signupUsernameField.fill(faker.internet.username());
        await this.signupEmailField.fill(faker.internet.email());
    }
    async clickOnSignup(): Promise<void> {
        await this.signupBtn.click();
    }

    async fillLoginInfo(email: string, password: string): Promise<void> {
        await this.loginEmailAddressField.fill(email);
        await this.loginPasswordField.fill(password);

    }
    async clickOnLogin(): Promise<void> {
        await this.loginBtn.click();
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async isLoginFormVisible(): Promise<boolean> {
        return await this.loginBtn.isVisible();
    }

    async isSignupFormVisible(): Promise<boolean> {
        return await this.signupBtn.isVisible();
    }
    
    async getSignupText(): Promise<Locator> {
        return this.signupText;
    }

    async getLoginText(): Promise<Locator> {
        return this.loginText;
    }

    async getTitle(){
        return (await this.page.title()).toString();
    }
}