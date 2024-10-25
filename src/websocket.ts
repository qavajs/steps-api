import { When } from '@cucumber/cucumber';
import WebSocket from 'ws';
import { MemoryValue } from '@qavajs/core/src/load';
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

When('I send {string} message to {string} ws endpoint', async function (messageKey: MemoryValue, wsKey: MemoryValue) {
  await sendMessage({ messageKey, wsKey }, this);
});

When('I send message to {string} ws endpoint:', async function (wsKey: MemoryValue, messageKey) {
  await sendMessage({ messageKey, wsKey }, this);
});

When('I close {string} ws connection', async function (wsKey: MemoryValue) {
  const ws = (await wsKey.value()) as WebSocket;
  ws.close();
});
