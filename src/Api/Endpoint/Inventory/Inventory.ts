import {AnsibleApi} from "../../Api";
import {Generic} from "../Generic";
import {Inventory as InventoryT} from "./InventoryType";
import {Pager} from "../../ReturnType/GenericType";
import {ApiUrl, ApiUrlType} from "../../ApiUrl";

export class Inventory extends Generic {

    static LIST: ApiUrlType = {endpoint: "inventories/"}
    static DETAIL: ApiUrlType = {endpoint: "inventories/{id}/"}

    inventory
    constructor(inventory : InventoryT) {
        super()
        this.inventory = inventory;
    }

    public static async list() : Promise<Pager<InventoryT>>
    {
        return await AnsibleApi.GETINSTANCE().fetchAD(ApiUrl.gURL(Inventory.LIST));

    }

    public static async get(id: number): Promise<Inventory>
    {
        const inventoryDetail = await AnsibleApi.GETINSTANCE().fetchAD(ApiUrl.gURL(Inventory.DETAIL));
        return new Inventory(inventoryDetail);
    }


}

