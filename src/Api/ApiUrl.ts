import { AnsibleApi } from "./Api.js";

export type ApiUrl = {
    endpoint: string;
    url?: string;
    method: AllowedMethod
}

export type AllowedMethod = "POST"|"GET"|"PUT"|"DELETE"|"PATCH"

export type UrlReplaced<T extends {toString: () => string}> = Array<{
   [key: string]: T
}>



export function urlGen<T extends {toString: () => string}>(url: ApiUrl, listPattern: UrlReplaced<T>, queryParams: Array<{[key: string]: string}>) : URL {
    for(const pattern in listPattern){
        url.endpoint = url.endpoint.toString().replace(pattern, listPattern[pattern]())
    }

    const finalURL : URL = new URL(url.endpoint, AnsibleApi.GETINSTANCE().url);


    for(const query in queryParams){
        finalURL.searchParams.append(query, queryParams[query].toString())
    }
    return finalURL;
}