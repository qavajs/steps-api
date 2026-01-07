import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { When } from '@cucumber/cucumber';
import memory from '@qavajs/memory';

/**
 * Loads a gRPC proto file and stores the parsed service definition in memory.
 *
 * This step:
 * - Resolves the proto file path from shared memory
 * - Loads and parses the `.proto` file using `@grpc/proto-loader`
 * - Converts the loaded definition into a gRPC package definition
 * - Stores the resulting service object in memory for later use
 *
 * @step When I load proto file {string} as {string}
 *
 * @param protoPathKey - Memory key that contains the filesystem path to the `.proto` file
 * @param clientKey - Memory key under which the loaded gRPC service definition will be stored
 *
 * @example
 * When I load proto file "userProtoPath" as "UserServiceProto"
 */
When(
  'I load proto file {string} as {string}',
  async (protoPathKey: string, clientKey: string) => {
    const protoPath = await memory.getValue(protoPathKey);

    const packageDefinition = loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });

    const serviceProto = grpc.loadPackageDefinition(packageDefinition) as any;
    memory.setValue(clientKey, serviceProto);
  }
);

/**
 * Creates and stores a gRPC client connected to a specified endpoint.
 *
 * This step:
 * - Retrieves a previously loaded gRPC service definition from memory
 * - Resolves the gRPC endpoint URL from memory
 * - Instantiates a gRPC client using insecure credentials
 * - Stores the connected client in memory for further step usage
 *
 * An error is thrown if the service definition is not found in memory.
 *
 * @step When I connect {string} service to {string} gRPC endpoint as {string}
 *
 * @param protoKey - Memory key that contains the loaded gRPC service constructor
 * @param urlKey - Memory key that contains the gRPC endpoint URL
 * @param clientKey - Memory key under which the created gRPC client will be stored
 *
 * @throws Error if the service definition is not defined in memory
 *
 * @example
 * When I connect "UserServiceProto" service to "grpcEndpoint" gRPC endpoint as "UserServiceClient"
 */
When(
  'I connect {string} service to {string} gRPC endpoint as {string}',
  async (protoKey: string, urlKey: string, clientKey: string) => {
    const service = await memory.getValue(protoKey);

    if (service === undefined) {
      throw new Error(`${protoKey} service is not defined`);
    }

    const client = new service(
      await memory.getValue(urlKey),
      grpc.credentials.createInsecure()
    );

    memory.setValue(clientKey, client);
  }
);
