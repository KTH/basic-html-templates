/* eslint-env mocha */
"use strict";

// Testing libraries
const expect = require("chai").expect;
const templates = require("../modules/templates");

describe("Template paths handling\n", function() {
  it("Path '/' should contain the public application name.", function() {
    expect(templates.index("My app")).to.contain("My app");
  });

  it("Path 'error404' should contain a default message.", function() {
    expect(templates.error404()).to.contain("Page not found");
  });

  it("Path '/error404' should contain a title if passed.", function() {
    expect(templates.error404("A custom title")).to.contain("A custom title");
  });

  it("Path '/_monitor' must be passed a status ('OK', 'ERROR') or show 'APPLICATION_STATUS: MISSING_STATUS'.", function() {
    expect(templates._monitor()).to.contain(
      "APPLICATION_STATUS: MISSING_STATUS"
    );
  });

  it("Path '/_monitor' should default contain passed status code 'APPLICATION_STATUS: MY_CODE'.", function() {
    expect(templates._monitor("MY_CODE")).to.contain(
      "APPLICATION_STATUS: MY_CODE"
    );
  });

  it("Path '/_monitor' should contain any extra lines passed as extras.", function() {
    expect(templates._monitor("OK", "\nhej"))
      .to.contain("APPLICATION_STATUS: OK")
      .and.to.contain("\nhej");
  });

  it("Path '/_monitor' should 'APPLICATION_STATUS: ERROR' if 'ERROR' passed.", function() {
    expect(templates._monitor("ERROR")).to.contain("APPLICATION_STATUS: ERROR");
  });

  it("Path '/robots.txt' should disallow all indexing as default.", function() {
    expect(templates.robotstxt()).to.equal("User-agent: *\nDisallow: /");
  });

  it("Path '/robots.txt' can disallow specific paths.", function() {
    expect(templates.robotstxt("Disallow: /tmp/")).to.equal(
      "User-agent: *\nDisallow: /tmp/"
    );
  });

  it("Path '/_about' should display build information.", function() {
    const mock = {
      gitBranch: "origin/master",
      gitCommit: "cc3a60cc2a062dcbe8e71c662c7aa4502871fa17",
      gitUrl: "git@github.com:KTH/tamarack.git",
      jenkinsBuild: "144",
      jenkinsBuildDate: "2020-03-24 14:12:52",
      dockerName: "tamarack",
      dockerVersion: "2.6.144_cc3a60c",
      dockerImage: "kthregistryv2.sys.kth.se/tamarack:2.6.144_cc3a60c"
    };
    expect(templates._about(mock, Date.now())).to.contain(
      "<p><strong>Docker image:</strong> tamarack:2.6.144_cc3a60c</p>"
    );
  });

  it("Path '/_about' should display when the service was stared started is passed.", function() {
    const mock = {
      gitBranch: "origin/master",
      gitCommit: "cc3a60cc2a062dcbe8e71c662c7aa4502871fa17",
      gitUrl: "git@github.com:KTH/tamarack.git",
      jenkinsBuild: "144",
      jenkinsBuildDate: "2020-03-24 14:12:52",
      dockerName: "tamarack",
      dockerVersion: "2.6.144_cc3a60c",
      dockerImage: "kthregistryv2.sys.kth.se/tamarack:2.6.144_cc3a60c"
    };
    const started = Date.now();
    expect(templates._about(mock, started)).to.contain(
      `<p><strong>Started:</strong> ${started}</p>`
    );
  });
});

describe("Defaults and overrides\n", function() {
  it("The Application Insights script is not added then the env 'APPINSIGHTS_INSTRUMENTATIONKEY' is missing.", function() {
    expect(templates.index()).to.not.contain("instrumentationKey");
  });

  it("The Application Insights script is added to the head tag when env 'APPINSIGHTS_INSTRUMENTATIONKEY' is set.", function() {
    const key = "abcd-1234-efghi";
    process.env.APPINSIGHTS_INSTRUMENTATIONKEY = key;
    expect(templates.index()).to.contain(key);
  });

  it("All pages should contain env Application Insights key 'APPINSIGHTS_INSTRUMENTATIONKEY' if set.", function() {
    const key = "abcd-1234-efghi";
    process.env.APPINSIGHTS_INSTRUMENTATIONKEY = key;
    expect(templates.index()).to.contain(key);
    expect(templates.error404()).to.contain(key);
    delete process.env.APPINSIGHTS_INSTRUMENTATIONKEY;
  });

  it("As default the logo is fetched from www.ktk.se.", function() {
    expect(templates.index()).to.contain(
      "https://www.kth.se/polopoly_fs/1.77257!/KTH_Logotyp_RGB_2013-2.svg"
    );
  });

  it("You can override the default logo by passing a env 'LOGOTYPE_URI'.", function() {
    process.env.LOGOTYPE_URI = "https://www.kth.se/img/logo.svg";
    expect(templates.index()).to.contain(
      'src="https://www.kth.se/img/logo.svg"'
    );
    delete process.env.LOGOTYPE_URI;
  });

  it("As default the CSS style is included in the html.", function() {
    expect(templates.index()).to.contain("Default style");
  });

  it("You can override the default CSS style by passing a env 'CSS_URI'.", function() {
    process.env.CSS_URI = "https://www.kth.se/css/style.css";
    expect(templates.index()).to.contain(
      '<link rel="stylesheet" href="https://www.kth.se/css/style.css" />'
    );
    delete process.env.CSS_URI;
  });
});
