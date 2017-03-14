import createWorkerMiddleware from 'redux-worker-middleware';

/* eslint-disable import/no-webpack-loader-syntax */
const ParserWorker = require('worker!../workers/parser.js');
const parser = new ParserWorker();

const workerMiddleware = createWorkerMiddleware(parser);

export default workerMiddleware;
