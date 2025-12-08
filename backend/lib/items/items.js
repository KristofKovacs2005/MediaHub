"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Items = /** @class */ (function () {
    function Items(init) {
        this.i_id = init.i_id;
        this.author = init.author;
        this.i_name = init.i_name;
        this.img_url = init.img_url;
        this.i_description = init.i_description;
        this.reviews = init.reviews;
        this.tags = init.tags;
    }
    return Items;
}());
exports.default = Items;
