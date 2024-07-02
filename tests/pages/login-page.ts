import { Locator, Page } from "@playwright/test"
import { Login } from '../../dto/login'
require('dotenv').config();

export class LoginPage {
    readonly page: Page
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.emailField = page.locator('#email')
        this.passwordField = page.locator('#password')
        this.submitButton = page.locator('#submit')
        this.errorMessage = page.locator('#error')
    }

    async go() {
        await this.page.goto('/')
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email)
    }
    
    async fillPassword(password: string) {
        await this.passwordField.fill(password)
    }

    async login(login: Login){
        await this.fillEmail(login.email)
        await this.fillPassword(login.password)
        await this.submitButton.click()
    }

    getErrorMessage() {
        return this.errorMessage        
    }





}