Feature: API

  Scenario: Verify simple send
    When I send 'GET' request to "https://jsonplaceholder.typicode.com/todos/1" and save response as 'response'
    And I parse "$response" body as json
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'
    Then Response "$response.payload" contains:
      | userId    |
      | id        |
      | title     |
      | completed |
    Then I expect '$response.payload.userId' memory value to be equal '$js(1)'
    Then I expect '$response.payload.id' memory value to be equal '$js(1)'
    Then I expect '$response.payload.title' memory value to be equal 'delectus aut autem'
    Then I expect '$response.payload.completed' memory value to be equal '$js(false)'

  Scenario: Verify simple send with headers as file
    When I send 'GET' request to "https://jsonplaceholder.typicode.com/todos/1" with headers "$json('testData/headers.json')" and save response as 'response'
    And I parse "$response" body as json
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'
    Then Response "$response.payload" contains:
      | userId    |
      | id        |
      | title     |
      | completed |
    Then I expect '$response.payload.userId' memory value to be equal '$js(1)'
    Then I expect '$response.payload.id' memory value to be equal '$js(1)'
    Then I expect '$response.payload.title' memory value to be equal 'delectus aut autem'
    Then I expect '$response.payload.completed' memory value to be equal '$js(false)'

  Scenario: Verify simple send with query
    When I send 'GET' request to "https://jsonplaceholder.typicode.com/posts" with qs "?userId=1" and save response as 'response'
    And I parse "$response" body as json
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'

  Scenario: Verify simple send with query and headers as file
    When I send 'GET' request to "https://jsonplaceholder.typicode.com/posts" with headers "$json('testData/headers.json')" with qs "?userId=1" and save response as 'response'
    And I parse "$response" body as json
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'

  Scenario: Verify error status code 404 Status Code
    When I send 'GET' request to "https://jsonplaceholder.typicode.com/todos/100000" and save response as 'response'
    And I parse "$response" body as json
    Then Response "$response.status" to equal '404'
    And Response "$response.statusText" to equal 'Not Found'

  Scenario: Verify POST with valid request body as Cucumber Doc String
    When I send "POST" request and save response as "response" to "https://jsonplaceholder.typicode.com/posts" with body:
      """
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
      """
    And I parse "$response" body as json
    Then Response "$response.status" to equal '201'
    And Response "$response.statusText" to equal 'Created'

  Scenario: Verify POST with valid request body as Cucumber Doc String and headers as file
    When I send "POST" request and save response as "response" to "https://jsonplaceholder.typicode.com/posts" with headers "$json('testData/headers.json')" with body:
      """
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
      """
    And I parse "$response" body as json
    Then Response "$response.status" to equal '201'
    And Response "$response.statusText" to equal 'Created'

  Scenario: Verify POST with valid request body as file and headers as file
    When I send "POST" request to "https://jsonplaceholder.typicode.com/posts" with headers "$json('testData/headers.json')" with body "$textFile('testData/test_data_file.json')" and save response as "response"
    And I parse "$response" body as json
    Then Response "$response.status" to equal '201'
    And Response "$response.statusText" to equal 'Created'
    And Response "$response.payload" contains:
      | userId |
      | id     |
      | title  |
      | body   |

  Scenario: Verify error status code 404 Status Code
    When I send 'GET' request to "https://jsonplaceholder.typicode.com/todos/1" and save response as 'response'
    And I parse "$response" body as '$js(response => response.json().then(obj => obj.userId))'
    Then I expect "$response.payload" memory value to be equal '$js(1)'

  Scenario: Verify copy response
    When I send 'GET' request to "https://jsonplaceholder.typicode.com/todos/1" and save response as 'response'
    And I copy '$response' response as 'copiedResponse'
    And I parse '$response' body as json
    And I parse '$copiedResponse' body as text