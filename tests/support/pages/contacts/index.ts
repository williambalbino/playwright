import { Page, expect } from "@playwright/test"
import { Contact } from "../../../fixtures/contact"

export class ContactsPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async go() {
        await this.page.goto('/contactList')
    }

    async addContact(contact: Contact) {
        await this.page.click('#add-contact')

        const firstName = this.page.getByPlaceholder('First Name')
        await firstName.fill(contact.firstName)

        const lastName = this.page.getByPlaceholder('Last Name')
        await lastName.fill(contact.lastName)

        await this.page.click('#submit')
    }

    getNewContact(contact: Contact) {
        return this.page.locator(`css=.contactTableBodyRow >> text=${contact.firstName} ${contact.lastName}`)
    }

    getErrorMessage() {
        return this.page.locator('css=#error')
    }

}



