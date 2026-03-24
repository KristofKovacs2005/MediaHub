import { apiCall } from "../../../functions/apiCall";
import { tokenLoader } from "../../../util/auth";

export default async function postReview(itemId, stars, comment, comments, onSuccess) {
	try {
		const token = tokenLoader();
		if (!token) {
			alert("Te nem vagy bejelentkezve!");
			return;
		}

		const jogosultsag = localStorage.getItem("status");
		if (jogosultsag === "3") {
			alert("Ez a felhasználó fel van függesztve");
			return;
		}

		const username = localStorage.getItem("username");
		const safeComments = Array.isArray(comments) ? comments : [];
		const alreadyCommented = safeComments.some(c => String(c.u_id) === String(username));

		if (alreadyCommented) {
			alert("Már írtál véleményt ehhez az elemhez!");
			return;
		}

		const payload = {
			i_id: itemId,
			stars,
			comment: comment || null,
		};

		console.log("Submitting review with payload:", payload);

		// apiCall already throws if there's an error
		await apiCall("http://localhost:3000/reviews", "POST", payload, token);

		alert("Vélemény sikeresen beküldve!");
		if (onSuccess) onSuccess();

	} catch (err) {
		console.error("Review submission error:", err);
		alert("Hiba történt a vélemény beküldésekor: " + (err.message || err));
	}
}