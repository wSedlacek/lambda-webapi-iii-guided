import express from 'express'; // importing a CommonJS module
import helmet from 'helmet';

import { Middleware } from './models';
import { hubsRouter } from './routes/hubs.route';

export const server = express();
export const logger: Middleware = () => (req, res, next) => {};

server.use(express.json());
server.use(helmet());
server.use(logger());

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
    `);
});
