export async function fetchComments(setComments) {
    try {
        const res = await fetch(`http://localhost:3000/item/${itemId}/reviews`,{
            method: "GET"
        });
        if (!res.ok) {
            throw new Error("Comments fetch failed");
        }
        const data = await res.json();
        setComments(data);
    } catch (err) {
        setComments([]);
    }
}