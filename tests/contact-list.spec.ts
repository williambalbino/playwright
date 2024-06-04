import { test, expect } from '@playwright/test'
import { deleteContactById, getAllContacts } from './support/helper'
import { ContactsPage } from './support/pages/contacts'
import userData from './fixtures/contacts.json'
import errorMessage from './fixtures/error-messages.json'

test.afterAll(async ({ request }) => {
    const userId = await getAllContacts(request)

    if (userId) {
        const statusCode = await deleteContactById(request, userId)
        expect(statusCode).toBe(200)
    }
})

test('deve adicionar um novo contato', async ({ page }) => {
    const contactsPage: ContactsPage = new ContactsPage(page)

    await contactsPage.go()
    await contactsPage.addContact(userData.success)

    await expect(contactsPage.getNewContact(userData.success)).toBeVisible()
})

test('deve validar nome e sobrenome obrigatorio', async ({ page }) => {
    const contactsPage: ContactsPage = new ContactsPage(page)

    await contactsPage.go()
    await contactsPage.addContact(userData.required)

    await expect(contactsPage.getErrorMessage()).toContainText(errorMessage.fullName)
})