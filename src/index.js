const statusCodeMap = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  405: 'METHOD_NOT_ALLOWED',
  408: 'REQUEST_TIMEOUT',
  409: 'CONFLICT',
  415: 'UNSUPPORTED_MEDIA_TYPE',
  418: 'TEAPOT',
  429: 'TOO_MANY_REQUESTS',
  500: 'INTERNAL_SERVER_ERROR'
};
const validCodes = Object.keys(statusCodeMap).map(Number);
const util = require('util');

class Kosa {
  constructor (scope, statusCode, meta) {

    if (statusCode) {
      this.statusCode = Number(statusCode);
    } else {
      this.statusCode = 500;
    }

    if (validCodes.indexOf(this.statusCode) === -1) {
      // Throw a real error to have a stacktrace
      throw new Error('MANAGED_ERROR_INVALID_CODE');
    }

    const status = statusCodeMap[this.statusCode];

    if (scope) {
      this.message = [ scope, status ].join('_');
    } else {
      this.message = status;
    }

    this.meta = meta || {};
  }
}
// Can't use extends, since then it must use super() in constructor,
// which create a stacktrace
util.inherits(Kosa, Error);

module.exports = Kosa;

// All codes (not only errors) from:
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// 100 CONTINUE
// 101 SWITCHING_PROTOCOL
// 200 OK
// 201 CREATED
// 202 ACCEPTED
// 203 NON_AUTHORITATIVE_INFORMATION
// 204 NO_CONTENT
// 205 RESET_CONTENT
// 206 PARTIAL_CONTENT
// 300 MULTIPLE_CHOICES
// 301 MOVED_PERMANENTLY
// 302 FOUND
// 303 SEE_OTHER
// 304 NOT_MODIFIED
// 307 TEMPORARY_REDIRECT
// 308 PERMANENT_REDIRECT
// 400 BAD_REQUEST
// 401 UNAUTHORIZED
// 403 FORBIDDEN
// 404 NOT_FOUND
// 405 METHOD_NOT_ALLOWED
// 406 NOT_ACCEPTABLE
// 407 PROXY_AUTHENTICATION_REQUIRED
// 408 REQUEST_TIMEOUT
// 409 CONFLICT
// 410 GONE
// 411 LENGTH_REQUIRED
// 412 PRECONDITION_FAILED
// 413 PAYLOAD_TOO_LARGE
// 414 URI_TOO_LONG
// 415 UNSUPPORTED_MEDIA_TYPE
// 416 RANGE_NOT_SATISFIABLE
// 417 EXPECTATION_FAILED
// 426 UPGRADE_REQUIRED
// 428 PRECONDITION_REQUIRED
// 429 TOO_MANY_REQUESTS
// 431 REQUEST_HEADER_FIELDS_TOO_LARGE
// 451 UNAVAILABLE_FOR_LEGAL_REASONS
// 500 INTERNAL_SERVER_ERROR
// 501 NOT_IMPLEMENTED
// 502 BAD_GATEWAY
// 503 SERVICE_UNAVAILABLE
// 504 GATEWAY_TIMEOUT
// 505 HTTP_VERSION_NOT_SUPPORTED
// 511 NETWORK_AUTHENTICATION_REQUIRED
