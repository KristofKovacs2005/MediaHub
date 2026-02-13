interface IUser {
    u_id: number,
    username: string,
    email: string,
    password: string,
    status: number,
    token: string
}

class User implements IUser {
    u_id: number
    username: string
    email: string
    password: string
    status: number
    token: string

    constructor(init:IUser) {
        this.u_id = init.u_id
        this.username = init.username
        this.email = init.email
        this.password = init.password
        this.status = init.status
        this.token = init.token
    }
}

export default User;