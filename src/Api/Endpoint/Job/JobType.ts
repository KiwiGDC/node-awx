import {DateString, JobType, StatusJob, Summary} from "../../ReturnType/GenericType";

export type Job = {
    "id": number,
    "type": "job",
    "url": string,
    "related": {
        "created_by": string,
        "labels": string,
        "inventory": string,
        "project": string,
        "organization": string,
        "credentials": string,
        "unified_job_template": string,
        "stdout": string,
        "execution_environment": string,
        "job_events": string,
        "job_host_summaries": string,
        "activity_stream": string,
        "notifications": string,
        "create_schedule": string,
        "job_template": string,
        "cancel": string,
        "project_update": string,
        "relaunch": string
},
    "summary_fields": {
    "organization": Summary["Organization"]
    "inventory": Summary["Inventory"]
    "execution_environment": Summary["ExecutionEnvironment"]
    "project": Summary["Project"]
    "job_template": Summary["JobTemplate"]
    "created_by": Summary["User"]
    "user_capabilities": Summary["UserCapabilities"]
    "credentials": Array<Summary["Credential"]>
},
    "created": DateString,
    "modified": DateString,
    "name": string,
    "description": string,
    "unified_job_template": number,
    "launch_type": JobType,
    "status": StatusJob,
    "execution_environment": number,
    "failed": boolean,
    "started": DateString,
    "finished": DateString | null,
    "canceled_on": DateString | null,
    "elapsed": number,
    "job_explanation": string,
    "execution_node": string | null,
    "controller_node": string,
    "launched_by": {
        "id": number,
        "name": string,
        "type": string,
        "url": string
    },
    "work_unit_id": string,
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
    "job_template": number,
    "passwords_needed_to_start": Array<any>, // TODO : Specify
    "allow_simultaneous": boolean,
    "artifacts": any,
    "scm_revision": string,
    "instance_group": number,
    "diff_mode": boolean,
    "job_slice_number": number,
    "job_slice_count": number,
    "webhook_service": string,
    "webhook_credential": string | null,
    "webhook_guid": string
}
