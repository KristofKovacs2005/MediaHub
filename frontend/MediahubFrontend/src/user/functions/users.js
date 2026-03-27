import { apiCall } from "./apiCall";

export async function getUsers() {
    const token = localStorage.getItem("authToken");
    return await apiCall("http://localhost:3000/users", "GET", null, token);
}

export async function fetchUsers(setUsers) {
    try {
        const users = await getUsers();
        setUsers(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

export async function fetchUsersById({u_id, setUsersById}){
    try {
        const api = `http://localhost:3000/users/${u_id}`
        const token = localStorage.getItem("authToken");
        const user = await apiCall(api, "GET", null, token);
        setUsersById(user[0]);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

export async function updateUserStatus(u_id, status) {
    const token = localStorage.getItem("authToken");
    return await apiCall(`http://localhost:3000/users/${u_id}`, "PATCH", { status }, token);
}