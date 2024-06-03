import { APIRequestContext } from '@playwright/test'
import * as user from '../../playwright/.auth/user.json'
import { Contact } from '../fixtures/contact'

export async function getAllContacts(request: APIRequestContext) {
    const response = await request.get('/contacts', {
        headers: {
            'Authorization': `Bearer ${user.cookies.at(0)?.value}`,
        }
    })

    const contactList: Contact[] = await response.json()
    return contactList.at(-1)?._id;
}

export async function deleteContactById(request: APIRequestContext, userId: String) {
    const deleteResponse = await request.delete(`/contacts/${userId}`, {
        headers: {
            'Authorization': `Bearer ${user.cookies.at(0)?.value}`,
        }
    })

    return deleteResponse.status()
}