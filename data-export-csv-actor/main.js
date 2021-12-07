const Apify = require('apify');
const got = require('got');
const { URLSearchParams } = require('url');
const {ApifyClient} = require('apify-client');

const { utils: { log } } = Apify;

Apify.main(async () => {
    const input = await Apify.getInput();
    const { useClient } = input;

    const TASK_ID = 'dniproud~phone-search-task';

    const items =  useClient
        ? await getRunResultUsingClient(TASK_ID, input)
        : await getRunResultUsingApi(TASK_ID, input)

    log.info(`Output items: ${items}`);

    if (items.error) {
        throw new Error(items.error.message);
    } else {
        await Apify.setValue('OUTPUT', items, { contentType: 'text/csv' });
        log.info('Export finished.');
    }
});

/**
 * @param {String} taskId Task id or unique name
 * @param {Object} input Input object for task run configuration
 * @returns {Promise<String>} Dataset items with csv text format
 */
async function getRunResultUsingApi(taskId, input) {
    const { memory, fields, maxItems } = input;

    const url = new URL(`https://api.apify.com/v2/actor-tasks/dniproud~phone-search-task/run-sync-get-dataset-items?`);

    const queryParams = {
        memory,
        format: 'csv',
        limit: maxItems,
        fields: fields.join(','),
        token: process.env.APIFY_TOKEN
    };

    url.search = new URLSearchParams(queryParams);

    const requestBody = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    log.info(`Starting task run. Task id: ${taskId}`);
    const response = got.post(url.href);
    return response.text();
}

/**
 * @param {String} taskId Task id or unique name
 * @param {Object} input Input object for task run configuration
 * @param {Number} input.memory
 * @param {Array} input.fields
 * @param {Number} input.maxItems
 * @returns {Promise<Buffer>} Dataset items buffered with csv text format
 */
async function getRunResultUsingClient(taskId, input) {
    const apifyClient = new ApifyClient({
        token: process.env.APIFY_TOKEN
    });
    const taskClient = await apifyClient.task(taskId);

    const { memory, fields, maxItems } = input;

    log.info(`Starting task run. Task id: ${taskId}`);
    const run = await taskClient.call({ memory });

    const runClient = await apifyClient.run(run.id);

    const datasetClient = await runClient.dataset();

    const downloadOptions = {
        limit: maxItems,
        fields
    };
    
    return datasetClient.downloadItems('csv', downloadOptions);  
}