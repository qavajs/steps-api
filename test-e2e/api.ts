import Memory from './memory';
import localServer from './support/server';

export default {
    paths: ['test-e2e/features/*.feature'],
    require: ['src/*.ts', 'test-e2e/step-definitions/*.ts'],
    api: {
      logPayload: false
    },
    format: [
        'junit:test-e2e/report.xml',
        '@qavajs/console-formatter',
        '@qavajs/html-formatter:test-e2e/report.html'
    ],
    formatOptions: {
        console: {
            showLogs: true
        }
    },
    service: [localServer],
    memory: new Memory(),
    parallel: 5
};
