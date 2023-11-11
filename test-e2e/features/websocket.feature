@debug
Feature: Websocket

  Background:
    When I connect to 'ws://localhost:3000' ws endpoint 'ws'

  Scenario: Save message
    When I save message matching 'qavajs test' from '$ws' ws endpoint as 'message'
    Then I expect '$message.toString()' memory value to be equal 'qavajs test'

  Scenario: Send message
    When I send 'qavajs' message to '$ws' ws endpoint
    And I save message matching 'websocket received' from '$ws' ws endpoint as 'message'
    Then I expect '$message.toString()' memory value to be equal 'websocket received qavajs'
