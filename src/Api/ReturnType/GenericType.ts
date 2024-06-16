export type Pager<Result> = {
    "count": number,
    "next": string,
    "previous": string,
    "results": Array<Result>
}

export type Summary = {
    User: {
        "id": number,
        "username": string,
        "first_name": string,
        "last_name": string,
    }
    Organization: {
        "id": number,
        "name": string,
        "description": string
    }

    ExecutionEnvironment: {
        id: number,
        name: string
        description: string,
        image: string
    }

    JobTemplate: {
        id: number,
        name: string,
        description: string
    }

    Project : {
        id: number,
        name: string,
        description: string,
        status: StatusJob,
        scm_type: string,
        allow_override: boolean
    }

    Inventory: {
        "id": number,
        "name": string,
        "description": string,
        "has_active_failures": boolean,
        "total_hosts": number,
        "hosts_with_active_failures": number,
        "total_groups": number,
        "has_inventory_sources": boolean,
        "total_inventory_sources": number,
        "inventory_sources_with_failures": number,
        "organization_id": number,
        "kind": string
    }

    UserCapabilities: {
        "edit": boolean,
        "delete": boolean,
        "start": boolean,
        "schedule": boolean,
        "copy": boolean
    }

    Credential: {
        id: number,
        name: string,
        description: string,
        kind: string,
        cloud: boolean
    }

}




export type DateString = string


export type StatusJob = "new" | "pending" | "waiting" | "running" | "successful" | "failed" | "error" | "canceled" | "never updated"
export type JobType = "run" | "check" | "scan"

export type FinishedJob = {
    finished: boolean,
    status: StatusJob
}