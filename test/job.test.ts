import {AnsibleApi} from "../src";

beforeAll(() => {

    new AnsibleApi("https://localhost:8043/api/v2/", {token: process.env.AWX_TOKEN ? process.env.AWX_TOKEN : "TOKEN"})

})

test('GETINSTANCE - AnsibleApi', async () => {
    expect(AnsibleApi.GETINSTANCE().url.toString()).toBe("https://localhost:8043/api/v2/")

});

test('TestServer - AnsibleApi', async () => {
    const status = await AnsibleApi.GETINSTANCE().testServer()
    expect(status).toBe(200)
})