interface IOrder {
    o_id: number;
    s_id: number;
    u_id: number;
    p_id: number;
    date: Date;
    return_date: Date;
}
declare class Order implements IOrder {
    o_id: number;
    s_id: number;
    u_id: number;
    p_id: number;
    date: Date;
    return_date: Date;
    constructor(init: IOrder);
}
export default Order;
