import { apiCall } from "./apiCall";
import { getAuthStatus } from "../util/auth";

export async function getOrdersForLibrarian() {
    const token = localStorage.getItem("authToken");
    return await apiCall("http://localhost:3000/orders", "GET",null, token);
}


export async function insertOrder(p_id, return_date) {
    const status = getAuthStatus();

    if (status === null) {
        throw new Error("Vendég nem kölcsönözhet!");
    }

    const MAX = status === 2 ? 1 : 3;

    const orders = await fetchOrdersUser();
    const activeOrders = orders.filter(o => [1, 2, 6].includes(o.status));

    if (activeOrders.length >= MAX) {
        throw new Error("Elérted a maximális kölcsönzési limitet!");
    }

    const token = localStorage.getItem("authToken");
    
    const date = new Date().toISOString().split("T")[0];
    return await apiCall(
        "http://localhost:3000/orders",
        "POST",
        { p_id, date, return_date },
        token
    );
}
//fetch all the orders that user has
export async function fetchOrdersUser() {
    try {
        const token = localStorage.getItem("authToken"); // token for auth
        return await apiCall("http://localhost:3000/order", "GET", null, token);
    } catch (error) {
        return []; // preserve original fallback
    }
}

// Modify order status
export async function modifyOrderWithLibrarian(orderId, status) {
    const token = localStorage.getItem("authToken"); // librarian token
    return await apiCall(
        `http://localhost:3000/orders/${orderId}`,
        "PATCH",
        { "s_id": status },
        token
    );
}