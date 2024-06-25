import {AnsibleApi} from "../src";

beforeAll(() => {

    new AnsibleApi(process.env.AWX_URL ? process.env.AWX_URL : "https://localhost:8043/api/v2/", {token: process.env.AWX_TOKEN ? process.env.AWX_TOKEN : "TOKEN"})

})

test('GETINSTANCE - AnsibleApi', async () => {
    expect(AnsibleApi.GETINSTANCE().url.toString()).toBeDefined()

});

test('TestServer - AnsibleApi', async () => {
    const status = await AnsibleApi.GETINSTANCE().testServer()
    console.log(status)
    expect(status).toBe(200)
})