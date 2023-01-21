Feature: API

  Scenario: Verify simple send
    When I send 'GET' request to "https://jsonplaceholder.typicode.com/todos/1" and save response as 'response'
    Then Response "$response" Status Code to be equal '200'
    Then Response "$response.payload" contains:
      | userId    |
      | id        |
      | title     |
      | completed |
    Then I expect '$response.payload.userId' memory value to be equal '$number(1)'
    Then I expect '$response.payload.id' memory value to be equal '$number(1)'
    Then I expect '$response.payload.title' memory value to be equal 'delectus aut autem'
    Then I expect '$response.payload.completed' memory value to be equal '$boolean("false")'
