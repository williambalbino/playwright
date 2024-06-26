import { Page, expect, Locator } from "@playwright/test"
import { Contact } from '../../dto/contact'

export class ContactsPage {

    readonly page: Page
    readonly submitButton: Locator
    readonly addContactButton: Locator
    readonly editContactButton: Locator
    readonly deleteContactButton: Locator
    readonly returnButton: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly newContact: Locator
    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.submitButton = page.locator('#submit')
        this.addContactButton = page.locator('#add-contact')
        this.editContactButton = page.locator('#edit-contact')
        this.deleteContactButton = page.locator('#delete')
        this.returnButton = page.locator('#return')
        this.firstNameInput = page.locator('#firstName')
        this.lastNameInput = page.locator('#lastName')
        this.lastNameInput = page.locator('#lastName')
        this.errorMessage = page.locator('#error')
    }

    async go() {
        await this.page.goto('/contactList')
    }

    async addContact(contact: Contact) {
        await this.addContactButton.click()

        await this.fillFirstName(contact.firstName)
        await this.fillLastName(contact.lastName)

        await this.submitButton.click()
    }

    getNewContact(contact: Contact) {
        return this.page.locator(`css=.contactTableBodyRow >> text=${contact.firstName} ${contact.lastName}`)
    }

    getErrorMessage() {
        return this.errorMessage
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName)
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName)
    }

    async editContact(firstName: string, lastName: string) {
        await this.editContactButton.click()

        await this.page.waitForTimeout(2000)

        await this.fillFirstName(firstName)
        await this.fillLastName(lastName)

        await this.submitButton.click()
        await this.returnButton.click()
    }

    async removeContact(contact: Contact) {
        this.getNewContact(contact)
        await this.deleteContactButton.click()
    }

    async acceptDeleteDialog() {
        this.page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('confirm')
            expect(dialog.message()).toContain('Are you sure you want to delete this contact?')
            await dialog.accept()
        })
    }
}



