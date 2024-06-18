import {
    DateString,
    JobType,
    StatusJob, Summary,
} from "../../ReturnType/GenericType";

export type JobTemplateLisType = {
    nextPage: number,
    previousPage: number,
    results: Array<JobTemplate>
}

export type JobTemplate = {
    "id": number,
    "type": "job_template",
    "url": string,
    "related": {
        "named_url": string,
        "created_by": string,
        "modified_by": string,
        "labels": string,
        "inventory": string,
        "project": string,
        "organization": string,
        "credentials": string,
        "last_job": string,
        "jobs": string,
        "schedules": string,
        "activity_stream": string,
        "launch": string,
        "webhook_key": string,
        "webhook_receiver": "",
        "notification_templates_started": string,
        "notification_templates_success": string,
        "notification_templates_error": string,
        "access_list": string,
        "survey_spec": string,
        "object_roles": string,
        "instance_groups": string,
        "slice_workflow_jobs": string,
        "copy": string
    },
    summary_fields: {
        organization: Summary["Credential"]
        inventory: {
            id: number,
            name: string,
            description: string,
            has_active_failures: boolean
            total_hosts: number,
            hosts_with_active_failures: number,
            total_groups: number,
            has_inventory_sources: boolean,
            total_inventory_sources: number,
            inventory_sources_with_failures: number,
            organization_id: number,
            kind: string
        }
        last_job: {
            id: number,
            name: string,
            description: string,
            finished: DateString
            status: StatusJob
            failed: boolean

        }
        last_update: {
            id: number,
            name: string,
            description: string,
            status: StatusJob,
            failed: boolean
        },
        created_by: Summary["User"]
        modified_by: Summary["User"]
        user_capabilities: Summary["UserCapabilities"]
        credentials: Array<Credential>
    }
    created: DateString,
    "modified": DateString,
    "name": string,
    "description": string,
    "job_type": JobType,
    "inventory": number,
    "project": number,
    "playbook": string,
    "scm_branch": string,
    "forks": number,
    "limit": string,
    "verbosity": number,
    "extra_vars": string,
    "job_tags": string,
    "force_handlers": boolean,
    "skip_tags": string,
    "start_at_task": string,
    "timeout": number,
    "use_fact_cache": boolean,
    "organization": number,
    "last_job_run": DateString,
    "last_job_failed": symbol,
    "status": StatusJob,
}