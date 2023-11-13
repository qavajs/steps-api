import { Then } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import { expect } from 'chai';

declare global {
  let config: any;
}

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
