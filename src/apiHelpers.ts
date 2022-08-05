import fetch, { RequestInit, Response } from 'node-fetch';

/**
 * Sending http request
 *
 * @param {String} url - url that should be requested
 * @param {RequestInit} params - Object with all needed properties for request
 * @returns {Response} response - response object with payload variable as parsed JSON response body
 */
async function sendHttpRequest(url: string, params: RequestInit): Promise<unknown> {
  const conf = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...params,
  };
  const response: Response = await fetch(url, conf);
  const responseBodyPayload = { payload: await response.json() };
  const updatedResponse = Object.assign(response, responseBodyPayload);

  return updatedResponse;
}

export { sendHttpRequest };
