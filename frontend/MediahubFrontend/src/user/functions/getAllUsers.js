import { authLoader } from "../util/auth"
export async function fetchUsers(setUsers){
    try {
        const res = await fetch("http://localhost:3000/users", {
            headers: { "x-access-token": authLoader({ minRole: 5 }) }
        });
        if(!res.ok){
            throw new Error("Users fetch failed");
        }
        const users = await res.json();
        setUsers(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}