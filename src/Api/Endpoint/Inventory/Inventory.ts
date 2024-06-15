import {AnsibleApi} from "../../Api";
import {Generic} from "../Generic.js";
import {ListInventories, Inventory as InventoryT} from "./InventoryType";

export class Inventory extends Generic {

    static LIST = "inventories/"
    static DETAIL = "inventories/{id}/"

    constructor(api : AnsibleApi) {
        super(api)
    }

    public async list() : Promise<ListInventories>
    {
        return await this.api.fetchData(await this.api.fetchAPI(Inventory.LIST));

    }

    public async get(id: number): Promise<InventoryT>
    {
        return await this.api.fetchData(await this.api.fetchAPI(Inventory.DETAIL.replace("{id}", id.toString())))
    }


}

