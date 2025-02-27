import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/homepage.page';
import { SignupAndLoginPage } from '../pages/signupAndLogin.page';

test('Register User with existing email',async({page})=>{
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await expect(homePage.page).toHaveTitle('Automation Exercise');
    const navigationPanel = await homePage.getNavPanel();
    const signupOrLogin = await navigationPanel.getNavElement(' Signup / Login');
    await signupOrLogin.click();
    const signupAndLoginPage = new SignupAndLoginPage(page);
    const signupTextContent = await signupAndLoginPage.getSignupText();
    await expect(signupTextContent).toHaveText('New User Signup!');
    await signupAndLoginPage.fillSignupInfo('atif1234', 'atif1234@gmail.com');
    await signupAndLoginPage.clickOnSignup();
    const signupErrorText = await signupAndLoginPage.getSignupError();
    await expect(signupErrorText).toContainText('Email Address already exist!');

    

})