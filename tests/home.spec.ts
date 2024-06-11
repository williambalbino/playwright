import { test, expect } from '@playwright/test';
import { LoginPage } from './support/pages/login';
import loginData from './fixtures/login.json'

let loginPage: LoginPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
})

test('deve fazer login', async ({ page }) => {
    await loginPage.go()
    await loginPage.successLogin(loginData.success)
    await expect(page).toHaveURL('/contactList')
})