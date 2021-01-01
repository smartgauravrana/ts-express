"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var http_1 = __importDefault(require("http"));
// import routes from './routes';
var AppRouter_1 = require("./AppRouter");
require("./controllers/LoginController");
var app = express_1.default();
var port = process.env.PORT || 3000;
var server = http_1.default.createServer(app);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_session_1.default({ keys: ['s3crwtyy'] }));
app.use('/', AppRouter_1.AppRouter.getInstance());
server.listen(port, function () {
    console.log("Server running on port " + port);
});
