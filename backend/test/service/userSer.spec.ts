const mockgetUsers = jest.fn()
const mockgetUsersById = jest.fn()
const mockinsertUser = jest.fn()
const mocklogin = jest.fn()
const mockmodifyUser = jest.fn()

jest.mock("../../src/repisotaries/userRep", () => ({
  UserRep: jest.fn().mockImplementation(() => ({
    getUsers: mockgetUsers,
    getUsersById: mockgetUsersById,
    insertUser: mockinsertUser,
    login: mocklogin,
    modifyUser: mockmodifyUser
  }))
}))

import { UserSer } from "../../src/service/userSer"
import { HttpException } from "../../src/middleware/error"

describe("getUsers tesztek", () => {
    let service: UserSer
        
    beforeEach(() => {
        service = new UserSer()
        jest.clearAllMocks()
    })
    it("should return users", async() => {
        const mockResults = [{ u_id: 1 }]

        mockgetUsers.mockResolvedValue(mockResults)

        const result = await service.getUsers()

        expect(mockgetUsers).toHaveBeenCalled()
        expect(result).toEqual(mockResults)
    })

    it("Should throw 404 if no users are found", async () => {
        mockgetUsers.mockResolvedValue([])

        await expect(
            service.getUsers()
        ).rejects.toThrow(HttpException)

        await expect(
            service.getUsers()
        ).rejects.toMatchObject({
            status: 404,
            message: "Nincs ilyen elem"
        })

        expect(mockgetUsers).toHaveBeenCalled()
    })
})


describe("getUsersById tesztek", () => {
    let service: UserSer
        
    beforeEach(() => {
        service = new UserSer()
        jest.clearAllMocks()
    })
    it("should return user by id", async() => {
        const mockResults = [{ u_id: 1 }]

        mockgetUsersById.mockResolvedValue(mockResults)

        const result = await service.getUsersById(1)

        expect(mockgetUsersById).toHaveBeenCalled()
        expect(result).toEqual(mockResults)
    })

    it("Should throw 404 if no users are found", async () => {
        mockgetUsersById.mockResolvedValue([])

        await expect(
            service.getUsersById(1)
        ).rejects.toThrow(HttpException)

        await expect(
            service.getUsersById(1)
        ).rejects.toMatchObject({
            status: 404,
            message: "Nincs ilyen elem"
        })

        expect(mockgetUsersById).toHaveBeenCalled()
    })
})

describe("insertUser tesztek", () => {
    let service: UserSer
        
    beforeEach(() => {
        service = new UserSer()
        jest.clearAllMocks()
    })
    it("should insert user", async() => {
        const mockResults = { affectedRows: 1 }

        mockinsertUser.mockResolvedValue(mockResults)

        const result = await service.insertUser("name", "email", "password", 1)

        expect(mockinsertUser).toHaveBeenCalledWith("name", "email", "password", 1)
        expect(result).toEqual(mockResults)
    })

    it("Should throw 400 if user insertion fails", async () => {
        mockinsertUser.mockResolvedValue({ affectedRows: 0 })

        await expect(
            service.insertUser("name", "email", "password", 1)
        ).rejects.toThrow(HttpException)

        await expect(
            service.insertUser("name", "email", "password", 1)
        ).rejects.toMatchObject({
            status: 400,
            message: "Sikertelen"
        })

        expect(mockinsertUser).toHaveBeenCalled()
    })
})


describe("login tesztek", () => {
    let service: UserSer
        
    beforeEach(() => {
        service = new UserSer()
        jest.clearAllMocks()
    })
    it("should login user", async() => {
        const mockResults = [{
            username: "testuser",
            email: "test@test.com",
            u_id: 1,
            status: 1
        }]
        mocklogin.mockResolvedValue(mockResults)

        const result = await service.login("email", "password")

        expect(mocklogin).toHaveBeenCalledWith("email", "password")
        expect(result).toMatchObject({
            token: expect.any(String),
            status: 1,
            username: "testuser"
        })
    })

    it("Should throw 401 if user login fails", async () => {
        mocklogin.mockResolvedValue([{id: 0}])

        await expect(
            service.login("email", "password")
        ).rejects.toThrow(HttpException)

        await expect(
            service.login("email", "password")
        ).rejects.toMatchObject({
            status: 401,
            message: "Rossz email vagy jelszó"
        })

        expect(mocklogin).toHaveBeenCalled()
    })
})


describe("modifyUser tesztek", () => {
    let service: UserSer
        
    beforeEach(() => {
        service = new UserSer()
        jest.clearAllMocks()
    })
    it("should modify user", async() => {
        const mockResults =  {affectedRows: 1}

        mockmodifyUser.mockResolvedValue(mockResults)

        const result = await service.modifyUser("sql", ["value"])

        expect(mockmodifyUser).toHaveBeenCalledWith("sql", ["value"])
        expect(result).toEqual(mockResults)
    })

    it("Should throw 404 if user modification fails", async () => {
        mockmodifyUser.mockResolvedValue({ affectedRows: 0 })

        await expect(
            service.modifyUser("sql", ["value"])
        ).rejects.toThrow(HttpException)

        await expect(
            service.modifyUser("sql", ["value"])
        ).rejects.toMatchObject({
            status: 404,
            message: "Nincs ilyen elem"
        })

        expect(mockmodifyUser).toHaveBeenCalled()
    })
})


