import { logPayload, sendHttpRequest } from './utils';
import { type MemoryValue, When } from '@qavajs/core';

/**
 * Send request to the API
 *
 * @example
 * I send "GET" request to "$BASE_API_URL" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE, etc.)
 * @param url should be API endpoint
 * @param key key of the remembered value
 */
When('I send {string} request to {value} and save response as {value}', async function (method: string, url: MemoryValue, key: MemoryValue) {
  const response = await sendHttpRequest(await url.value(), { method }, this);
  key.set(response);
});

/**
 * Send request to the API with headers
 *
 * @example
 * I send "GET" request to "$BASE_API_URL" with headers "$headers" and save response as "response"
 * I send "GET" request to "$BASE_API_URL" with headers "$json('headers.json')" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE, etc.)
 * @param url should be API endpoint
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request to {value} with headers {value} and save response as {value}',
  async function (method: string, url: MemoryValue, headers: MemoryValue, key: MemoryValue) {
    const conf: RequestInit = {
      method,
      headers: await headers.value(),
    };
    const response = await sendHttpRequest(await url.value(), conf, this);
    key.set(response);
  },
);

/**
 * Send request to the API with string qs or any additional param in the request URI
 *
 * @example
 * I send "GET" request to "https://www.some_service.com/some_endpoint" with qs "?category=HR&name=test" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE, etc.)
 * @param url should be API endpoint
 * @param params any string qs or value that will be added to the request URI
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request to {value} with qs {value} and save response as {value}',
  async function (method: string, url: MemoryValue, params: MemoryValue, key: MemoryValue) {
    const requestUrl = (await url.value()) + (await params.value());
    const response = await sendHttpRequest(requestUrl, { method }, this);
    key.set(response);
  },
);

/**
 * Send request to the API with string qs or any additional param in the request URI
 *
 * @example
 * I send "GET" request to "https://www.some_service.com/some_endpoint" with qs "?category=HR&name=test" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE, etc.)
 * @param url should be API endpoint
 * @param params any string qs or value that will be added to the request URI
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request to {value} with headers {value} with qs {value} and save response as {value}',
  async function (method: string, url: MemoryValue, headers: MemoryValue, params: MemoryValue, key: MemoryValue) {
    const requestUrl = (await url.value()) + (await params.value());
    const conf: RequestInit = {
      method,
      headers: await headers.value(),
    };
    const response = await sendHttpRequest(requestUrl, conf, this);
    key.set(response);
  },
);

/**
 * Send request to the API with body
 *
 * @example
 * I send "POST" request to "$BASE_API_URL" with body "$textFile('test_data_file.json')" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE, etc.)
 * @param url should be API endpoint
 * @param requestBody should be json
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request to {value} with body {value} and save response as {value}',
  async function (method: string, url: MemoryValue, body: MemoryValue, key: MemoryValue) {
    const conf: RequestInit = {
      method,
      body: await body.value(),
    };
    const response = await sendHttpRequest(await url.value(), conf, this);
    key.set(response);
  },
);

/**
 * Send request to the API with body
 *
 * @example
 * I send "POST" request to "$BASE_API_URL" with headers "$json('headers.json')" with body "$textFile('test_data_file.json')" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE, etc.)
 * @param url should be API endpoint
 * @param requestBody should be json
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request to {value} with headers {value} with body {value} and save response as {value}',
  async function (method: string, url: MemoryValue, headers: MemoryValue, body: MemoryValue, key: MemoryValue) {
    const conf: RequestInit = {
      method,
      body: await body.value(),
      headers: await headers.value(),
    };
    const response = await sendHttpRequest(await url.value(), conf, this);
    key.set(response);
  },
);

/**
 * Send request to the API with body and additional param in the request URI
 *
 * @example
 * I send "PUT" request to "https://www.some_service.com/some_endpoint/" with qs "?category=HR&name=test" and body "test_data_file.json" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. POST, PUT, PATCH, etc.)
 * @param url should be API endpoint
 * @param params any string query or value that will be added to the request URI
 * @param requestBody should be json
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request to {string} with qs {string} and body {string} and save response as {string}',
  async function (method: string, url: MemoryValue, params: MemoryValue, body: MemoryValue, key: MemoryValue) {
    const requestUrl = (await url.value()) + (await params.value());
    const conf: RequestInit = {
      method,
      body: await body.value(),
    };
    const response = await sendHttpRequest(requestUrl, conf, this);
    key.set(response);
  },
);

/**
 * Send request to the API with body and additional param in the request URI
 *
 * @example
 * I send "PUT" request to "https://www.some_service.com/some_endpoint/" with qs "?category=HR&name=test" and body "test_data_file.json" and save response as "response"
 *
 * @param method should be named as one of the http methods (e.g. POST, PUT, PATCH, etc.)
 * @param url should be API endpoint
 * @param params any string query or value that will be added to the request URI
 * @param requestBody should be json
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request to {string} with headers {string} with qs {string} and body {string} and save response as {string}',
  async function (method: string, url: MemoryValue, headers: MemoryValue, params: MemoryValue, body: MemoryValue, key: MemoryValue) {
    const requestUrl = (await url.value()) + (await params.value());
    const conf: RequestInit = {
      method,
      body: await body.value(),
      headers: await headers.value(),
    };
    const response = await sendHttpRequest(requestUrl, conf, this);
    key.set(response);
  },
);

/**
 * Send request to the API with body passed as Cucumber Doc String
 *
 * @example
 * I send "POST" request and save response as "response" to "$BASE_API_URL" with body:
 *     """
 *     {
 *       "title": "Test Post Request with body passed as string"
 *     }
 *     """
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE, etc.)
 * @param url should be API endpoint
 * @param requestBody should be json passed as a Cucumber Doc String
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request and save response as {value} to {value} with body:',
  async function (method: string, key: MemoryValue, url: MemoryValue, body: string) {
    const conf: RequestInit = {
      method,
      body: await this.getValue(body),
    };
    const response = await sendHttpRequest(await url.value(), conf, this);
    key.set(response);
  },
);

/**
 * Send request to the API with body passed as Cucumber Doc String
 *
 * @example
 * I send "POST" request and save response as "response" to "$BASE_API_URL" with body:
 *     """
 *     {
 *       "title": "Test Post Request with body passed as string"
 *     }
 *     """
 *
 * @param method should be named as one of the http methods (e.g. GET, POST, PUT, DELETE, etc.)
 * @param url should be API endpoint
 * @param requestBody should be json passed as a Cucumber Doc String
 * @param headers optional headers parameter
 * @param key key of the remembered value
 */
When(
  'I send {string} request and save response as {value} to {value} with headers {value} with body:',
  async function (method: string, key: MemoryValue, url: MemoryValue, headers: MemoryValue, body: string) {
    const conf: RequestInit = {
      method,
      body: await this.getValue(body),
      headers: await headers.value(),
    };
    const response = await sendHttpRequest(await url.value(), conf, this);
    key.set(response);
  },
);

/**
 * MANDATORY STEP THAT SHOULD BE USED AFTER SENDING REQUEST
 * Parsing body in needed way and set in payload property
 *
 * @example
 * I parse "$response" body as json
 * I expect "$response.payload.foo" to equal "bar"
 *
 * @param response key of the remembered response
 * @param type response body parsing type (arrayBuffer|formData|blob|json|text)
 */
When('I parse {value} body as {bodyParsingType}', async function (response: MemoryValue, type: string) {
  const responseFromMemory: any = await response.value();
  const payload = await responseFromMemory[type]();
  this.log(logPayload(type, payload));
  responseFromMemory.payload = payload;
});

/**
 * MANDATORY STEP THAT SHOULD BE USED AFTER SENDING REQUEST
 * Parsing body by parser function
 *
 * @example
 * I parse "$response" body as "$soap"
 * I expect "$response.payload['soap:envelope']" to equal "bar"
 *
 * where $soap is function memory reference of parsing logic function
 * @example
 * import { XMLParser } from 'fast-xml-parser';
 * const xml = new XMLParser();
 * class Data {
 *   soap = async (response) => {
 *     const text = await response.text();
 *     return xml.parse(text);
 *   }
 * }
 *
 * @param {string} response key of the remembered response
 * @param {function} parser response body parsing type
 */
When('I parse {value} body as {value}', async function (response: MemoryValue, parser: MemoryValue) {
  const responseFromMemory: any = await response.value();
  const parserFn = await parser.value();
  responseFromMemory.payload = await parserFn(responseFromMemory, this.log.bind(this));
});

/**
 * Clone response
 *
 * @example
 * I clone '$response' response as 'copiedResponse'
 * I copy '$response' response as 'copiedResponse'
 *
 * @param response memory key of original response
 * @param copiedResponse memory key of copied response
 */
When('I clone/copy {value} response as {value}', async function (response: MemoryValue, copiedResponse: MemoryValue) {
  const originalResponse: Response = await response.value();
  copiedResponse.set(originalResponse.clone());
});

