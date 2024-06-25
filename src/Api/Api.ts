import { AuthToken } from "../Auth/Auth";
import {FetchApiError} from "./Error/FetchApiError";
import {params} from "./utils";
import {InstanceApiError} from "./Error/InstanceApiError";
import {ApiUrl, ApiUrlType} from "./ApiUrl";

export class AnsibleApi
{
    url: URL;
    token: string;

    private static INSTANCE: AnsibleApi|null;

    static TEST : ApiUrlType = {endpoint: "ping/"}

    public async testServer(): Promise<any>
    {

        const url = ApiUrl.gURL(AnsibleApi.TEST);
        const response: Response = (await this.fetchAPI(url))
        if(response.headers.get("Content-Type")?.startsWith("application/json"))
        {
            const jsonData = await response.json() as PingType
            const status = response.status
            if(status != 200) throw new InstanceApiError(`The server return a status different of 200 : ${status}, url: ${url}`);
            if(jsonData.instances.length < 1) throw new InstanceApiError(`The server have not active instance, url: ${url}`)
            return {status, jsonData}
        }
        throw new InstanceApiError(`The server is not reachable (verify URL, it must end with a '/'): ${url}`)


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
        if(this.INSTANCE === null) throw new InstanceApiError("API Instance not found, init the class AnsibleApi() before used");
        return this.INSTANCE
    }

    public async fetchAD(url: ApiUrl): Promise<any>
    {
        return this.fetchData(await this.fetchAPI(url));
    }

    public async fetchAPI(url: ApiUrl) {
        return await fetch(url.toString(), params(this.token, url.method));
    }

    public async fetchData(response: Response)
    {
        await AnsibleApi.verifyStatusCode(response)
        return await response.json();
    }

    private static async verifyStatusCode(response: Response)
    {

        const statusCode = response.status.toString();
        if(statusCode.startsWith('404')) throw new FetchApiError(`Resources not found : ${statusCode}`)
        if(statusCode.startsWith('401')) throw new FetchApiError(`Unauthorized (token is set?) : ${(await response.json())?.detail}`)
        if(statusCode.startsWith('403')) throw new FetchApiError(`Forbidden, verify the token permission! ${(await response.json())?.detail}`)
        if(statusCode.startsWith('5')) throw new FetchApiError(`Unknown error : ${response.status}`)

    }

}