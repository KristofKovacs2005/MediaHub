"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Review = /** @class */ (function () {
    function Review(init) {
        this.r_id = init.r_id;
        this.i_id = init.i_id;
        this.u_id = init.u_id;
        this.flagged = init.flagged;
        this.stars = init.stars;
        this.comment = init.comment;
    }
    return Review;
}());
exports.default = Review;
