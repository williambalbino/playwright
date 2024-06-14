import { Page, expect, Locator } from "@playwright/test"
import { Contact } from "../../../fixtures/contacts/contact"

let contact: Contact
export class ContactsPage {
    readonly page: Page
    readonly submitButton: Locator
    readonly addContactButton: Locator
    readonly editContactButton: Locator
    readonly deleteContactButton: Locator
    readonly returnButton: Locator
    readonly firstNameField: Locator
    readonly lastNameField: Locator
    readonly newContact: Locator
    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.submitButton = page.locator('#submit')
        this.addContactButton = page.locator('#add-contact')
        this.editContactButton = page.locator('#edit-contact')
        this.deleteContactButton = page.locator('#delete')
        this.returnButton = page.locator('#return')
        this.firstNameField = page.locator('#firstName')
        this.lastNameField = page.locator('#lastName')
        this.newContact = page.locator(`css=.contactTableBodyRow >> text=${contact.firstName} ${contact.lastName}`)
        this.lastNameField = page.locator('#lastName')
        this.errorMessage = page.locator('#error')

    }

    async go() {
        await this.page.goto('/contactList')
    }

    async click(locator: Locator){
        await locator.click()
    }

    async addContact(contact: Contact) {
        await this.click(this.addContactButton)

        await this.fillFirstName(contact.firstName)
        await this.fillLastName(contact.lastName)

        await this.page.click('#submit')
    }

    getNewContact(contact: Contact) {
        return this.page.locator(`css=.contactTableBodyRow >> text=${contact.firstName} ${contact.lastName}`)
    }

    getErrorMessage() {
        return this.page.locator('#error')
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
        this.getNewContact(contact)
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


