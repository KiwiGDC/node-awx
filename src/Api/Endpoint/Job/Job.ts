import {Generic} from "../Generic.js";
import {AnsibleApi} from "../../Api.js";
import {FinishedJob, Pager} from "../../ReturnType/GenericType.js";
import {Job as JobT} from "./JobType.js";
import {StatusJob as StatusJobE} from "../../Enum/StatusJob.js"



export class Job extends Generic {

    static LIST = "jobs/"
    static DETAIL = "jobs/{id}/"

    job: JobT
    public constructor(job: JobT) {
        super();
        this.job = job;
    }

    public static async list() : Promise<Pager<JobT>>
    {
        return await AnsibleApi.GETINSTANCE().fetchData(await AnsibleApi.GETINSTANCE().fetchAPI(Job.LIST));
    }

    public static async get(id: number): Promise<Job>
    {
        const jobDetail = await AnsibleApi.GETINSTANCE().fetchData(await AnsibleApi.GETINSTANCE().fetchAPI(Job.DETAIL.replace("{id}", id.toString())));
        return new Job(jobDetail)

    }

    public async isFinished(): Promise<FinishedJob>
    {
        const {id} = this.job
        const {status} : JobT = await AnsibleApi.GETINSTANCE().fetchData(await AnsibleApi.GETINSTANCE().fetchAPI(Job.DETAIL.replace("{id}", id.toString())))
        return {
            finished: status !== StatusJobE.WAITING && status !== StatusJobE.PENDING && status !== StatusJobE.NEW,
            status: status
        }
    }



}