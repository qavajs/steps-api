import memory from '@qavajs/memory';
import { Then } from '@cucumber/cucumber';
import jp from 'jsonpath';
import { expect } from 'chai';

/**
 * Comparing response status code with given
 *
 * @example
 * Status Code is equal "200"
 *
 * @param {String} statusCode should be valid status code
 */
Then('Status Code is {validation} {text}', (validation, statusCode) => {
  const response = memory.getValue(`${browser.sessionId}response`);

  validation(response.status, parseInt(statusCode, 10));
});

/**
 * Verifying that response contains all models
 *
 * @example
 * Response "$.data.items" contains:
 *       | _id                   |
 *       | appId                 |
 *       | serviceCategory       |
 *
 * @param {String} pathQuery json path
 * @param {Array} dataTable given data table with all properties
 */
Then('Response {text} contains:', (pathQuery, dataTable) => {
  const response = memory.getValue(`${browser.sessionId}response`);
  const property = jp.value(response.body, pathQuery);

  if (Array.isArray(property) && property.length > 0) {
    property.forEach((data) => {
      dataTable.rawTable
        .join()
        .split(',')
        .forEach((value: string) => {
          expect(data).to.have.property(value);
        });
    });
  } else {
    dataTable.rawTable
      .join()
      .split(',')
      .forEach((value: string) => {
        expect(property).to.have.property(value);
      });
  }
});

/**
 * Verifying that response model has necessary type
 *
 * @example
 * Response "$.data.items" is an "array"
 *
 * @param {String} pathQuery json path
 * @param {String} type should be named as expected value type
 */
Then('Response {text} is a(n) {text}', (pathQuery, type) => {
  const response = memory.getValue(`${browser.sessionId}response`);
  const property = jp.value(response.body, pathQuery);

  expect(property).to.be.an(type);
});

/**
 * Verify that array size is equal to|less than|greater than given number
 *
 * @example
 * Response "$.data.items" size is "greater than" "0"
 *
 * @param {String} responseElement json path
 * @param {String} action should be named as expected action (equal to|less than|greater)
 * @param {String} expectedValue Number for comparing with array size
 */
Then('Response {text} size is {text} {text}', (pathQuery, action, expectedValue) => {
  const response = memory.getValue(`${browser.sessionId}response`);
  const property = jp.value(response.body, pathQuery);
  const count = property.length;

  switch (action) {
    case 'equal to':
      return expect(count).to.equal(parseInt(expectedValue, 10));
    case 'less than':
      return expect(count).to.be.lessThan(parseInt(expectedValue, 10));
    case 'greater than':
      return expect(count).to.be.greaterThan(parseInt(expectedValue, 10));
    default:
      throw Error(`${action} is not defined`);
  }
});

/**
 * Execute any jsonPath query against response and verify result is equal to expected value
 *
 * @example
 * I verify response path "$.data.items[0].title" is equal to "TEST"
 *
 * @param {String} pathQuery jsonPath query
 * @param {String} expectedValue value for comparing with result of jsonPath query
 */
Then('I verify response path {string} is equal to {text}', async (pathQuery, expectedValue) => {
  const response = memory.getValue(`${browser.sessionId}response`);
  const property = jp.value(response.body, pathQuery);

  return expect(property).to.deep.equal(expectedValue);
});
