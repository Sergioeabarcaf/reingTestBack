import express from 'express';
import articles from './articles';

const routes = express.Router();

routes.use('/articles', articles);

export default routes;
