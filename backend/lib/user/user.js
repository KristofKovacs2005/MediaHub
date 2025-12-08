"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(init) {
        this.u_id = init.u_id;
        this.username = init.username;
        this.email = init.email;
        this.password = init.password;
        this.status = init.status;
        this.token = init.token;
    }
    return User;
}());
exports.default = User;
