# Basic Html Templates ![alt text](https://api.travis-ci.org/KTH/basic-html-templates.svg?branch=master)

A simple way to get web pages to look somewhat like the kth.se design. The templates are intended to be used in private to semiprivate services.

## Example
```javascript

// index.js
const express = require("express");
const httpResponse = require("@kth/http-responses");
const app = express();

app.get("/", function (request, response) {
  httpResponse.ok(request, response, "<!DOCTYPE html><h1>Hello world!<h1>");
});

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
  httpResponse.notFound(request, response, "Page not found");
});

app.listen(80, function () {
  console.log("Server started");
});

```

```json
// package.json
{
  "name": "Demo",
  "version": "1.0.0",
  "description": "Demo app for @kth/http-responses",
  "main": "index.js",
  "scripts": {
  },
  "author": "paddy",
  "license": "ISC",
  "dependencies": {
    "@kth/http-responses": "^1.0.20",
    "express": "^4.17.1"
  }
}
```

Examples:
- https://app.kth.se/
- https://app.kth.se/pipeline/
- https://app.kth.se/jsonschema/
