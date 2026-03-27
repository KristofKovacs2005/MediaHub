import { useState, useEffect } from "react";
import { tokenLoader } from "../util/auth";
import { decodeBuffer } from "../util/decoder";

export function useLoadThisItem({ id }) {
	const [item, setItem] = useState(null);
	const [comments, setComments] = useState([]);
	const [tags, setTags] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const token = tokenLoader();

	async function loadItemAndComments() {
		if (id == null) return;

		setLoading(true);
		try {
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
			if(reviewsRes.status === 404){
				setComments([]);
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

			setError(null);
		} catch (err) {
			setError(err.message || "Nem sikerult betolteni az elemet.");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (id == null) return;
		loadItemAndComments();
	}, [id, token]);

	return { item, comments, tags, loading, error, refetch: loadItemAndComments };
}