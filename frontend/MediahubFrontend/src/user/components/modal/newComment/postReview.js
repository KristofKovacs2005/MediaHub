import { tokenLoader } from "../../../util/auth";

export default async function postReview(itemId, rating, commentText, onSuccess) {
	try {
		const token = tokenLoader();
		if (!token) {
			alert("Te nem vagy bejelentkezve!");
			return;
		}

		const payload = {
			item_id: itemId,
			review_rating: rating,
			review_text: commentText || "",
		};

		const response = await fetch("http://localhost:3000/reviews", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": token,
			},
			body: JSON.stringify(payload),
		});

		if (response.ok) {
			alert("Vélemény sikeresen beküldve!");
			if (onSuccess) onSuccess();
		} else {
			const error = await response.json();
			alert(`Hiba: ${error.message || "Nem sikerült a vélemény beküldése"}`);
		}
	} catch (err) {
		console.error("Review submission error:", err);
		alert("Hiba történt a vélemény beküldésekor");
	}
}
