"use strict";

const os = require("os");
const defaults = require("./defaults");
const packageJson = require("../package.json");
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
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="description" content="${title}">
    ${defaults.applicationInsights()}
    ${defaults.css()}
    <script src="//www.kth.se/social/toolbar/widget.js"></script>
  </head>
  <body>

  <body class="use-personal-menu">
    <header>
      <a class="skipToMainContent" href="#mainContent" tabindex="0">Till innehåll på sidan</a>
      <div class="container-fluid">
        <div class="container">
          <div class="header-container__top">
            <figure class="block figure defaultTheme mainLogo" aria-label="Till KTH:s startsida">
              <a href="https://www.kth.se" id="home-logotype"><img class="figure-img img-fluid" src="${defaults.logotype()}" alt="Till KTH:s startsida" title="KTH_Logotyp_RGB_2013-2.svg" height="70" width="70"></a>
            </figure>
          </div>
          <div class="header-container__bottom"></div>
        </div>
      </div>
      <div id="gradientBorder"></div>
    </header>
    <div class="container main">
      <div class="row">
        <div class="col app">
          <div id="app">
            <main id="mainContent">
    `;
};

/**
 * Footer html
 */
let footer = function footer(statusCode) {
  let statusCodeParagraph = `<p class="small">(Statuskod: ${statusCode}) </p>`;
  if (statusCode === statusCodes.OK) {
    statusCodeParagraph = "";
  }

  return `
              ${statusCodeParagraph}
            </main>
          </div>
        </div>
      </div>
    </div>

    <footer class="container"></footer>

    <script>
      window.addEventListener('load', function() {
        var skipLink = document.querySelector('a.skipToMainContent');
        if (skipLink && skipLink !== document.body.firstElementChild) {
          document.body.insertBefore(skipLink, document.body.firstElementChild);
        }
      })
    </script>
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
 * 403 forbidden page
 */
let forbidden = function error404(
  title = "You are not allowed to access this content"
) {
  return `
    ${header(title)}
        <h1>🔐 Forbidden to access.</h1>
        <h2>Sorry, You do not have the permissions needed to access this content</h2>
        <p>If You should please contact the administrator for this service.</p> 
    ${footer(statusCodes.FORBIDDEN)}
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
  return `# ${packageJson.name}\nUser-agent: *\n${disallow}`;
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
  forbidden: forbidden,
  _monitor: _monitor,
  _about: _about,
  robotstxt: robotstxt,
};
