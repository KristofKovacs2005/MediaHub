"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(init) {
        this.u_id = init.u_id;
        this.username = init.username;
        this.email = init.email;
        this.password = init.password;
        this.status = init.status;
        this.token = init.token;
    }
}
exports.default = User;
