export async function fetchOrdersUser() {
    try {
        const token = localStorage.getItem("authToken"); // or getAuthToken()

        const res = await fetch("http://localhost:3000/order", {
            method: "GET",
            headers: { "x-access-token": token }
        });

        if (!res.ok) throw new Error("Orders fetch failed");

        const orders = await res.json();
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}