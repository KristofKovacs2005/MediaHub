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

export async function fetchUsersById({u_id, setUsersById}){
    try {
        const api = "http://localhost:3000/users/"+u_id
        const token = localStorage.getItem("authToken");
        const user = await apiCall(api, "GET", null, token);
        setUsersById(user);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}