# node-awx

AWX Api Interface for nodejs

## Impletations list

- Inventory

## Usage

```ts
import {AnsibleApi} from "./Api";
import {Inventory} from "./Inventory";

const ansibleApi = new AnsibleApi("https://localhost:8043/api/v2/", {token: "TOKEN"});

const inventory  = await new Inventory(ansibleApi).get(1);

console.log(inventory)

```