import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import routes from './routes';

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(helmet());
server.use('/', routes);

export default server;