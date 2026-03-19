const mockgetReviews = jest.fn()
const mockgetFlaggedReviews = jest.fn()
const mockdeleteReview = jest.fn()
const mockinsertReview = jest.fn()
const mockmodifyReview = jest.fn()

jest.mock("../../src/repisotaries/reviewsRep", () => ({
  ReviewRep: jest.fn().mockImplementation(() => ({
    getReviews: mockgetReviews,
    getFlaggedReviews: mockgetFlaggedReviews,
    deleteReview: mockdeleteReview,
    insertReview: mockinsertReview,
    modifyReview: mockmodifyReview
  }))
}))

import { ReviewSer } from "../../src/service/reviewsSer"
import { HttpException } from "../../src/middleware/error"

describe("getreviews tesztek", () => {
    let service: ReviewSer
    
    beforeEach(() => {
        service = new ReviewSer()
        jest.clearAllMocks()
    })
    it("Should return reviews", async() => {
        const mockResults = [{r_id: 0}]

        mockgetReviews.mockResolvedValue(mockResults)

        const result = await service.getReviews()

        expect(mockgetReviews).toHaveBeenCalledWith()
        expect(result).toEqual(mockResults)
    })

     it("Should throw 404 if no reviews are found", async () => {
        mockgetReviews.mockResolvedValue([])

        await expect(
            service.getReviews()
        ).rejects.toThrow(HttpException)

        await expect(
            service.getReviews()
        ).rejects.toMatchObject({
            status: 404,
            message: "Nincs ilyen elem"
        })

        expect(mockgetReviews).toHaveBeenCalled()
    })
})

describe("getflaggedreviews tesztek", () => {
    let service: ReviewSer
    
    beforeEach(() => {
        service = new ReviewSer()
        jest.clearAllMocks()
    })
    it("Should return flagged reviews", async() => {
        const mockResults = [{r_id: 0}]

        mockgetFlaggedReviews.mockResolvedValue(mockResults)

        const result = await service.getFlaggedReviews()

        expect(mockgetFlaggedReviews).toHaveBeenCalledWith()
        expect(result).toEqual(mockResults)
    })

     it("Should throw 404 if no reviews are found", async () => {
        mockgetFlaggedReviews.mockResolvedValue([])

        await expect(
            service.getFlaggedReviews()
        ).rejects.toThrow(HttpException)

        await expect(
            service.getFlaggedReviews()
        ).rejects.toMatchObject({
            status: 404,
            message: "Nincs ilyen elem"
        })

        expect(mockgetFlaggedReviews).toHaveBeenCalled()
    })
})

describe("deletereview tesztek", () => {
    let service: ReviewSer
    
    beforeEach(() => {
        service = new ReviewSer()
        jest.clearAllMocks()
    })
    it("Should delete review", async() => {
        const mockResults = {affectedRows: 1}

        mockdeleteReview.mockResolvedValue(mockResults)

        const result = await service.deleteReview(1)

        expect(mockdeleteReview).toHaveBeenCalledWith(1)
        expect(result).toEqual(mockResults)
    })

     it("Should throw 404 if review is not found", async () => {
        mockdeleteReview.mockResolvedValue({affectedRows: 0})

        await expect(
            service.deleteReview(1)
        ).rejects.toThrow(HttpException)

        await expect(
            service.deleteReview(1)
        ).rejects.toMatchObject({
            status: 404,
            message: "Nincs ilyen elem"
        })

        expect(mockdeleteReview).toHaveBeenCalledWith(1)
    })
})

describe("insertReview tesztek", () => {
    let service: ReviewSer
    
    beforeEach(() => {
        service = new ReviewSer()
        jest.clearAllMocks()
    })
    it("Should insert review", async() => {
        const mockResults = {affectedRows: 1}

        mockinsertReview.mockResolvedValue(mockResults)

        const result = await service.insertReview(1, 1, null, 1)

        expect(mockinsertReview).toHaveBeenCalledWith(1, 1, null, 1)
        expect(result).toEqual(mockResults)
    })

     it("Should throw 400 if unsuccessfull", async () => {
        mockinsertReview.mockResolvedValue({affectedRows: 0})

        await expect(
            service.insertReview(1, 1, null, 1)
        ).rejects.toThrow(HttpException)

        await expect(
            service.insertReview(1, 1, null, 1)
        ).rejects.toMatchObject({
            status: 400,
            message: "Sikertelen"
        })

        expect(mockinsertReview).toHaveBeenCalled()
    })
})


describe("modifyReview tesztek", () => {
    let service: ReviewSer
    
    beforeEach(() => {
        service = new ReviewSer()
        jest.clearAllMocks()
    })
    it("Should modify review", async() => {
        const mockResults = {affectedRows: 1}

        mockmodifyReview.mockResolvedValue(mockResults)

        const result = await service.modifyReview("sql", [])

        expect(mockmodifyReview).toHaveBeenCalledWith("sql", [])
        expect(result).toEqual(mockResults)
    })

     it("Should throw 404 if element not found", async () => {
        mockmodifyReview.mockResolvedValue({affectedRows: 0})

        await expect(
            service.modifyReview("sql", [])
        ).rejects.toThrow(HttpException)

        await expect(
            service.modifyReview("sql", [])
        ).rejects.toMatchObject({
            status: 404,
            message: "Nincs ilyen elem"
        })

        expect(mockmodifyReview).toHaveBeenCalled()
    })
})