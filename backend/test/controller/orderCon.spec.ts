import { Request, Response } from "express";


const mockGetOrders = jest.fn()
const mockGetUserOrders = jest.fn()
const mockgetAllActiveOrders = jest.fn()
const mockInsertOrder = jest.fn()
const mockmodifyOrder = jest.fn()



jest.mock("../../src/service/orderSer", () => ({
  OrderSer: jest.fn().mockImplementation(() => ({
    getOrders: mockGetOrders,
    getUserOrders: mockGetUserOrders,
    getAllActiveOrders: mockgetAllActiveOrders,
    insertOrder: mockInsertOrder,
    modifyOrder: mockmodifyOrder
  }))
}));

import { OrderController } from "../../src/order/ordersController";

describe("GET orders", () => {
    let controller: OrderController
    let req: Partial<Request> & { user?: any }
    let res: any

    beforeEach(() => {
        controller = new OrderController()
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
    it("should return orders", async () => {
        const orders = [{o_id: 1}]
        mockGetOrders.mockResolvedValue(orders)

        await controller.getOrders(req as Request, res as Response)

        expect(mockGetOrders).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(orders)
    })

    it("should fail if status not correct", async () => {
        req.user = {status: 1}

        await controller.getOrders(req as Request, res as Response)

        expect(mockGetOrders).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Bad status")
    })
    
})

describe("Get user orders", () => {
    let controller: OrderController
    let req: Partial<Request> & { user?: any }
    let res: any

    beforeEach(() => {
        controller = new OrderController()
        req = { 
            user: { id: 1, status: 1}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.clearAllMocks()
    })
    it("should return user orders", async () => {
    const orders = [{ id: 10 }, { id: 11 }]
    mockGetUserOrders.mockResolvedValue(orders)

    await controller.getUserOrders(req as Request, res as Response)

    expect(mockGetUserOrders).toHaveBeenCalledWith(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(orders)
  })

  it("should reject if status >= 3", async () => {
    req.user = { id: 1, status: 3 }

    await controller.getUserOrders(req as Request, res as Response)

    expect(mockGetUserOrders).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.send).toHaveBeenCalledWith("Bad status")
  })
})


describe("Get active orders", () => {
    let controller: OrderController
    let req: Partial<Request> & { user?: any }
    let res: any

    beforeEach(() => {
        controller = new OrderController()
        req = { 
            user: { id: 1, status: 1}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.clearAllMocks()
    })
    it("should return active orders", async () => {
    const orders = [{ id: 10 }, { id: 11 }]
    mockgetAllActiveOrders.mockResolvedValue(orders)

    await controller.getAllActiveOrders(req as Request, res as Response)

    expect(mockgetAllActiveOrders).toHaveBeenCalledWith(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(orders)
  })

  it("should reject if status >= 3", async () => {
    req.user = { id: 1, status: 3 }

    await controller.getAllActiveOrders(req as Request, res as Response)

    expect(mockgetAllActiveOrders).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.send).toHaveBeenCalledWith("Bad status")
  })
})

describe("POST insert order", () => {
    let controller: OrderController
    let req: Partial<Request> & { user?: any }
    let res: any

    beforeEach(() => {
        controller = new OrderController()
        req = { 
            user: {  status: 1, id: 1},
            body: {p_id: 1, date: "2020-12-12", return_date: "2020-12-19"}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.clearAllMocks()
    })
    it("should insert successfully", async () => {
        const dbResult = { insertId: 1 }
        const expected = { id: 1, message: "Created" }

        mockInsertOrder.mockResolvedValue(dbResult)

        await controller.insertOrder(req as Request, res as Response)

        expect(mockInsertOrder).toHaveBeenCalledWith(1, 1, "2020-12-12", "2020-12-19")
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith(expected)
    })
    it("should reject if user status > 2", async () => {
        req.user.status = 3

        await controller.insertOrder(req as Request, res as Response)

        expect(mockInsertOrder).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Bad status")
    })
    it("should reject if body missing", async () => {
        req.body = undefined

        await controller.insertOrder(req as Request, res as Response)

        expect(mockInsertOrder).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })
    it("should reject if p_id missing", async () => {
        req.body = {
            date: "2020-12-12",
            return_date: "2020-12-19"
        }

        await controller.insertOrder(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request, missing data")
    })
    it("should reject if required fields missing", async () => {
        req.body = {
            p_id: 1,
            date: "2020-12-12"
        }

        await controller.insertOrder(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request, missing data")
    })
    it("should reject if return date earlier than order date", async () => {
        req.body = {
            p_id: 1,
            date: "2020-12-20",
            return_date: "2020-12-10"
        }

        await controller.insertOrder(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request, date")
    })
})

describe("PATCH modify orders", () => {
    let controller: OrderController
    let req: Partial<Request> & { user?: any }
    let res: any

    beforeEach(() => {
        controller = new OrderController()
        req = {
            params: { id: "1" },
            user: { status: 4 },
            body: {
                p_id: 2
            }
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.clearAllMocks()
    })
    it("should successfully modify order", async () => {
        mockmodifyOrder.mockResolvedValue({ affectedRows: 1 })

        await controller.modifyOrder(req as Request, res as Response)

        expect(mockmodifyOrder).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith({ message: "Modified" })
    })
    it("should reject if id is invalid", async () => {
        req.params.id = "abc"

        await controller.modifyOrder(req as Request, res as Response)

        expect(mockmodifyOrder).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad Request")
    })
    it("should reject if status not 4", async () => {
        req.user.status = 2

        await controller.modifyOrder(req as Request, res as Response)

        expect(mockmodifyOrder).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Bad status")
    })
    it("should reject if body missing", async () => {
        req.body = undefined

        await controller.modifyOrder(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })
    it("should reject if no valid fields to update", async () => {
        req.body = {
            random: "value"
        }

        await controller.modifyOrder(req as Request, res as Response)

        expect(mockmodifyOrder).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Nothing to update")
    })
})