import { AuthToken } from "../Auth/Auth.js";
import {FetchApiError} from "./Error/FetchApiError.js";
import {params} from "./utils.js";
import {InstanceApiError} from "./Error/InstanceApiError.js";
import {AllowedMethod, ApiUrl, ApiUrlType} from "./ApiUrl.js";

export class AnsibleApi
{
    url: URL;
    token: string;

    private static INSTANCE: AnsibleApi|null;

    static TEST : ApiUrlType = {endpoint: "ping/"}

    private async testServer()
    {
        const errorMessage = "ANSIBLE SERVER NOT REACHABLE (verify url and status of server) (put url with protocol and 'api/v2/' at the end)"
        const {status} = (await this.fetchAPI(ApiUrl.gURL(AnsibleApi.TEST)))
        if(status != 200) throw new Error(errorMessage);

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