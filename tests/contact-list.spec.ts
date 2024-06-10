import { test, expect } from '@playwright/test'
import { postContact, clearContactsDB } from './support/helper'
import { ContactsPage } from './support/pages/contacts'
import contactData from './fixtures/contacts.json'
import errorMessage from './fixtures/error-messages.json'
import userDataEdit from '../playwright/.auth/secondUser.json'
import userData from '../playwright/.auth/user.json'

let contactsPage: ContactsPage

test.beforeEach(({ page }) => {
    contactsPage = new ContactsPage(page)
})

test.afterAll(async ({ request }) => {
    await clearContactsDB(request, userData)
})

test('deve adicionar um novo contato', async () => {
    await contactsPage.go()
    await contactsPage.addContact(contactData.success)

    await expect(contactsPage.getNewContact(contactData.success)).toBeVisible()
})

test('deve validar nome e sobrenome obrigatorio', async () => {
    await contactsPage.go()
    await contactsPage.addContact(contactData.fullNameRequired)

    await expect(contactsPage.getErrorMessage()).toHaveText(errorMessage.fullName)
})

test.describe(() => {
    test.use({ storageState: 'playwright/.auth/secondUser.json' });

    test('deve editar um contato', async ({ request }) => {
        await postContact(request, userDataEdit)

        await contactsPage.go()
        await contactsPage.getNewContact(contactData.update).click()
        await contactsPage.editContact(contactData.updateDone.firstName, contactData.updateDone.lastName)

        await expect(contactsPage.getNewContact(contactData.updateDone)).toBeVisible()

        await clearContactsDB(request, userDataEdit)
    })
})