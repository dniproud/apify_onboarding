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
The data is stored either on local disk to a directory defined by the APIFY_LOCAL_STORAGE_DIR environment variable, or on the Apify platform under the user account identified by the API token defined by the APIFY_TOKEN environment variable. 
If neither of these variables is defined, by default Apify SDK sets APIFY_LOCAL_STORAGE_DIR to ./apify_storage in the current working directory and prints a warning.
### Can you change the memory allocated to a running actor?
No, but I can change the memory by abort/rerun way. 
### How can you run an actor with Puppeteer in a headful (non-headless) mode?
We can do it by setting `launchContext.launchOptions.headless` to `false` of the `PuppeteerCrawler` constructor.
### Imagine the server/instance the container is running on has a 32 GB, 8-core CPU. What would be the most performance (speed/cost) memory allocation for CheerioCrawler? (Hint: NodeJS processes cannot use user-created threads)
512MB/1GB memory allocation is the best allocation for `CheerioCrawler`. 
### What is the difference between RUN and CMD Dockerfile commands?
`RUN` - command triggers while we build the docker image.
`CMD` - command triggers while we launch the created docker image.
### Does your Dockerfile need to contain a CMD command (assuming we don't want to use ENTRYPOINT which is similar)? If yes or no, why?
Yes. All will be ignored if it contains multiple `CMD` commands except of one.
### How does the FROM command work and which base images Apify provides?
`FROM` instruction initializes a new build stage and sets the Base Image for subsequent instructions.
apify/actor-node:16


## Tutorial IV Apify CLI & Source Code Quiz
### Do you have to rebuild an actor each time the source code is changed?
It's needed to rebuild the actor each time the source code is changed on the apify platform. It doesn't neeed on the localhost.
### What is the difference between pushing your code changes and creating a pull request?
A "pull request" is you requesting the target repository to grab your changes. When you open a pull request, you're proposing your changes and requesting that someone review and pull in your contribution and merge them into their branch.
Pushing your code changes is done regularly without anyone's review when you're the only one working on a repository. 
If there are others accessing the repository, you may need to pull before you can push.
### How does the apify push command work? Is it worth using, in your opinion?
It's useful when developing the actor on the localhost. It uploads the actor to the Apify platform and builds it there.
I guess it would be better if there was a pull cli command like git pull or docker pull. so we can download the current code of the online platform easily.
Also it wuld be great if I could see the code change history on the platform.


## Tutorial V Tasks, Storage, API & Client Quiz

### What is the relationship between actor and task?
An actor may have many tasks with the different tasks and the version built. A task is generated from only an actor.
An actor can be executed directly without creating a task.
A task can be generated from the actor who developed by own or apify developers.
### What are the differences between default (unnamed) and named storage? Which one would you choose for everyday usage?
The main difference is the expiration time. Unnamed storages expire in 7 days whereas named storages are preserved forever.
Default unnamed storages are more suitable for daily usage as we don't need to manually assign names to them and they are deleted automatically when we no longer need them.
### What is the relationship between the Apify API and the Apify client? Are there any significant differences?
The Apify API offers programmatic access to the Apify platform through RESTful HTTP endpoints. Apify client is the official library for accessing Apify API from external applications. Apify provides client libraries for JavaScript and Python applications. 
The functions from Apify client libraries are mapped on the API endpoints and they also have the same parameters
### Is it possible to use a request queue for deduplication of product IDs? If yes, how would you do that?
Yes, it's possble. We cau use Product ID as an unique key.
### What is data retention and how does it work for all types of storage (default and named)?
### How do you pass input when running an actor or task via the API?


