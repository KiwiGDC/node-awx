import { AuthToken } from "../Auth/Auth.js";
import {FetchApiError} from "./Error/FetchApiError.js";
import {Inventory} from "./Inventory/Inventory.js";

export class AnsibleApi
{
    url: URL;
    token: string;

    inventory: Inventory;

    constructor(url: string, auth: AuthToken)
    {
        this.token = auth.token;
        this.url = new URL(url);
        this.inventory = new Inventory(this)
    }

    public async fetchAPI(endpoint: string, params: RequestInit) {
        return await fetch(new URL(endpoint, this.url), params);
    }

    public async fetchData(response: Response)
    {
        AnsibleApi.verifyStatusCode(response)
        return await response.json();
    }

    private static verifyStatusCode(response: Response)
    {
        const statusCode = response.status.toString();
        if(statusCode.startsWith('404')) throw new FetchApiError(`Resources not found : ${response.statusText}`)
        if(statusCode.startsWith('401')) throw new FetchApiError(`Unauthorized (token is set?) : ${response.statusText}`)
        if(statusCode.startsWith('403')) throw new FetchApiError(`Forbidden, verify the token permission! ${response.statusText}`)
        if(statusCode.startsWith('5')) throw new FetchApiError(`Unknown error : ${response.statusText}`)

    }

}