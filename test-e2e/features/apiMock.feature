Feature: API

  Scenario: Verify simple send
    When I send 'POST' request to 'http://localhost:3000/echo' and save response as 'response'
    And I parse "$response" body as json
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'
    Then I expect '$response.payload.uri' memory value to be equal '/echo'

  Scenario: Verify simple send with query
    When I send 'POST' request to 'http://localhost:3000/echo' with qs '?userId=1' and save response as 'response'
    And I parse "$response" body as json
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'
    Then I expect '$response.payload.uri' memory value to be equal '/echo?userId=1'

  Scenario: Verify simple send with query and headers as file
    When I send 'POST' request to 'http://localhost:3000/echo' with headers '$json("testData/other_headers.json")' with qs '?userId=1' and save response as 'response'
    And I parse "$response" body as json
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'
    Then I expect '$response.payload.requestHeaders.customheader' memory value to be equal '42'

  Scenario: Verify POST with valid request body as Cucumber Doc String and headers as file
    When I send 'POST' request to 'https://jsonplaceholder.typicode.com/posts' with headers '$contentType("application/x-www-form-urlencoded; charset=UTF-8")' with body 'qwerty' and save response as 'response'
    And I parse "$response" body as json
    Then Response "$response.status" to equal '201'
    And Response "$response.statusText" to equal 'Created'

  Scenario: Verify simple send and parse it as text
    When I send 'GET' request to 'http://localhost:3000/text' and save response as 'response'
    And I parse '$response' body as text
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'
    Then I expect '$response.payload' memory value to be equal 'hello qavajs'

  Scenario: Verify simple send and parse it as array buffer
    When I send 'GET' request to 'http://localhost:3000/text' and save response as 'response'
    And I parse '$response' body as arrayBuffer
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'
