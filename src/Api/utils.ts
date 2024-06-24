import { AllowedMethod } from "./ApiUrl";

export function params(token : string|undefined = undefined, method: AllowedMethod = "GET") : RequestInit 
{ 

    const paramAuthorization = token ? {Authorization: `Bearer ${token}`} : undefined
    return {
        method: method, 
        headers: {
            ...paramAuthorization,
            "Content-Type": "application/json"
        }
    }  
}

export function sleep(ms: number): Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}