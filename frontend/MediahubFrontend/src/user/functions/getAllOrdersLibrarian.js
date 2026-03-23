export default async function fetchOrdersLibrarian(setOrders){
    try {
        const res = await fetch("http://localhost:3000/orders", {
            method: "GET",
            headers: { "x-access-token": localStorage.getItem("token") }
        });
        if(!res.ok){
            throw new Error("Orders fetch failed");
        }
        const orders = await res.json();
        setOrders(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}