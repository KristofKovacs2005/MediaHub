export async function fetchComments(itemId, setComments) {
    try {
        const res = await fetch(`http://localhost:3000/item/${itemId}/comments`);
        if (!res.ok) {
            throw new Error("Comments fetch failed");
        }
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
    } catch (err) {
        console.log(err.message);
    }
}