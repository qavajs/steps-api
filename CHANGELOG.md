# Change Log

All notable changes to the "@qavajs/steps-api" will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

:rocket: - new feature

:beetle: - bugfix

:x: - deprecation/removal

:pencil: - chore 

:microscope: - experimental

## [2.4.0]
- added step to copy response
```Gherkin
When I send 'GET' request to "https://jsonplaceholder.typicode.com/todos/1" and save response as 'response'
And I copy '$response' response as 'copiedResponse'
And I parse '$response' body as json
And I parse '$copiedResponse' body as text
```

Breaking Change
- all entries of `Body` replaced with lowercase `body`

## [2.3.0]
- :rocket: added capability to print curl for debugging

## [2.2.0]
- :rocket: added `I parse {value} body as {value}` step allow providing custom response parser
```gherkin
When I parse "$response" body as "$soap"
Then I expect "$response.payload['soap:envelope']" to equal "bar"
```
where `soap` is function in memory
```typescript
import { XMLParser } from 'fast-xml-parser';
const xml = new XMLParser();
class Data {
  soap = async response => {
    const text = await response.text();
    return xml.parse(text);
  }
}
```

## [2.1.0]
- :rocket: added source maps
- :beetle: fixed publishing workflow

## [2.0.0]
- :rocket: migrated on @qavajs/core v2

## [0.20.0]
- :rocket: improved request and response reporting

## [0.19.0]
Breaking change: moved _@qavajs/validation_ to peer dependencies
After update please install latest version of @qavajs/validation package

## [0.18.1]
- fixed header assign order

## [0.18.0]
- added support of GraphQL along with specific steps:
  - _I create GraphQL request {string}_
  - _I add {gqlRequestProperty} to GraphQL {string}:_

## [0.17.0]
- added experimental support of websockets (API may change in future)

Breaking Change
- migrated to native fetch
- dropped support of node16

## [0.16.0]
- removed chai from dependencies
- fixed issue with attaching non string responses

## [0.15.0]
- added request/response logging
- fixed issue with optional contentType and filename in form data step

## [0.0.14]
- added undefined payload handler
- added _I add form data body_ step
- added match schema validation
  
## [0.0.13]
- added construction api steps

## [0.0.12]
- added logs to validation steps
- removed hook

## [0.0.11]
- added step for parsing response body with needed type

## [0.0.10]
- removed headers parameter type. Moved logic step signature

## [0.0.9]
- removed JSON stringify from body send

## [0.0.7]
- fixed step definition for sending requests with requestBody as DOC Cucumber String 
- added step definition to verify response status message
- added e2e test

## [0.0.6]
- :beetle: fixed issue with api service import
