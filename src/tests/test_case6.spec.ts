import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/homepage.page'; 

test('Contact Us Form', async ({ page }) => {
    const homepage = await new HomePage(page);
    await homepage.navigateToHomePage();
    await expect(homepage.page).toHaveTitle('Automation Exercise');
    const nagivationPanel = await homepage.getNavPanel();
    const contactUsLink = await nagivationPanel.getNavElement('Contact Us');
    await contactUsLink.click();
});