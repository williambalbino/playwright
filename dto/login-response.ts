export interface LoginResponse {
    cookies: Cookie[]
    origins: any[]
}

interface Cookie {
    name: string
    value: string
    domain: string
    path: string
    expires: number
    httpOnly: boolean
    secure: boolean
    sameSite: string
}