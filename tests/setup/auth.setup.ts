import { test as setup } from '@playwright/test'
import { login } from '../../utils/helper'
import * as loginUser from '../data/login.json'

const authFile = 'playwright/.auth/user.json'
const authFileSecondUser = 'playwright/.auth/secondUser.json'

setup('authenticate', async ({ request }) => {
    await login(request, loginUser.success.email, loginUser.success.password, authFile)
})

setup('authenticate second user', async ({ request }) => {
    await login(request, loginUser.editLogin.email, loginUser.editLogin.password, authFileSecondUser)
})

