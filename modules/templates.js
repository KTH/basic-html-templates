"use strict";

const os = require("os");
const defaults = require("./defaults");
const { statusCodes } = require("./httpResponse");

let servedBy = function servedBy(title) {
  return process.env.APPLICATION_NAME ? process.env.APPLICATION_NAME : title;
};
/**
 * Header html
 */
let header = function header(title) {
  return `<!DOCTYPE html>
    <!-- Served by ${servedBy(title)} -->
    <html lang="en">
    <head>
        <title>${title} | KTH</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,shrink-to-fit=no">
        ${defaults.applicationInsights()}
        ${defaults.css()}
    </head>
    <body>

    <div class="wrapper">
        <a href="https://www.kth.se/" id="home-logotype"><img width=76 height=76 src="${defaults.logotype()}" alt="KTH Logotype"></a>
`;
};

/**
 * Footer html
 */
let footer = function footer(statusCode) {
  let statusCodeParagraph = `<p class="small">For all you techies, yes that means response code ${statusCode} </p>`;
  if (statusCode === statusCodes.OK) {
    statusCodeParagraph = "";
  }

  return `${statusCodeParagraph}
            </div>
        </body>
    </html>
`;
};

/**
 * 404 error page
 */
let error404 = function error404(title = "Page not found") {
  return `
    ${header(title)}
        <h1>Sorry, we have nothing to show for the web address you entered.</h1>
        <h2>The service may have been moved or deleted.</h2>
        <p>Please also check the web address for proper spelling and capitalization, or try
        <a href="https://www.kth.se/search/">searching for it</a>.</p>
    ${footer(statusCodes.NOT_FOUND)}
    `;
};

/**
 * Index page.
 */
let index = function index(title, body) {
  if (!body) {
    body = `
    <h1>${title}</h1>
    <p>
      There is really nothing to see here, go to
      <a href="https://www.kth.se/">the KTH main site</a> instead. Much more interesting, hopefully ...
    </p>`;
  }
  return `
    ${header(title)}
    ${body}
    ${footer(statusCodes.OK)}
    `;
};

/**
 * General page.
 */
let page = function page(title, body = "") {
  return `
    ${header(title)}
    ${body}
    ${footer(statusCodes.OK)}`;
};

/**
 * robots.txt
 */
let robotstxt = function robotstxt(disallow = "Disallow: /") {
  return `# @kth/basic-html-templates\nUser-agent: *\n${disallow}`;
};

/**
 * Monitor page
 */
let _monitor = function _monitor(status, extras = "") {
  if (!status) {
    status = "MISSING_STATUS";
  }
  return `APPLICATION_STATUS: ${status}
HOSTNAME: ${os.hostname()}\n${extras}`;
};

/**
 * About page
 */
let _about = function _about(about, started) {
  return `
    ${header(about.dockerName)}
            <p><strong>Docker image:</strong> ${about.dockerName}:${
    about.dockerVersion
  }</p>
            <p><strong>Hostname:</strong> ${os.hostname()}</p>
            <p><strong>Build date:</strong> ${about.jenkinsBuildDate}</p>
            <p><strong>Started:</strong> ${started}</p>
        </div>
    </body>
    </html>
    `;
};

/**
 * Module exports
 */
module.exports = {
  index: index,
  page: page,
  header: header,
  footer: footer,
  error404: error404,
  _monitor: _monitor,
  _about: _about,
  robotstxt: robotstxt,
};
