Feature: gRPC

  @debug
  Scenario: invoke grpc
    When I load proto file 'test-e2e/support/greeter.proto' as 'proto'
    And I connect '$proto.greeter.Greeter' service to 'localhost:50051' gRPC endpoint as 'greeter'
    And I save '$grpcCall($greeter, "SayHello", { name: "qavajs" })' to memory as 'response'
    Then I expect '$response.message' memory value to be equal 'Hello, qavajs!'