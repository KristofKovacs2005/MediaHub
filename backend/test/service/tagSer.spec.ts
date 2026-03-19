const mockgetTags = jest.fn()

jest.mock("../../src/repisotaries/tagRep", () => ({
  TagRep: jest.fn().mockImplementation(() => ({
    getTags: mockgetTags,
  }))
}))

import { TagSer } from "../../src/service/tagSer"
import { HttpException } from "../../src/middleware/error"

describe("getTags tesztek", () => {
    let service: TagSer
        
    beforeEach(() => {
        service = new TagSer()
        jest.clearAllMocks()
    })
    it("should return tags", async() => {
        const mockResults = [{ t_id: 1 }]

        mockgetTags.mockResolvedValue(mockResults)

        const result = await service.getTags()

        expect(mockgetTags).toHaveBeenCalled()
        expect(result).toEqual(mockResults)
    })

    it("Should throw 404 if no tags are found", async () => {
        mockgetTags.mockResolvedValue([])

        await expect(
            service.getTags()
        ).rejects.toThrow(HttpException)

        await expect(
            service.getTags()
        ).rejects.toMatchObject({
            status: 404,
            message: "Nincs ilyen elem"
        })

        expect(mockgetTags).toHaveBeenCalled()
    })
})

