import 'dotenv/config';
import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import moment from 'moment';
import { router } from './router';
import { connectToDatabase } from './infra/mongodb/config';
import * as path from 'path';

// CREATE EXPRESS
const app = express();

// SECURITY
app.disable('x-powered-by');
app.use(cors());

// LOG DE REQUEST E RESPONSE
/* app.use((req, res, next) => {
    if (req.method === 'POST') {
        const oldJson = res.json;
        res.json = (body) => {
            // console.log('params: ');
            // console.log(req.params);
            // console.log('query: ');
            // console.log(req.query);
            console.log('files: ');
            console.log(req.files);
            console.log('body: ');
            console.log(req.body);
            res.locals.body = body;
            console.log('response: ');
            console.log(body);
            return oldJson.call(res, body);
        };
    }
    next();
}); */

// MIDDLEWARE
logger.token('statusColored', function (req: Request, res: Response) {
    if (res && (res.statusCode !== null)) {
        var color = res.statusCode >= 500 ? 31 // red
            : res.statusCode >= 400 ? 33 // yellow
                : res.statusCode >= 300 ? 36 // cyan
                    : res.statusCode >= 200 ? 32 // green
                        : 0; // no color
        return `\x1b[${color}m${res.statusCode}\x1b[0m`;
    } else {
        return '';
    }
});

app.use(logger(function (tokens, req, res) {
    return [
        moment().format('HH:mm:ss'),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.statusColored(req, res),
        tokens['response-time'](req, res), 'ms',
        '-',
        tokens.res(req, res, 'content-length'),
    ].join(' ');
}));

app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

// ROUTES
app.use('/api/v1', router);

app.use(express.static(path.join(__dirname, '../web')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../web/index.html'));
});

// ERROR HANDLING
app.use(function (req, res, next) {
    res.status(404).json({
        status: 'fail',
        message: 'Rota não encontrada.'
    });
});

async function startServer() {
    // CONNECT TO DATABASE
    const success = await connectToDatabase();
    if (success) {
        // START SERVER
        app.set('env', process.env.ENVIRONMENT || 'development');
        app.set('host', process.env.HOST || '0.0.0.0');
        app.set('port', process.env.PORT || 8080);

        app.listen(app.get('port'), function () {
            console.log('\x1b[32m%s\x1b[0m', '*******************************');
            console.log('\x1b[32m%s\x1b[0m', `REST API listening on port ${app.get('port')}`);
            console.log('\x1b[32m%s\x1b[0m', '*******************************');
        });
    } else {
        console.log('\x1b[31m%s\x1b[0m', 'FALHA AO SE CONECTAR À BASE DE DADOS');
    }
}

startServer();