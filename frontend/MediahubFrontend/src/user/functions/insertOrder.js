import { getAuthStatus } from "../util/auth";
import { fetchOrdersUser } from "./getAllOrdersUser";
export async function insertOrder(p_id, return_date) {
    const status = getAuthStatus();

    if (status === null) {
        throw new Error("Vendég nem kölcsönözhet!");
    }

    const MAX = (status === 2) ? 1 : 3;

    const orders = await fetchOrdersUser(); // ✅ now returns array
    const activeOrders = orders.filter(o => [1, 2, 6].includes(o.status));

    if (activeOrders.length >= MAX) {
        throw new Error("Elérted a maximális kölcsönzési limitet!");
    }

    try {
        const token = localStorage.getItem("authToken"); // ✅ FIXED

        const date = new Date().toLocaleDateString("en-CA");

        const res = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                p_id,
                date,
                return_date
            })
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(errText || "Order creation failed");
        }

        return await res.json();

    } catch (error) {
        console.error("Error inserting order:", error);
        throw error;
    }
}
//how to call it from the UserBody component? You can import the function and call it when needed, for example, on a button click:
//const returnDate = new Date();
//returnDate.setDate(returnDate.getDate() + daysInput);
//insertOrder(
//    3,
//    returnDate.toLocaleDateString("en-CA")
//);