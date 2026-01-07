import Memory from './memory';
import httpServer from './support/httpServer';
import grpcServer from './support/grpcServer';

export default {
  paths: ['test-e2e/features/*.feature'],
  require: [
    'src/*.ts',
    'test-e2e/step-definitions/*.ts',
    'node_modules/@qavajs/steps-memory/index.js'
  ],
  format: [
    ['junit', 'test-e2e/report.xml'],
    '@qavajs/console-formatter',
    ['@qavajs/html-formatter', 'test-e2e/report.html'],
    ['html', 'test-e2e/report2.html']
  ],
  formatOptions: {
    console: {
      showLogs: true
    }
  },
  service: [
    httpServer,
    grpcServer
  ],
  memory: new Memory(),
  parallel: 5
};
