Feature: Construction API

  Scenario: GraphQL send
    Given I create GraphQL request 'request'
    And I add 'https://rickandmortyapi.com/graphql' url to '$request'
    And I add query to GraphQL '$request':
    """
    query {  characters(page: 2, filter: { name: "rick" }) {
      results { name }
         }
      }
    """
    And I send '$request' request and save response as 'response'
    And I parse '$response' body as json
    Then Response "$response.status" to equal '200'

  Scenario: Verify simple send
    Given I create 'GET' request 'request'
    And I add 'https://jsonplaceholder.typicode.com/todos/1' url to '$request'
    And I send '$request' request and save response as 'response'
    And I parse '$response' body as json
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'
    Then Response '$response.payload' contains:
      | userId    |
      | id        |
      | title     |
      | completed |
    Then I expect '$response.payload.userId' memory value to be equal '$js(1)'
    Then I expect '$response.payload.id' memory value to be equal '$js(1)'
    Then I expect '$response.payload.title' memory value to be equal 'delectus aut autem'
    Then I expect '$response.payload.completed' memory value to be equal '$js(false)'

  Scenario: Verify POST with valid request body as Cucumber Doc String
    Given I create 'POST' request 'request'
    And I add 'https://jsonplaceholder.typicode.com/posts' url to '$request'
    And I add body to '$request':
    """
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
    """
    And I send '$request' request and save response as 'response'
    And I parse '$response' body as json
    Then Response "$response.status" to equal '201'
    And Response "$response.statusText" to equal 'Created'

  Scenario: Verify POST with valid request body as file
    Given I create 'POST' request 'request'
    And I add 'https://jsonplaceholder.typicode.com/posts' url to '$request'
    And I add '$textFile("testData/test_data_file.json")' body to '$request'
    And I add headers to '$request':
      | Content-Type | application/json |
    And I send '$request' request and save response as 'response'
    And I parse '$response' body as json
    Then Response "$response.status" to equal '201'
    And Response "$response.statusText" to equal 'Created'
    And Response '$response.payload' contains:
      | userId |
      | id     |
      | title  |
      | body   |

  Scenario: Verify POST with headers
    Given I create 'POST' request 'request'
    And I add 'http://localhost:3000/echo' url to '$request'
    And I add headers to '$request':
      | customHeader | 42 |
    And I send '$request' request and save response as 'response'
    And I parse '$response' body as json
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'
    Then I expect '$response.payload.requestHeaders.customheader' memory value to be equal '42'

  Scenario: Verify simple send and parse it as text
    When I create 'GET' request 'request'
    And I add 'http://localhost:3000/text' url to '$request'
    And I send '$request' request and save response as 'response'
    And I parse '$response' body as text
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'
    Then I expect '$response.payload' memory value to be equal 'hello qavajs'

  Scenario: Verify form data body
    When I create 'POST' request 'request'
    And I add 'http://localhost:3000/echo' url to '$request'
    And I add headers to '$request':
      | Content-Type | multipart/form-data |
    And I add form data body to '$request':
      | key     | value | contentType |
      | someKey | 42    | text/plain  |
    And I send '$request' request and save response as 'response'
    And I parse '$response' body as json
    Then Response "$response.status" to equal '200'
    And Response "$response.statusText" to equal 'OK'
    Then I expect '$response.payload.requestBody' memory value to contain 'Content-Disposition: form-data; name="someKey"'
    And I expect '$response.payload.requestBody' memory value to contain 'Content-Type: text/plain'
    And I expect '$response.payload.requestBody' memory value to contain '42'
