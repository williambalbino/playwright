import { test, expect } from '@playwright/test'
import { deleteContactById, getAllContacts } from './support/helper'
import { ContactsPage } from './support/pages/contacts'
import { Contact } from './fixtures/contact'
import data from './fixtures/contacts.json'

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
    await contactsPage.addContact(data.success)
    await contactsPage.shouldHaveText(data.success)
    

})