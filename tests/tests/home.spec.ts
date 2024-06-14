import { test, expect } from '@playwright/test';
import { LoginPage } from '../support/pages/login';
import loginData from '../fixtures/login/login.json';

let loginPage: LoginPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
})

test('deve fazer login', async ({ page }) => {
    await loginPage.go()
    await loginPage.login(loginData.success)
    await expect(page).toHaveURL('/contactList')
})

test('deve validar login com credenciais incorretas', async ({ page }) => {
    await loginPage.go()
    await loginPage.login(loginData.invalidLogin)
    await expect(loginPage.getErrorMessage()).toHaveText('Incorrect username or password')
})

