interface IUser {
    u_id: number;
    username: string;
    email: string;
    password: string;
    status: number;
    token: string;
}
declare class User implements IUser {
    u_id: number;
    username: string;
    email: string;
    password: string;
    status: number;
    token: string;
    constructor(init: IUser);
}
export default User;
