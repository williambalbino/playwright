import { test, expect } from '@playwright/test'
import { postContact, clearContactsDB } from '../support/helper'
import { ContactsPage } from '../support/pages/contacts/contacts-page'
import contactData from '../fixtures/contacts/contacts.json'
import errorMessage from '../fixtures/error-messages.json'
import userDataEdit from '../../playwright/.auth/secondUser.json'
import userData from '../../playwright/.auth/user.json'

let contactsPage: ContactsPage

test.beforeEach(async ({ page }) => {
    contactsPage = new ContactsPage(page)
    await contactsPage.go()
})

test.afterAll(async ({ request }) => {
    await clearContactsDB(request, userData)
})

test('deve adicionar um novo contato', async () => {
    await contactsPage.addContact(contactData.success)
    await expect(contactsPage.getNewContact(contactData.success)).toBeVisible()
})

test('deve validar nome e sobrenome obrigatorio', async () => {
    await contactsPage.addContact(contactData.fullNameRequired)
    await expect(contactsPage.getErrorMessage()).toHaveText(errorMessage.fullName)
})

test.describe(() => {
    test.use({ storageState: 'playwright/.auth/secondUser.json' });

    test('deve editar um contato', async ({ page, request }) => {
        // await postContact(request, contactData.update, userDataEdit)

        await contactsPage.addContact(contactData.update)
        await contactsPage.getNewContact(contactData.update).click()
        await contactsPage.editContact(contactData.updateDone.firstName, contactData.updateDone.lastName)

        await expect(contactsPage.getNewContact(contactData.updateDone)).toBeVisible()

        await clearContactsDB(request, userDataEdit)
    })
})

test('deve remover um contato', async ({ page, request }) => {
    //await postContact(request, contactData.deleteTest, userData)

     await contactsPage.addContact(contactData.deleteTest)
    await contactsPage.getNewContact(contactData.deleteTest).click()
    await contactsPage.removeContact(contactData.deleteTest)
    await contactsPage.acceptDeleteDialog()

    await page.click('#delete')

    await expect(contactsPage.getNewContact(contactData.deleteTest)).not.toBeVisible()
})