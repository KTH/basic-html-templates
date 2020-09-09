# Basic Html Templates ![alt text](https://api.travis-ci.org/KTH/basic-html-templates.svg?branch=master)

A simple way to get web pages to look somewhat like the kth.se design. The templates are intended to be used in private to semiprivate services.


```javascript
const express = require("express");
const httpResponse = require("@kth/http-responses");
const app = express();

app.get("/", function (request, response) {
  httpResponse.ok(request, response, "Hello world!");
});

/**
 * Health check route.
 */
app.get("/_heartbeat", function (request, response) {
  httpResponse.ok(
    request,
    response,
    "OK - alive and kicking",
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

app.get("/error5xx.html", function (request, response) {
  httpResponse.internalServerError(request, response, "Internal Server Error");
});

app.get("/favicon.ico", function (request, response) {
  httpResponse.noContent(request, response);
});

app.use(function (request, response) {
  httpResponse.notFound(request, response, templates.error404());
});

```

Examples:
- https://app.kth.se/
- https://app.kth.se/pipeline/
- https://app.kth.se/jsonschema/
