import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/homepage.page';
import { SignupAndLoginPage } from '../pages/signupAndLogin.page';
test('Login User with incorrect email and password', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await expect(homePage.page).toHaveTitle('Automation Exercise');
    const navigationPanal = await homePage.getNavPanel();
    const signupOrLogin = await navigationPanal.getNavElement(' Signup / Login');
    await signupOrLogin.click();
    const signupAndLoginPage = new SignupAndLoginPage(page);
    const loginTextContent = await signupAndLoginPage.getLoginText();
    await expect(loginTextContent).toHaveText('Login to your account');
    await signupAndLoginPage.fillLoginInfo('invalid@inv.com', 'invalid');
    await signupAndLoginPage.clickOnLogin();
    const loginError = await signupAndLoginPage.getLoginError();
    await expect(loginError).toBeVisible();
});