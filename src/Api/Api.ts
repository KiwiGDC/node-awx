import { AuthToken } from "../Auth/Auth.js";
import {FetchApiError} from "./Error/FetchApiError.js";
import {params} from "./utils.js";
import {InstanceApiError} from "./Error/InstanceApiError.js";

export class AnsibleApi
{
    url: URL;
    token: string;

    private static INSTANCE: AnsibleApi|null;

    static TEST : string = "ping/"

    private async testServer()
    {
        const errorMessage = "ANSIBLE SERVER NOT REACHABLE (verify url and status of server) (put url with protocol and 'api/v2/' at the end)"
        try 
        {
        const {status} = (await this.fetchAPI(AnsibleApi.TEST))
        if(status != 200)
            throw new Error(errorMessage);
        }
        catch 
        {
            throw new Error(errorMessage);
        }
        
        
    }

    constructor(url: string, auth: AuthToken)
    {
        this.token = auth.token;
        this.url = new URL(url);
        AnsibleApi.INSTANCE = this;
        this.testServer();

    }

    public static GETINSTANCE() : AnsibleApi
    {
        if(this.INSTANCE === null) throw new InstanceApiError();
        return this.INSTANCE
    }

    public async fetchAPI(endpoint: string, paramRequest: RequestInit|undefined|"POST" = undefined) {
        const urlEndPoint = new URL(endpoint, this.url)
        if(!paramRequest) paramRequest = params(this.token)
        else if(paramRequest == "POST") paramRequest = params(this.token, "POST")
        return await fetch(urlEndPoint, paramRequest);
    }

    public async fetchData(response: Response)
    {
        await AnsibleApi.verifyStatusCode(response)
        return await response.json();
    }

    private static async verifyStatusCode(response: Response)
    {

        const statusCode = response.status.toString();
        if(statusCode.startsWith('404')) throw new FetchApiError(`Resources not found : ${response.status}`)
        if(statusCode.startsWith('401')) throw new FetchApiError(`Unauthorized (token is set?) : ${(await response.json())?.detail}`)
        if(statusCode.startsWith('403')) throw new FetchApiError(`Forbidden, verify the token permission! ${(await response.json())?.detail}`)
        if(statusCode.startsWith('5')) throw new FetchApiError(`Unknown error : ${response.status}`)

    }

}