import { Then } from '@cucumber/cucumber';
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
Then('Response {string} Status Code {apiValidation} {string}', async function (response: any, validationType: string, statusCode: string) {
  const responseValue = await memory.getValue(response);
  const validation = getValidation(validationType);
  statusCode = await memory.getValue(statusCode);
  this.log(`AR: ${responseValue.status}`);
  this.log(`ER: ${statusCode}`);
  validation(responseValue.status, parseInt(statusCode, 10));
});

/**
 * Comparing response status meesage with given
 *
 * @example
 * Response "$response" Status Message equals to "OK"
 *
 * @param {String} statusMessage should be valid status code
 */
Then('Response {string} Status Message {apiValidation} {string}', async function (response: any, validationType: string, statusMessage: string) {
  const responseValue = await memory.getValue(response);
  const validation = getValidation(validationType);
  statusMessage = await memory.getValue(statusMessage);
  this.log(`AR: ${responseValue.statusText}`);
  this.log(`ER: ${statusMessage}`);
  validation(responseValue.statusText, statusMessage);
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
Then('Response {string} contains:', async function (response: any, dataTable: any) {
  const property = await memory.getValue(response);
  const validation = getValidation('to have property');
  if (Array.isArray(property) && property.length > 0) {
    property.forEach((data) => {
      dataTable.rawTable
        .join()
        .split(',')
        .forEach((value: string) => {
          validation(data, value);
        });
    });
  } else {
    dataTable.rawTable
      .join()
      .split(',')
      .forEach((value: string) => {
        validation(property, value)
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
Then('Response {string} {apiValidation} {string}', async function (response: any, validationType: string, type: string) {
  const property = await memory.getValue(response);
  const validation = getValidation(validationType);
  type = await memory.getValue(type);
  this.log(`AR: ${typeof property}`);
  this.log(`ER: ${type}`);
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
Then('Response {string} size {apiValidation} {string}', async function (response: any, validationType: string, expectedValue: string) {
  const property = await memory.getValue(response);
  const validation = getValidation(validationType);
  const count = property.length;
  expectedValue = await memory.getValue(expectedValue);
  this.log(`AR: ${count}`);
  this.log(`ER: ${expectedValue}`);
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
Then('I verify response {string} {apiValidation} {string}', async function (response: any, validationType: string, expectedValue: string) {
  const property = await memory.getValue(response);
  const validation = getValidation(validationType);
  expectedValue = await memory.getValue(expectedValue);
  this.log(`AR: ${property}`);
  this.log(`ER: ${expectedValue}`);
  validation(property, expectedValue);
});
