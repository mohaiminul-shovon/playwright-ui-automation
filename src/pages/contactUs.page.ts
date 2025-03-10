import {Locator, Page} from '@playwright/test'
import * as path from 'path';
export class ContactUsPage{
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly contanctFormNameField: Locator;
    readonly contanctFormEmailField: Locator;
    readonly contactFormSubjectField: Locator;
    readonly contactFormMessageField: Locator;
    readonly contactFormUploadFileBtn: Locator;
    readonly contactFormSubmitBtn: Locator;
    readonly formHeading: Locator;
    constructor(page: Page){
        this.page = page;
        this.pageHeading = this.page.getByRole('heading', { name: 'Contact Us' });
        this.contanctFormNameField = this.page.getByRole('textbox', { name: 'Name' });
        this.contanctFormEmailField = this.page.getByRole('textbox', { name: 'Email', exact: true });
        this.contactFormSubjectField = this.page.getByRole('textbox', { name: 'Subject' });
        this.contactFormMessageField = this.page.getByRole('textbox', { name: 'Your Message Here' });
        this.contactFormUploadFileBtn = this.page.locator('input[type="file"]');
        this.contactFormSubmitBtn = this.page.getByRole('button', { name: 'Submit' });
        this.formHeading = this.page.getByRole('heading', { name: 'Get In Touch' });
    }
    async navigateToContactUsPage(){
        await this.page.goto('https://automationexercise.com/contact_us');
    }
    async isPageHeadingVisible(){
        await this.pageHeading.waitFor();
    }
    async fillContactFormAndSubmit(name: string, email: string, subject: string, message: string){
        await this.contanctFormNameField.fill(name);
        await this.contanctFormEmailField.fill(email);
        await this.contactFormSubjectField.fill(subject);
        await this.contactFormMessageField.fill(message);
        await this.fileUploadForContactForm();
        await this.contactFormSubmitBtn.click();
    }

    async fileUploadForContactForm(){
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.contactFormUploadFileBtn.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join('src/utils', 'test_file.png'));
    }
    async submitContactForm(){
        await this.contactFormSubmitBtn.click();
    }
    async getSuccessMessage(){
        const successMessage = await this.page.locator('#contact-page').getByText('Success! Your details have');
        return successMessage;
    }
    async clickHomeBtn(){
        const homeBtn = await this.page.getByRole('link', { name: ' Home' });
        await homeBtn.click();
    }
}