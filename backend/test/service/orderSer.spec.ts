const mockGetOrders = jest.fn()
const mockGetUserOrders = jest.fn()
const mockGetAllActiveOrders = jest.fn()
const mockInsertOrder = jest.fn()
const mockModifyOrer = jest.fn()

jest.mock("../../src/repisotaries/orderRep", () => ({
  OrderRep: jest.fn().mockImplementation(() => ({
    getOrders: mockGetOrders,
    getUserOrders: mockGetUserOrders,
    getAllActiveOrders: mockGetAllActiveOrders,
    insertOrder: mockInsertOrder,
    modifyOrder: mockModifyOrer
  }))
}))

import { OrderSer } from "../../src/service/orderSer"
import { HttpException } from "../../src/middleware/error"

describe("OrderSer - getOrders", () => {
    let service: OrderSer
    
    beforeEach(() => {
        service = new OrderSer()
        jest.clearAllMocks()
    })
    it("Should return orders", async () => {
        const mockResults = [{ o_id: 1 }]

        mockGetOrders.mockResolvedValue(mockResults)

        const result = await service.getOrders()

        expect(mockGetOrders).toHaveBeenCalledWith()
        expect(result).toEqual(mockResults)
    })

    it("Should throw 404 if no orders are found", async () => {
        mockGetOrders.mockResolvedValue([])

        await expect(
            service.getOrders()
        ).rejects.toThrow(HttpException)

        await expect(
            service.getOrders()
        ).rejects.toMatchObject({
            status: 404,
            message: "Nincs ilyen elem"
        })

        expect(mockGetOrders).toHaveBeenCalled()
    })
})

describe("OrderSer - getUserOrders", () => {
    let service: OrderSer
    
    beforeEach(() => {
        service = new OrderSer()
        jest.clearAllMocks()
    })
    it("Should return user orders", async () => {
        const mockResults = [{ o_id: 1 }]

        mockGetUserOrders.mockResolvedValue(mockResults)

        const result = await service.getUserOrders(1)

        expect(mockGetUserOrders).toHaveBeenCalledWith(1)
        expect(result).toEqual(mockResults)
    })

    it("Should throw 404 if no orders are found", async () => {
        mockGetUserOrders.mockResolvedValue([])

        await expect(
            service.getUserOrders(-1)
        ).rejects.toThrow(HttpException)

        await expect(
            service.getUserOrders(-1)
        ).rejects.toMatchObject({
            status: 404,
            message: "Nincs ilyen elem"
        })

        expect(mockGetUserOrders).toHaveBeenCalled()
    })
})

describe("OrderSer - getAllActiveOrders", () => {
    let service: OrderSer
    
    beforeEach(() => {
        service = new OrderSer()
        jest.clearAllMocks()
    })
    it("Should return active orders", async () => {
        const mockResults = [{ o_id: 1 }]

        mockGetAllActiveOrders.mockResolvedValue(mockResults)

        const result = await service.getAllActiveOrders(1)

        expect(mockGetAllActiveOrders).toHaveBeenCalledWith(1)
        expect(result).toEqual(mockResults)
    })

    it("Should throw 404 if no orders are found", async () => {
        mockGetAllActiveOrders.mockResolvedValue([])

        await expect(
            service.getAllActiveOrders(-1)
        ).rejects.toThrow(HttpException)

        await expect(
            service.getAllActiveOrders(-1)
        ).rejects.toMatchObject({
            status: 404,
            message: "Nincs ilyen elem"
        })

        expect(mockGetAllActiveOrders).toHaveBeenCalled()
    })
})

describe("OrderSer - insertORder", () => {
    let service: OrderSer
    
    beforeEach(() => {
        service = new OrderSer()
        jest.clearAllMocks()
    })
    it("Should insert element", async () => {
        const mockResults =  {affectedRows: 1}

        mockInsertOrder.mockResolvedValue(mockResults)

        const result = await service.insertOrder(1, 1, new Date("2020-12-12"), new Date("2020-12-12"))

        expect(mockInsertOrder).toHaveBeenCalledWith(1, 1, new Date("2020-12-12"), new Date("2020-12-12"))
        expect(result).toEqual(mockResults)
    })

    it("Should throw 400 if insert is not successfull", async () => {
        mockInsertOrder.mockResolvedValue({affectedRows: 0}
)

        await expect(
            service.insertOrder(1, 1, new Date("2020-12-12"), new Date("2020-12-12"))
        ).rejects.toThrow(HttpException)

        await expect(
            service.insertOrder(1, 1, new Date("2020-12-12"), new Date("2020-12-12"))
        ).rejects.toMatchObject({
            status: 400,
            message: "Sikertelen"
        })

        expect(mockInsertOrder).toHaveBeenCalled()
    })
})


describe("OrderSer - modifyOrder", () => {
    let service: OrderSer
    
    beforeEach(() => {
        service = new OrderSer()
        jest.clearAllMocks()
    })
    it("Should insert element", async () => {
        const mockResults =  {affectedRows: 1}

        mockModifyOrer.mockResolvedValue(mockResults)

        const result = await service.modifyOrder("sql", [], 1, 1)

        expect(mockModifyOrer).toHaveBeenCalledWith("sql", [], 1, 1)
        expect(result).toEqual(mockResults)
    })

    it("Should throw 400 if insert is not successfull", async () => {
        mockModifyOrer.mockResolvedValue({affectedRows: 0}
)

        await expect(
            service.modifyOrder("sql", [], 1, 1)
        ).rejects.toThrow(HttpException)

        await expect(
            service.modifyOrder("sql", [], 1, 1)
        ).rejects.toMatchObject({
            status: 400,
            message: "Sikertelen"
        })

        expect(mockModifyOrer).toHaveBeenCalled()
    })
})