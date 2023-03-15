Feature: API

  Scenario: Verify simple send
    When I send 'POST' request to 'http://qavajsmock.org/echo' and save response as 'response'
    And I parse "$response" body as json
    Then Response '$response' Status Code to be equal '200'
    And Response '$response' Status Message to be equal 'OK'
    Then I expect '$response.payload.uri' memory value to be equal '/echo'

  Scenario: Verify simple send with query
    When I send 'POST' request to 'http://qavajsmock.org/echo' with qs '?userId=1' and save response as 'response'
    And I parse "$response" body as json
    Then Response '$response' Status Code to be equal '200'
    And Response '$response' Status Message to be equal 'OK'
    Then I expect '$response.payload.uri' memory value to be equal '/echo?userId=1'

  Scenario: Verify simple send with query and headers as file
    When I send 'POST' request to 'http://qavajsmock.org/echo' with headers '$json("testData/other_headers.json")' with qs '?userId=1' and save response as 'response'
    And I parse "$response" body as json
    Then Response '$response' Status Code to be equal '200'
    And Response '$response' Status Message to be equal 'OK'
    Then I expect '$response.payload.requestHeaders.customheader' memory value to be equal '$array("42")'

  Scenario: Verify POST with valid request body as Cucumber Doc String and headers as file
    When I send 'POST' request to 'https://jsonplaceholder.typicode.com/posts' with headers '$contentType("application/x-www-form-urlencoded; charset=UTF-8")' with Body 'qwerty' and save response as 'response'
    And I parse "$response" body as json
    Then Response '$response' Status Code to be equal '201'
    And Response '$response' Status Message to be equal 'Created'
