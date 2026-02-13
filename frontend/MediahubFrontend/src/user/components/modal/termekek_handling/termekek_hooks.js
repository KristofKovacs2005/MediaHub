import { checkAuthKonyvtarosOrAdminLoader } from "../../../util/auth";

export function useDeleteTermek() {
    const token = checkAuthKonyvtarosOrAdminLoader();

    async function deleteTermek(i_id) {
        await fetch(`http://localhost:3000/items/${i_id}`, {
            method: "DELETE",
            headers: { "x-access-token": token },
        });
    }

    return { deleteTermek };
}

/**
 * Insert a new termek (with image upload)
 * data = { i_name, author, i_description, tags (comma-separated string), file }
 */
export function useInsertTermek() {
    const token = checkAuthKonyvtarosOrAdminLoader();

    async function insertTermek(data) {
        const formData = new FormData();
        formData.append("i_name", data.i_name);
        formData.append("author", data.author);
        formData.append("i_description", data.i_description);
        if (data.tags) formData.append("tags", data.tags); // already comma-separated
        if (data.file) formData.append("file", data.file);

        const res = await fetch("http://localhost:3000/items", {
            method: "POST",
            headers: { "x-access-token": token },
            body: formData,
        });
        console.log(token)

        if (!res.ok) {
            const text = await res.text().catch(() => null);
            throw new Error(`Failed to insert termek (${res.status}) ${text || ""}`);
        }
    }

    return { insertTermek };
}

/**
 * Modify an existing termek
 * i_id = termek id
 * data = { i_name, author, i_description, tags, file (optional) }
 */
export function useModifyTermek() {
    const token = checkAuthKonyvtarosOrAdminLoader();

    async function modifyTermek(i_id, data) {

        let body;
        let headers = {
            "x-access-token": token
        };

        if (data.file) {
            // use FormData
            body = new FormData();

            if (data.i_name) body.append("i_name", data.i_name);
            if (data.author) body.append("author", data.author);
            if (data.i_description) body.append("i_description", data.i_description);
            if (data.tags) body.append("tags", data.tags);
            body.append("file", data.file);

            // ⚠ DO NOT set Content-Type
        } else {
            // JSON request
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(data);
        }

        const res = await fetch(`http://localhost:3000/items/${i_id}`, {
            method: "PATCH",
            headers,
            body
        });

        if (!res.ok) {
            const text = await res.text().catch(() => null);
            throw new Error(`Failed to modify termek (${res.status}) ${text || ""}`);
        }
    }

    return { modifyTermek };
}