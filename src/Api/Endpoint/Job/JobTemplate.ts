import {Generic} from "../Generic.js";
import {AnsibleApi} from "../../Api.js";
import {JobTemplate as JobTemplateT} from "./JobTemplateType";

import {Pager} from "../../ReturnType/GenericType";
import {Job} from "./Job.js";



export class JobTemplate extends Generic {

    static LIST = "job_templates/"
    static DETAIL = "job_templates/{id}"
    static LAUNCH : {url: string, method: "POST"} = {url: "job_templates/{id}/launch/", method: "POST"}

    jobTemplate : JobTemplateT
    constructor(jobTemplate: JobTemplateT) {
        super();
        this.jobTemplate = jobTemplate;
    }


    public static async list() : Promise<Pager<JobTemplateT>>
    {
        return await AnsibleApi.GETINSTANCE().fetchData(await AnsibleApi.GETINSTANCE().fetchAPI(JobTemplate.LIST));

    }

    public static async get(id: number): Promise<JobTemplate>
    {
        return new JobTemplate(await AnsibleApi.GETINSTANCE().fetchData(await AnsibleApi.GETINSTANCE().fetchAPI(JobTemplate.DETAIL.replace("{id}", id.toString()))))
    }

    public async launch(): Promise<Job>
    {
        const {id} = this.jobTemplate;
        const detail = await AnsibleApi.GETINSTANCE().fetchData(await AnsibleApi.GETINSTANCE().fetchAPI(JobTemplate.LAUNCH.url.replace("{id}", id.toString()), JobTemplate.LAUNCH.method));
        return new Job(detail)
    }



}