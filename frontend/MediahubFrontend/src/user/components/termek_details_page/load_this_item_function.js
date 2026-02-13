import { useState, useEffect } from "react";
import { tokenLoader } from "../../util/auth";
import { decodeBuffer } from "../../util/decoder";

export function useLoadThisItem({ id }) {
	const [item, setItem] = useState(null);
	const [comments, setComments] = useState([]); // <-- new: comments for this item
	const [tags, setTags] = useState([]); // best-effort tags for this item
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const token = localStorage.getItem("authToken"); // get token for auth
	
	useEffect(() => {
		async function loadItemAndComments() {
			try {
				setLoading(true);

				// fetch item
				const itemRes = await fetch(`http://localhost:3000/item/${id}`, {
					headers: { "x-access-token": token }
				});
				if (!itemRes.ok) throw new Error("Nem sikerült lekérni az elemet.");
				const itemData = await itemRes.json();
				const itemObj = Array.isArray(itemData) ? itemData[0] : itemData;
				const normalizedItem = {
					...itemObj,
					i_description: decodeBuffer(itemObj?.i_description)
				};

				setItem(normalizedItem);

				// fetch reviews for this item using the item-specific endpoint (backend has getReviewsOfItem)
				let reviews = [];
				try {
					const reviewsRes = await fetch(`http://localhost:3000/item/${id}/reviews`, {
						headers: { "x-access-token": token }
					});
					;
					if (reviewsRes.ok) {
						const reviewsData = await reviewsRes.json();
						reviews = Array.isArray(reviewsData) ? reviewsData : [];
						reviews = reviews.map(r => ({
							...r,
							comment: decodeBuffer(r?.comment)
						}));
					}
				} catch (e) {
					// non-fatal: keep comments empty
					console.warn("Reviews fetch failed:", e);
				}
				setComments(reviews);

				// best-effort: try to fetch tags for this item from a possible endpoint
				let foundTags = [];
				try {
					const tagsRes = await fetch(`http://localhost:3000/item/${id}/tags`, {
						headers: { "x-access-token": tokenLoader() }
					});
					if (tagsRes.ok) {
						const tagsData = await tagsRes.json();
						// normalize different possible shapes:
						if (Array.isArray(tagsData)) {
							// array of { t_name } or plain strings
							foundTags = tagsData.map(t => (t && typeof t === "object" ? t.t_name || t.name || "" : String(t))).filter(Boolean);
						} else if (typeof tagsData === "string") {
							foundTags = tagsData.split(",").map(s => s.trim()).filter(Boolean);
						}
					}
				} catch (e) {
					// ignore if endpoint doesn't exist
					console.warn("Tags fetch failed (endpoint may not exist):", e);
				}
				setTags(foundTags);
			} catch (err) {
				console.error(err);
				setError(err.message || String(err));
			} finally {
				setLoading(false);
			}
		}

		if (id != null) loadItemAndComments();
	}, [id, token]);

	// return item, comments and tags so the details UI can render them
	return { item, comments, tags, loading, error };
}