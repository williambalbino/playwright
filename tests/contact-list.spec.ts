import { test, expect } from '@playwright/test'
import { deleteContacts, getAllContactIds, login, postContact } from './support/helper'
import { ContactsPage } from './support/pages/contacts'
import userData from './fixtures/contacts.json'
import errorMessage from './fixtures/error-messages.json'
import { Contact } from "./fixtures/contact"
import * as loginUser from './fixtures/login.json'

let contactsPage: ContactsPage

test.beforeEach(({ page }) => {
    contactsPage = new ContactsPage(page)
})

test.afterAll(async ({ request }) => {
    const userIds = await getAllContactIds(request)

    if (userIds.length) {
        await deleteContacts(request, userIds)
    }
})

test('deve adicionar um novo contato', async () => {
    await contactsPage.go()
    await contactsPage.addContact(userData.success)

    await expect(contactsPage.getNewContact(userData.success)).toBeVisible()
})

test('deve validar nome e sobrenome obrigatorio', async () => {
    await contactsPage.go()
    await contactsPage.addContact(userData.fullNameRequired)

    await expect(contactsPage.getErrorMessage()).toHaveText(errorMessage.fullName)
})

test('deve editar um contato', async ({ request }) => {

    await login(request, loginUser.editLogin.email, loginUser.editLogin.password)
    await postContact(request)

    await contactsPage.go()
    await contactsPage.getNewContact(userData.update).click()
    await contactsPage.editContact(userData.updateDone.firstName, userData.updateDone.lastName)
    
    await expect(contactsPage.getNewContact(userData.updateDone)).toBeVisible() 
})