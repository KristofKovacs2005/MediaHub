import { useState, useEffect } from "react";
import { tokenLoader } from "../util/auth";
import { decodeBuffer } from "../util/decoder";

export function useLoadThisItem({ id }) {
	const [item, setItem] = useState(null);
	const [comments, setComments] = useState([]);
	const [tags, setTags] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (id == null) return;

		async function loadItemAndComments() {
			setLoading(true);
			try {
				const token = tokenLoader();
				const itemRes = await fetch(`http://localhost:3000/item/${id}`, {
					headers: { "x-access-token": token }
				});
				if (!itemRes.ok) throw new Error("Nem sikerült lekérni az elemet.");
				const itemData = await itemRes.json();
				const itemObj = Array.isArray(itemData) ? itemData[0] : itemData;
				setItem({ ...itemObj, i_description: decodeBuffer(itemObj?.i_description) });

				const reviewsRes = await fetch(`http://localhost:3000/item/${id}/reviews`, {
					headers: { "x-access-token": token }
				});
				let reviews = [];
				if (reviewsRes.ok) {
					const reviewsData = await reviewsRes.json();
					reviews = Array.isArray(reviewsData) ? reviewsData : [];
					reviews = reviews.map(r => ({ ...r, comment: decodeBuffer(r?.comment) }));
				}
				setComments(reviews);

				const tagsRes = await fetch(`http://localhost:3000/item/${id}/tags`, {
					headers: { "x-access-token": token }
				});
				let foundTags = [];
				if (tagsRes.ok) {
					const tagsData = await tagsRes.json();
					if (Array.isArray(tagsData)) {
						foundTags = tagsData.map(t => (typeof t === "object" ? t.t_name || t.name || "" : String(t))).filter(Boolean);
					} else if (typeof tagsData === "string") {
						foundTags = tagsData.split(",").map(s => s.trim()).filter(Boolean);
					}
				}
				setTags(foundTags);

			} catch (err) {
				console.error(err);
				setError(err.message || String(err));
			} finally {
				setLoading(false);
			}
		}
		loadItemAndComments();
	}, [id]);

	return { item, comments, tags, loading, error };
}