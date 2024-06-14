import { AuthBasic, AuthToken, isAuthToken } from "./Auth.js";

export class Api 
{
    url: URL;
    token: string;

    constructor(url: string, auth: AuthToken|AuthBasic)
    {
        this.token = isAuthToken(auth) ? auth.token : "";
        this.url = new URL(url);
    }


    


    private async fetchAPI(endpoint: string, params: RequestInit) {
        return await fetch(new URL(endpoint, this.url), params);
    }

}