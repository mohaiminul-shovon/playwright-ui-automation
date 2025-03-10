import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/homepage.page';
import { ContactUsPage } from '../pages/contactUs.page'; 
import exp from 'constants';

test('Contact Us Form', async ({ page }) => {
    const homepage = await new HomePage(page);
    await homepage.navigateToHomePage();
    await expect(homepage.page).toHaveTitle('Automation Exercise');
    const nagivationPanel = await homepage.getNavPanel();
    const contactUsLink = await nagivationPanel.getNavElement('Contact Us');
    await contactUsLink.click();
    const contactUsPage = await new ContactUsPage(page);
    const formHeading = await contactUsPage.formHeading;
    await expect(formHeading).toHaveText('Get In Touch');
    page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept(); // or dialog.dismiss();
      });
    await contactUsPage.fillContactFormAndSubmit("shovon","shovon@gold.com","LOL LOL!", "Haghagafafa");
    //await contactUsPage.submitContactForm();
    const successMessage = await contactUsPage.getSuccessMessage();
    await expect(successMessage).toHaveText('Success! Your details have been submitted successfully.');
    
});