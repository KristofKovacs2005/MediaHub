export async function insertOrder(p_id, return_date) {
    try {
        const token = localStorage.getItem("authToken");
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