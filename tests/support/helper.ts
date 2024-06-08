import { APIRequestContext, APIResponse } from '@playwright/test'
import * as user from '../../playwright/.auth/user.json'
import { Contact } from '../fixtures/contact'
import userData from '../fixtures/contacts.json'

const authFile = 'playwright/.auth/user.json'

export async function getAllContactIds(request: APIRequestContext) {
    const response = await request.get('/contacts', {
        headers: {
            'Authorization': `Bearer ${user.cookies.at(0)?.value}`,
        }
    })

    const contactList: Contact[] = await response.json()
    const ids = contactList.map(contact => {
        return contact._id!;
    })

    return ids
}

export async function deleteContacts(request: APIRequestContext, userIds: string[]) {
    const promises: Promise<APIResponse>[] = [];

    userIds.forEach(userId => {
        promises.push(
            request.delete(`/contacts/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${user.cookies.at(0)?.value}`,
                }
            })
        )
    })
    await Promise.all(promises)
}

export async function postContact(request: APIRequestContext) {
    const response = await request.post('/contacts', {
        headers: {
            'Authorization': `Bearer ${user.cookies.at(0)?.value}`,
        },
        data: {
            firstName: `${userData.update.firstName}`,
            lastName: `${userData.update.lastName}`,
        }
    })

    return response.status()
}

export async function login(request: APIRequestContext, email: string, password: string) {
    await request.post('/users/login', {
        data: {
            "email": email,
            "password": password
        }
    })
    await request.storageState({ path: authFile })
}