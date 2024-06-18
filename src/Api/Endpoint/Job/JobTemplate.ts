import {Generic} from "../Generic.js";
import {AnsibleApi} from "../../Api.js";
import {JobTemplate as JobTemplateT} from "./JobTemplateType";

import {Pager} from "../../ReturnType/GenericType";
import {Job} from "./Job.js";
import { ApiUrl, urlGen } from "../../ApiUrl.js";



export class JobTemplate extends Generic {

    static LIST = "job_templates/"
    static DETAIL = "job_templates/{id}"
    static LAUNCH : ApiUrl = {endpoint: "job_templates/{id}/launch/", method: "POST"}

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

    public async launch() //Promise<Job>
    {
        const {id} = this.jobTemplate;
        const url = urlGen<number>(JobTemplate.LAUNCH, [{"{id}": id}], [{"page_size": "100"}])
        console.log(url);
        //const detail = await AnsibleApi.GETINSTANCE().fetchData(await AnsibleApi.GETINSTANCE().fetchAPI(url, JobTemplate.LAUNCH.method));
        //return new Job(detail)
    }



}