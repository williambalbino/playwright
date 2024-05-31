import { test as setup } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ request }) => {
    await request.post('https://thinking-tester-contact-list.herokuapp.com/users/login', {
        data: {
            "email": "email@teste.com",
            "password": "12341234"
        }
    })

    await request.storageState({ path: authFile })
})

