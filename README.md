# Kosa

## Description

Kosa means "error" in Swahili.

This package introduces a managed scoped Error class.
The Error Object which is instanciated doesn't have stacktrace on purpose.
It is designed to be and stay simple !!!

**Here is an exemple:**

```js
{
  statusCode: 400,
  message: 'USER_REGISTER_BAD_REQUEST', // Comes from scope & status
  meta: { // Optional - contextual information
    error: '...',
    context: '...',
    details: {
      ...
    },
    validations: [
      {
        field: 'email',
        message: 'missing tld'
      }, {
        field: 'firstname',
        message: 'should start with a capital'
      }
    ]
    ...
  }
}
```

## Usage

Here are the constructor arguments:

1. `scope` required string
2. `statusCode` optional number
3. `meta` optional object with contextual information you might want to provide about the error

Here is how you use it in your code.

```js
const Kosa = require('@webinmove/kosa');

if (!user) {
  throw new Kosa('USER', 404);
}

if (vadlidationErrors.length > 0) {
  throw new Kosa('USER_REGISTER', 400, vadlidationErrors);
}
```

### Valid status code

- 400 BAD_REQUEST
- 401 UNAUTHORIZED
- 403 FORBIDDEN
- 404 NOT_FOUND
- 405 METHOD_NOT_ALLOWED
- 408 REQUEST_TIMEOUT
- 409 CONFLICT
- 415 UNSUPPORTED_MEDIA_TYPE
- 418 TEAPOT
- 429 TOO_MANY_REQUESTS
- 500 INTERNAL_SERVER_ERROR (default)
