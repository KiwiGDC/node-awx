export type Inventory = {
    id: bigint
    type: "inventory" | string
    url: string
    related: Array<{
        created_by: string
        modified_by: string
        hosts: string
        script: string
    }>
    "created": string,
    "modified": string,
    "name": string,
    "description": string,
    "organization": number,
    "kind": "" | "smart" | "constructed"
    "variables": any,
    "has_active_failures": boolean,
    "total_hosts": number,
    "hosts_with_active_failures": number,
    "total_groups": number,
    "has_inventory_sources": boolean,
    "total_inventory_sources": number,
    "inventory_sources_with_failures": number,
    "pending_deletion": boolean,
    "prevent_instance_group_fallback": boolean
}

export type ListInventories = {
    count: bigint
    next: string
    previous: string
    results: Array<Inventory>
}