import { test as setup } from '@playwright/test'
import * as login from './fixtures/login.json'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ request }) => {
    await request.post('/users/login', {
        data: {
            "email": login.success.email,
            "password": login.success.password
        }
    })

    await request.storageState({ path: authFile })
})

