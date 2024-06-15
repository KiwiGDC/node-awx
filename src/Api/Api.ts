import { AuthToken } from "../Auth/Auth.js";
import {FetchApiError} from "./Error/FetchApiError.js";
import {params} from "./utils.js";

export class AnsibleApi
{
    url: URL;
    token: string;

    constructor(url: string, auth: AuthToken)
    {
        this.token = auth.token;
        this.url = new URL(url);
    }

    public async fetchAPI(endpoint: string, paramRequest: RequestInit|undefined|"POST" = undefined) {
        if(!paramRequest) paramRequest = params(this.token)
        else if(paramRequest == "POST") paramRequest = params(this.token, "POST")
        return await fetch(new URL(endpoint, this.url), paramRequest);
    }

    public async fetchData(response: Response)
    {
        await AnsibleApi.verifyStatusCode(response)
        return await response.json();
    }

    private static async verifyStatusCode(response: Response)
    {

        const statusCode = response.status.toString();
        if(statusCode.startsWith('404')) throw new FetchApiError(`Resources not found : ${(await response.json())?.detail}`)
        if(statusCode.startsWith('401')) throw new FetchApiError(`Unauthorized (token is set?) : ${(await response.json())?.detail}`)
        if(statusCode.startsWith('403')) throw new FetchApiError(`Forbidden, verify the token permission! ${(await response.json())?.detail}`)
        if(statusCode.startsWith('5')) throw new FetchApiError(`Unknown error : ${(await response.json())?.detail}`)

    }

}