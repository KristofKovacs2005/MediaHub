"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(init) {
        this.o_id = init.o_id;
        this.s_id = init.s_id;
        this.u_id = init.u_id;
        this.p_id = init.p_id;
        this.date = init.date;
        this.return_date = init.return_date;
    }
}
exports.default = Order;
