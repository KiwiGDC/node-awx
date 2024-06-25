import {AnsibleApi} from "../src";
global.beforeAll(() => {
    new AnsibleApi(process.env.AWX_URL ? process.env.AWX_URL : "https://localhost:8043/api/v2/", {token: process.env.AWX_TOKEN ? process.env.AWX_TOKEN : "TOKEN"})

})
