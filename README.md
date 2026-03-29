# @qavajs/steps-api

[![npm](https://img.shields.io/npm/v/@qavajs/steps-api)](https://www.npmjs.com/package/@qavajs/steps-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

BDD step library for testing REST, GraphQL, and WebSocket APIs as part of the [qavajs](https://github.com/qavajs) framework. Steps are written in Gherkin and executed via Cucumber.

## Installation

```bash
npm install @qavajs/steps-api
```

## Configuration

Register the library in your qavajs config:

```typescript
export default {
    require: [
        'node_modules/@qavajs/steps-api/index.js'
    ]
}
```

---

## Steps

### Direct HTTP Requests

Send a request and save the response to memory for later use. Memory values are referenced with `$` prefix.

---

#### Send request

```gherkin
When I send "GET" request to "$BASE_URL/users" and save response as "response"
```

---

#### Send request with headers

```gherkin
When I send "GET" request to "$BASE_URL/users" with headers "$headers" and save response as "response"
```

---

#### Send request with query string

```gherkin
When I send "GET" request to "$BASE_URL/users" with qs "?role=admin" and save response as "response"
```

---

#### Send request with headers and query string

```gherkin
When I send "GET" request to "$BASE_URL/users" with headers "$headers" with qs "?role=admin" and save response as "response"
```

---

#### Send request with body

```gherkin
When I send "POST" request to "$BASE_URL/users" with body "$textFile('payload.json')" and save response as "response"
```

---

#### Send request with headers and body

```gherkin
When I send "POST" request to "$BASE_URL/users" with headers "$headers" with body "$textFile('payload.json')" and save response as "response"
```

---

#### Send request with query string and body

```gherkin
When I send "PUT" request to "$BASE_URL/users" with qs "?id=1" and body "$textFile('payload.json')" and save response as "response"
```

---

#### Send request with body as DocString

```gherkin
When I send "POST" request and save response as "response" to "$BASE_URL/users" with body:
  """
  {
    "name": "John",
    "email": "john@example.com"
  }
  """
```

---

#### Send request with headers and body as DocString

```gherkin
When I send "POST" request and save response as "response" to "$BASE_URL/users" with headers "$headers" with body:
  """
  { "name": "John" }
  """
```

---

### Request Construction

Build a request step-by-step before sending. Useful for complex or reusable request setups.

---

#### Create request template

```gherkin
When I create "POST" request "myRequest"
```

---

#### Add headers from DataTable

```gherkin
When I add headers to "$myRequest":
  | Content-Type  | application/json |
  | Authorization | Bearer $token    |
```

---

#### Add headers from memory

```gherkin
When I add "$headers" headers to "$myRequest"
```

---

#### Add body as DocString

```gherkin
When I add body to "$myRequest":
  """
  { "name": "John" }
  """
```

---

#### Add body from memory

```gherkin
When I add "$body" body to "$myRequest"
```

---

#### Add form data body

Supports file uploads via the `filename` and `contentType` columns.

```gherkin
When I add form data body to "$myRequest":
  | key     | value                      | filename | contentType      |
  | name    | John                       |          | text/plain       |
  | avatar  | $file('./path/avatar.png') | avatar.png | image/png      |
```

---

#### Add URL

```gherkin
When I add "$BASE_URL/users" url to "$myRequest"
```

---

#### Send constructed request

```gherkin
When I send "$myRequest" request and save response as "response"
```

---

### GraphQL Requests

---

#### Create GraphQL request template

```gherkin
When I create GraphQL request "gqlRequest"
```

---

#### Add query

```gherkin
When I add query to GraphQL "$gqlRequest":
  """
  query {
    users {
      id
      name
    }
  }
  """
```

---

#### Add variables

```gherkin
When I add variables to GraphQL "$gqlRequest":
  """
  { "id": 1 }
  """
```

---

#### Send GraphQL request

GraphQL requests use the same send step as constructed requests:

```gherkin
When I add "$BASE_URL/graphql" url to "$gqlRequest"
When I send "$gqlRequest" request and save response as "response"
```

---

### Response Parsing

Parse the response body before accessing its contents. This step is required before using `$response.payload`.

---

#### Parse body with built-in parser

Supported types: `json`, `text`, `blob`, `formData`, `arrayBuffer`

```gherkin
When I parse "$response" body as json
```

---

#### Parse body with custom parser

Use a memory reference to a parser function. Useful for XML, SOAP, or other formats.

```gherkin
When I parse "$response" body as "$xmlParser"
```

Where `$xmlParser` resolves to a function `async (response) => parsedData`.

---

#### Clone response

Use when the response body needs to be read more than once (the Fetch API body can only be consumed once).

```gherkin
When I clone "$response" response as "responseCopy"
```

---

### Response Verification

---

#### Verify property value

```gherkin
Then Response "$response.payload.name" equals to "John"
Then Response "$response.payload.status" to contain "active"
```

---

#### Verify property type

```gherkin
Then Response type "$response.payload.items" equals to "array"
Then Response type "$response.payload.count" equals to "number"
```

---

#### Verify array size

Supports validations: `equals to`, `to be above`, `to be below`

```gherkin
Then Response "$response.payload.items" size equals to "5"
Then Response "$response.payload.items" size to be above "0"
```

---

#### Verify object contains properties

```gherkin
Then Response "$response.payload.user" contains:
  | id    |
  | name  |
  | email |
```

When applied to an array, each element is checked against the listed properties.

---

### WebSocket

---

#### Connect to WebSocket endpoint

```gherkin
When I connect to "$WS_URL" ws endpoint "wsConnection"
```

---

#### Receive next message

```gherkin
When I save message from "$wsConnection" ws endpoint as "wsMessage"
```

---

#### Receive message matching pattern

```gherkin
When I save message matching "orderCreated" from "$wsConnection" ws endpoint as "wsMessage"
```

The pattern is matched as a RegExp against incoming messages.

---

#### Send message

```gherkin
When I send "$payload" message to "$wsConnection" ws endpoint
```

---

#### Send message as DocString

```gherkin
When I send message to "$wsConnection" ws endpoint:
  """
  { "action": "subscribe", "channel": "orders" }
  """
```

---

#### Close connection

```gherkin
When I close "$wsConnection" ws connection
```

---

## Examples

### GET request with JSON response validation

```gherkin
Scenario: Get user by ID
  When I send "GET" request to "$BASE_URL/users/1" and save response as "response"
  And I parse "$response" body as json
  Then Response "$response.payload.id" equals to "1"
  And Response "$response.payload.name" equals to "John"
```

---

### POST request with DocString body

```gherkin
Scenario: Create a user
  When I send "POST" request and save response as "response" to "$BASE_URL/users" with body:
    """
    {
      "name": "Jane",
      "email": "jane@example.com"
    }
    """
  And I parse "$response" body as json
  Then Response "$response.payload.name" equals to "Jane"
```

---

### Constructed request with headers and body

```gherkin
Scenario: Update a user
  When I create "PUT" request "updateRequest"
  And I add headers to "$updateRequest":
    | Content-Type  | application/json  |
    | Authorization | Bearer $authToken |
  And I add body to "$updateRequest":
    """
    { "name": "Updated Name" }
    """
  And I add "$BASE_URL/users/1" url to "$updateRequest"
  And I send "$updateRequest" request and save response as "response"
  And I parse "$response" body as json
  Then Response "$response.payload.name" equals to "Updated Name"
```

---

### GraphQL request

```gherkin
Scenario: Query users via GraphQL
  When I create GraphQL request "gqlRequest"
  And I add query to GraphQL "$gqlRequest":
    """
    query {
      users { id name }
    }
    """
  And I add "$BASE_URL/graphql" url to "$gqlRequest"
  And I send "$gqlRequest" request and save response as "response"
  And I parse "$response" body as json
  Then Response "$response.payload.data.users" size to be above "0"
```

---

### WebSocket communication

```gherkin
Scenario: Receive a message from WebSocket
  When I connect to "$WS_URL" ws endpoint "ws"
  And I send "$ping" message to "$ws" ws endpoint
  And I save message from "$ws" ws endpoint as "wsMessage"
  Then I expect "$wsMessage" memory value to equal "pong"
  And I close "$ws" ws connection
```