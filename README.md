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
It is an event of data expiration. Default unnamed storages expire after 1 week whereas named storages are retained indefinitely. 
### How do you pass input when running an actor or task via the API?
An actor or a task can be run by sending a POST request to a corresponding API endpoint. An input can be passed as a JSON object in the POST payload. 
In this case, object's fields override actor's default input configuration.


## Tutorial VI Apify Proxy & Bypassing Antiscraping Software Quiz

### What types of proxies does the Apify Proxy include? What are the main differences between them?
- **Datacenter proxy**
  - Rotates datacenter IP addresses which makes the crawling fast and cost effective. However, datacenter IPs are more prone to get blocked by the anti-scraping software.
  - Apify offers **shared** or **dedicated** datacenter IPs. Shared IPs are cheaper but the blocking rate depends on other users' actions which makes it difficult to predict. 
- **Residential proxy**
  - Uses real users IP addresses from their households or offices. Thanks to that, it is almost impossible to recognize and block programmatic access when using this proxy. Residential IPs are more expensive and their usage is charged by the amount of data transfer. Dedicated IPs are reserved for one user so they make a good choice in cases where stable crawling rate is important.
- **Google SERP proxy**
  - It is designed specifically for extraction of Google search results. Currently, Google Search and Google Shopping services are supported.

### Which proxies (proxy groups) can users access with the Apify Proxy trial? How long does this trial last?
- The trial lasts for 30 days and only datacenter and Google SERP proxies can be used during this trial. 
- For datacenter proxies, there are 2 groups available for the trial according to the overview in Apify console. These are BUYPROXIES94952 and SHADER which are both proxies from USA. The group for Google SERP is called GOOGLE_SERP.

### How can you prevent a problem that one of the hardcoded proxy groups that a user is using stops working (a problem with a provider)? What should be the best practices?
- A problem with a provider can not be prevented so we should be prepared for this scenario and handle potential errors properly. If the hardcoded proxy is not required and another proxy can be used instead, we might the rotating system to find a new proxy.
- We should periodically check the availability of the hardcoded proxy groups and once they're working again, we might revert back to using them.

### Does it make sense to rotate proxies when you are logged in?
- Log in is only valid per one session and by rotating proxies, new sessions are created. So if we need to stay logged in, rotating proxies won't be useful as we have to keep the same session.
- The session we're logged in has to be persisted. It means we have to use the same IP address for all related connections.  A session expires after 26 hours if used with datacentre proxies and for residential proxies, it persists 1 minute. Its expiry time is reset whenever the session is used.

### Construct a proxy URL that will select proxies **only** from the US (without specific groups).
- http://country-US:<PROXY_PASSWORD>@proxy.apify.com:8000

### What do you need to do to rotate proxies (one proxy usually has one IP)? How does this differ for Cheerio Scraper and Puppeteer Scraper?
- For each request, a new proxy server is used from the pool of available proxy servers. Typically, 1 IP address is assigned to 1 proxy server.
- It's important to work with a large amount of proxies. Sending too many requests to the same website using the same proxy might result in so called proxy burning. In such case, a proxy is banned by the website and all subsequent requests sent from it get blocked.
- `CheerioScraper` sends raw HTTP requests so it can easily assign a different proxy to each request. `PuppeteerCrawler` needs to work with the `puppeteerPool.retire(page.browser())` function as the whole browser has to be retired. 

### Try to set up the Apify Proxy (using any group or `auto`) in your browser. This is useful for testing how websites behave with proxies from specific countries (although most are from the US). You can try [Switchy Omega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif) extension but there are many more. Were you successful?

- I used Switchy Omega with `auto` username and managed to get status `Connected` after opening http://proxy.apify.com/. But when navigating to other websites, I got ERR_PROXY_CONNECTION_FAILED error. I added another proxy configuration with username `groups-SHADER+BUYPROXIES94952` and it started working for both proxy.apify.com `Connected` status and website browsing. I also noticed I wasn't able to load https://console.apify.com/ under proxy.

### Name a few different ways a website can prevent you from scraping it.

- **IP address blocking**
  - Typically specific ranges of IP addresses are blocked (such as AWS IP address ranges).
- **IP rate limiting**
  - If too many requests are sent from the same IP address, a website might block this IP address or throw a CAPTCHA test.
  - Can be bypassed by limiting the number of pages scraped concurrently (through the `maxConcurrency` option) or by using proxy servers and IPs rotation.
- **HTTP request analysis**
  - Checks browser's HTTP signatures. Can be bypassed by using a real web browser, e.g. headless Chrome or even better work around with browser signatures emulation while sending raw HTTP requests. Apify SDK comes with a `requestAsBrowser()` function which emulates the HTTP headers of the Firefox browser. 
- **User behaviour analysis**
  - Measures the period for which the user stays on each page, analyses mouse movements or form filling speed.
- **Browser fingerprinting**
  - Checks browser's fingerprint consisting of browser type and version, time zone, installed extensions and other info. 

### Do you know any software companies that develop anti-scraping solutions? Have you ever encountered them on a website?
- Akamai
- Cloudflare
- Incapsula
 Most of websites is using GA or Cookies to analyze the count of requests or speed of requests per IP or Browser and ban the dangerous/fast requests.
 Another method is to encrypt the data, but this method is slow anyway to render the page so that don't use so much.

# Tutorial VII Actor Migrations & Maintaining State Quiz

### Actors have a `Restart on error` option in their Settings. Would you use this for your regular actors? Why? When would you use it, and when not?

- I wouldn't use it for regular actors as it could trigger an infinite loop of restarting if the error was deterministic (wrong input configuration, code bug or something like that). It might burn the credit eventually.
- On the other hand, `restart on error` feature might be useful for long running actors that are supposed to run continuously and  if an error occurs, it's most likely caused by the network connection or some external factors. In this case, it's wiser to keep the actor running and don't wait for a developer to trigger the run restart manually.

### Migrations happen randomly, but by setting `Restart on error` and then throwing an error in the main process, you can force a similar situation. Observe what happens. What changes and what stays the same in a restarted actor run?

- Actor's run is exited with a non-zero exit code and it is restarted eventually. A new Docker container is created and started afterwards. 
- Actor's stores remain the same in a restarted run including INPUT value or persisted state. Dataset also survives for the restarted run.

### Why don't you usually need to add any special code to handle migrations in normal crawling/scraping? Is there a component that essentially solves this problem for you?

 - Resurrection of a finished run handles this problem by restarting actor's run and providing it with the same storages. It is designed not only for migration but for each actor run in a terminal state (with status FINISHED, FAILED, ABORTED or TIME-OUT).

### How can you intercept the migration event? How much time do you need after this takes place and before the actor migrates?

- The migration info can be obtained using the `persistState` event which provides `{ isMigrating: Boolean }` value. This event is emitted in regular intervals which are set to 60 seconds by default.
- Migration itself emits so called `migrating` event which can be used to persist actor's state before the migration process takes place.
- Once the migration event is fired, we only have a few seconds to save actor's current state. After the migration finishes, we can start from the persisted state while restarting actor's run.

### When would you persist data to a default key-value store and when would you use a named key-value store?

- These two stores differ in a retention period so it depends how long do we need to persist data.
- When we want to store data for 7 days only (e. g. for the next actor's run), a default key-value store is a fair choice. Otherwise we should use a named key-value store which never expires.

