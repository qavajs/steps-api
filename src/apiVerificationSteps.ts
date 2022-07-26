import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { getValidation } from '@qavajs/validation';
import memory from '@qavajs/memory';

/**
 * Comparing response status code with given
 *
 * @example
 * Response "$response" Status Code equals to "200"
 *
 * @param {String} statusCode should be valid status code
 */
Then('Response {response} Status Code {apiValidation} {string}', (response: any, validationType: string, statusCode: string) => {
  const validation = getValidation(validationType);
  statusCode = memory.getValue(statusCode);
  validation(response.status, parseInt(statusCode, 10));
});

/**
 * Verifying that response contains all models
 *
 * @example
 * Response "$response.payload.data.items" contains:
 *       | _id                   |
 *       | appId                 |
 *       | serviceCategory       |
 *
 * @param {String} pathQuery json path
 * @param {Array} dataTable given data table with all properties
 */
Then('Response {response} contains:', (property: any, dataTable: any) => {
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
 * Response "$response.payload.data.items" equals to "array"
 *
 * @param {String} pathQuery json path
 * @param {String} type should be named as expected value type
 */
Then('Response {response} {apiValidation} {string}', (property: any, validationType: string, type: string) => {
  const validation = getValidation(validationType);
  type = memory.getValue(type);
  validation(typeof property, type);
});

/**
 * Verify that array size is equal to|less than|greater than given number
 *
 * @example
 * Response "$response.payload.data.items" size to be above "0"
 *
 * @param {String} responseElement json path
 * @param {String} action should be named as expected action (equal to|less than|greater)
 * @param {String} expectedValue Number for comparing with array size
 */
Then('Response {response} size {apiValidation} {string}', (property: any, validationType: string, expectedValue: string) => {
  const validation = getValidation(validationType);
  const count = property.length;
  expectedValue = memory.getValue(expectedValue);
  validation(count, expectedValue);
});

/**
 * Execute any jsonPath query against response and verify result is equal to expected value
 *
 * @example
 * I verify response "$response.payload.data.items[0].title" equals to "TEST"
 *
 * @param {String} pathQuery jsonPath query
 * @param {String} expectedValue value for comparing with result of jsonPath query
 */
Then('I verify response {response} {apiValidation} {string}', async (property: any, validationType: string, expectedValue: string) => {
  const validation = getValidation(validationType);
  expectedValue = memory.getValue(expectedValue);
  validation(property, expectedValue);
});
