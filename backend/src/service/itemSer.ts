import { HttpException } from "../middleware/error"
import { ItemRep } from "../repisotaries/itemRep"

export class ItemSer {
    private repository: ItemRep

    constructor() {
        this.repository = new ItemRep()
    }
    async getItems(name: string | null, tags: string | null, author: string | null): Promise<Array<any>> {
        const results = await this.repository.getItem(name, tags, author)
        if (results.length == 0 ) {
            throw new HttpException(404, "Nem létezik elem")
        }
        return results

    }

    async getOneItem(id: number) {
        const results = await this.repository.getOneItem(id)
        if (results.length == 0 ) {
            throw new HttpException(404, "Nem létezik elem")
        }
        return results
    }

    async getReviewsOfItem(id: number) {
        const results = await this.repository.getReviewsOfItem(id)
        if (results.length == 0 ) {
            throw new HttpException(404, "Nem létezik elem")
        }
        return results
    }

    async getTagsOfItem(id: number) {
        const results = await this.repository.getTagsOfItem(id)
        if (results.length == 0 ) {
            throw new HttpException(404, "Nem létezik elem")
        }
        return results
    }

    async deleteItem(id: number) {
        const results = await this.repository.deleteItem(id)
        if (results.length == 0 ) {
            throw new HttpException(404, "Nem létezik elem")
        }
        return results
    }

    async insertItem(name: string, author: string, description: string, img_url: string, amount: number, tags: string[]) {
        const results = await this.repository.insertItem(name, author, description, img_url, amount, tags)
        return results
    }

    async modifyItem(updateString: string, values: any[], tags: string[]) {
        const results = await this.repository.modifyItem(updateString, values, tags)
        return results
    }
}