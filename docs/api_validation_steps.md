# Validation Steps

---
### Response {response} Status Code {apiValidation} {string} &#9989;

Verify response status code

|     param     |   type   |        description         |
|:-----------:  |:--------:|:--------------------------:|
| response      | Response | saved response             |
| apiValidation | Function | function to wait condition |
| statusCode    | string   | expected status code       |
example:
```gherkin
    Then Response "$response" Status Code equals to "200"
```

---
### Response {response} contains: &#9989;

Verify that response contains needed properties

|     param     |     type  |          description          |
|:-------------:|:---------:|:-----------------------------:|
|  property     | Any       | property from saved response  |
|  dataTable    | Object    | data table with all properties|
example:
```gherkin
    Then Response "$response.payload.data.items" contains:
      | _id               |
      | appId             |
      | serviceCategory   |
```

---
### Response {response} {apiValidation} {string} &#9989;

Verifying that response model has necessary type

|     param     |   type   |        description         |
|:-------------:|:--------:|:--------------------------:|
| response      | Response | saved response             |
| apiValidation | Function | function to wait condition |
| type          | string   | expected property type     |

example:
```gherkin
   Then Response "$response.payload.data.items" equals to "array"
```
---
### Response {response} size {apiValidation} {string} &#9989;

Verify that response array size is equal to|less than|greater than given number

|     param    |   type   |        description         |
|:------------:|:--------:|:--------------------------:|
| response     | Response | saved response             |
| apiValidation| Function | function to wait condition |
| expectedValue| string   | expected property size     |

example:
```gherkin
    Then Response "$response.payload.data.items" size to be above "0"
```
---
### I verify response {response} {apiValidation} {string} &#9989;

Execute any jsonPath query against response and verify result is equal to expected value

|     param    |   type   |        description         |
|:------------:|:--------:|:--------------------------:|
| response     | Response | saved response             |
| apiValidation| Function | function to wait condition |
| expectedValue| string   | expected property value    |

example:
```gherkin
    Then I verify response "$response.payload.data.items[0].title" equals to "TEST"
```
