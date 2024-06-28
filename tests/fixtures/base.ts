import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { ContactsPage } from '../pages/contacts-page'

type Myfixtures = {
    loginPage: LoginPage
    contactsPage: ContactsPage
}

export const test = base.extend<Myfixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    contactsPage: async ({ page }, use) => {
        await use(new ContactsPage(page))
    }
})

export { expect } from '@playwright/test'

