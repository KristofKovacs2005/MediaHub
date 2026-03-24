import { apiCall } from "./apiCall";

export async function fetchUsers(setUsers) {
    try {
        const token = localStorage.getItem("authToken");
        const users = await apiCall("http://localhost:3000/users", "GET", null, token);
        setUsers(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}