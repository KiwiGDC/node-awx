import {AnsibleApi} from "../src/index.js";
import {JobTemplate} from "../src/Api/Endpoint/Job/JobTemplate.js";
import {Inventory} from "../src/Api/Endpoint/Inventory/Inventory.js";

const AApi = new AnsibleApi("https://localhost:8043/api/v2/", {token: "8odXpgaXUyghyFNSdGOBjSiwPTjAm8"});

const job = await (await JobTemplate.get(7)).launch()
const inventory = await Inventory.get(1)

console.log(inventory.inventory)
console.log(await job.wait())