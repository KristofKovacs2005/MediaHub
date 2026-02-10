"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import router from "../routes/routes";
const routes_1 = __importDefault(require("../items/routes"));
const routes_2 = __importDefault(require("../order/routes"));
const routes_3 = __importDefault(require("../review/routes"));
const routes_4 = __importDefault(require("../tag/routes"));
const routes_5 = __importDefault(require("../user/routes"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("../config/config"));
const app = (0, express_1.default)();
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
