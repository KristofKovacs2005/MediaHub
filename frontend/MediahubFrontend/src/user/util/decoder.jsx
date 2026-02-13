/**
 * Ennek a functionek a feladata hogy a buffer tipusú tömb szövegeket UTF-8 szöveggé alakítsa
 * Paramétere az maga a buffer tömb
 * A function megnézi hogy esetleg a megadott érték az mégis string amitől vissza adja a megadott értéket
 * Ha a megadott buffer igenis objektum, vagy tömb akkor a bináris data-kat alakítja Uint8Array-re amit dekódol a textdecoder utf-8 text formára
 */
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