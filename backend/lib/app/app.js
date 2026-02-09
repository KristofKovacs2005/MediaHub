"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//import router from "../routes/routes";
var routes_1 = __importDefault(require("../items/routes"));
var routes_2 = __importDefault(require("../order/routes"));
var routes_3 = __importDefault(require("../review/routes"));
var routes_4 = __importDefault(require("../tag/routes"));
var routes_5 = __importDefault(require("../user/routes"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var config_1 = __importDefault(require("../config/config"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
//app.use('/',router)
app.use('/', routes_1.default);
app.use('/', routes_2.default);
app.use('/', routes_3.default);
app.use('/', routes_5.default);
app.use('/', routes_4.default);
app.use('/uploads', express_1.default.static(config_1.default.baseDir + config_1.default.uploadDir));
exports.default = app;
