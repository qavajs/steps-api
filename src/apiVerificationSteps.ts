import { DataTable, Then } from '@cucumber/cucumber';
import { getValidation } from '@qavajs/validation';
import { MemoryValue, Validation } from '@qavajs/core';

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
Then('Response {value} contains:', async function (responseKey: MemoryValue, dataTable: DataTable) {
  const property = await responseKey.value();
  const validation = getValidation('to have property');
  if (Array.isArray(property) && property.length > 0) {
    property.forEach((data) => {
      dataTable
        .raw()
        .join()
        .split(',')
        .forEach((value: string) => {
          validation(data, value);
        });
    });
  } else {
    dataTable
      .raw()
      .join()
      .split(',')
      .forEach((value: string) => {
        validation(property, value);
      });
  }
});

/**
 * Verifying that response model has necessary type
 *
 * @example
 * Response type "$response.payload.data.items" equals to "array"
 *
 * @param {String} responseKey json path
 * @param {String} validation - validation
 * @param {String} typeKey should be named as expected value type
 */
Then('Response type {value} {validation} {value}', async function (responseKey: MemoryValue, validation: Validation, typeKey: MemoryValue) {
  const property = await responseKey.value();
  const type = await typeKey.value();
  validation(typeof property, type);
});

/**
 * Verify that array size is equal to|less than|greater than given number
 *
 * @example
 * Response "$response.payload.data.items" size to be above "0"
 *
 * @param {String} responseKey json path
 * @param {String} validation - validation
 * @param {String} expectedValueKey Number for comparing with array size
 */
Then('Response {value} size {validation} {value}', async function (responseKey: MemoryValue, validation: Validation, expectedValueKey: MemoryValue) {
  const property = await responseKey.value();
  const count = property.length;
  const expectedCount = await expectedValueKey.value();
  validation(count, expectedCount);
});

/**
 * Execute any jsonPath query against response and verify result is equal to expected value
 *
 * @example
 * I verify response "$response.payload.data.items[0].title" equals to "TEST"
 *
 * @param {String} responseKey jsonPath query
 * @param {String} validation - validation
 * @param {String} expectedValueKey value for comparing with result of jsonPath query
 */
Then('Response {value} {validation} {value}', async function (responseKey: MemoryValue, validation: Validation, expectedValueKey: MemoryValue) {
  const property = await responseKey.value();
  const expectedValue = await expectedValueKey.value();
  validation(property, expectedValue);
});
