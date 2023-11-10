//@ts-ignore
import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import * as bodyParser from 'body-parser';

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

class Service {
    httpServer: any;
    before() {
        this.httpServer = createServer(app);
        this.httpServer.listen(port);
    };
    after() {
        this.httpServer.close();
    }
}

export default new Service();
