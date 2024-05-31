import { test, expect } from '@playwright/test';

test('app deve estar online', async ({ page }) => {
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/')
    await expect(page).toHaveTitle('Contact List App')
})

test('deve fazer login', async ({page})=>{
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/')

    const emailField = page.locator('#email')
    await emailField.fill('email@teste.com')

    const passWordField = page.locator('#password')
    await passWordField.fill('12341234')

    await page.click('css=button >> text=Submit') //outra forma de usar xpath no playwright

    await expect(page).toHaveURL('https://thinking-tester-contact-list.herokuapp.com/contactList')
})