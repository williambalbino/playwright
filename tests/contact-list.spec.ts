import { test, expect, APIResponse } from '@playwright/test'
import * as user from '../playwright/.auth/user.json'
import { Contact } from '../dto/contact'

const contactUser = {
    firstName: 'John',
    lastName: 'das Neves'
};

test.afterEach(async ({ request }) => {

    const response = await request.get('/contacts', {
        headers: {
            // Add GitHub personal access token.
            'Authorization': `Bearer ${user.cookies.at(0)?.value}`,
        }
    })

    const contactList: Contact[] = await response.json()
    const userId = contactList.at(-1)?._id;

    const deleteResponse = await request.delete(`/contacts/${userId}`, {
        headers: {
            // Add GitHub personal access token.
            'Authorization': `Bearer ${user.cookies.at(0)?.value}`,
        }
    })

    expect(deleteResponse.status()).toBe(200)

})

test('deve adicionar um novo contato', async ({ page }) => {

    await page.goto('https://thinking-tester-contact-list.herokuapp.com/contactList')

    await page.click('#add-contact')

    const firstName = page.getByPlaceholder('First Name')
    await firstName.fill(contactUser.firstName)

    const lastName = page.getByPlaceholder('Last Name')
    await lastName.fill(contactUser.lastName)

    await page.click('#submit')
    await expect(page.locator(`css=.contactTableBodyRow >> text=${contactUser.firstName} ${contactUser.lastName}`)).toBeVisible()



})