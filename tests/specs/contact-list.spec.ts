import { test, expect } from '../fixtures/base'
import { postContact, clearContactsDB } from '../../utils/helper'
import contactData from '../data/contacts.json'
import errorMessage from '../data/error-messages.json'
import userDataEdit from '../../playwright/.auth/user-admin.json'
import userData from '../../playwright/.auth/user.json'

test.beforeEach(async ({ contactsPage }) => {
    await contactsPage.go()
})

test.afterAll(async ({ request }) => {
    await clearContactsDB(request, userData)
})

test('deve adicionar um novo contato', async ({ contactsPage }) => {
    await contactsPage.addContact(contactData.success)
    await expect(contactsPage.getNewContact(contactData.success)).toBeVisible()
})

test('deve validar nome e sobrenome obrigatorio', async ({ contactsPage }) => {
    await contactsPage.addContact(contactData.fullNameRequired)
    await expect(contactsPage.getErrorMessage()).toHaveText(errorMessage.fullName)
})

test.describe(() => {
    test.use({ storageState: 'playwright/.auth/user-admin.json' });

    test('deve editar um contato', async ({ contactsPage, request }) => {
        // await postContact(request, contactData.update, userDataEdit)

        await contactsPage.addContact(contactData.update)
        await contactsPage.getNewContact(contactData.update).click()
        await contactsPage.editContact(contactData.updateDone.firstName, contactData.updateDone.lastName)

        await expect(contactsPage.getNewContact(contactData.updateDone)).toBeVisible()

        await clearContactsDB(request, userDataEdit)
    })
})

test('deve remover um contato', async ({ contactsPage, page, request }) => {
    // await postContact(request, contactData.deleteTest, userData)

    await contactsPage.addContact(contactData.deleteTest)
    await contactsPage.getNewContact(contactData.deleteTest).click()
    await contactsPage.removeContact(contactData.deleteTest)
    await contactsPage.acceptDeleteDialog()

    await page.click('#delete')

    await expect(contactsPage.getNewContact(contactData.deleteTest)).not.toBeVisible()
})

test.describe('mockando API requests', () => {
    test('post contact', async ({ page, contactsPage }) => {

        await page.route('/contacts', async route => {
            const json = [{
                "firstName": contactData.mockTest.firstName,
                "lastName": contactData.mockTest.lastName
            }];
            await route.fulfill({ json });
        });

        await contactsPage.go()
        await expect(page.getByText('Joao')).toBeVisible()
    });
});