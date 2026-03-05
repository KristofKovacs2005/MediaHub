import mysql from "mysql2/promise"
import { OrderRep } from "../../src/repisotaries/orderRep"
import { HttpException } from "../../src/middleware/error"

jest.mock("mysql2/promise")

describe("Get orders test", () => {
    test("returns order from db", async () => {
        const mockQuery = jest.fn().mockResolvedValue([
            [{ o_id: 1, s_id: 1, u_id: 1, p_id: 1, date: "2025-12-12", return_date: "2025-12-19" }],
            []
        ])
        const mockConnection = {
            query: mockQuery,
            end: jest.fn()
        };

        (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)

        const repo = new OrderRep()

        const result = await repo.getOrders()

        expect(mockQuery).toHaveBeenCalledWith(
            "select * from orders"
        )
        expect(result).toEqual([{ o_id: 1, s_id: 1, u_id: 1, p_id: 1, date: "2025-12-12", return_date: "2025-12-19" }])
    })
})


describe("Get user orders test", () => {
    test("returns orders of the user from db", async () => {
        const mockQuery = jest.fn().mockResolvedValue([
            [{ o_id: 1, s_id: 1, u_id: 1, p_id: 1, date: "2025-12-12", return_date: "2025-12-19" }],
            []
        ])
        const mockConnection = {
            query: mockQuery,
            end: jest.fn()
        };

        (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)

        const repo = new OrderRep()

        const result = await repo.getUserOrders(1)

        expect(mockQuery).toHaveBeenCalledWith(
            "select * from orders where u_id = ?", 
            [1]
        )
        expect(result).toEqual([{ o_id: 1, s_id: 1, u_id: 1, p_id: 1, date: "2025-12-12", return_date: "2025-12-19" }])
    })
})

describe("Get active orders test", () => {
    test("returns active orders from db", async () => {
        const mockQuery = jest.fn().mockResolvedValue([
            [{ o_id: 1, s_id: 1, u_id: 1, p_id: 1, date: "2025-12-12", return_date: "2025-12-19" }],
            []
        ])
        const mockConnection = {
            query: mockQuery,
            end: jest.fn()
        };

        (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)

        const repo = new OrderRep()

        const result = await repo.getAllActiveOrders(1)

        expect(mockQuery).toHaveBeenCalledWith(
            `select * from orders 
            inner join order_status on orders.s_id = order_status.os_id 
            where u_id = ? 
            and (os_name like 'awaiting acceptance' or os_name like 'accepted' or os_name like 'late');`, [1]
           
        )
        expect(result).toEqual([{ o_id: 1, s_id: 1, u_id: 1, p_id: 1, date: "2025-12-12", return_date: "2025-12-19" }])
    })
})

describe("insertItem", () => {
    let mockQuery: jest.Mock
    let mockConnection: any
    let repo: OrderRep
  
    beforeEach(() => {
      mockQuery = jest.fn()
      mockConnection = {
        query: mockQuery,
        end: jest.fn(),
      };
      (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
  
      repo = new OrderRep()
    })
  
    test("successfully inserts order", async () => {
  
      mockQuery.mockResolvedValueOnce([{}, []])
        .mockResolvedValueOnce([[{ amount: 1 }], []])
        .mockResolvedValueOnce([{affectedRows: 1}, []]) 
        .mockResolvedValueOnce([, []]) 
        .mockResolvedValueOnce([{}, []]) 

        const result = await repo.insertOrder(1, 3, new Date("2026-10-11"), new Date("2026-11-11"))

        expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
        expect(mockQuery).toHaveBeenNthCalledWith(
            2,
            "select orderable(?,?,?) as amount;",
            [3, expect.any(Date), expect.any(Date)]
        )
        expect(mockQuery).toHaveBeenNthCalledWith(
            3,
            "insert into orders values (null, 1, ?, ?, ?, ?);",
            [1, 3, expect.any(Date), expect.any(Date)]
        )
        expect(mockQuery).toHaveBeenNthCalledWith(
            4,
            "update items set amount = ? where i_id = ?",
            [0, 3]
        )
        expect(mockQuery).toHaveBeenNthCalledWith(5, "COMMIT;")

        expect(mockConnection.end).toHaveBeenCalled()
        expect(result).toEqual({ affectedRows: 1 })
    })
    test("Item not available", async () => {
  
      mockQuery.mockResolvedValueOnce([{}, []])
        .mockResolvedValueOnce([[{ amount: 0 }], []])
        .mockResolvedValueOnce([{}, []]) 

        await expect(repo.insertOrder(1, 3, new Date("2026-10-11"), new Date("2026-11-11"))).rejects.toThrow(HttpException)

        expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
        expect(mockQuery).toHaveBeenNthCalledWith(
            2,
            "select orderable(?,?,?) as amount;",
            [3, expect.any(Date), expect.any(Date)]
        )
        
        expect(mockQuery).toHaveBeenNthCalledWith(3, "ROLLBACK;")

        expect(mockConnection.end).toHaveBeenCalled()
    })

    test("Item does not exist", async () => {
  
      mockQuery.mockResolvedValueOnce([{}, []])
        .mockResolvedValueOnce([[{ amount: null }], []])
        .mockResolvedValueOnce([{}, []]) 

        await expect(repo.insertOrder(1, 3, new Date("2026-10-11"), new Date("2026-11-11"))).rejects.toThrow(HttpException)

        expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
        expect(mockQuery).toHaveBeenNthCalledWith(
            2,
            "select orderable(?,?,?) as amount;",
            [3, expect.any(Date), expect.any(Date)]
        )
        
        expect(mockQuery).toHaveBeenNthCalledWith(3, "ROLLBACK;")

        expect(mockConnection.end).toHaveBeenCalled()
    })

     test("fails if insert did not succeed", async () => {
  
      mockQuery.mockResolvedValueOnce([{}, []])
        .mockResolvedValueOnce([[{ amount: 1 }], []])
        .mockResolvedValueOnce([{affectedRows: 0}, []]) 
        .mockResolvedValueOnce([, []]) 
        .mockResolvedValueOnce([{}, []]) 

        const result = await repo.insertOrder(1, 3, new Date("2026-10-11"), new Date("2026-11-11"))

        expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
        expect(mockQuery).toHaveBeenNthCalledWith(
            2,
            "select orderable(?,?,?) as amount;",
            [3, expect.any(Date), expect.any(Date)]
        )
        expect(mockQuery).toHaveBeenNthCalledWith(
            3,
            "insert into orders values (null, 1, ?, ?, ?, ?);",
            [1, 3, expect.any(Date), expect.any(Date)]
        )
        expect(mockQuery).toHaveBeenNthCalledWith(
            4,
            "update items set amount = ? where i_id = ?",
            [0, 3]
        )
        expect(mockQuery).toHaveBeenNthCalledWith(5, "ROLLBACK;")

        expect(mockConnection.end).toHaveBeenCalled()
        expect(result).toEqual({ affectedRows: 0 })
    })
})


describe("modifyOrder", () => {
    let mockQuery: jest.Mock
    let mockConnection: any
    let repo: OrderRep
  
    beforeEach(() => {
      mockQuery = jest.fn()
      mockConnection = {
        query: mockQuery,
        end: jest.fn(),
      };
      (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
  
      repo = new OrderRep()
    })

    test("order successfully modified with no item amount change", async () => {
        const sql = "UPDATE orders set status = ? where o_id = ?"
        const values: any[] = [1, 1]
        const id = 1
        const status = 1
        mockQuery.mockResolvedValueOnce([{}, []])
        .mockResolvedValueOnce([[{p_id: 1}], []])
        .mockResolvedValueOnce([{amount: 0}, []]) 
        .mockResolvedValueOnce([{affectedRows: 1}, []]) 
        .mockResolvedValueOnce([{}, []]) 

        const result = await repo.modifyOrder(sql, values, id, status)

        expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
        expect(mockQuery).toHaveBeenNthCalledWith(2, "select p_id from orders where o_id = ?", [1])
        expect(mockQuery).toHaveBeenNthCalledWith(3, "select amount from items where i_id = ?", [1])
        expect(mockQuery).toHaveBeenNthCalledWith(4, sql, values)
        expect(mockQuery).toHaveBeenNthCalledWith(5, "COMMIT;")
        expect(mockConnection.end).toHaveBeenCalled()
        expect(result).toEqual({ affectedRows: 1 })

    })

     test("order not found", async () => {
        const sql = "UPDATE orders set status = ? where o_id = ?"
        const values: any[] = [1, 1]
        const id = 1
        const status = 1
        mockQuery.mockResolvedValueOnce([{}, []])
        .mockResolvedValueOnce([[], []])
        .mockResolvedValueOnce([, []]) 


        await expect(repo.modifyOrder(sql, values, id, status)).rejects.toThrow(HttpException)

        expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
        expect(mockQuery).toHaveBeenNthCalledWith(2, "select p_id from orders where o_id = ?", [1])

        expect(mockQuery).toHaveBeenNthCalledWith(3, "ROLLBACK;")
        expect(mockConnection.end).toHaveBeenCalled()


    })

    test("order successfully modified with item amount change", async () => {
        const sql = "UPDATE orders set status = ? where o_id = ?"
        const values: any[] = [1, 1]
        const id = 1
        const status = 4
        mockQuery.mockResolvedValueOnce([{}, []])
        .mockResolvedValueOnce([[{p_id: 1}], []])
        .mockResolvedValueOnce([[{amount: 0}], []]) 
        .mockResolvedValueOnce([{affectedRows: 1}, []]) 
        .mockResolvedValueOnce([, []]) 
        .mockResolvedValueOnce([{}, []]) 

        const result = await repo.modifyOrder(sql, values, id, status)

        expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
        expect(mockQuery).toHaveBeenNthCalledWith(2, "select p_id from orders where o_id = ?", [1])
        expect(mockQuery).toHaveBeenNthCalledWith(3, "select amount from items where i_id = ?", [1])
        expect(mockQuery).toHaveBeenNthCalledWith(4, sql, values)
        expect(mockQuery).toHaveBeenNthCalledWith(5, "update items set amount = ? where i_id = ?", [1, 1])
        expect(mockQuery).toHaveBeenNthCalledWith(6, "COMMIT;")
        expect(mockConnection.end).toHaveBeenCalled()
        expect(result).toEqual({ affectedRows: 1 })

    })

    test("modify did not succeed", async () => {
        const sql = "UPDATE orders set status = ? where o_id = ?"
        const values: any[] = [1, 1]
        const id = 1
        const status = 1
        mockQuery.mockResolvedValueOnce([{}, []])
        .mockResolvedValueOnce([[{p_id: 1}], []])
        .mockResolvedValueOnce([[{amount: 1}], []])
        .mockResolvedValueOnce([{affectedRows: 0}, []]) 
        .mockResolvedValueOnce([{}, []])


        await (repo.modifyOrder(sql, values, id, status))

        expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
        expect(mockQuery).toHaveBeenNthCalledWith(2, "select p_id from orders where o_id = ?", [1])
        expect(mockQuery).toHaveBeenNthCalledWith(3, "select amount from items where i_id = ?", [1])
        expect(mockQuery).toHaveBeenNthCalledWith(4, sql, values)
        expect(mockQuery).toHaveBeenNthCalledWith(5, "ROLLBACK;")
        expect(mockConnection.end).toHaveBeenCalled()


    })
    

    
})



