import memory from '@qavajs/memory';
import { When } from '@cucumber/cucumber';
import { sendHttpRequest } from '@apiHelpers';
import { RequestInit } from 'node-fetch';

/**
 * Send request to the API
 *
 * @example
 * I send "GET" request to "{BASE_API_URL}/some_endpoint"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param url should be API endpoint
 */
When('I send {text} request to {landing-url}', async function (method: string, url: string) {
  const conf: RequestInit = {
    method,
  };
  const response = await sendHttpRequest(url, conf);

  // store response to memory to be able to use it in next steps
  memory.setValue(`${browser.sessionId}response`, response);
});

/**
 * Send request to the API with string qs or any additional param in the request URI
 *
 * @example
 * I send "GET" request to "{BASE_API_URL}/some_endpoint" with qs "?category=HR&name=test"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param urli should be API endpoint
 * @param params any string qs or value that will be added to the request URI
 */
When('I send {text} request to {landing-url} with qs {text}', async function (method: string, url: string, params: string) {
  url = `${url}${params}`;
  const conf: RequestInit = {
    method,
  };
  const response = await sendHttpRequest(url, conf);

  // store response to memory to be able to use it in next steps
  memory.setValue(`${browser.sessionId}response`, response);
});

/**
 * Send request to the API with Body
 *
 * @example
 * I send "POST" request to "{BASE_API_URL}/some_endpoint" with Body "test_data_file.json"
 *
 * File location:
 * feature file name: api-test.feature
 *     test data dir: testData
 *         json-file: testData\test_data_file.json
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param url should be API endpoint
 * @param requestBody should be json
 */
When('I send {text} request to {landing-url} with Body {json}', async function (method, url, requestBody) {
  const conf: RequestInit = {
    method,
    body: JSON.stringify(requestBody),
  };
  const response = await sendHttpRequest(url, conf);

  // store response to memory to be able to use it in next steps
  memory.setValue(`${browser.sessionId}response`, response);
});

/**
 * Send request to the API with Body and additional param in the request URI
 *
 * @example
 * I send "PUT" request to "{BASE_API_URL}/some_endpoint/" with qs "?category=HR&name=test" and Body "test_data_file.json"
 *
 * @param method should be named as one of the http methods (e.g. POST, PUT, PATCH and etc.)
 * @param url should be API endpoint
 * @param params any string query or value that will be added to the request URI
 * @param requestBody should be json
 */
When('I send {text} request to {landing-url} with qs {text} and Body {json}', async function (method, url, params, requestBody) {
  url = `${url}${params}`;
  const conf: RequestInit = {
    method,
    body: JSON.stringify(requestBody),
  };
  const response = await sendHttpRequest(url, conf);

  // store response to memory to be able to use it in next steps
  memory.setValue(`${browser.sessionId}response`, response);
});

/**
 * Send request to the API with Body passed as Cucumber Doc String
 *
 * @example
 * I send "POST" request to "{BASE_API_URL}/some_endpoint" with Body:
 *     """
 *     {
 *       "title": "Test Post Request with Body passed as string"
 *     }
 *     """
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param url should be API endpoint
 * @param requestBody should be json passed as a Cucumber Doc String
 */
When('I send {text} request to {landing-url} with Body:', async function (method, url, requestBody) {
  requestBody = JSON.parse(requestBody);
  const conf: RequestInit = {
    method,
    body: JSON.stringify(requestBody),
  };
  const response = await sendHttpRequest(url, conf);

  // store response to memory to be able to use it in next steps
  memory.setValue(`${browser.sessionId}response`, response);
});
