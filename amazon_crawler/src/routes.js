const Apify = require('apify');

const { utils: { log } } = Apify;

/**
 * 
 * @param {Object} context
 * @param {Apify.Request} context.request
 * @param {$} context.$
 * @param {requestQueue} context.crawler.requestQueue
 * 
 */
exports.handleStart = async ({ request, $, crawler: { requestQueue } }) => {
    // Handle Start URLs

    const { keyword } = request.userData;
    const asinNumbers = [];

    $('.s-result-list > div[data-component-type="s-search-result"]:not(.AdHolder)').each((i, item) => {
        asinNumbers.push($(item).attr('data-asin'));
    });
    
    for (let asinNumber of asinNumbers) {
        await requestQueue.addRequest({
            url: `https://www.amazon.com/dp/${asinNumber}`,
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, ' +
                              'like Gecko) Chrome/94.0.4606.81 Safari/537.36'
            },
            userData: {
                label: 'DETAIL',
                asinNumber,
                keyword
            }
        });
    }
};

/**
 * 
 * @param {Object} context
 * @param {Apify.Request} context.request
 * @param {$} context.$
 * @param {requestQueue} context.crawler.requestQueue
 * @param {session} context.session
 * 
 */
exports.handleDetail = async ({ request, $, crawler: { requestQueue }, session }) => {
    // Handle details

    const cookieString = session.getCookieString(request.url);
    const { asinNumber, keyword } = request.userData;

    let description = $('#productDescription > p > span');
    description = description ? description.text().replace(/\s+/g, ' ') : '';

    let title = $('#productTitle')
    title = title ? title.text().trim() : '';

    await requestQueue.addRequest({
        url: `https://www.amazon.com/gp/aod/ajax/ref=auto_load_aod?asin=${asinNumber}&pc=dp`,
        headers: {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like ' +
                          'Gecko) Chrome/94.0.4606.81 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'cookie': cookieString
        },
        userData: {
            label: 'OFFER',
            detail: {
                title,
                url: request.url,
                description,
                keyword
            },
            asinNumber
        }
    })
};


/**
 *
 * @param {Object} context
 * @param {Apify.Request} context.request
 * @param {$} context.$
 * 
 */
exports.handleOffer = async ({ request, $ }) => {
    // Handle offers
    const { asinNumber, detail: { title, description, url, keyword } } = request.userData;
    const offers = [];

    $('#aod-pinned-offer,#aod-offer').each((i, offer) => {
        let price = $('.a-offscreen', offer)
        price = price ? price.text().trim() : '';

        let shippingPrice = $('#aod-bottlingDepositFee-0 + div + span', offer);
        shippingPrice = shippingPrice ? shippingPrice.text().split('shipping')[0].trim(): ''; 

        let deliveryPrice = $('#mir-layout-DELIVERY_BLOCK > div:first-child', offer);
        deliveryPrice = deliveryPrice ? deliveryPrice.text().split('delivery')[0].trim(): ''; 

        let sellerName = $('#aod-offer-soldBy .a-fixed-left-grid-inner > div:last-child > *:first-child', offer)
        sellerName  = sellerName ? sellerName.text().trim() : '';

        offers.push({
            asinNumber,
            title,
            url,
            description,
            keyword,
            sellerName,
            price,
            shippingPrice: shippingPrice || deliveryPrice
        });
    });
    await Apify.pushData(offers);
};
