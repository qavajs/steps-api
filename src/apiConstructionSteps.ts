import { dataTable2Object, sendHttpRequest } from './utils';
import GraphQl from './GraphQl';
import { type MemoryValue, DataTable, When } from '@qavajs/core';

/**
 * Create request template and save it to memory
 * @param {string} method - should be named as one of the http methods (e.g. GET, POST, PUT, DELETE etc.)
 *
 * @example
 * When I create 'GET' request 'request'
 */
When('I create {string} request {value}', function (method: string, key: MemoryValue) {
  key.set({ method });
});

/**
 * Create GraphQL request template and save it to memory
 * @example
 * When I create GraphQL request 'request'
 */
When('I create GraphQL request {value}', function (key: MemoryValue) {
  key.set(new GraphQl());
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
When('I add headers to {value}:', async function (requestKey: MemoryValue, headersDataTable: DataTable) {
  const request: RequestInit = await requestKey.value();
  request.headers = Object.assign({}, request.headers, await dataTable2Object(headersDataTable, this));
});

/**
 * Add headers to request
 * @param {string} requestKey - memory key of request
 * @param {string} headersKey - memory key of headers that resolves to JS object
 *
 * @example
 * When I add '$headers' headers to '$request'
 */
When('I add {value} headers to {value}', async function (headersKey: MemoryValue, requestKey: MemoryValue) {
  const request: RequestInit = await requestKey.value();
  request.headers = Object.assign({}, request.headers, await headersKey.value());
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
When('I add body to {value}:', async function (requestKey: MemoryValue, body: string) {
  const request: RequestInit = await requestKey.value();
  request.body = await this.getValue(body);
});

/**
 * Add query or variables to GraphQL request.
 * @param {string} property - one of GraphQl specific properties "query" or "variables"
 * @param {string} requestKey - memory key of request
 * @param {string} valueString - multiline string to be set as GraphQl body value.
 *
 * @example
 * When I add query to GraphQL '$request':
 * """
 *    query {
 *      characters(page: 2, filter: { name: "rick" }) {
 *        results {
 *          name
 *           }
 *         }
 *      }
 **/
When('I add {gqlRequestProperty} to GraphQL {value}:', async function (property: keyof GraphQl, requestKey: MemoryValue, valueString: string) {
  const request: GraphQl = await requestKey.value();
  request[property] = await this.getValue(valueString);
});

/**
 * Add form data body to request
 * @param {string} requestKey - memory key of request
 * @param {string} body - body
 *
 * @example
 * When I add body to '$request':
 *   | key      | value                    | filename | contentType      |
 *   | formKey  | formValue                |          | application/json |
 *   | otherKey | otherValue               |          | text/plain       |
 *   | fileKey  | $file('./path/file.png') | file.png | image/png        |
 */
When('I add form data body to {value}:', async function (requestKey: MemoryValue, dataTable: DataTable) {
  const request: RequestInit = await requestKey.value();
  const formData = new FormData();
  for (const record of dataTable.hashes()) {
    const key = await this.getValue(record.key);
    const value = await this.getValue(record.value);
    const fileName = (await this.getValue(record.filename)) ?? 'default';
    const type = await this.getValue(record.contentType);
    formData.append(key, new Blob([value], { type }), fileName);
  }
  request.body = formData;
});

/**
 * Add body to request
 * @param {string} requestKey - memory key of request
 * @param {string} body - body
 *
 * @example
 * When I add '$body' body to '$request'
 */
When('I add {value} body to {value}', async function (bodyKey: MemoryValue, requestKey: MemoryValue) {
  const request: RequestInit = await requestKey.value();
  request.body = await bodyKey.value();
});

/**
 * Add url to request
 * @param {string} requestKey - memory key of request
 * @param {string} url - url
 *
 * @example
 * When I add 'https://qavajs.github.io/' url to '$request'
 */
When('I add {value} url to {value}', async function (urlKey: MemoryValue, requestKey: MemoryValue) {
  const request: RequestInit & { url: string } = await requestKey.value();
  request.url = await urlKey.value();
});

/**
 * Send request and send response
 * @param {string} requestKey - memory key of request
 * @param {string} responseKey - memory key to save response
 *
 * @example
 * When I send '$request' request and save response as 'response'
 */
When('I send {value} request and save response as {value}', async function (requestKey: MemoryValue, responseKey: MemoryValue) {
  const request: RequestInit & { url: string } = await requestKey.value();
  const response = await sendHttpRequest(request.url, request, this);
  responseKey.set(response);
});
