import {AnsibleApi} from "../Api.js";
import {params} from "../utils.js";
import {ListInventories} from "./inventory";


const LIST = "inventories/"

export class Inventory {


    api: AnsibleApi;
    constructor(api : AnsibleApi) {

        this.api = api;
    }

    public async listInventories() : Promise<ListInventories>
    {
        return await this.api.fetchData(await this.api.fetchAPI(LIST, params(this.api.token)));

    }


}

