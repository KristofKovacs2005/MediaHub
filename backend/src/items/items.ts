import Tag from "../tag/tag"
import Review from "../review/review"

interface IItems {
    i_id: number,
    author: string,
    i_name: string,
    img_url: string,
    i_description: string,
    reviews: Array<Review>,
    tags: Array<Tag>
}

class Items implements IItems {
    i_id: number
    author: string
    i_name: string
    img_url: string
    i_description: string
    reviews: Review[]
    tags: Tag[]

    constructor(init: IItems) {
        this.i_id = init.i_id
        this.author = init.author
        this.i_name = init.i_name
        this.img_url = init.img_url
        this.i_description = init.i_description
        this.reviews = init.reviews
        this.tags = init.tags
    }
}

export default Items;