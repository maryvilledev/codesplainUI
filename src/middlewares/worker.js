import createWorkerMiddleware from 'redux-worker-middleware';

/* eslint-disable */
const ParserWorker = require('worker!../workers/parser.js');
/* eslint-enable */

const parser = new ParserWorker();

const workerMiddleware = createWorkerMiddleware(parser);

export default workerMiddleware;
