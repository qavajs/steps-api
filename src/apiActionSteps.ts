import memory from '@qavajs/memory';
import { When } from '@cucumber/cucumber';
import { RequestInit } from 'node-fetch';
// @ts-ignore
import { httpRequest } from '@qavajs/api-service';

const { sendHttpRequest } = httpRequest;
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
  'I send {string} request to {string}{headers} and save response as {string}',
  async function (method: string, url: string, headers: any, key: string) {
    const requestUrl = await memory.getValue(url);
    const conf: RequestInit = {
      method,
      ...(await headers),
    };
    const response = await sendHttpRequest(requestUrl, conf);

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
  'I send {string} request to {string}{headers} with qs {string} and save response as {string}',
  async function (method: string, url: string, headers: any, params: string, key: string) {
    const requestUrl = (await memory.getValue(url)) + (await memory.getValue(params));
    const conf: RequestInit = {
      method,
      ...(await headers),
    };
    const response = await sendHttpRequest(requestUrl, conf);

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
  'I send {string} request to {string}{headers} with Body {string} and save response as {string}',
  async function (method: string, url: string, headers: any, body: any, key: string) {
    const requestUrl = await memory.getValue(url);
    const requestBody = await memory.getValue(body);
    const conf: RequestInit = {
      method,
      body: await requestBody,
      ...(await headers),
    };
    const response = await sendHttpRequest(requestUrl, conf);

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
  'I send {string} request to {string}{headers} with qs {string} and Body {string} and save response as {string}',
  async function (method: string, url: string, headers: any, params: string, body: any, key: string) {
    const requestUrl = (await memory.getValue(url)) + (await memory.getValue(params));
    const requestBody = await memory.getValue(body);
    const conf: RequestInit = {
      method,
      body: await requestBody,
      ...(await headers),
    };
    const response = await sendHttpRequest(requestUrl, conf);

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
  'I send {string} request and save response as {string} to {string}{headers} with Body:',
  async function (method: string, key: string, url: string, headers: any, body: any) {
    const requestUrl = await memory.getValue(url);
    const requestBody = await memory.getValue(body);
    const conf: RequestInit = {
      method,
      body: await requestBody,
      ...(await headers),
    };
    const response = await sendHttpRequest(requestUrl, conf);

    // store response to memory to be able to use it in next steps
    memory.setValue(key, response);
  },
);
