import { ItemRep } from "../../src/repisotaries/itemRep"
import mysql from "mysql2/promise"
import { HttpException } from "../../src/middleware/error"

jest.mock("mysql2/promise")

describe("Get one item test", () => {
    test("returns item from db", async () => {
        const mockQuery = jest.fn().mockResolvedValue([
            [{ i_id: 1, i_name: "item1",author: "Valaki", img_url: "kep", i_description: "valami", amount: 1 }],
            []
        ])
        const mockConnection = {
            query: mockQuery,
            end: jest.fn()
        };

        (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)

        const repo = new ItemRep()

        const result = await repo.getOneItem(1)

        expect(mockQuery).toHaveBeenCalledWith(
            "select * from items where i_id = ?",
            [1]
        )
        expect(result).toEqual([{ i_id: 1, i_name: "item1",author: "Valaki", img_url: "kep", i_description: "valami", amount: 1 }])
    })
})


describe("Get reviews of item", () => {
    test("returns reviews from db", async () => {
        const mockQuery = jest.fn().mockResolvedValue([
            [{ comment: null, stars: 5, username: "valaki", r_id: 1 }],
            []
        ])
        const mockConnection = {
            query: mockQuery,
            end: jest.fn()
        };

        (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)

        const repo = new ItemRep()

        const result = await repo.getReviewsOfItem(1)

        expect(mockQuery).toHaveBeenCalledWith(
            `SELECT reviews.comment, reviews.stars, users.username, reviews.r_id
                FROM reviews 
                INNER JOIN items ON reviews.i_id = items.i_id 
                INNER JOIN users ON reviews.u_id = users.u_id
                WHERE items.i_id = ?;`, [1]
        )
        expect(result).toEqual([{ comment: null, stars: 5, username: "valaki", r_id: 1 }])
    })
})

describe("Get tags of item", () => {
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

        const repo = new ItemRep()

        const result = await repo.getTagsOfItem(1)

        expect(mockQuery).toHaveBeenCalledWith(
           `SELECT tag.t_id, tag.t_name
                from tag
                inner join item_tag on tag.t_id = item_tag.t_id
                inner join items on item_tag.i_id = items.i_id
                WHERE items.i_id = ?;`, [1]
        )
        expect(result).toEqual([{ t_id: 1, t_name: "book" }])
    })
})

describe("deleteItem", () => {
    let mockQuery: jest.Mock
    let mockConnection: any
    let repo: ItemRep

    beforeEach(() => {
        mockQuery = jest.fn()
        mockConnection = {
          query: mockQuery,
          end: jest.fn(),
        };
        (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
    
        repo = new ItemRep()
    })

    test("delete successful",async () => {
        mockQuery.mockResolvedValueOnce([{}, []]).mockResolvedValueOnce([{affectedRows: 1}, []]).mockResolvedValueOnce([{}, []]).mockResolvedValueOnce([{}, []])
        const result = await repo.deleteItem(1)
        expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
        expect(mockQuery).toHaveBeenNthCalledWith(2,"delete from items where i_id = ?", [1])
        expect(mockQuery).toHaveBeenNthCalledWith(4, "COMMIT;")
        expect(mockConnection.end).toHaveBeenCalled()

        expect(result).toEqual({ affectedRows: 1 })
    })
    test("throws if item does not exist", async () => {
       
        mockQuery.mockResolvedValueOnce([{}, []]) 
          .mockResolvedValueOnce([{ affectedRows: 0 }, []]) 
          .mockResolvedValueOnce([{}, []]) 
    
        await expect(repo.deleteItem(-1)).rejects.toThrow(HttpException)
    
        expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
        expect(mockQuery).toHaveBeenNthCalledWith(
          2,
          "delete from items where i_id = ?",
          [-1]
        )
        expect(mockQuery).toHaveBeenNthCalledWith(3, "ROLLBACK;")
        expect(mockConnection.end).toHaveBeenCalled()
      })
})

describe("insertItem", () => {
    let mockQuery: jest.Mock
    let mockConnection: any
    let repo: ItemRep
  
    beforeEach(() => {
      mockQuery = jest.fn()
      mockConnection = {
        query: mockQuery,
        end: jest.fn(),
      };
      (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
  
      repo = new ItemRep()
    })
  
    test("successfully inserts item with tags", async () => {
      const tags = ["book", "movie"]
  
      mockQuery.mockResolvedValueOnce([{}, []])
        .mockResolvedValueOnce([{ affectedRows: 1, insertId: 123 }, []])
        .mockResolvedValueOnce([{}, []]) 
        .mockResolvedValueOnce([{}, []]) 
        .mockResolvedValueOnce([{}, []]) 
  
      const result = await repo.insertItem("Book Name", "Author Name", "Desc", "img.png", 10, tags)
  
      expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
      expect(mockQuery).toHaveBeenNthCalledWith(
        2,
        "insert into items values (null, ?, ?, ?, ?, ?)",
        ["Author Name", "Book Name", "img.png", "Desc", 10]
      )
      expect(mockQuery).toHaveBeenNthCalledWith(
        3,
        "insert into item_tag values(?, ?)",
        [123, "book"]
      )
      expect(mockQuery).toHaveBeenNthCalledWith(
        4,
        "insert into item_tag values(?, ?)",
        [123, "movie"]
      )
      expect(mockQuery).toHaveBeenNthCalledWith(5, "COMMIT;")
  
      expect(mockConnection.end).toHaveBeenCalled()
      expect(result).toEqual({ affectedRows: 1, insertId: 123 })
    })
  
    test("throws if main insert fails", async () => {
      mockQuery.mockResolvedValueOnce([{}, []]) 
        .mockResolvedValueOnce([{ affectedRows: 0 }, []]) 
        .mockResolvedValueOnce([{}, []]) 
  
      await expect(
        repo.insertItem("Book Name", "Author Name", "Desc", "img.png", 10, ["book"])
      ).rejects.toThrow(HttpException)
  
      expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
      expect(mockQuery).toHaveBeenNthCalledWith(
        2,
        "insert into items values (null, ?, ?, ?, ?, ?)",
        ["Author Name", "Book Name", "img.png", "Desc", 10]
      )
      expect(mockQuery).toHaveBeenNthCalledWith(3, "ROLLBACK;")
      expect(mockConnection.end).toHaveBeenCalled()
    })
  })

  describe("modifyItem", () => {
    let mockQuery: jest.Mock
    let mockConnection: any
    let repo: ItemRep

    beforeEach(() => {
        mockQuery = jest.fn()
        mockConnection = {
          query: mockQuery,
          end: jest.fn(),
        };
        (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection)
    
        repo = new ItemRep()
      })
      test("successfull modification", async () => {
        const sql = "i_name = ?"
        const values = ["valami", 1]
        const tags = ["book", "movie"]

        mockQuery.mockResolvedValueOnce([{}, []])
        .mockResolvedValueOnce([{ affectedRows: 1 }, []])
        .mockResolvedValueOnce([{}, []]) 
        .mockResolvedValueOnce([{}, []]) 
        .mockResolvedValueOnce([{}, []]) 
        .mockResolvedValueOnce([{}, []]) 
        const result = await repo.modifyItem(sql, values, tags)

        expect(mockQuery).toHaveBeenNthCalledWith(1, "START TRANSACTION;")
        expect(mockQuery).toHaveBeenNthCalledWith(2, "UPDATE items set i_name = ? where i_id = ?;", ["valami", 1])
        expect(mockQuery).toHaveBeenNthCalledWith(3, "delete from item_tag where i_id = ?", [1])
        expect(mockQuery).toHaveBeenNthCalledWith(
            4,
            "insert into item_tag values (?, ?)",
            [1, "book"]
          )
          expect(mockQuery).toHaveBeenNthCalledWith(
            5,
            "insert into item_tag values (?, ?)",
            [1, "movie"]
          )
        expect(mockQuery).toHaveBeenNthCalledWith(6, "COMMIT;")

        expect(mockConnection.end).toHaveBeenCalled()

        expect(result).toEqual({ affectedRows: 1 })

      })
  })