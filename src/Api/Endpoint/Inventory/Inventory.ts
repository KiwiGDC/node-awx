import {AnsibleApi} from "../../Api.js";
import {Generic} from "../Generic.js";
import {Inventory as InventoryT} from "./InventoryType";
import {Pager} from "../../ReturnType/GenericType";

export class Inventory extends Generic {

    static LIST = "inventories/"
    static DETAIL = "inventories/{id}/"

    inventory
    constructor(inventory : InventoryT) {
        super()
        this.inventory = inventory;
    }

    public static async list() : Promise<Pager<InventoryT>>
    {
        return await AnsibleApi.GETINSTANCE().fetchData(await AnsibleApi.GETINSTANCE().fetchAPI(Inventory.LIST));

    }

    public static async get(id: number): Promise<Inventory>
    {
        const inventoryDetail = await AnsibleApi.GETINSTANCE().fetchData(await AnsibleApi.GETINSTANCE().fetchAPI(Inventory.DETAIL.replace("{id}", id.toString())));
        return new Inventory(inventoryDetail);
    }


}

