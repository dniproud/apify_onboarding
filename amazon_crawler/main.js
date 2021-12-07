/**
 * This template is a production ready boilerplate for developing with `CheerioCrawler`.
 * Use this to bootstrap your projects using the most up-to-date code.
 * If you're looking for examples or want to learn more, see README.
 */

const Apify = require('apify');
const { handleStart, handleOffer, handleDetail } = require('./src/routes');

const { utils: { log } } = Apify;

Apify.main(async () => {
    const { keyword, to_email } = await Apify.getInput();

    const state = await Apify.getValue('STATE') || { saved: {} };
    Apify.events.on('persistState', async () => Apify.setValue('STATE', state));
    setInterval(() => log.info(`Saved offers: ${JSON.stringify(state.saved, null, 2)}`), 20000);

    const requestList = await Apify.openRequestList('start-urls', [{
        url:`https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}`,
        headers: {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
        },
        userData: {
            keyword
        }
    }]);

    const requestQueue = await Apify.openRequestQueue();
    const proxyConfiguration = await Apify.createProxyConfiguration({
        groups: ['BUYPROXIES94952']
    });
    
    const errors = [];

    const crawler = new Apify.CheerioCrawler({
        requestList,
        requestQueue,
        proxyConfiguration,
        maxConcurrency: 1,
        maxRequestsPerCrawl: 100,
        useSessionPool: true,
        sessionPoolOptions: {
            maxPoolSize: 1,
            sessionOptions: {
                maxUsageCount: 5,
            },
        },
        handlePageFunction: async (context) => {
            const { url, userData: { label } } = context.request;
            log.info('Page opened.', { label, url });
            switch (label) {
                case 'OFFER':
                    return handleOffer(context, state);
                case 'DETAIL':
                    return handleDetail(context);
                default:
                    return handleStart(context);
            }
        },
        handleFailedRequestFunction: async({error, request}) => {
            log.error(`${request.url}: ${error.message}`);
            errors.push(`URL: ${request.url}, ERROR: ${error.message}`)
        }
    });

    log.info('Starting the crawl.');
    await crawler.run();

    const dataset = await Apify.openDataset();
    const { id: datasetId } = await dataset.getInfo();
    await Apify.call('apify/send-mail', {
        to: to_email,
        subject: 'Andriy Piskovskyi',
        text: `This is for the Apify SDK exercise.\n\nDataset link: https://api.apify.com/v2/datasets/${datasetId}/items?clean=true&format=json\n\n${errors.join('\n')}`
    });
    log.info(`Crawl finished. Sent the email to ${to_email}`);
});
