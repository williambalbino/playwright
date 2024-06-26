import { test, expect } from '@playwright/test';
import { LoginPage } from '../support/pages/login/login-page';
import loginData from '../fixtures/login/login.json';
import hooks from '../support/hooks';
import pages from '../support/pages';

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
    loginPage = await hooks.beforeEach(page, LoginPage, pages.loginPage)
})

test('deve fazer login', async ({ page }) => {
    await loginPage.login(loginData.success)
    await expect(page).toHaveURL('/contactList')
})

test('deve validar login com credenciais incorretas', async ({ page }) => {
    await loginPage.login(loginData.invalidLogin)
    await expect(loginPage.getErrorMessage()).toHaveText('Incorrect username or password')
})

