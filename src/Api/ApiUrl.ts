import { AnsibleApi } from "./Api.js";

export type ApiUrlType = {
    endpoint: string;
    url?: string;
    method?: AllowedMethod
    queryParams?: {[key: string]: string}
}

export type AllowedMethod = "POST"|"GET"|"PUT"|"DELETE"|"PATCH"

export type UrlReplaced<T extends {toString: () => string}> = {[key: string]: T}

export class ApiUrl {

    endpoint: string;
    method?: AllowedMethod;
    url?: URL;

    private constructor(endpoint: string, method: AllowedMethod = "GET") {
        this.endpoint = endpoint
        this.method = method
    }


    /**
     * Generate URL with endpoint, method and queryParams
     * @param url - URL Information, Params, Method
     * @param listPattern - List for replace pattern with value
     */
    static gURL<T extends {toString: () => string}>(url: ApiUrlType, listPattern: UrlReplaced<T> = {}) : ApiUrl {

        for(const pattern in listPattern){
            url.endpoint = url.endpoint.toString().replace(`{${pattern}}`, listPattern[pattern].toString())
        }
        const ApiURL = new ApiUrl(url.endpoint, url.method)
        ApiURL.url = new URL(url.endpoint, AnsibleApi.GETINSTANCE().url);
        for(const query in url.queryParams){
            ApiURL.url.searchParams.append(query, url.queryParams[query].toString())
        }
        return ApiURL;
    }

    public toString() : string
    {
        return this.url ? this.url.toString() : ""
    }


}
