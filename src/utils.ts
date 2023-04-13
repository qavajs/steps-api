import memory from '@qavajs/memory';
import { DataTable } from '@cucumber/cucumber';
import { RequestInit, Response } from 'node-fetch';
// @ts-ignore
import httpRequest from '@qavajs/api-service';

const { sendHttpRequest: originalSendHttpRequest } = httpRequest;

/**
 * Transform key-value data table to JS object
 * @param dataTable
 * @return {Object}
 */
export async function dataTable2Object(dataTable: DataTable): Promise<{ [key: string]: string }> {
  const obj: { [key: string]: string } = {};
  for (const [key, value] of dataTable.raw()) {
    obj[key] = await memory.getValue(value);
  }
  return obj;
}

export async function sendHttpRequest(requestUrl: string, conf: RequestInit): Promise<Response> {
  const response = await originalSendHttpRequest(requestUrl, conf);
  Object.defineProperty(response, 'payload', {
    get(): any {
      if (this._isPayloadSet) return this._payload;
      throw new Error(`'payload' property is not set.\nCall 'I parse {string} body as {bodyParsingType}' step`);
    },
    set(value: any) {
      this._isPayloadSet = true;
      this._payload = value;
    }
  });
  return response
}
