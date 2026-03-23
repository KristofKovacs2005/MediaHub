import { getAuthToken, getAuthStatus } from "../../../util/auth";

export default async function modifyReviewToFlagged(r_id) {
    try {
        const token = getAuthToken();
        if (!token) {
            alert("Te nem vagy bejelentkezve!");
            return;
        }

        const status = getAuthStatus();
        if(status === 3 ){
            alert("Ez a felhasználó fel van függesztve");
            return;
        }

        const response = await fetch(`http://localhost:3000/reviews/${r_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            body: JSON.stringify({ flagged: true }),
        });
        if (!response.ok) {
            alert("Hiba történt!");
        }
    }
    catch(err){
        return err
    }
}