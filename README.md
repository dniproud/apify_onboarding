# apify_onboarding

The first project for Apify onboarding tutorial

## Quiz

Where and how can you use JQuery with the SDK?
What is the main difference between Cheerio and JQuery?
When would you use CheerioCrawler and what are its limitations?
What are the main classes for managing requests and when and why would you use one instead of another?
How can you extract data from a page in Puppeteer without using JQuery?
What is the default concurrency/parallelism the SDK uses?


## Description

The actor will receive input in this format, where the keyword will vary:

{
    "keyword": "phone"
}

You will search for products on Amazon.com using the keyword with this URL: https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}

Get all product ASINs from the first page of results. The ASIN is the product ID on Amazon. It looks like this: B0775MV9K2. You can get to each product page just with an ASIN using this URL: https://www.amazon.com/dp/${ASIN}

From here, go to each product's detail page and save its title, url and description

Now for each product, you need to scrape all its offers. You can get to offers of each product with this URL: https://www.amazon.com/gp/offer-listing/${ASIN}
Note: In February 2021 Amazon started A/B testing the offer page. In some cases it redirects back to the product page and shows the offers in the side panel. You can scrape the offers from the side panel instead, so catch both cases if possible.

Scrape and push all offers to the dataset. Each offer should be one dataset item. Add the title, url, description, and keyword fields from the product to each offer. Additionally, each offer should have its specific sellerName, price, and shippingPrice (if shippingPrice is not visible, store null to this property).
Example output: (Locally, each item is a separate JSON)

[
    {
		"title": "Apple iPhone 6 a1549 16GB Space Gray Unlocked (Certified Refurbished)",
		"url": "https://www.amazon.com/Apple-iPhone-Unlocked-Certified-Refurbished/dp/B00YD547Q6/ref=sr_1_2?s=wireless&ie=UTF8&qid=1539772626&sr=1-2&keywords=iphone",
		"description" : "What's in the box: Certified Refurbished iPhone 6 Space Gray 16GB Unlocked , USB Cable/Adapter. Comes in a Generic Box with a 1 Year Limited Warranty.",
		"keyword": "iphone",
        	"sellerName": "Blutek Intl",
		"price": "$162.97",
		"shippingPrice": "free"
    }, 
    {
         "title": "Apple iPhone 6 a1549 16GB Space Gray Unlocked (Certified Refurbished)",
	 	"url": "https://www.amazon.com/Apple-iPhone-Unlocked-Certified-Refurbished/dp/B00YD547Q6/ref=sr_1_2?s=wireless&ie=UTF8&qid=1539772626&sr=1-2&keywords=iphone",
	 	"description" : "What's in the box: Certified Refurbished iPhone 6 Space Gray 16GB Unlocked , USB Cable/Adapter. Comes in a Generic Box with a 1 Year Limited Warranty.",
	 	"keyword": "iphone",
         	"sellerName": "PLATINUM DEALS",
	 	"price": "$169.98",
	 	"shippingPrice": "free"
    }, 
]

When the scrape is done, call a public actor that sends emails and send an email to lukas@apify.com  with a title containing your name and "This is for the Apify SDK exercise", and a message with a public link to the dataset.