import { Request, Response } from "express";

const mockGetReviews = jest.fn()
const mockGetFlaggedReviews = jest.fn()
const mockDeleteReview = jest.fn()
const mockInsertReview = jest.fn()
const mockModifyReview = jest.fn()

jest.mock("../../src/service/reviewsSer", () => ({
  ReviewSer: jest.fn().mockImplementation(() => ({
    getReviews: mockGetReviews,
    getFlaggedReviews: mockGetFlaggedReviews,
    deleteReview: mockDeleteReview,
    insertReview: mockInsertReview,
    modifyReview: mockModifyReview
  }))
}));

import { ReviewController } from "../../src/review/reviewController";

describe("GET reviews", () => {
    let controller: ReviewController
    let req: Partial<Request> & { user?: any }
    let res: any
    beforeEach(() => {
        controller = new ReviewController()
        req = { 
            query: {}, 
            user: {status: 1}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.clearAllMocks()
    })
    it("should return reviews", async () => {
        const results = [{r_id: 1}]
        mockGetReviews.mockResolvedValue(results)

        await controller.getReviews(req as Request, res as Response)

        expect(mockGetReviews).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(results)
    })

    it("should handle error", async () => {
        const mockError = {
            status: 500,
            message: "Database error"
        }
        mockGetReviews.mockRejectedValue(mockError)

        await controller.getReviews(req as Request, res as Response)

        expect(mockGetReviews).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith("Database error")
    })
})

describe("GET flagged reviews", () => {
    let controller: ReviewController
    let req: Partial<Request> & { user?: any }
    let res: any
    beforeEach(() => {
        controller = new ReviewController()
        req = { 
            query: {}, 
            user: {status: 5}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.clearAllMocks()
    })
    it("should return flagged reviews", async () => {
        const results = [{r_id: 1}]
        mockGetFlaggedReviews.mockResolvedValue(results)

        await controller.getFlaggedReviews(req as Request, res as Response)

        expect(mockGetFlaggedReviews).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(results)
    })
    it("should not return flagged reviews if id isn't 5", async () => {
        req.user.status = 1

        await controller.getFlaggedReviews(req as Request, res as Response)

        expect(mockGetFlaggedReviews).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Bad status")
    })
})


describe("DELETE review", () => {
    let controller: ReviewController
    let req: Partial<Request> & { user?: any }
    let res: any
    beforeEach(() => {
        controller = new ReviewController()
        req = { 
            query: {}, 
            params: {id: "1"},
            user: {status: 5}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.clearAllMocks()
    })
    it("should delete review", async () => {
        mockDeleteReview.mockResolvedValue({ affectedRows: 1 })

        await controller.deleteReview(req as Request, res as Response)

        expect(mockDeleteReview).toHaveBeenCalledWith(1)
        expect(res.status).toHaveBeenCalledWith(204)
        expect(res.send).toHaveBeenCalledWith({ affectedRows: 1 })
    })
    it("should reject if user status isn't 5", async () => {
        req.user.status = 4

        await controller.deleteReview(req as Request, res as Response)

        expect(mockDeleteReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Bad status")
    })
    it("should reject if id is invalid", async () => {
        req.params.id = "abc"

        await controller.deleteReview(req as Request, res as Response)

        expect(mockDeleteReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })
})

describe("POST insert review", () => {
    let controller: ReviewController
    let req: Partial<Request> & { user?: any }
    let res: any
    beforeEach(() => {
        controller = new ReviewController()
        req = {
            user: { id: 1, status: 2 },
            body: { i_id: 1, stars: 5, comment: "Great!" }
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.clearAllMocks()
    })
     it("should insert review successfully", async () => {
        const dbResult = { insertId: 1 }
        mockInsertReview.mockResolvedValue(dbResult)

        await controller.insertReview(req as Request, res as Response)

        expect(mockInsertReview).toHaveBeenCalledWith(1, 5, "Great!", 1)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith({ message: "Created", id: 1 })
    })

    it("should reject if user status == 3", async () => {
        req.user.status = 3

        await controller.insertReview(req as Request, res as Response)

        expect(mockInsertReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Bad status")
    })

    it("should reject if body is missing", async () => {
        req.body = undefined

        await controller.insertReview(req as Request, res as Response)

        expect(mockInsertReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

    it("should reject if i_id or stars missing", async () => {
        req.body = { comment: "Hi" } 

        await controller.insertReview(req as Request, res as Response)

        expect(mockInsertReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith({ error: "Missing data" })
    })

    it("should reject if stars out of range higher", async () => {
        req.body.stars = 6

        await controller.insertReview(req as Request, res as Response)

        expect(mockInsertReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad stars")
    })
    it("should reject if stars out of range lower", async () => {
        req.body.stars = -6

        await controller.insertReview(req as Request, res as Response)

        expect(mockInsertReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad stars")
    })
})
describe("PATCH modify review", () => {
    let controller: ReviewController
    let req: any
    let res: any

    beforeEach(() => {
        controller = new ReviewController()

        req = {
        params: { id: "1" },
        user: { status: 2 },
        body: { stars: 5, comment: "Updated" }
        }

        res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
        }

        jest.clearAllMocks()
    })

    it("should modify review successfully", async () => {
        mockModifyReview.mockResolvedValue({ affectedRows: 1 })

        await controller.modifyReview(req as Request, res as Response)

        expect(mockModifyReview).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith({ message: "Modified" })
    })

    it("should reject if user status == 3", async () => {
        req.user.status = 3

        await controller.modifyReview(req as Request, res as Response)

        expect(mockModifyReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Bad status")
    })

    it("should reject if id is invalid", async () => {
        req.params.id = "abc"

        await controller.modifyReview(req as Request, res as Response)

        expect(mockModifyReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

    it("should reject if body is missing", async () => {
        req.body = undefined

        await controller.modifyReview(req as Request, res as Response)

        expect(mockModifyReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

    it("should reject if no allowed fields present", async () => {
        req.body = { randomField: "value" }

        await controller.modifyReview(req as Request, res as Response)

        expect(mockModifyReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

    it("should reject if stars out of range", async () => {
        req.body.stars = 6

        await controller.modifyReview(req as Request, res as Response)

        expect(mockModifyReview).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })
})


