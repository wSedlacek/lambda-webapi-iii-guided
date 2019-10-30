import express from 'express'; // importing a CommonJS module
import helmet from 'helmet';

import { Middleware } from './models';
import { hubsRouter } from './routes/hubs.route';

export const server = express();

export const logger: Middleware = () => (req, res, next) => {
  console.log(`\n${new Date().toISOString()} ${req.method} ${req.url}\n`);
  next();
};

export const gateKeeper: Middleware = () => (req, res, next) => {
  const password = (req.headers.password as string) || '';
  if (!password) res.status(400).json({ message: 'A password header is required' });
  else if (password.toLowerCase() !== 'mellon') res.status(401).json({ you: 'shall not pass!!' });
  else return next();
};

server.use(express.json());
server.use(helmet());
server.use(logger());
server.use(gateKeeper());

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
    `);
});
