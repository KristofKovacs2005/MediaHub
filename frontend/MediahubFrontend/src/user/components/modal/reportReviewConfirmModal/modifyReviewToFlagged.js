import { getAuthToken, getAuthStatus } from "../../../util/auth";

export default async function modifyReviewToFlagged(r_id, reason) {
    try {
        const token = getAuthToken();
        if (!token) {
            alert("Te nem vagy bejelentkezve!");
            return false;
        }

        const status = getAuthStatus();
        if(status === 3 ){
            alert("Ez a felhasználó fel van függesztve");
            return false;
        }

        const response = await fetch(`http://localhost:3000/reviews/${r_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            body: JSON.stringify({ flagged: true, reason }),
        });
        if (!response.ok) {
            alert("Hiba történt!");
            return false;
        }
        return true;
    }
    catch(err){
        return false;
    }
}