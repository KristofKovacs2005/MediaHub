import { Request, Response } from "express";

const mockGetTags = jest.fn()


jest.mock("../../src/service/tagSer", () => ({
  TagSer: jest.fn().mockImplementation(() => ({
    getTags: mockGetTags
  }))
}));

import { TagController } from "../../src/tag/tagController";

describe("GET tags", () => {
    let controller: TagController
        let req: Partial<Request> & { user?: any }
        let res: any
        beforeEach(() => {
            controller = new TagController()
            req = { 
                query: {}
            }
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }
            jest.clearAllMocks()
    })
    it("Should return tags", async () => {
        const results = [{t_id: 1}]
        mockGetTags.mockResolvedValue(results)

        await controller.getTags(req as Request, res as Response)

        expect(mockGetTags).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(results)
    })
    it("tag error", async () => {
        mockGetTags.mockRejectedValue({error: "hiba"})

        await controller.getTags(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith("hiba történt")
    })
})