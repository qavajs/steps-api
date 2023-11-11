import memory from '@qavajs/memory';
import { When } from '@cucumber/cucumber';
import WebSocket from 'ws';

When('I connect to {string} ws endpoint {string}', async function (uriKey, wsKey) {
    const uri = await memory.getValue(uriKey);
    const ws = new WebSocket(uri);
    await new Promise(resolve => {
        ws.on('open', resolve);
    });
    memory.setValue(wsKey, ws);
});

When('I save message from {string} ws endpoint as {string}', async function (wsKey, memoryKey) {
    const ws = await memory.getValue(wsKey) as WebSocket;
    const message = await new Promise(resolve => {
        ws.on('message', resolve);
    });
    memory.setValue(memoryKey, message);
});

When('I save message matching {string} from {string} ws endpoint as {string}', async function (regexpKey, wsKey, memoryKey) {
    const ws = await memory.getValue(wsKey) as WebSocket;
    const regexpTemplate = await memory.getValue(regexpKey);
    const regexp = typeof regexpTemplate === 'string' ? new RegExp(regexpTemplate, 'gmi') : regexpTemplate;
    const message = await new Promise(resolve => {
        ws.on('message', (message => {
            if (regexp.test(message)) resolve(message);
        }));
    });
    memory.setValue(memoryKey, message);
});

async function sendMessage({messageKey, wsKey}: {messageKey: string, wsKey: string}) {
    const ws = await memory.getValue(wsKey) as WebSocket;
    const message = await memory.getValue(messageKey);
    ws.send(Buffer.from(message));
}
When('I send {string} message to {string} ws endpoint', async function (messageKey, wsKey) {
    await sendMessage({ messageKey, wsKey });
});

When('I send message to {string} ws endpoint:', async function (wsKey, messageKey) {
    await sendMessage({ messageKey, wsKey });
});

When('I close {string} ws connection', async function (wsKey) {
    const ws = await memory.getValue(wsKey) as WebSocket;
    ws.close();
});
