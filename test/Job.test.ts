import {AnsibleApi, Job, JobTemplate} from "../src";


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


test('Launch jobTemplate', async () => {
    expect(AnsibleApi.GETINSTANCE().url.toString()).toBeDefined()
    const jobTemplateList = await JobTemplate.list();
    
    const jobTemplate = await (await JobTemplate.get(jobTemplateList.results[0].id)).launch();
    const job = await jobTemplate.wait()
    expect(job.finished).toBe(true)
});



