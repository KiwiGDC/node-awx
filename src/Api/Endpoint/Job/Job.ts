import {Generic} from "../Generic";
import {AnsibleApi} from "../../Api";
import {FinishedJob, Pager} from "../../ReturnType/GenericType";
import {Job as JobT} from "./JobType";
import {StatusJob as StatusJobE} from "../../Enum/StatusJob"
import {sleep} from "../../utils";
import {ApiUrl, ApiUrlType} from "../../ApiUrl";



export class Job extends Generic {

    static LIST: ApiUrlType = {endpoint: "jobs/"}
    static DETAIL : ApiUrlType = {endpoint: "jobs/{id}/"}

    job: JobT
    public constructor(job: JobT) {
        super();
        this.job = job;
    }


    public static async list() : Promise<Pager<JobT>>
    {
        return await AnsibleApi.GETINSTANCE().fetchAD(ApiUrl.gURL(Job.LIST));
    }

    public static async get(id: number): Promise<Job>
    {
        const jobDetail = await AnsibleApi.GETINSTANCE().fetchAD(ApiUrl.gURL(Job.DETAIL, {id: id}));
        return new Job(jobDetail)

    }

    public async isFinished(): Promise<FinishedJob>
    {
        const {id} = this.job
        const {status} : JobT = await AnsibleApi.GETINSTANCE().fetchAD(ApiUrl.gURL(Job.DETAIL, {id: id}))
        return {
            finished: status !== StatusJobE.WAITING && status !== StatusJobE.PENDING && status !== StatusJobE.NEW && status != StatusJobE.RUNNING,
            status: status
        }
    }

    /**
     * Wait job
    **/
    public async wait(checkInterval: number = 2500){
        while (true){
            const finished = await this.isFinished()
            if(finished.finished){
                return finished
            }
            await sleep(checkInterval);
        }
    }



}