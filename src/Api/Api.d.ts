import { AuthToken } from "../Auth/Auth.js";
export declare class AnsibleApi {
    url: URL;
    token: string;
    constructor(url: string, auth: AuthToken);
    fetchAPI(endpoint: string, paramRequest?: RequestInit | undefined | "POST"): Promise<Response>;
    fetchData(response: Response): Promise<any>;
    private static verifyStatusCode;
}
