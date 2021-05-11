import { default as express } from 'express';
import { default as hbs } from 'hbs';
import * as path from 'path';
import { default as logger } from 'morgan';
import { default as cookieParser } from 'cookie-parser';
import * as http from 'http';
import { approotdir } from './approotdir.js';

const __dirname = approotdir;

import {
    normalizePort, onError, onListening, handle404, basicErrorHandler
} from './appsupport.js';
import { router as indexRouter } from './routes/index.js';

export const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

app.use(logger('dev'));
// ({ extended: false}) is passing just strings or objects
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.use(handle404);
app.use(basicErrorHandler);

export const port = normalizePort(process.env.PORT || '5000');
app.set('port ', port);

export const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);