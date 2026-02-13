interface IOrder {
    o_id: number
    s_id: number
    u_id: number
    p_id: number
    date: Date
    return_date: Date
}

class Order implements IOrder {
    o_id: number
    s_id: number
    u_id: number
    p_id: number
    date: Date
    return_date: Date

    constructor(init: IOrder) {
        this.o_id = init.o_id
        this.s_id = init.s_id
        this.u_id = init.u_id
        this.p_id = init.p_id
        this.date = init.date
        this.return_date = init.return_date
    }
}


export default Order;
