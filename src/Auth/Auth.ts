export interface AuthToken {
    token: string
}

export interface AuthBasic {
    login: string
    password: string
}

export function isAuthToken(object: any): object is AuthToken {
    return 'token' in object;
}