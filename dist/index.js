"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const moment_1 = __importDefault(require("moment"));
const router_1 = require("./router");
const config_1 = require("./infra/mongodb/config");
const path = __importStar(require("path"));
// CREATE EXPRESS
const app = (0, express_1.default)();
// SECURITY
app.disable('x-powered-by');
app.use((0, cors_1.default)());
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
morgan_1.default.token('statusColored', function (req, res) {
    if (res && (res.statusCode !== null)) {
        var color = res.statusCode >= 500 ? 31 // red
            : res.statusCode >= 400 ? 33 // yellow
                : res.statusCode >= 300 ? 36 // cyan
                    : res.statusCode >= 200 ? 32 // green
                        : 0; // no color
        return `\x1b[${color}m${res.statusCode}\x1b[0m`;
    }
    else {
        return '';
    }
});
app.use((0, morgan_1.default)(function (tokens, req, res) {
    return [
        (0, moment_1.default)().format('HH:mm:ss'),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.statusColored(req, res),
        tokens['response-time'](req, res), 'ms',
        '-',
        tokens.res(req, res, 'content-length'),
    ].join(' ');
}));
app.use(express_1.default.urlencoded({ extended: false, limit: '10mb' }));
app.use(express_1.default.json({ limit: '10mb' }));
// ROUTES
app.use('/api/v1', router_1.router);
app.use(express_1.default.static(path.join(__dirname, '../web')));
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
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // CONNECT TO DATABASE
        const success = yield (0, config_1.connectToDatabase)();
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
        }
        else {
            console.log('\x1b[31m%s\x1b[0m', 'FALHA AO SE CONECTAR À BASE DE DADOS');
        }
    });
}
startServer();
