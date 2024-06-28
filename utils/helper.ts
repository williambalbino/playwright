import { APIRequestContext, APIResponse, expect } from '@playwright/test'
import { Contact } from '../dto/contact'
import { LoginResponse } from '../dto/login-response'

export async function getAllContactIds(request: APIRequestContext, userData: LoginResponse) {
    const response = await request.get('/contacts', {
        headers: {
            'Authorization': `Bearer ${userData.cookies.at(0)?.value}`,
        }
    })

    const contactList: Contact[] = await response.json()
    const ids = contactList.map(contact => {
        return contact._id!;
    })

    return ids
}

export async function deleteContacts(request: APIRequestContext, contactIds: string[], userData: LoginResponse) {
    const promises: Promise<APIResponse>[] = [];

    contactIds.forEach(userId => {
        promises.push(
            request.delete(`/contacts/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${userData.cookies.at(0)?.value}`,
                }
            })
        )
    })
    await Promise.all(promises)
}

export async function postContact(request: APIRequestContext, contactData: Contact, userData: LoginResponse) {
    
    const response = await request.post('/contacts', {
        headers: {
            'Authorization': `Bearer ${userData.cookies.at(0)?.value}`,
        },
        data: {
            firstName: `${contactData.firstName}`,
            lastName: `${contactData.lastName}`,
        }
    })
    expect(response.ok).toBeTruthy()
}

export async function login(request: APIRequestContext, email: string, password: string, authFile: string) {
    await request.post('/users/login', {
        data: {
            "email": email,
            "password": password
        }
    })
    await request.storageState({ path: authFile })
}

export async function clearContactsDB(request: APIRequestContext, userData: LoginResponse) {
    const userIds = await getAllContactIds(request, userData)

    if (userIds.length) {
        await deleteContacts(request, userIds, userData)
    }
}