import { Request, Response } from "express";
import { uploadMiddleware } from "../../src/middleware/upload";

const mockGetItems = jest.fn();
const mockGetOneItem = jest.fn();
const mockGetReviewsOfItem = jest.fn();
const mockGetTagsOfItem = jest.fn();
const mockDeleteItem = jest.fn();
const mockInsertItem = jest.fn();
const mockModifyItem = jest.fn();

jest.mock("../../src/middleware/upload");

jest.mock("../../src/service/itemSer", () => ({
  ItemSer: jest.fn().mockImplementation(() => ({
    getItems: mockGetItems,
    getOneItem: mockGetOneItem,
    getReviewsOfItem: mockGetReviewsOfItem,
    getTagsOfItem: mockGetTagsOfItem,
    deleteItem: mockDeleteItem,
    insertItem: mockInsertItem,
    modifyItem: mockModifyItem
  }))
}));

import { ItemController } from "../../src/items/itemsController";

describe("getItem", () => {

  let controller: ItemController;
  let req: Partial<Request>;
  let res: any;

  beforeEach(() => {

    controller = new ItemController();

    req = { query: {} };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    jest.clearAllMocks();
  });

  it("should return items", async () => {

    const items = { id: 1, name: "Item1" };
    mockGetItems.mockResolvedValue(items);

    req.query = {
      name: "Item1",
      tags: "tag1",
      author: "John"
    };

    await controller.getItem(req as Request, res as Response);

    expect(mockGetItems).toHaveBeenCalledWith("Item1","tag1","John");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(items);

  });

  it("should handle errors", async () => {

    mockGetItems.mockRejectedValue({
      status: 400,
      message: "Bad request"
    });

    await controller.getItem(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Bad request");

  });

  it("should convert invalid query params to null", async () => {

    mockGetItems.mockResolvedValue([]);

    req.query = {
      name: ["bad"],
      tags: 123,
      author: null
    } as any;

    await controller.getItem(req as Request, res as Response);

    expect(mockGetItems).toHaveBeenCalledWith(null, null, null);

  });

});


describe("Get one item tests", () => {
    let controller: ItemController;
    let req: Partial<Request>;
    let res: any;

    beforeEach(() => {

    controller = new ItemController();

    req = { params: {id: "1"} };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    jest.clearAllMocks();
  });

  it ("should return an item", async () => {
   const item = { id: 1, name: "Item1" };

    mockGetOneItem.mockResolvedValue(item);

    await controller.getOneItem(req as Request, res as Response);

    expect(mockGetOneItem).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(item);
  })

  it ("should error if id bad", async () => {
    req.params = { id: "abc" };

    await controller.getOneItem(req as Request, res as Response);

    expect(mockGetOneItem).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Rossz formátumú id");
  })

  it("service errors", async () => {

    mockGetOneItem.mockRejectedValue({
      status: 404,
      message: "Item not found"
    });

    await controller.getOneItem(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Item not found");

  });


})

describe("get reviews of items", () => {
    let controller: ItemController;
    let req: Partial<Request>;
    let res: any;

    beforeEach(() => {

    controller = new ItemController();

    req = { params: {id: "1"} };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    jest.clearAllMocks();
  });

  it("should return reviews", async () => {
    const review = [{r_id: '1', comment: 'valami'}]

    mockGetReviewsOfItem.mockResolvedValue(review)

    await controller.getReviewsOfItem(req as Request, res as Response)

    expect(mockGetReviewsOfItem).toHaveBeenCalledWith(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(review)
  })

  it("should error if id is bad", async () => {
    req.params = {id: "asd"}

    await controller.getReviewsOfItem(req as Request, res as Response)

    expect(mockGetReviewsOfItem).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)

  })

  it("service error", async () => {
   mockGetReviewsOfItem.mockRejectedValue({
      status: 404,
      message: "Item not found"
    });

    await controller.getReviewsOfItem(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Item not found");

  })
})


describe("get tags of items", () => {
    let controller: ItemController;
    let req: Partial<Request>;
    let res: any;

    beforeEach(() => {

    controller = new ItemController();

    req = { params: {id: "1"} };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    jest.clearAllMocks();
  });

  it("should return tags", async () => {
    const tag = [{t_id: '1', t_name: 'book'}]

    mockGetTagsOfItem.mockResolvedValue(tag)

    await controller.getTagsOfItem(req as Request, res as Response)

    expect(mockGetTagsOfItem).toHaveBeenCalledWith(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(tag)
  })

  it("should error if id is bad", async () => {
    req.params = {id: "asd"}

    await controller.getTagsOfItem(req as Request, res as Response)

    expect(mockGetTagsOfItem).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)

  })

  it("service error", async () => {
   mockGetTagsOfItem.mockRejectedValue({
      status: 404,
      message: "Item not found"
    });

    await controller.getTagsOfItem(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Item not found");

  })
})


describe("deleteItem", () => {
  let controller: ItemController;
  let req: any;
  let res: any;

  beforeEach(() => {
    controller = new ItemController();

    req = {
      params: { id: "1" },
      user: { status: 4 } 
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    jest.clearAllMocks();
  });

  it("should delete an item with valid id and authorized user", async () => {
    mockDeleteItem.mockResolvedValue({ success: true });

    await controller.deleteItem(req as Request, res as Response);

    expect(mockDeleteItem).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith({ success: true });
  });

  it("should return 400 for invalid id", async () => {
    req.params.id = "abc"; 

    await controller.deleteItem(req as Request, res as Response);

    expect(mockDeleteItem).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Rossz formátumú id");
  });

  it("should return 401 for unauthorized user", async () => {
    req.user.status = 2; 

    await controller.deleteItem(req as Request, res as Response);

    expect(mockDeleteItem).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Bad Status");
  });

  it("should handle service errors", async () => {
    mockDeleteItem.mockRejectedValue({
      status: 500,
      message: "Server error"
    });

    await controller.deleteItem(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Server error");
  });
});

describe("insertItem test", () => {
    let controller: ItemController;
    let req: any;
    let res: any;

    beforeEach(() => {
        controller = new ItemController();

        res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
        };
        (uploadMiddleware as jest.Mock).mockImplementation((_req, _res) => Promise.resolve());
        req = {
        body: {
            i_name: "My Book",
            author: "John Doe",
            i_description: "Some description",
            tags: "fiction,novel",
            amount: 2,
        },
        file: { filename: "book.jpg" },
        user: { status: 5 },
        };
        jest.clearAllMocks();
    });

    it("should insert an item", async () => {
        mockInsertItem.mockResolvedValue({ insertId: 123 });
        await controller.insertItem(req as Request, res as Response);

        expect(uploadMiddleware).toHaveBeenCalledWith(req, res);
        expect(mockInsertItem).toHaveBeenCalledWith(
        "My Book",
        "John Doe",
        "Some description",
        "/uploads/book.jpg",
        2,
        ["fiction", "novel"]
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ id: 123 });
  });
   it("should return 400 if no file is provided", async () => {
    req.file = null;

    await controller.insertItem(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("No Image");
  });

  it("should return 401 if user status is too low", async () => {
    req.user.status = 3;

    await controller.insertItem(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Bad Status");
  });

})

describe("modifyItem controller", () => {
  let req: any;
  let res: any;
  let controller: ItemController

  beforeEach(() => {
    controller = new ItemController()
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    (uploadMiddleware as jest.Mock).mockImplementation((_req, _res) => Promise.resolve());

    req = {
      params: { id: "1" },
      body: {
        i_name: "Updated Book",
        author: "Jane Doe",
        i_description: "Updated description",
        tags: "fiction,updated",
        amount: 5,
      },
      file: { filename: "updated.jpg" },
      user: { status: 5 },
    };

    jest.clearAllMocks();
  });

  it("should modify an item successfully", async () => {
    await controller.modifyItem(req, res);

    const expectedUpdateString = "i_name = ?,author = ?,i_description = ?,img_url = ?,amount = ?";
    const expectedValues = [
      "Updated Book",
      "Jane Doe",
      "Updated description",
      "/uploads/updated.jpg",
      5,
      1,
    ];
    const expectedTags = ["fiction", "updated"];

    expect(uploadMiddleware).toHaveBeenCalledWith(req, res);
    expect(mockModifyItem).toHaveBeenCalledWith(expectedUpdateString, expectedValues, expectedTags);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ message: "Modified" });
  });

  it("should return 400 for invalid id", async () => {
    req.params.id = "abc";

    await controller.modifyItem(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Rossz formátumú id");
  });

  it("should return 401 for low user status", async () => {
    req.user.status = 3;

    await controller.modifyItem(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Bad Status");
  });

  it("should handle missing body", async () => {
    req.body = null;

    await controller.modifyItem(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Bad request");
  });
});