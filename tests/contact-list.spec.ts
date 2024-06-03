import { test, expect } from '@playwright/test'
import { deleteContactById, getAllContacts } from './support/helper'

test.afterAll(async ({ request }) => {
    const userId = await getAllContacts(request)

    if (userId) {
        const statusCode = await deleteContactById(request, userId)
        expect(statusCode).toBe(200)
    }
})

test('deve adicionar um novo contato', async ({ page }) => {

    const contactUser = {
        firstName: 'John',
        lastName: 'das Neves'
    };

    await page.goto('https://thinking-tester-contact-list.herokuapp.com/contactList')

    await page.click('#add-contact')

    const firstName = page.getByPlaceholder('First Name')
    await firstName.fill(contactUser.firstName)

    const lastName = page.getByPlaceholder('Last Name')
    await lastName.fill(contactUser.lastName)

    await page.click('#submit')
    await expect(page.locator(`css=.contactTableBodyRow >> text=${contactUser.firstName} ${contactUser.lastName}`)).toBeVisible()

})