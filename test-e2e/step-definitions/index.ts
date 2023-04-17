import { Then, Before } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import { expect } from 'chai';
// @ts-ignore
import nock from 'nock';

declare global {
  let config: any;
}

Before(function () {
  const scope = nock('http://qavajsmock.org')
    .post('/echo')
    .query(true)
    .reply(200, function (uri, requestBody) {
      return {
        uri,
        requestBody,
        requestHeaders: this.req.headers,
        requestPath: this.req.path,
      };
    })
    .get('/text')
    .query(true)
    .reply(200, function (uri, requestBody) {
      return 'hello qavajs';
    });
});

Then('I expect {string} memory value to be equal {string}', async function (actual, expected) {
  const actualValue = memory.getValue(actual);
  const expectedValue = memory.getValue(expected);
  expect(actualValue).to.eql(expectedValue);
});

Then('I expect {string} memory value to contain {string}', async function (actual, expected) {
  const actualValue = memory.getValue(actual);
  const expectedValue = memory.getValue(expected);
  expect(actualValue).contains(expectedValue);
});
