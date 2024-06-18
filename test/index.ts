import {AnsibleApi} from "../src/index.js";
import {JobTemplate} from "../src/Api/Endpoint/Job/JobTemplate.js";
import {Inventory} from "../src/Api/Endpoint/Inventory/Inventory.js";

const AApi = new AnsibleApi("http://localhost:8043/api/v2/", {token: "cHfXtyKAbQjvmnR95tN1IqCYxpd1v6"});

console.log((await JobTemplate.get(7)).launch())
