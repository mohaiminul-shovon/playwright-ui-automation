import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage.page';
import { SignupAndLoginPage } from '../pages/signupAndLogin.page';
import { AccountCreateAndDeletePage } from '../pages/accountCreateAndDelete.page';
test('Login User with correct email and password', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await expect(page).toHaveTitle('Automation Exercise');
    const navigationPanal = await homePage.getNavPanel();
    const signupOrLogin = await navigationPanal.getNavElement(' Signup / Login');
    await signupOrLogin.click();
    const signupAndLoginPage = new SignupAndLoginPage(page);
    const loginTextContent = await signupAndLoginPage.getLoginText();
    await expect(loginTextContent).toHaveText('Login to your account');
    await signupAndLoginPage.fillLoginInfo(process.env.LOGIN_EMAIL as string, process.env.LOGIN_PASSWORD as string);
    await signupAndLoginPage.clickOnLogin();
    const loggedInUser = await homePage.getLoggedInUser();
    await expect(loggedInUser).toBeVisible();
    // await homePage.clickOnDeleteAccount();
    // const loginInfoPage = new AccountCreateAndDeletePage(page)
    // const accountDeleteText = await loginInfoPage.getAccountDeleteText();
    // await expect(accountDeleteText).toHaveText('Account Deleted!');
});