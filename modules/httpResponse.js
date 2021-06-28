"use strict";

const contentTypes = {
  PLAIN_TEXT: "text/plain",
  HTML: "text/html",
  JSON: "application/json",
};

const statusCodes = {
  OK: 200,
  NO_CONTENT: 204,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 501,
};

/**
 * Module exports
 */
module.exports = {
  statusCodes: statusCodes,
  contentTypes: contentTypes,
};
