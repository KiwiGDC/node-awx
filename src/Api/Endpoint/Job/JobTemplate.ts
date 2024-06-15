import {Generic} from "../Generic.js";
import {AnsibleApi} from "../../Api.js";
import {JobTemplatesList} from "./JobTemplateType";

export class JobTemplate extends Generic {

    static LIST = "/job_templates/"
    static DETAIl = "/job_templates/{id}"

    constructor(api: AnsibleApi) {
        super(api);
    }

    public async list() : Promise<JobTemplatesList>
    {
        return await this.api.fetchData(await this.api.fetchAPI(JobTemplate.LIST));

    }


}