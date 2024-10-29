import { DataTable, IWorld } from '@cucumber/cucumber';
import WebSocket from 'ws';

/**
 * Transform key-value data table to JS object
 * @param dataTable
 * @param context - Cucumber world
 * @return {Object}
 */
export async function dataTable2Object(dataTable: DataTable, context: any): Promise<{ [key: string]: string }> {
  const obj: { [key: string]: string } = {};
  for (const [key, value] of dataTable.raw()) {
    obj[key] = await context.getValue(value);
  }
  return obj;
}

export async function sendHttpRequest(requestUrl: string, conf: RequestInit, context?: IWorld): Promise<Response> {
  const request = new Request(requestUrl, conf);
  const requestClone = request.clone();
  const response = await fetch(request);
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
    const requestData = await deserializeRequest(requestClone);
    const responseData = await deserializeResponse(response);
    context.log(`Request: ${requestData.url}\n${JSON.stringify(requestData, null, 2)}`);
    context.log(`Response:\n${JSON.stringify(responseData, null, 2)}`);
    context.attach(JSON.stringify({ request: requestData, response: responseData }), 'text/x.response.json'); //attachment for qavajs reporter
  }
  return response;
}

async function deserializeRequest(request: Request) {
  const headersObject: Record<string, string> = {};
  request.headers?.forEach((value, key) => {
    headersObject[key] = value;
  });

  return {
    url: request.url,
    headers: headersObject,
    method: request.method,
    body: Buffer.from(await request.arrayBuffer()).toString('base64'),
  };
}

async function deserializeResponse(response: Response) {
  const responseClone = response.clone();
  const headersObject: Record<string, string> = {};
  responseClone.headers.forEach((value, key) => {
    headersObject[key] = value;
  });
  return {
    status: responseClone.status,
    statusText: responseClone.statusText,
    headers: headersObject,
    body: Buffer.from(await responseClone.arrayBuffer()).toString('base64'),
  };
}

export function logPayload(type: string, payload: any): string {
  switch (type) {
    case 'text':
      return payload;
    case 'json':
      return JSON.stringify(payload, null, 2);
    default:
      return `[${type}]`;
  }
}

export function sendMessage(message: any, ws: WebSocket){
  ws.send(Buffer.from(message));
}
