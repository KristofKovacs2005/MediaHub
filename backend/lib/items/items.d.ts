import Tag from "../tag/tag";
import Review from "../review/review";
interface IItems {
    i_id: number;
    author: string;
    i_name: string;
    img_url: string;
    i_description: string;
    reviews: Array<Review>;
    tags: Array<Tag>;
}
declare class Items implements IItems {
    i_id: number;
    author: string;
    i_name: string;
    img_url: string;
    i_description: string;
    reviews: Review[];
    tags: Tag[];
    constructor(init: IItems);
}
export default Items;
