import { test, expect } from '@playwright/test';
import { SignupAndLoginPage } from '../pages/signupAndLogin.page';
import { SignupInfoPage } from '../pages/signupInfo.page';
import { AccountCreateAndDeletePage } from '../pages/accountCreateAndDelete.page';
import { HomePage } from '../pages/homepage.page';

test('Registering User', async ({page}) => {
  const signupAndLoginPage = new SignupAndLoginPage(page);
  const signupInfo = new SignupInfoPage(page);
  const accountOperationLandingPage = new AccountCreateAndDeletePage(page);
  const homePage = new HomePage(page);
  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await signupAndLoginPage.navigateToSignupPage();
  const signupText = await signupAndLoginPage.getSignupText();
  await expect(signupText).toHaveText('New User Signup!');
  await signupAndLoginPage.fillSignupInfo();
  await signupAndLoginPage.clickOnSignup();
  await signupInfo.fillAccountInfo();
  await signupInfo.fillAddressInfo();
  await signupInfo.submitSignupForm();
  const accountCreationSuccessText = await accountOperationLandingPage.getAccountCreatedText();
  await expect(accountCreationSuccessText).toHaveText('Account Created!');
  await accountOperationLandingPage.clickContinueLink();
  await expect(homePage.page.getByText("Logged in as")).toBeVisible();
  await homePage.clickOnDeleteAccount();
  const accountDeleteText = await accountOperationLandingPage.getAccountDeleteText();
  await expect(accountDeleteText).toHaveText('Account Deleted!');

})