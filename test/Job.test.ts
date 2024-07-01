import {AnsibleApi, Job} from "../src";


test('get inventory', async () => {
    expect(AnsibleApi.GETINSTANCE().url.toString()).toBeDefined()
    const {count} = await Job.list()
    expect(count).toBeGreaterThanOrEqual(1)

});

test('get inventory', async () => {
    expect(AnsibleApi.GETINSTANCE().url.toString()).toBeDefined()
    const list = await Job.list()
    const job = await Job.get(list.results[0].id);
    expect(job.job.name).toBe(list.results[0].name)
});



