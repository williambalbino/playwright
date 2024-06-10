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

        await this.fillFirstName(contact.firstName)
        await this.fillLastName(contact.lastName)

        await this.page.click('#submit')
    }

    getNewContact(contact: Contact) {
        return this.page.locator(`css=.contactTableBodyRow >> text=${contact.firstName} ${contact.lastName}`)
    }

    getErrorMessage() {
        return this.page.locator('css=#error')
    }

    async fillFirstName(firstName: string) {
        await this.page.locator('#firstName').fill(firstName)
    }

    async fillLastName(lastName: string) {
        await this.page.locator('#lastName').fill(lastName)
    }

    async editContact(firstName: string, lastName: string) {
        await this.page.click('#edit-contact')

        await this.page.waitForTimeout(2000)

        await this.fillFirstName(firstName)
        await this.fillLastName(lastName)

        await this.page.click('#submit')
        await this.page.click('#return')
    }

    async removeContact(contact: Contact) {
        await this.getNewContact(contact)
        await this.page.click('#delete')
    }

    async acceptDeleteDialog() {
        this.page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('confirm')
            expect(dialog.message()).toContain('Are you sure you want to delete this contact?')
            await dialog.accept()
        })
    }
}



