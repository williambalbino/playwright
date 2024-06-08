import { test as setup } from '@playwright/test'
import { login } from './support/helper'
import * as loginUser from './fixtures/login.json'

setup('authenticate', async ({ request }) => {
    await login(request, loginUser.success.email, loginUser.success.password)
})

