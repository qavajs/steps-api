# API Action Steps

### I send {string} request to {landingUrl}{headers} and save response as {string} &#9989;

Send request to the endpoint

| param  |  type  |   description                               |
|:-----: |:------:|:---------------:                            |
| method | string | request method                              |
| url    | string | endpoint url                                |
| headers| Object | object with headers (optional)              |
| key    | string | key that should be used for saving response |
example:
```gherkin
   When I send "GET" request to "$BASE_API_URL" with headers "$headers" and save response as "response"
```
---
### I send {string} request to {landingUrl}{headers} with qs {string} and save response as {string} &#9989;

Send request to the endpoint with query string

| param  |  type  |   description                               |
|:-----: |:------:|:---------------:                            |
| method | string | request method                              |
| url    | string | endpoint url                                |
| headers| Object | object with headers (optional)              |
| params | string | query string parameters                     |
| key    | string | key that should be used for saving response |
example:
```gherkin
   When I send "GET" request to "https://www.some_service.com/some_endpoint" with qs "?category=HR&name=test" and save response as "response"
```
---
### I send {string} request to {landingUrl}{headers} with Body {json} and save response as {string} &#9989;

Send request with body

| param       |  type  |   description                               |
|:-----:      |:------:|:---------------:                            |
| method      | string | request method                              |
| url         | string | endpoint url                                |
| headers     | Object | object with headers (optional)              |
| requestBody | JSON   | request body                                |
| key         | string | key that should be used for saving response |
example:
```gherkin
   When I send "POST" request to "$BASE_API_URL" with Body "test_data_file.json" and save response as "response"
```
---
### I send {string} request to {landingUrl}{headers} with qs {string} and Body {json} and save response as {string} &#9989;

Send request with body and query string

| param       |  type  |   description                               |
|:-----:      |:------:|:---------------:                            |
| method      | string | request method                              |
| url         | string | endpoint url                                |
| headers     | Object | object with headers (optional)              |
| params      | string | query string parameters                     |
| requestBody | JSON   | request body                                |
| key         | string | key that should be used for saving response |
example:
```gherkin
   When I send "PUT" request to "https://www.some_service.com/some_endpoint/" with qs "?category=HR&name=test" and Body "test_data_file.json" and save response as "response"
```
---
### I send {string} request and save response as {string} to {landingUrl}{headers} with Body: &#9989;

Send request with body that given as part of Cucumber step

| param       |  type  |   description                               |
|:-----:      |:------:|:---------------:                            |
| method      | string | request method                              |
| url         | string | endpoint url                                |
| headers     | Object | object with headers (optional)              |
| requestBody | JSON   | request body                                |
| key         | string | key that should be used for saving response |
example:
```gherkin
   When I send "POST" request and save response as "response" to "$BASE_API_URL" with Body:
   """
   {
      "title": "Test Post Request with Body passed as string"
   }
   """
```
