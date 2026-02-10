import { tokenLoader } from "../../../util/auth";

export default async function postReview(itemId, stars, comment, onSuccess) {
	try {
		const token = tokenLoader();
		if (!token) {
			alert("Te nem vagy bejelentkezve!");
			return;
		}

		const payload = {
			i_id: itemId,
			stars: stars,
			comment: comment || "" || null || undefined, // ensure it's a string or null, not empty string
		};
		console.log("Submitting review with payload:", payload);
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
