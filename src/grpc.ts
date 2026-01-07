import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { MemoryValue, When } from '@qavajs/core';

When('I load proto file {value} as {value}', async (protoPathKey: MemoryValue, clientKey: MemoryValue) => {
  const packageDefinition = loadSync(await protoPathKey.value(), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
  const serviceProto = grpc.loadPackageDefinition(packageDefinition) as any;
  clientKey.set(serviceProto);
});

When('I connect {value} service to {value} gRPC endpoint as {value}', async (protoKey: MemoryValue, urlKey: MemoryValue, clientKey: MemoryValue) => {
  const service = await protoKey.value();
  if (service === undefined) {
    throw new Error(`${protoKey.expression} service is not defined`);
  }
  const client = new service(
    await urlKey.value(),
    grpc.credentials.createInsecure()
  );
  clientKey.set(client);
});