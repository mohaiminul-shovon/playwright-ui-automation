import { test, expect } from '@playwright/test';
import { SignupAndLoginPage } from '../pages/signupAndLogin.page';

test("Register User", async({page}) => {
  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  await page.getByRole('textbox',{name: 'Name'}).fill('shovon1995');
  await page.locator('form').filter({hasText: 'Signup'}).getByRole('textbox',{name: 'Email'}).fill('shovon1995@gmail.com');
  await page.getByRole('button', {name: 'Signup'}).click();
  await expect(page.getByText('Enter Account Information')).toBeVisible();
  await page.getByRole('radio', { name: 'Mr.' }).click();
  await page.getByRole('textbox',{name: 'Password'}).fill('atif123');
  const daysLocator = await page.locator('#days');
  await daysLocator.selectOption(['23']);
  const monthLocator = await page.locator('#months');
  await monthLocator.selectOption(['August']);
  const yearLocator = await page.locator('#years');
  await yearLocator.selectOption(['1995']);
  await page.getByRole('checkbox',{name: 'Sign up for our newsletter!'}).check();
  await page.getByRole('checkbox',{name: 'Receive special offers from our partners!'}).check();
  await page.getByRole('textbox',{name: 'First Name'}).fill('Atif');
  await page.getByRole('textbox',{name: 'Last Name'}).fill('Aslam');
  await page.getByRole('textbox',{name: 'Company', exact: true}).fill('ABC Company');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Dhaka');
  await page.getByRole('textbox', { name: 'Address 2' }).fill('Bangladesh');
  const countryLocator = await page.locator('#country');
  await countryLocator.selectOption(['Canada']);
  await page.getByRole('textbox',{name: 'state'}).fill('Montreal');
  await page.getByRole('textbox',{name: 'city'}).fill('Montreal');
  await page.locator('#zipcode').fill('1234');
  await page.getByRole('textbox', {name: 'Mobile Number'}).fill('01712345678');
  await page.getByRole('button',{name: 'Create Account'}).click();
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link',{name: 'Continue'}).click();
  await expect(page.getByText('Logged in as shovon1995')).toBeVisible();
  await page.getByRole('link', {name: 'Delete Account'}).click();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
})
test('Registering User', async ({page}) => {
  const signupAndLoginPage = new SignupAndLoginPage(page);
  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await signupAndLoginPage.navigateToSignupPage();
  const signupText = await signupAndLoginPage.getSignupText();
  await expect(signupText).toHaveText('New User Signup!');
  
  
})