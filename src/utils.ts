import memory from '@qavajs/memory';
import { DataTable, IWorld } from '@cucumber/cucumber';

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

export async function sendHttpRequest(requestUrl: string, conf: RequestInit, context?: IWorld): Promise<Response> {
  const response = await fetch(requestUrl, conf);
  Object.defineProperty(response, 'payload', {
    get(): any {
      if (this._isPayloadSet) return this._payload;
      throw new Error(`'payload' property is not set.\nCall 'I parse {string} body as {bodyParsingType}' step`);
    },
    set(value: any) {
      this._isPayloadSet = true;
      this._payload = value;
    },
  });
  if (context) {
    context.log(`Request: ${requestUrl}\n${JSON.stringify(conf, null, 2)}`);
    context.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  }
  return response;
}

export function logPayload(type: string, payload: any): string {
  switch (type) {
    case 'text': return payload;
    case 'json': return JSON.stringify(payload, null, 2);
    default: return `[${type}]`;
  }
}
