import { authLoader, getAuthStatus } from "../../functions/tokenLoader";
import { getAllOrdersUser } from "../../functions/getAllOrdersUser";
export async function insertOrder(p_id, return_date) {
    const status = getAuthStatus();

    if (status === null) {
        throw new Error("Vendég nem kölcsönözhet!");
    }

    const MAX = (status === 2) ? 1 : 3;

    // lekérjük a user összes aktív rendelését
    const orders = await getAllOrdersUser();
    const activeOrders = orders.filter(o => [1, 2, 6].includes(o.status));// csak az aktív rendeléseket számoljuk, a visszahozottakat nem

    if (activeOrders.length >= MAX) {// ha elérte a limitet, nem engedélyezzük a kölcsönzést
        throw new Error("Elérted a maximális kölcsönzési limitet!");// a 2-es státuszú user csak 1 darab kölcsönzést tarthat egyszerre, a 1-es státuszú user pedig 3-at
    }

    try {
        // csak bejelentkezett user lehet (1 vagy 2)
        const token = await authLoader({ minRole: 1 }); //a minimum role 1, mert a 2-es státuszú user is kölcsönözhet, csak kevesebbet

        const date = new Date().toLocaleDateString("en-CA"); // amiatt angol és észak-amerikai formátum, hogy a backend helyesen értelmezze a dátumot (YYYY-MM-DD)

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

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error inserting order:", error);
        throw error;
    }
}

const returnDate = new Date();
returnDate.setDate(returnDate.getDate() + 7); // or 14 or anything

//how to call it from the UserBody component? You can import the function and call it when needed, for example, on a button click:
//const returnDate = new Date();
//returnDate.setDate(returnDate.getDate() + daysInput);
//insertOrder(
//    3,
//    returnDate.toLocaleDateString("en-CA")
//);