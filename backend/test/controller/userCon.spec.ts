import { Request, Response } from "express";

const mockGetUsers = jest.fn()
const mockGetUsersById = jest.fn()
const mockInsertUser = jest.fn()
const mockLogin = jest.fn()
const mockModifyUser = jest.fn()


jest.mock("../../src/service/userSer", () => ({
  UserSer: jest.fn().mockImplementation(() => ({
    getUsers: mockGetUsers,
    getUsersById: mockGetUsersById,
    insertUser: mockInsertUser,
    login: mockLogin,
    modifyUser: mockModifyUser
  }))
}));

import { UserController } from "../../src/user/usersController";

describe("GET users", () => {
    let controller: UserController
        let req: Partial<Request> & { user?: any }
        let res: any
        beforeEach(() => {
            controller = new UserController()
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
    it("Should return users", async () => {
        const results = [{u_id: 1}]
        mockGetUsers.mockResolvedValue(results)

        await controller.getUsers(req as Request, res as Response)

        expect(mockGetUsers).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(results)
    })
    it("status error", async () => {
        req.user.status = 1

        await controller.getUsers(req as Request, res as Response)

        expect(mockGetUsers).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Bad status")
    })
})

describe("GET users by id", () => {
    let controller: UserController
        let req: Partial<Request> & { user?: any }
        let res: any
        beforeEach(() => {
            controller = new UserController()
            req = { 
                query: {},
                params: {id: "1"},
                user: {status: 5}
            }
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }
            jest.clearAllMocks()
    })
    it("Should return users", async () => {
        const results = [{u_id: 1}]
        mockGetUsersById.mockResolvedValue(results)

        await controller.getUsersById(req as Request, res as Response)

        expect(mockGetUsersById).toHaveBeenCalledWith(1)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(results)
    })
    it("status error", async () => {
        req.user.status = 1

        await controller.getUsersById(req as Request, res as Response)

        expect(mockGetUsersById).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Bad status")
    })

     it("status error", async () => {
        req.params.id = "asd"

        await controller.getUsersById(req as Request, res as Response)

        expect(mockGetUsersById).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })
})

describe("POST user", () => {
    let controller: UserController
        let req: Partial<Request> & { user?: any }
        let res: any
        beforeEach(() => {
            controller = new UserController()
            req = { 
                query: {},
                body: {
                }
            }
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }
            jest.clearAllMocks()
    })
    it("Should insert user", async () => {
        const mockResult = { insertId: 10 }

        req.body = {
            username: "testuser",
            email: "test@test.com",
            password: "1234",
            status: 1
        }

        mockInsertUser.mockResolvedValue(mockResult)

        await controller.insertUser(req as Request, res as Response)

        expect(mockInsertUser).toHaveBeenCalledWith(
            "testuser",
            "test@test.com",
            "1234",
            1
        )
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith({
            message: "Created",
            id: 10
        })
    })

    it("Should return 400 if body is missing", async () => {
        req.body = undefined

        await controller.insertUser(req as Request, res as Response)

        expect(mockInsertUser).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

    it("Should return 400 if required fields are missing", async () => {
        req.body = {
            username: "testuser",
            email: "test@test.com"
        }

        await controller.insertUser(req as Request, res as Response)

        expect(mockInsertUser).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

    it("Should return 400 if fields are empty", async () => {
        req.body = {
            username: "",
            email: "",
            password: "",
            status: null
        }

        await controller.insertUser(req as Request, res as Response)

        expect(mockInsertUser).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })
})

describe("POST login", () => {
    let controller: UserController
    let req: Partial<Request>
    let res: any

    beforeEach(() => {
        controller = new UserController()
        req = {
            body: {}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.clearAllMocks()
    })

    it("Should login successfully", async () => {
        req.body = {
            email: "test@test.com",
            password: "1234"
        }

        const mockResult = {
            token: "abc123",
            status: 1,
            username: "testuser"
        }

        mockLogin.mockResolvedValue(mockResult)

        await controller.login(req as Request, res as Response)

        expect(mockLogin).toHaveBeenCalledWith("test@test.com", "1234")
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith({
            token: "abc123",
            status: 1,
            username: "testuser"
        })
    })

    it("Should return 400 if body is missing", async () => {
        req.body = undefined

        await controller.login(req as Request, res as Response)

        expect(mockLogin).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

    it("Should return 400 if email or password is missing", async () => {
        req.body = {
            email: "test@test.com"
        }

        await controller.login(req as Request, res as Response)

        expect(mockLogin).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

})

describe("PATCH modify user", () => {
    let controller: UserController
    let req: Partial<Request> & { user?: any }
    let res: any

    beforeEach(() => {
        controller = new UserController()
        req = {
            params: { id: "1" },
            body: {},
            user: { status: 5 }
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.clearAllMocks()
    })

    it("Should modify user (single field)", async () => {
        req.body = {
            username: "newname"
        }

        mockModifyUser.mockResolvedValue({})

        await controller.modifyUser(req as Request, res as Response)

        expect(mockModifyUser).toHaveBeenCalledWith(
            "update users set username = ? where u_id = ?",
            ["newname", 1]
        )
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith({ message: "Modified" })
    })

    it("Should modify user (multiple fields)", async () => {
        req.body = {
            username: "newname",
            email: "new@test.com"
        }

        mockModifyUser.mockResolvedValue({})

        await controller.modifyUser(req as Request, res as Response)

        expect(mockModifyUser).toHaveBeenCalledWith(
            "update users set username = ?, email = ? where u_id = ?",
            ["newname", "new@test.com", 1]
        )
        expect(res.status).toHaveBeenCalledWith(201)
    })

    it("Should return 401 if status is not 5", async () => {
        req.user!.status = 3

        await controller.modifyUser(req as Request, res as Response)

        expect(mockModifyUser).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Bad status")
    })

    it("Should return 400 if id is invalid", async () => {
        req.params = { id: "abc" }

        await controller.modifyUser(req as Request, res as Response)

        expect(mockModifyUser).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

    it("Should return 400 if body is missing", async () => {
        req.body = undefined

        await controller.modifyUser(req as Request, res as Response)

        expect(mockModifyUser).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

    it("Should return 400 if no allowed fields provided", async () => {
        req.body = {
            invalidField: "test"
        }

        await controller.modifyUser(req as Request, res as Response)

        expect(mockModifyUser).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

    it("Should ignore non-allowed fields and update valid ones", async () => {
        req.body = {
            username: "newname",
            invalidField: "ignored"
        }

        mockModifyUser.mockResolvedValue({})

        await controller.modifyUser(req as Request, res as Response)

        expect(mockModifyUser).toHaveBeenCalledWith(
            "update users set username = ? where u_id = ?",
            ["newname", 1]
        )
    })
})