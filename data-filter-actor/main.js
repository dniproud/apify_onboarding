// This is the main Node.js source code file of your actor.
// It is referenced from the "scripts" section of the package.json file,
// so that it can be started by running "npm start".

const Apify = require('apify');
const { log } = Apify.utils;

Apify.main(async () => {
    const input = await Apify.getInput();
    const datasetID = input.resource.defaultDatasetId;
    log.info(`Dataset ID is: ${datasetID}`);

    const client = Apify.newClient()
    const { items } = await client.dataset(datasetID).listItems();

    log.info('Filtering cheapest offers.');
    const filteredOffers = {};

    for (let offer of items) {
        if ( !filteredOffers[offer.asinNumber] || 
             parseFloat(filteredOffers[offer.asinNumber].price.replace('$', '')) >= parseFloat(offer.price.replace('$', ''))
        ) {
            filteredOffers[offer.asinNumber] = offer;
        }
    }
    await Apify.pushData(Object.values(filteredOffers));
});
