# apify_onboarding

The first project for Apify onboarding tutorial

## Tutorial II Apify SDK Quiz

### Where and how can you use jQuery with the SDK?
  - It can be used inside the `handlePageFunction` of CheerioCrawler which provides `$` property inside an object argument of `handlePageFunction`.
  - It can be also used inside the `evaluate` function of Puppeteer page by using injectQuery utility function.
### What is the main difference between Cheerio and jQuery?
  - Cheerio is implementation of core jQuery designed specifically for the server, but jQuery runs in a browser and it's designed to simplify the client-side scripting of HTML.
### When would you use CheerioCrawler and what are its limitations?
  - `CheerioCrawler` is easy to use and so fast in the scraping with the high rate of pages per minute. 
  - It is also cheap in terms of computing units.
  - It can't be applied to the most of the modern websites as they use JavaScript to create the final HTML such as React, Angular, Vue. `CheerioCrawler` uses plain HTTP requests to get HTML pages corresponding to the provided URLs, but sometimes it can be used for the modern websites as they uses many API call.
### What are the main classes for managing requests and when and why would you use one instead of another?
  - `Request`, `RequestList`, `RequestQueue`.
  - We'll make use of `RequestList` and `RequestQueue` classes to specify URLs that are to be crawled.
    - `RequestList` represents a static list of URLs that can be defined directly in the code or they can be loaded from the text file or online URLs. It's useful when adding a batch of the initial URLs before starting the crawling.
    - `RequestQueue` offers dynamic collection of URLs which can be modified during runtime. It can be used in various crawlers such as `CheerioCrawler`, `PuppeteerCrawler`, `PlaywrightCrawler` in order to add the requests dynamically. 
    - Both of `RequestList` and `RequestQueue` can even be used at once if needed. They should be defined in the configuration of the crawler.
### How can you extract data from a page in Puppeteer without using jQuery?
  - Puppeteer pages have a handy `evaluate()` function that lets you execute JavaScript in the Chrome window. The `evaluate()` function is the most flexible way to interact with Puppeteer, because it lets you control Chrome using browser APIs like `document.querySelector()`
### What is the default concurrency/parallelism the SDK uses?
  - Apify SDK uses `AutoscaledPool` for the concurrency/parallerism which manages a pool of asynchronous resource-intensive tasks that are executed in parallel. This pool only starts new tasks if there is enough free CPU and memory available and the Javascript event loop is not blocked


## Tutorial III Apify Actors & Webhooks Quiz

### How do you allocate more CPU for your actor run?
  - It can be assigned the higher memory capacity to allocate more CPU. 
### How can you get the exact time when the actor was started from within the running actor process?
  - Using the `APIFY_STARTED_AT` environment variable from the actor's process. It can be accessed from Node.js using the `process.env` object as follows: `process.env.APIFY_STARTED_AT`.
### Which are the default storages an actor run is allocated (connected to)?
### Can you change the memory allocated to a running actor?
### How can you run an actor with Puppeteer in a headful (non-headless) mode?
### Imagine the server/instance the container is running on has a 32 GB, 8-core CPU. What would be the most performant (speed/cost) memory allocation for CheerioCrawler? (Hint: NodeJS processes cannot use user-created threads)
### What is the difference between RUN and CMD Dockerfile commands?
### Does your Dockerfile need to contain a CMD command (assuming we don't want to use ENTRYPOINT which is similar)? If yes or no, why?
### How does the FROM command work and which base images Apify provides?


