import memory from '@qavajs/memory';
import { When } from '@cucumber/cucumber';
import { RequestInit } from 'node-fetch';
import { sendHttpRequest } from './utils';

/**
 * Send request to the API
 *
 * @example
 * I send "GET" request to "$BASE_API_URL" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param url should be API endpoint
 * @param key key of the remembered value
 */
When('I send {string} request to {string} and save response as {string}', async function (method: string, url: string, key: string) {
  const requestUrl = await memory.getValue(url);
  const conf: RequestInit = {
    method,
  };
  const response = await sendHttpRequest(requestUrl, conf, this);

  // store response to memory to be able to use it in next steps
  memory.setValue(key, response);
});

/**
 * Send request to the API with headers
 *
 * @example
 * I send "GET" request to "$BASE_API_URL" with headers "$headers" and save response as "response"
 * I send "GET" request to "$BASE_API_URL" with headers "$json('headers.json')" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param url should be API endpoint
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request to {string} with headers {string} and save response as {string}',
  async function (method: string, url: string, headers: any, key: string) {
    const requestUrl = await memory.getValue(url);
    const requestHeaders = await memory.getValue(headers);
    const conf: RequestInit = {
      method,
      headers: requestHeaders,
    };
    const response = await sendHttpRequest(requestUrl, conf, this);

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
  'I send {string} request to {string} with qs {string} and save response as {string}',
  async function (method: string, url: string, params: string, key: string) {
    const requestUrl = (await memory.getValue(url)) + (await memory.getValue(params));
    const conf: RequestInit = {
      method,
    };
    const response = await sendHttpRequest(requestUrl, conf, this);
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
  'I send {string} request to {string} with headers {string} with qs {string} and save response as {string}',
  async function (method: string, url: string, headers: any, params: string, key: string) {
    const requestUrl = (await memory.getValue(url)) + (await memory.getValue(params));
    const requestHeaders = await memory.getValue(headers);
    const conf: RequestInit = {
      method,
      headers: requestHeaders,
    };
    const response = await sendHttpRequest(requestUrl, conf, this);
    // store response to memory to be able to use it in next steps
    memory.setValue(key, response);
  },
);

/**
 * Send request to the API with Body
 *
 * @example
 * I send "POST" request to "$BASE_API_URL" with Body "$textFile('test_data_file.json')" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param url should be API endpoint
 * @param requestBody should be json
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request to {string} with Body {string} and save response as {string}',
  async function (method: string, url: string, body: any, key: string) {
    const requestUrl = await memory.getValue(url);
    const requestBody = await memory.getValue(body);
    const conf: RequestInit = {
      method,
      body: requestBody,
    };
    const response = await sendHttpRequest(requestUrl, conf, this);

    // store response to memory to be able to use it in next steps
    memory.setValue(key, response);
  },
);

/**
 * Send request to the API with Body
 *
 * @example
 * I send "POST" request to "$BASE_API_URL" with headers "$json('headers.json')" with Body "$textFile('test_data_file.json')" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE and etc.)
 * @param url should be API endpoint
 * @param requestBody should be json
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request to {string} with headers {string} with Body {string} and save response as {string}',
  async function (method: string, url: string, headers: any, body: any, key: string) {
    const requestUrl = await memory.getValue(url);
    const requestBody = await memory.getValue(body);
    const requestHeaders = await memory.getValue(headers);
    const conf: RequestInit = {
      method,
      body: requestBody,
      headers: requestHeaders,
    };
    const response = await sendHttpRequest(requestUrl, conf, this);

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
  'I send {string} request to {string} with qs {string} and Body {string} and save response as {string}',
  async function (method: string, url: string, params: string, body: any, key: string) {
    const requestUrl = (await memory.getValue(url)) + (await memory.getValue(params));
    const requestBody = await memory.getValue(body);
    const conf: RequestInit = {
      method,
      body: await requestBody,
    };
    const response = await sendHttpRequest(requestUrl, conf, this);

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
  'I send {string} request to {string} with headers {string} with qs {string} and Body {string} and save response as {string}',
  async function (method: string, url: string, headers: any, params: string, body: any, key: string) {
    const requestUrl = (await memory.getValue(url)) + (await memory.getValue(params));
    const requestBody = await memory.getValue(body);
    const requestHeaders = await memory.getValue(headers);
    const conf: RequestInit = {
      method,
      body: requestBody,
      headers: requestHeaders,
    };
    const response = await sendHttpRequest(requestUrl, conf, this);

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
  'I send {string} request and save response as {string} to {string} with Body:',
  async function (method: string, key: string, url: string, body: any) {
    const requestUrl = await memory.getValue(url);
    const requestBody = await memory.getValue(body);
    const conf: RequestInit = {
      method,
      body: requestBody,
    };
    const response = await sendHttpRequest(requestUrl, conf, this);
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
  'I send {string} request and save response as {string} to {string} with headers {string} with Body:',
  async function (method: string, key: string, url: string, headers: any, body: any) {
    const requestUrl = await memory.getValue(url);
    const requestBody = await memory.getValue(body);
    const requestHeaders = await memory.getValue(headers);
    const conf: RequestInit = {
      method,
      body: requestBody,
      headers: requestHeaders,
    };
    const response = await sendHttpRequest(requestUrl, conf, this);
    // store response to memory to be able to use it in next steps
    memory.setValue(key, response);
  },
);

/**
 * MANDATORY STEP THAT SHOULD BE USED AFTER SENDING REQUEST
 * Parsing body in needed way and set in payload property
 *
 * @example
 * I parse "$response" body as "json"
 * I expect "$response.payload.foo" to equal "bar"
 *
 * @param response key of the remembered response
 * @param type response body parsing type (arrayBuffer|formData|blob|json|text)
 */
When('I parse {string} body as {bodyParsingType}', async function (response: string, type: string) {
  const responseFromMemory: any = await memory.getValue(response);
  const payload = await responseFromMemory[type]();
  this.log(type === 'json' ? JSON.stringify(payload, null, 2) : payload);
  responseFromMemory.payload = payload;
});
