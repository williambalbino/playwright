import { test as setup } from '@playwright/test'
import { login } from '../../utils/helper'

const authFile = 'playwright/.auth/user.json'
const authFileAdmin = 'playwright/.auth/user-admin.json'

setup('authenticate', async ({ request }) => {
    await login(request, process.env.USER_EMAIL!, process.env.PASSWORD!, authFile)
})

setup('authenticate admin', async ({ request }) => {
    await login(request, process.env.ADMIN_EMAIL!, process.env.PASSWORD!, authFileAdmin)
})

