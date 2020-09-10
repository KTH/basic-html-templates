# Basic HTML Templates ![alt text](https://api.travis-ci.org/KTH/basic-html-templates.svg?branch=master)
## Simple KTH look
A simple way to get web pages to look somewhat like the kth.se design. The templates are intended to be used in private to semiprivate services.

## Demo application

[Demo code source here](https://github.com/KTH/basic-html-templates/tree/master/demo-app/).

```javascript


const express = require("express");
const { templates } = require("@kth/basic-html-templates");
const httpResponse = require("@kth/http-responses");
const app = express();
const started = new Date();

/**
 * Index page.
 */
app.get("/", function (request, response) {
  httpResponse.ok(request, response, templates.index((title = "Demo App")));
});

/**
 * About page. Versions and such.
 */
app.get("/_about", function (request, response) {
  const about = {
    dockerName: "demo-app",
    dockerVersion: "0.0.1_abc123",
    jenkinsBuildDate: new Date(),
  };
  httpResponse.ok(request, response, templates._about(about, started));
});

/**
 * Health check route.
 */
app.get("/_monitor", function (request, response) {
  httpResponse.ok(
    request,
    response,
    templates._monitor((status = "OK")),
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

/**
 * Crawler access definitions.
 */
app.get("/robots.txt", function (request, response) {
  httpResponse.ok(
    request,
    response,
    templates.robotstxt(),
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

/**
 * Generic error page for 5xx response codes.
 * Includes application information from  /_application.
 */
app.get("/error5xx.html", function (request, response) {
  httpResponse.internalServerError(request, response, badGateway.error5xx());
});

/**
 * Ignore favicons.
 */
app.get("/favicon.ico", function (request, response) {
  httpResponse.noContent(request, response);
});

/**
 * Default route, if no other route is matched (404 Not Found).
 */
app.use(function (request, response) {
  httpResponse.notFound(request, response, templates.error404());
});


app.listen(80, function () {
  console.log("Server started.");
});


```

```json
{
  "name": "demo-app",
  "version": "1.0.0",
  "description": "Demo app for @kth/basic-html-templates",
  "main": "index.js",
  "scripts": {
    "clean": "rm -r ./node_modules && rm package-lock.json"
  },
  "author": "paddy@kth.se",
  "license": "MIT",
  "dependencies": {
    "@kth/basic-html-templates": "^1.0.24",
    "@kth/http-responses": "^1.0.20",
    "express": "^4.17.1"
  }
}

```

Examples:
- https://app.kth.se/
- https://app.kth.se/pipeline/
- https://app.kth.se/jsonschema/
