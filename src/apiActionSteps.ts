import memory from '@qavajs/memory';
import { When } from '@cucumber/cucumber';
import { RequestInit } from 'node-fetch';
import { sendHttpRequest } from './apiHelpers';

/**
 * Send request to the API
 *
 * @example
 * I send "GET" request to "$BASE_API_URL" and save response as "response"
 * I send "GET" request to "$BASE_API_URL" with headers "$headers" and save response as "response"
 * I send "GET" request to "$BASE_API_URL" with headers "headers.json" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param url should be API endpoint
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {text} request to {landing-url}{headers} and save response as {text}',
  async function (method: string, url: string, headers: any, key: string) {
    const conf: RequestInit = {
      method,
      ...headers,
    };
    const response = await sendHttpRequest(url, conf);

    // store response to memory to be able to use it in next steps
    memory.setValue(key, response);
  },
);

/**
 * Send request to the API with string qs or any additional param in the request URI
 *
 * @example
 * I send "GET" request to "https://www.some_service.com/some_endpoint" with qs "?category=HR&name=test" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param url should be API endpoint
 * @param params any string qs or value that will be added to the request URI
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {text} request to {landing-url}{headers} with qs {text} and save response as {text}',
  async function (method: string, url: string, headers: any, params: string, key: string) {
    url = `${url}${params}`;
    const conf: RequestInit = {
      method,
      ...headers,
    };
    const response = await sendHttpRequest(url, conf);

    // store response to memory to be able to use it in next steps
    memory.setValue(key, response);
  },
);

/**
 * Send request to the API with Body
 *
 * @example
 * I send "POST" request to "$BASE_API_URL" with Body "test_data_file.json" and save response as "response"
 *
 * File location:
 * feature file name: api-test.feature
 *     test data dir: testData
 *         json-file: testData\test_data_file.json
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param url should be API endpoint
 * @param requestBody should be json
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {text} request to {landing-url}{headers} with Body {json} and save response as {text}',
  async function (method: string, url: string, headers: any, requestBody: JSON, key: string) {
    const conf: RequestInit = {
      method,
      body: JSON.stringify(requestBody),
      ...headers,
    };
    const response = await sendHttpRequest(url, conf);

    // store response to memory to be able to use it in next steps
    memory.setValue(key, response);
  },
);

/**
 * Send request to the API with Body and additional param in the request URI
 *
 * @example
 * I send "PUT" request to "https://www.some_service.com/some_endpoint/" with qs "?category=HR&name=test" and Body "test_data_file.json" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. POST, PUT, PATCH and etc.)
 * @param url should be API endpoint
 * @param params any string query or value that will be added to the request URI
 * @param requestBody should be json
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {text} request to {landing-url}{headers} with qs {text} and Body {json} and save response as {text}',
  async function (method: string, url: string, headers: any, params: string, requestBody: JSON, key: string) {
    url = `${url}${params}`;
    const conf: RequestInit = {
      method,
      body: JSON.stringify(requestBody),
      ...headers,
    };
    const response = await sendHttpRequest(url, conf);

    // store response to memory to be able to use it in next steps
    memory.setValue(key, response);
  },
);

/**
 * Send request to the API with Body passed as Cucumber Doc String
 *
 * @example
 * I send "POST" request and save response as "response" to "$BASE_API_URL" with Body:
 *     """
 *     {
 *       "title": "Test Post Request with Body passed as string"
 *     }
 *     """
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param url should be API endpoint
 * @param requestBody should be json passed as a Cucumber Doc String
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {text} request and save response as {text} to {landing-url}{headers} with Body:',
  async function (method: string, key: string, url: string, headers: any, requestBody: JSON) {
    const conf: RequestInit = {
      method,
      body: JSON.stringify(requestBody),
      ...headers,
    };
    const response = await sendHttpRequest(url, conf);

    // store response to memory to be able to use it in next steps
    memory.setValue(key, response);
  },
);
