import {Generic} from "../Generic";
import {AnsibleApi} from "../../Api";
import {JobTemplate as JobTemplateT} from "./JobTemplateType";

import {Pager} from "../../ReturnType/GenericType";
import {ApiUrl, ApiUrlType} from "../../ApiUrl";



export class JobTemplate extends Generic {

    static LIST: ApiUrlType = {endpoint: "job_templates/"}
    static DETAIL: ApiUrlType = {endpoint: "job_templates/{id}/"}
    static LAUNCH : ApiUrlType = {endpoint: "job_templates/{id}/launch/", method: "POST"}

    jobTemplate : JobTemplateT
    constructor(jobTemplate: JobTemplateT) {
        super();

        this.jobTemplate = jobTemplate;
    }


    public static async list() : Promise<Pager<JobTemplateT>>
    {
        return await AnsibleApi.GETINSTANCE().fetchAD(ApiUrl.gURL(JobTemplate.LIST));

    }

    public static async get(id: number): Promise<JobTemplate>
    {
        return new JobTemplate(await AnsibleApi.GETINSTANCE().fetchAD(ApiUrl.gURL(JobTemplate.DETAIL, {id: id})))
    }

    public async launch() //Promise<Job>
    {
        const {id} = this.jobTemplate;
        const url = ApiUrl.gURL(JobTemplate.LAUNCH, {id: id})
        const detail = await AnsibleApi.GETINSTANCE().fetchAD(url);
        //return new Job(detail)
    }



}