import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';

import { APP_NAME, STATIC_PATH, WEB_PORT, MONGO_URI } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';
const app = express();
const mongoUri = 'order-manager'
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI,
	{ useMongoClient: true });

const db = mongoose.connection;
db.on('error', (err) => {console.error('connection unsuccessful', err)});
db.once('open', () => {
	console.log("Connection to DB Successful");
});

app.use(compression());
app.use(cookieParser());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api', routes);

app.get('/', (req, res) => {
	res.send(renderApp(APP_NAME));
	// res.status(200).send("Hello world");
});

const server = app.listen(WEB_PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
	'(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});

server.on('close', () => {
	console.log("server Closed");
});

module.exports = server;
