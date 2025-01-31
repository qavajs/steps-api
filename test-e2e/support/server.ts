import express, { Express, Request, Response } from 'express';
import { createServer, Server } from 'http';
import * as bodyParser from 'body-parser';
import { WebSocketServer } from 'ws';

const app: Express = express();
const port = 3000;

app.use(bodyParser.text({type: '*/*'}));
app.use(bodyParser.json({}));
app.post('/echo', (request: Request, response: Response) => {
    response.send({
        requestHeaders: request.headers,
        uri: request.url,
        requestBody: request.body
    });
});

app.get('/text', (request: Request, response: Response) => {
    response.send('hello qavajs');
});

function createWSServer(server: Server) {
    const wss = new WebSocketServer({ server });

    wss.on('connection', function connection(ws) {
        ws.on('error', console.error);

        ws.on('message', function message(data) {
            setTimeout(() => ws.send(`websocket received ${data}`), 1000)
        });

        setTimeout(() => ws.send('qavajs test'), 1000);
    });
}
class Service {
    httpServer: any;
    before() {
        this.httpServer = createServer(app);
        createWSServer(this.httpServer);
        this.httpServer.listen(port);
    };
    after() {
        this.httpServer.close();
    }
}

export default new Service();
