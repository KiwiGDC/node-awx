# node-awx

AWX Api Interface for nodejs

## Implementations list

- Inventory
  - Get
  - List
- Job Template
  - Get
  - List
- Job
  - Get
  - List
  - isFinished
  - wait(ms) : Wait for the job to finish (Sucessfull, Error, Failed, ...) 

## Usage

```ts
import AnsibleApi from "../src/index.js";
import {JobTemplate} from "../src/Api/Endpoint/Job/JobTemplate.js";
import {Inventory} from "../src/Api/Endpoint/Inventory/Inventory.js";

const AApi = new AnsibleApi("https://localhost:8043/api/v2/", {token: "TOKEN"});

const job = await (await JobTemplate.get(7)).launch()
const inventory = await Inventory.get(1)

console.log(inventory.inventory)
console.log(await job.isFinished())

```

## Run Test

```bash
$ export AWX_TOKEN="TOKEN_AWX"; npm run test
// or
$ export AWX_TOKEN="TOKEN_AWX"; export AWX_URL="https://url.com"; npm run test
```