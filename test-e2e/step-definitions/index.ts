import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { MemoryValue } from '@qavajs/core/src/load';

Then('I expect {value} memory value to be equal {value}', async function (actual: MemoryValue, expected: MemoryValue) {
  const actualValue = await actual.value();
  const expectedValue = await expected.value();
  expect(actualValue).to.eql(expectedValue);
});

Then('I expect {value} memory value to contain {value}', async function (actual: MemoryValue, expected: MemoryValue) {
  const actualValue = await actual.value();
  const expectedValue = await expected.value();
  expect(actualValue).contains(expectedValue);
});
