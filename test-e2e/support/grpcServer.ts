import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'node:path';

const protoPath = join(__dirname, 'greeter.proto');

const packageDefinition = loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const serviceProto = grpc.loadPackageDefinition(packageDefinition) as any;

function sayHello(call: any, callback: any) {
  const name = call.request.name;

  callback(null, {
    message: `Hello, ${name}!`
  });
}

class Service {
  server: any;
  before() {
    this.server = new grpc.Server();

    this.server.addService(serviceProto.greeter.Greeter.service, {
      SayHello: sayHello
    });

    const PORT = '0.0.0.0:50051';

    this.server.bindAsync(
      PORT,
      grpc.ServerCredentials.createInsecure(),
      () => {
        console.log(`gRPC server running at ${PORT}`);
      }
    );
  };
  after() {
    this.server.forceShutdown();
  }
}

export default new Service();