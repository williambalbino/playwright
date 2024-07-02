import { test, expect } from '../fixtures/base';
import loginData from '../data/login.json';
import errorMessage from '../data/error-messages.json';

require('dotenv').config();

test.beforeEach(async ({ loginPage }) => {
    await loginPage.go()
})

test('deve fazer login', async ({ page, loginPage }) => {
    await loginPage.login(loginData.success)
    await expect(page).toHaveURL('/contactList')
})

test('deve validar login com credenciais incorretas', async ({ loginPage }) => {
    await loginPage.login(loginData.invalidLogin)
    await expect(loginPage.getErrorMessage()).toHaveText(errorMessage.invalidLogin)
})

