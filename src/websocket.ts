import WebSocket from 'ws';
import { type MemoryValue, When } from '@qavajs/core';
import { sendMessage } from './utils';

When('I connect to {value} ws endpoint {value}', async function (uriKey: MemoryValue, wsKey: MemoryValue) {
  const uri = await uriKey.value();
  const ws = new WebSocket(uri);
  await new Promise((resolve) => {
    ws.on('open', resolve);
  });
  wsKey.set(ws);
});

When('I save message from {value} ws endpoint as {value}', async function (wsKey: MemoryValue, memoryKey: MemoryValue) {
  const ws = (await wsKey.value()) as WebSocket;
  const message = await new Promise((resolve) => {
    ws.on('message', resolve);
  });
  memoryKey.set(message);
});

When(
  'I save message matching {value} from {value} ws endpoint as {value}',
  async function (regexpKey: MemoryValue, wsKey: MemoryValue, memoryKey: MemoryValue) {
    const ws = (await wsKey.value()) as WebSocket;
    const regexpTemplate = await regexpKey.value();
    const regexp = typeof regexpTemplate === 'string' ? new RegExp(regexpTemplate, 'gmi') : regexpTemplate;
    const message = await new Promise((resolve) => {
      ws.on('message', (message) => {
        if (regexp.test(message)) resolve(message);
      });
    });
    memoryKey.set(message);
  },
);

When('I send {value} message to {value} ws endpoint', async function (messageKey: MemoryValue, wsKey: MemoryValue) {
  const message = await messageKey.value();
  const ws = await wsKey.value();
  sendMessage(message, ws);
});

When('I send message to {value} ws endpoint:', async function (wsKey: MemoryValue, messageKey: string) {
  const message = await this.getValue(messageKey);
  const ws = await wsKey.value();
  sendMessage(message, ws);
});

When('I close {value} ws connection', async function (wsKey: MemoryValue) {
  const ws = (await wsKey.value()) as WebSocket;
  ws.close();
});
