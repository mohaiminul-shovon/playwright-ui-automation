import {Page, Locator} from "@playwright/test";
import {faker} from "@faker-js/faker";
interface Dob{
    day: Locator;
    month: Locator;
    year: Locator;
}
interface TitleRadioBtn{
    Mr: Locator;
    Mrs: Locator;
}
export class SignupInfoPage{
    private readonly page: Page;
    private readonly infoPageHeader: Locator;
    private readonly titleRadioBtn: TitleRadioBtn;
    private readonly nameField: Locator;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly dobField: Dob;
    private readonly newsletterCheckbox: Locator;
    private readonly specialOfferCheckbox: Locator;
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly companyField: Locator;
    private readonly firstAddressLine: Locator;
    private readonly secondAddressLine: Locator;
    private readonly countryField: Locator;
    private readonly stateField: Locator;
    private readonly cityField: Locator;
    private readonly zipCodeField: Locator;
    private readonly mobileNumberField: Locator;
    private readonly createAccountBtn: Locator;
    constructor(page: Page){
        this.page = page;
        this.infoPageHeader = this.page.getByText('Enter Account Information');
        this.titleRadioBtn = {
            Mr: this.page.getByRole('radio', { name: 'Mr.' }),
            Mrs: this.page.getByRole('radio', { name: 'Mrs.' })
        };
        this.nameField = this.page.getByRole('textbox', { name: 'Name *', exact: true });
        this.emailField = this.page.getByRole('textbox', { name: 'Email *', exact: true });
        this.passwordField = this.page.getByRole('textbox', { name: 'Password'});
        this.dobField = {
            day: this.page.locator('#days'),
            month: this.page.locator('#months'),
            year: this.page.locator('#years')
        };
        this.newsletterCheckbox = this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
        this.specialOfferCheckbox = this.page.getByRole('checkbox', { name: 'Receive special offers from our partners!' });
        this.firstNameField = this.page.getByRole('textbox',{name: 'First Name'});
        this.lastNameField = this.page.getByRole('textbox',{name: 'Last Name'});
        this.companyField = this.page.getByRole('textbox', { name: 'Company', exact: true });
        this.firstAddressLine = this.page.locator('#address1');
        this.secondAddressLine = this.page.locator('#address2');
        this.countryField = this.page.locator('#country');
        this.stateField = this.page.getByRole('textbox', {name: 'State'});
        this.cityField = this.page.getByRole('textbox',{name: 'City'});
        this.zipCodeField = this.page.locator('#zipcode');
        this.mobileNumberField = this.page.getByRole('textbox', {name: 'Mobile Number'});
        this.createAccountBtn = this.page.getByRole('button', { name: 'Create Account' });
    }

    async isInfoPageVisible(): Promise<boolean>{
        return await this.infoPageHeader.isVisible();
    }
    async fillAccountInfo(): Promise<void>{
        await this.titleRadioBtn.Mr.click();
        await this.nameField.fill(faker.person.fullName());
        //await this.emailField.fill(faker.internet.email());
        await this.passwordField.fill(faker.internet.password());
        await this.dobField.day.selectOption('23');
        await this.dobField.month.selectOption('August');
        await this.dobField.year.selectOption('1995');
        await this.newsletterCheckbox.check();
        await this.specialOfferCheckbox.check();    
    }
    async fillAddressInfo(): Promise<void>{
        await this.firstNameField.fill(faker.person.firstName());
        await this.lastNameField.fill(faker.person.lastName()); 
        await this.companyField.fill(faker.company.name());
        await this.firstAddressLine.fill(faker.location.streetAddress());
        await this.secondAddressLine.fill(faker.location.state());
        await this.countryField.selectOption(['Canada']);
        await this.stateField.fill(faker.location.state());
        await this.cityField.fill(faker.location.city());
        await this.zipCodeField.fill(faker.location.zipCode());
        await this.mobileNumberField.fill(faker.phone.number());
    }
    async submitSignupForm(): Promise<void> {
        await this.createAccountBtn.click();
    }
}