import { TagRep } from "../../src/repisotaries/tagRep"
import mysql from "mysql2/promise"


jest.mock("mysql2/promise")

describe("getTags tesztek", () => {
    test("returns tags from db", async () => {
            const mockQuery = jest.fn().mockResolvedValue([
                [{ t_id: 1, t_name: "book" }],
                []
            ])
            const mockConnection = {
                query: mockQuery,
                end: jest.fn()
            };
    
            (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
    
            const repo = new TagRep()
    
            const result = await repo.getTags()
    
            expect(mockQuery).toHaveBeenCalledWith(
                "select * from tag"
            )
            expect(result).toEqual([{ t_id: 1, t_name: "book" }])
        })
})