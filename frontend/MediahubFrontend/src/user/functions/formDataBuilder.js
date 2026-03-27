export function buildItemFormData({ i_name, author, i_description, amount, tags, imageFile }) {
    const formData = new FormData();
    if (i_name) formData.append("i_name", i_name);
    if (author) formData.append("author", author);
    if (i_description) formData.append("i_description", i_description);
    if (amount != null) formData.append("amount", amount.toString());
    if (tags) {
        // Convert array to comma-separated string instead of JSON
        if (Array.isArray(tags) && tags.length) {
            formData.append("tags", tags.join(",")); // <-- change here
        }
    }
    if (imageFile) formData.append("file", imageFile);
    return formData;
}