import { ReviewRep } from "../../src/repisotaries/reviewsRep"
import mysql from "mysql2/promise"
//import { HttpException } from "../../src/middleware/error"

jest.mock("mysql2/promise")

describe("getReviews tesztek", () => {
    test("returns reviews from db", async () => {
            const mockQuery = jest.fn().mockResolvedValue([
                [{ comment: null, stars: 4, r_id: 1, flagged: 0, reason: null }],
                []
            ])
            const mockConnection = {
                query: mockQuery,
                end: jest.fn()
            };
    
            (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
    
            const repo = new ReviewRep()
    
            const result = await repo.getReviews()
    
            expect(mockQuery).toHaveBeenCalledWith(
                "select * from reviews"
            )
            expect(result).toEqual([{ comment: null, stars: 4, r_id: 1, flagged: 0, reason: null }])
        })
})

describe("getFlaggedReviews tesztek", () => {
    test("returns flagged reviews from db", async () => {
            const mockQuery = jest.fn().mockResolvedValue([
                [{ comment: null, stars: 4, r_id: 1, flagged: 0, reason: null }],
                []
            ])
            const mockConnection = {
                query: mockQuery,
                end: jest.fn()
            };
    
            (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
    
            const repo = new ReviewRep()
    
            const result = await repo.getFlaggedReviews()
    
            expect(mockQuery).toHaveBeenCalledWith(
                "select * from reviews where flagged = 1"
            )
            expect(result).toEqual([{ comment: null, stars: 4, r_id: 1, flagged: 0, reason: null }])
        })
})

describe("delete review tesztek", () => {
    test("deletes reviews from db", async () => {
            const mockQuery = jest.fn().mockResolvedValue([
                { affectedRows: 1 },
                []
            ])
            const mockConnection = {
                query: mockQuery,
                end: jest.fn()
            };
    
            (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
    
            const repo = new ReviewRep()
    
            const result = await repo.deleteReview(1)
    
            expect(mockQuery).toHaveBeenCalledWith(
                "delete from reviews where r_id = ?", [1]
            )
            expect(result).toEqual({ affectedRows: 1 })
        })
})

describe("insert review tesztek", () => {
    test("inserts reviews into db", async () => {
            const mockQuery = jest.fn().mockResolvedValue([
                { affectedRows: 1 },
                []
            ])
            const mockConnection = {
                query: mockQuery,
                end: jest.fn()
            };
    
            (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
    
            const repo = new ReviewRep()
    
            const result = await repo.insertReview(1, 5, "5", 1)
    
            expect(mockQuery).toHaveBeenCalledWith(
                "insert into reviews values (null, ?, ?, ?, ?, ?, null)", [1, 1,false,5, "5"]
            )
            expect(result).toEqual({ affectedRows: 1 })
        })
})

describe("modify review tesztek", () => {
    test("modifies reviews into db", async () => {
            const mockQuery = jest.fn().mockResolvedValue([
                { affectedRows: 1 },
                []
            ])
            const mockConnection = {
                query: mockQuery,
                end: jest.fn()
            };
    
            (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
            
            const sql = "update orders set flagged = ? where r_id = ?;"
            const values = [1, 1]

            const repo = new ReviewRep()
    
            const result = await repo.modifyReview(sql, values)
    
            expect(mockQuery).toHaveBeenCalledWith(
                sql, values
            )
            expect(result).toEqual({ affectedRows: 1 })
        })
})