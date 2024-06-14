import { Locator, Page } from "@playwright/test"
import { Login } from "../../../fixtures/login/login"

export class LoginPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async go() {
        await this.page.goto('/')
    }

    async fillEmail(email: string) {
        await this.page.locator('#email').fill(email)
    }
    
    async fillPassword(password: string) {
        await this.page.locator('#password').fill(password)
    }

    async login(login: Login){
        await this.fillEmail(login.email)
        await this.fillPassword(login.password)
        await this.page.click('#submit')
    }

    getErrorMessage() {
        return this.page.locator('#error')
        
    }





}