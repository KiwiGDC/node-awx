export interface AuthToken {
    token: string;
}
export interface AuthBasic {
    login: string;
    password: string;
}
export declare function isAuthToken(object: any): object is AuthToken;
