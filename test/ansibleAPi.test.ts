import {AnsibleApi} from "../src";


test('GETINSTANCE - AnsibleApi', async () => {
    expect(AnsibleApi.GETINSTANCE().url.toString()).toBeDefined()

});

test('TestServer - AnsibleApi', async () => {
    const {status, jsonData} = await AnsibleApi.GETINSTANCE().testServer()
    expect(status).toBe(200)
})