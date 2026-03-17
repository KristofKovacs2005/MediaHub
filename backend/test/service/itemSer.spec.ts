const mockGetItem = jest.fn()
const mockGetOneItem = jest.fn()
const mockGetReviewsOfItem = jest.fn()
const mockGetTagsOfItem = jest.fn()
const mockDeleteItem = jest.fn()
const mockInsertItem = jest.fn()
const mockModifyItem = jest.fn()

jest.mock("../../src/repisotaries/itemRep", () => ({
  ItemRep: jest.fn().mockImplementation(() => ({
    getItem: mockGetItem,
    getOneItem: mockGetOneItem,
    getReviewsOfItem: mockGetReviewsOfItem,
    getTagsOfItem: mockGetTagsOfItem,
    deleteItem: mockDeleteItem,
    insertItem: mockInsertItem,
    modifyItem: mockModifyItem
  }))
}))

import { ItemSer } from "../../src/service/itemSer"
import { HttpException } from "../../src/middleware/error"

describe("ItemSer - getItems", () => {
    let service: ItemSer

    beforeEach(() => {
        service = new ItemSer()
        jest.clearAllMocks()
    })

    it("Should return items", async () => {
        const mockResults = [{ id: 1, name: "item1" }]

        mockGetItem.mockResolvedValue(mockResults)

        const result = await service.getItems("name", null, null)

        expect(mockGetItem).toHaveBeenCalledWith("name", null, null)
        expect(result).toEqual(mockResults)
    })

    it("Should throw 404 if no items found", async () => {
        mockGetItem.mockResolvedValue([])

        await expect(
            service.getItems(null, null, null)
        ).rejects.toThrow(HttpException)

        await expect(
            service.getItems(null, null, null)
        ).rejects.toMatchObject({
            status: 404,
            message: "Nem létezik elem"
        })

        expect(mockGetItem).toHaveBeenCalled()
    })

  
})

describe("ItemSer - one item", () => {
    let service: ItemSer

    beforeEach(() => {
        service = new ItemSer()
        jest.clearAllMocks()
    })

    it("Should return items", async () => {
        const mockResults = [{ id: 1, name: "item1" }]

        mockGetOneItem.mockResolvedValue(mockResults)

        const result = await service.getOneItem(1)

        expect(mockGetOneItem).toHaveBeenCalledWith(1)
        expect(result).toEqual(mockResults)
    })

     it("Should return error if no item are found", async () => {
        mockGetOneItem.mockResolvedValue([])
        await expect(
            service.getOneItem(1)
        ).rejects.toThrow(HttpException)

        await expect(
            service.getOneItem(1)
        ).rejects.toMatchObject({
            status: 404,
            message: "Nem létezik elem"
        })

        expect(mockGetOneItem).toHaveBeenCalled()
        
    })
})


describe("ItemSer - review of item", () => {
    let service: ItemSer

    beforeEach(() => {
        service = new ItemSer()
        jest.clearAllMocks()
    })

    it("Should return reviews", async () => {
        const mockResults = [{ r_id: 1, comment: "asd" }]

        mockGetReviewsOfItem.mockResolvedValue(mockResults)

        const result = await service.getReviewsOfItem(1)

        expect(mockGetReviewsOfItem).toHaveBeenCalledWith(1)
        expect(result).toEqual(mockResults)
    })

     it("Should return error if no items are found", async () => {
        mockGetReviewsOfItem.mockResolvedValue([])
        await expect(
            service.getReviewsOfItem(1)
        ).rejects.toThrow(HttpException)

        await expect(
            service.getReviewsOfItem(1)
        ).rejects.toMatchObject({
            status: 404,
            message: "Nem létezik elem"
        })

        expect(mockGetReviewsOfItem).toHaveBeenCalled()
        
    })
})

describe("ItemSer - tag of item", () => {
    let service: ItemSer

    beforeEach(() => {
        service = new ItemSer()
        jest.clearAllMocks()
    })

    it("Should return reviews", async () => {
        const mockResults = [{ t_id: 1, t_name: "asd" }]

        mockGetTagsOfItem.mockResolvedValue(mockResults)

        const result = await service.getTagsOfItem(1)

        expect(mockGetTagsOfItem).toHaveBeenCalledWith(1)
        expect(result).toEqual(mockResults)
    })

     it("Should return error if no items are found", async () => {
        mockGetTagsOfItem.mockResolvedValue([])
        await expect(
            service.getTagsOfItem(1)
        ).rejects.toThrow(HttpException)

        await expect(
            service.getTagsOfItem(1)
        ).rejects.toMatchObject({
            status: 404,
            message: "Nem létezik elem"
        })

        expect(mockGetTagsOfItem).toHaveBeenCalled()
        
    })
})

describe("ItemSer - deleteItem", () => {
    let service: ItemSer

    beforeEach(() => {
        service = new ItemSer()
        jest.clearAllMocks()
    })

    it("Should delete item and return result", async () => {
        const mockResult = [{ affectedRows: 1 }]

        mockDeleteItem.mockResolvedValue(mockResult)

        const result = await service.deleteItem(1)

        expect(mockDeleteItem).toHaveBeenCalledWith(1)
        expect(result).toEqual(mockResult)
    })

    it("Should throw 404 if no item found", async () => {
        mockDeleteItem.mockResolvedValue({ affectedRows: 0 })

        await expect(service.deleteItem(1)).rejects.toMatchObject({
            status: 404,
            message: "Nem létezik elem"
        })

        expect(mockDeleteItem).toHaveBeenCalledWith(1)
    })
})


describe("ItemSer - insertItem", () => {
    let service: ItemSer

    beforeEach(() => {
        service = new ItemSer()
        jest.clearAllMocks()
    })

    it("Should insert item", async () => {
        const mockResult = [{ affectedRows: 1 }]

        mockInsertItem.mockResolvedValue(mockResult)

        const result = await service.insertItem("asd","valaki", "asd", "kep1", 3, ["book", "romance"])

        expect(mockInsertItem).toHaveBeenCalledWith("asd","valaki", "asd", "kep1", 3, ["book", "romance"])
        expect(result).toEqual(mockResult)
    })
})

describe("ItemSer - modifyItem", () => {
    let service: ItemSer

    beforeEach(() => {
        service = new ItemSer()
        jest.clearAllMocks()
    })

    it("Should modify item", async () => {
        const mockResult = [{ affectedRows: 1 }]

        mockModifyItem.mockResolvedValue(mockResult)

        const result = await service.modifyItem("update item set i_name = ? where i_id = ?", ["asd", 1], [])

        expect(mockModifyItem).toHaveBeenCalledWith("update item set i_name = ? where i_id = ?", ["asd", 1], [])
        expect(result).toEqual(mockResult)
    })
})