import { HttpException } from "../middleware/error"
import { TagRep } from "../repisotaries/tagRep"

export class TagSer {
    private repository: TagRep
    constructor() {
        this.repository = new TagRep()
    }
    async getTags() {
        const results = await this.repository.getTags()
        if (!results || results.length === 0) {
            throw new HttpException(404, "Nincs ilyen elem")
        }
        return results
    }
}