import memory from '@qavajs/memory';
import { DataTable, When } from '@cucumber/cucumber';
import { RequestInit } from 'node-fetch';
import { dataTable2Object, sendHttpRequest } from './utils';

/**
 * Create request template and save it to memory
 * @param {string} method - should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 *
 * @example
 * When I create 'GET' request 'request'
 */
When('I create {string} request {string}', function (method: string, key: string) {
  memory.setValue(key, { method });
});

/**
 * Add data table of headers to request
 * @param {string} requestKey - memory key of request
 * @param {Array<[string, string]>} headersDataTable - key value headers
 *
 * @example
 * When I add headers to '$request':
 *   | Content-Type | application/json |
 */
When('I add headers to {string}:', async function (requestKey: string, headersDataTable: DataTable) {
  const request: RequestInit = await memory.getValue(requestKey);
  request.headers = await dataTable2Object(headersDataTable);
});

/**
 * Add headers to request
 * @param {string} requestKey - memory key of request
 * @param {string} headersKey - memory key of headers that resolves to JS object
 *
 * @example
 * When I add '$headers' headers to '$request'
 */
When('I add {string} headers to {string}', async function (headersKey: string, requestKey: string) {
  const request: RequestInit = await memory.getValue(requestKey);
  request.headers = await memory.getValue(headersKey);
});

/**
 * Add body to request
 * @param {string} requestKey - memory key of request
 * @param {string} body - body
 *
 * @example
 * When I add body to '$request':
 * """
 *  {
 *      "message": "qavajs"
 *  }
 * """
 */
When('I add body to {string}:', async function (requestKey: string, body: string) {
  const request: RequestInit = await memory.getValue(requestKey);
  request.body = await memory.getValue(body);
});

/**
 * Add body to request
 * @param {string} requestKey - memory key of request
 * @param {string} body - body
 *
 * @example
 * When I add '$body' body to '$request'
 */
When('I add {string} body to {string}', async function (bodyKey: string, requestKey: string) {
  const request: RequestInit = await memory.getValue(requestKey);
  request.body = await memory.getValue(bodyKey);
});

/**
 * Add url to request
 * @param {string} requestKey - memory key of request
 * @param {string} url - url
 *
 * @example
 * When I add 'https://qavajs.github.io/' body to '$request'
 */
When('I add {string} url to {string}', async function (urlKey: string, requestKey: string) {
  const request: RequestInit & { url: string } = await memory.getValue(requestKey);
  request.url = await memory.getValue(urlKey);
});

/**
 * Send request and send response
 * @param {string} requestKey - memory key of request
 * @param {string} responseKey - memory key to save response
 *
 * @example
 * When I send '$request' and save response as 'response'
 */
When('I send {string} request and save response as {string}', async function (requestKey: string, responseKey: string) {
  const request: RequestInit & { url: string } = await memory.getValue(requestKey);
  const response = await sendHttpRequest(request.url, request);
  memory.setValue(responseKey, response);
});
