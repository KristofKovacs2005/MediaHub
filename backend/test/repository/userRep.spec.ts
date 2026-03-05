import { UserRep } from "../../src/repisotaries/userRep"
import { HttpException } from "../../src/middleware/error"
import mysql from "mysql2/promise"

jest.mock("mysql2/promise")

describe("getUsers tesztek", () => {
    test("getUsers returns users from db", async () => {
        const mockQuery = jest.fn().mockResolvedValue([
                [{ username: "asd", email: "asd", status: 1, u_id: 1 }],
                []
            ])
        const mockConnection = {
                query: mockQuery,
                end: jest.fn()
            };

            (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)

            const repo = new UserRep()
    
            const result = await repo.getUsers()
    
            expect(mockQuery).toHaveBeenCalledWith(
                "select * from users"
            )
            expect(result).toEqual([{ username: "asd", email: "asd", status: 1, u_id: 1 }])
    })
})

describe("getUsersById tesztek", () => {
    test("getUsersById returns a specific users from db", async () => {
        const mockQuery = jest.fn().mockResolvedValue([
                [{ username: "asd", email: "asd", status: 1, u_id: 1 }],
                []
            ])
        const mockConnection = {
                query: mockQuery,
                end: jest.fn()
            };

            (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)

            const repo = new UserRep()
    
            const result = await repo.getUsersById(1)
    
            expect(mockQuery).toHaveBeenCalledWith(
                "select * from users where u_id = ?", [1]
            )
            expect(result).toEqual([{ username: "asd", email: "asd", status: 1, u_id: 1 }])
    })
})

describe("insertUser tesztek", () => {
    test("inserts users into db", async () => {
        const mockQuery = jest.fn().mockResolvedValue([
            { affectedRows: 1 },
            []
        ])
        const mockConnection = {
            query: mockQuery,
            end: jest.fn()
        };

        (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)

        const repo = new UserRep()

        const result = await repo.insertUser("username", "email", "password", 1)

        expect(mockQuery).toHaveBeenCalledWith(
            "insert into users values (null, ?, ?, ?, ?)", ["username", "email", "password", 1]
        )
        expect(result).toEqual({ affectedRows: 1 })
    })
})

describe("login tesztek", () => {
    let mockQuery: jest.Mock
        let mockConnection: any
        let repo: UserRep
      
        beforeEach(() => {
          mockQuery = jest.fn()
          mockConnection = {
            query: mockQuery,
            end: jest.fn(),
          };
          (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
      
          repo = new UserRep()
        })
    test("succcessful login from db", async () => {
        mockQuery.mockResolvedValueOnce([[{id: 1}], []])
        .mockResolvedValueOnce([[{ username: "asd", email: "asd", status: 1, u_id: 1 }], []])


        const result = await repo.login("username", "password")

        expect(mockQuery).toHaveBeenNthCalledWith(1, "select login(?, ?) as id", ["username", "password"])
        expect(mockQuery).toHaveBeenNthCalledWith(
            2,
            "select * from users where u_id = ?",
            [1]
        )
        expect(mockConnection.end).toHaveBeenCalled()
        expect(result).toEqual([{ username: "asd", email: "asd", status: 1, u_id: 1 }])
    })

    test("unsucccessful login from db", async () => {
        mockQuery.mockResolvedValueOnce([[{id: 0}], []])


        await expect(repo.login("username", "password")).rejects.toThrow(HttpException)

        expect(mockQuery).toHaveBeenNthCalledWith(1, "select login(?, ?) as id", ["username", "password"])
        expect(mockConnection.end).toHaveBeenCalled()
    })
})


describe("modifyUser tesztek", () => {
    test("modifies users into db", async () => {
        const mockQuery = jest.fn().mockResolvedValue([
            { affectedRows: 1 },
            []
        ])
        const mockConnection = {
            query: mockQuery,
            end: jest.fn()
        };
        

        (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)

        const sql = "update users set status = ? where u_id = ?;"
        const values = [1, 1]

        const repo = new UserRep()

        const result = await repo.modifyUser(sql, values)

        expect(mockQuery).toHaveBeenCalledWith(
            sql, values
        )
        expect(result).toEqual({ affectedRows: 1 })
    })
})