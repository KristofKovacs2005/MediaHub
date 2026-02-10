
//This file is used to decode Buffer objects received from the backend into strings for display in the frontend.
export function decodeBuffer(value) {
	if (
		value &&
		typeof value === "object" &&
		Array.isArray(value.data)
	) {
		try {
			const bytes = new Uint8Array(value.data);
			return new TextDecoder("utf-8").decode(bytes);
		} catch (err) {
			console.warn("Buffer decode failed:", err);
			return "";
		}
	}

	// Already a string
	if (typeof value === "string") {
		return value;
	}

	return "";
}